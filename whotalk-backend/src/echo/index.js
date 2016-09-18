import Echo from './Echo';

import sockjs from 'sockjs';
import _ from 'lodash';

/* initialize sockjs server*/
const options = { sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' };
const echo = sockjs.createServer(options);

const sockets = {};
let data = {};
let socketCounter = 0;
let freeSlot = [];

const MSG = "MSG";
const JOIN = "JOIN";
const ERROR = "ERROR";
const LETT = "LEFT";


// send only to a socket
function sendTo(id, data) {
    sockets[id].write(JSON.stringify(data));
}

// broadcasts the data to every socket
function broadcast(id, data) {
    if (data.type === ERROR) {
        return sendTo(id, data);
    }

    for (let socket in sockets) {
        sockets[socket].write(JSON.stringify(data));
    }
}

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
        type: ERROR,
        code,
        message
    };

}

function createMessage(id, message) {

    // check whether it has a username
    if (!sockets[id].data.username) {
        return error(1);
    }

    // check message validity
    if (!message || message === "") {
        return error(0);
    }

    return {
        type: "MSG",
        username: sockets[id].data.username,
        message
    };
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

// handles data
function handleData(conn, data) {
    // check whether it's an object

    const o = tryParseJSON(data);

    if (typeof o !== "object") {
        return sendTo(conn.id, error(0));
    } 

    // check whether the type is good
    const re = /(MSG|JOIN)$/;
    if (!re.test(o.type)) {
        return sendTo(conn.id, error(0));
    }

    switch (o.type) {
        case MSG:
            //broadcast the message
            broadcast(conn.id, createMessage(conn.id, o.message));
            break;
        case JOIN:
            //if the user has username already, error
            if (conn.data.username) {
                sendTo(conn.id, error(2));
                break;
            }
            // wrong username
            if(!o.username || o.username==="") {
                sendTo(conn.id, error(0));
                break;
            }

            conn.data.username = o.username;

            // broadcast it
            broadcast(conn.id, o);
            break;
        default:
            sendTo(conn.id, error(0));
    }

}

echo.on('connection', function (conn) {

    // if there is a free slot, assign.
    // or else, create a new slot
    const freeId = freeSlot.shift();
    if (freeId) {
        conn.id = freeId;
    } else {
        conn.id = ++socketCounter;
    }

    // setting up sockets 
    sockets[conn.id] = conn;
    conn.data = {
        username: null
    };

    console.log(`[SOCKET] Socket ${conn.id} Connected [${Object.keys(sockets).length - freeSlot.length}]`);

    conn.on('data', function (data) {
        handleData(conn, data);
    });

    conn.on('close', function (data) {
        _.remove(sockets, function (sock) {
            return conn.id === sock.id;
        });

        freeSlot.push(conn.id);

        console.log(`[SOCKET] Socket ${conn.id} Disconnected [${Object.keys(sockets).length - freeSlot.length}]`);
    });

});

export default echo;
