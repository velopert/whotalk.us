'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

var _packetTypes = require('./packetTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let intervalId = null;
let socket = null;

const rl = _readline2.default.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
    return new Promise(resolve => {
        rl.question("[CLIENT] " + question + '\n', answer => {
            resolve(answer);
        });
    });
}

function generateUID() {
    return new Date().valueOf().toString(36) + ("000" + (Math.random() * Math.pow(36, 3) << 0).toString(36)).slice(-3);
}

// creates action object
function createAction(type, payload) {
    return { type, payload };
}

// creates action object
function send(data) {
    socket.send(JSON.stringify(data));
}

function start() {
    var channel, sessionID, anonymous;
    return _regenerator2.default.async(function start$(_context) {
        while (1) switch (_context.prev = _context.next) {
            case 0:
                _context.next = 2;
                return _regenerator2.default.awrap(ask("Channel?"));

            case 2:
                channel = _context.sent;

                send(createAction(_packetTypes.client.ENTER, { channel }));

                sessionID = new Date().toString(); //"dHkxl0zudajC19164Yqx2lQTJC94LEcN";

                _context.next = 7;
                return _regenerator2.default.awrap(ask("Anonymous? y/n"));

            case 7:
                anonymous = _context.sent;

                if (anonymous === 'y') {
                    send(createAction(_packetTypes.client.AUTH, {
                        sessionID,
                        anonymous: true
                    }));
                }

            case 9:
            case 'end':
                return _context.stop();
        }
    }, null, this);
}

// async function setUsername() {     if (!username) {         const name =
// await ask("[Client] What is your username?");         username = name;     }
//    if (!channel) {         const c = await ask("[Client] Type channel name to
// join");         channel = c;     }     socket.send(createAction('JOIN', {
// username, channel })); }

function authenticate(session) {
    // later-fix: should get the req.sessionID instead of data const data = new
    // Date();

}

const initConnection = () => {
    socket = new _sockjsClient2.default("http://localhost:3000/echo");
    clearInterval(intervalId);
    socket.onopen = function () {
        console.log('connected');
        start();
    };
    socket.onmessage = function (e) {
        console.log(e.data);
    };
    socket.onclose = function () {
        socket = null;
        console.log("disconnected, reconnecting..");
        intervalId = setInterval(function () {
            initConnection();
        }, 2000);
    };
};

initConnection();

// const sock = new SockJS("http://localhost:4000/echo");  sock.onopen =
// function() {      console.log('connected');  };  sock.onmessage = function(e)
// {      console.log('message', e.data);  };  sock.onclose = function() {
// console.log('close');  }; async function initialize() {     const name =
// await ask("[Client] What is your username?");     console.log("[Client]
// Welcome, " + name); }

rl.setPrompt('');
rl.prompt();

rl.on('line', function (line) {
    // const token = l.split(" "); if (token.length === 0) {
    // console.log('Invalid Request');     rl.prompt();     return; } const text =
    // l.substring(4, l.length); switch (token[0]) {     case 'say':
    // send(createAction(TYPE.MSG, {             message: text         }));
    // break;     case 'send':         socket.send(text);         break;
    // default:         console.log('Invalid Request');         break; }
    send(createAction(_packetTypes.client.MSG, {
        message: line,
        uID: generateUID()
    }));

    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});