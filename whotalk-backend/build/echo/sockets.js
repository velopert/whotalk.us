'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = connect;
exports.disconnect = disconnect;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helper = require('./helper');

var helper = _interopRequireWildcard(_helper);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _packetTypes = require('./packetTypes');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let counter = 0;
let freeSlot = [];
const sockets = {};

// tells valid socket lengths
function getSocketsLength() {
    return Object.keys(sockets).length - freeSlot.length;
}

// register new connection
function connect(connection) {
    // if there is a free slot, assign if not, create a new slot
    const freeId = freeSlot.shift();
    if (freeId) {
        connection.id = freeId;
    } else {
        connection.id = ++counter;
    }

    // store connection in sockets
    sockets[connection.id] = connection;
    connection.data = {
        username: null,
        channel: null,
        sessionID: null,
        valid: false,
        counter: 0
    };

    // const test = () => {     connection.write('you alive');     setTimeout(test,
    // 1000); } test();

    (0, _helper.log)(`Socket ${ connection.id } Connected - ${ getSocketsLength() }`);
}

// unregister lost connection
function disconnect(connection) {

    const ch = _channel2.default.get(connection.data.channel);
    if (ch) {
        ch.remove(connection.id);
        if (connection.data.valid) {
            if (!ch.countUser(connection.data.username)) {
                ch.broadcast(helper.createAction(_packetTypes.server.LEAVE, {
                    date: new Date().getTime(),
                    suID: helper.generateUID(),
                    username: connection.data.username,
                    anonymous: connection.data.anonymous
                }));
            }
        }
    }

    _lodash2.default.remove(sockets, socket => {
        return connection.id === socket.id;
    });

    freeSlot.push(connection.id);
    (0, _helper.log)(`Socket ${ connection.id } Disconnected - ${ getSocketsLength() }`);
}

exports.default = sockets;