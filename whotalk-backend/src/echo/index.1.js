import sockjs from 'sockjs';
import _ from 'lodash';
import channel from './channel';
import validate from './validate';
import session from './session';


// initialize server
const options = { sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' };
const echo = sockjs.createServer(options);

// setup some variables
const sockets = {};
let counter = 0;
let freeSlot = [];

// log only in dev mode
let log = (message) => {
    console.log("[SOCKET] " + message);
}

if(process.env.NODE_ENV !== 'development') {
    log = () => {} 
}

// initialize channel
channel(sockets);

// emits data to specific connection
function emit(connection, data) {
    connection.write(JSON.stringify(data));
}

// const for data types
const TYPE = {
    MSG: "MSG",
    JOIN: "JOIN",
    ERROR: "ERROR",
    LEAVE: "LEAVE",
    AUTH: "AUTH",
    SUCCESS: "SUCCESS"
};

// creates error object
function error(code) {
    let message;
    switch (code) {
        case 0:
            message = "INVALID REQUEST";
            break;
        case 1:
            message = "SESSION NOT VALIDATED";
            break;
        case 2:
            message = "INVALID SESSION";
            break;
        case 3:
            message = "SESSION NOT VALIDATED"
        default:
            message = "WHAT ARE YOU DOING?";
            break;
    }

    return {
        type: TYPE.ERROR,
        payload: {
            code,
            message
        }
    };
}

// creates action object
function createAction(type, payload) {
    return {
        type,
        payload
    };
}


// tells valid socket lengths
function getSocketsLength() {
    return Object.keys(sockets).length - freeSlot.length;
}

// register new connection
function connect(connection) {
    // if there is a free slot, assign
    // if not, create a new slot
    const freeId = freeSlot.shift();
    if(freeId) {
        connection.id = freeId;
    } else {
        connection.id = ++counter;
    }

    // store connection in sockets
    sockets[connection.id] = connection;
    connection.data = {
        username: null,
        channel: null,
        valid: false,
        anon: false,
        session: null
    };

    log(`Socket ${connection.id} Connected - ${getSocketsLength()}`);
}

function authenticate(connection, payload) {
    if (payload.anon) {
        const username = session.getAnon(payload.session, payload.channel);
        connection.data.username = username;
        connection.data.session = payload.session;
        connection.data.anon = true;
        connection.data.channel = payload.channel;
        connection.data.valid = true;
        emit(connection, createAction(TYPE.SUCCESS, { username }));

        // join to the channel
        const ch = channel.get(payload.channel);
        ch.push(connection.id);

        // multiple window
        if (ch.userCount(username) > 1) return;

        // broadcast that following user has joined
        ch.broadcast(createAction(TYPE.JOIN, {
            username
        }));
    } else {
        session.get(payload.session, (username) => {
            if (!username) {
                // username not found
                return emit(connection, error(2));
            }

            connection.data.username = username;
            connection.data.session = payload.session;
            connection.data.anon = false;
            connection.data.channel = payload.channel;
            connection.data.valid = true;
            emit(connection, createAction(TYPE.SUCCESS));

            // join to the channel
            const ch = channel.get(payload.channel)
            ch.push(connection.id);

            // multiple window
            if (ch.userCount(username) > 1) return;

            // broadcast that following user has joined
            ch.broadcast(createAction(TYPE.JOIN, {
                username
            }));
        });
    }
}

function message(connection, payload) {
    const ch = channel.get(connection.data.channel);
    ch.broadcast(createAction(TYPE.MSG,{
        username: connection.data.username,
        msg: payload.message
    }));
}


function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

function handleData(connection, data) {
    log(data);
    const o = tryParseJSON(data);

    // not an object
    if(!o) {
        return emit(connection, error(0));
    }

    // if session not valid, only accept JOIN
    if(!connection.data.valid && o.type !== TYPE.AUTH) {
        return emit(connection, error(1));
    }

    // validate request
    if(!validate(o)) {
        return emit(connection, error(0));
    }

    switch (o.type) {
        case TYPE.AUTH: 
            authenticate(connection, o.payload);
            break;
        case TYPE.MSG:
            message(connection, o.payload);
            break;
        default:
            emit(connection, error(0));
    }


}

// unregister lost connection
function disconnect(connection) {
    _.remove(sockets, (socket) => {
        return connection.id === socket.id
    });
    freeSlot.push(connection.id);
    log(`Socket ${connection.id} Disconnected - ${getSocketsLength()}`);
}



echo.on('connection', connection => {
    connect(connection);

    connection.on('data', data => {
        handleData(connection, data);
    });

    connection.on('close', data => {
        if(connection.data.valid) {
            // handle user leave
            const ch = channel.get(connection.data.channel);
            ch.remove(connection.id);
            if(!ch.userCount(connection.data.username)) {
                ch.broadcast(createAction(
                    TYPE.LEAVE,
                    {
                        username: connection.data.username
                    }
                ));
            }
        }
        disconnect(connection);
    });
});

export default echo;