import sockjs from 'sockjs';
import _ from 'lodash';
import channel from './channel';

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
    AUTH: "AUTH"
};

// creates error object
function error(code) {
    let message;
    switch (code) {
        case 0:
            message = "INVALID REQUEST";
            break;
        case 1:
            message = "USERNAME NOT DEFINED";
            break;
        case 2:
            message = "USERNAME ALREADY DEFINED";
            break;
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
        valid: false
    }

    log(`Socket ${connection.id} Connected - ${getSocketsLength()}`);
}

function handleData(connection, data) {
    log(JSON.stringify(data));
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

    connect.on('data', data => {
        handleData(connection, data);
    });

    connect.on('close', data => {
        disconnect(connection);
    });
});

export default echo;
