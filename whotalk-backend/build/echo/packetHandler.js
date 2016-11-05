'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = packetHandler;

var _packetTypes = require('./packetTypes');

var _helper = require('./helper');

var helper = _interopRequireWildcard(_helper);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const service = {
    enter: (connection, payload) => {
        // get the channel (creates one if does not exist)
        const ch = _channel2.default.get(payload.channel);
        ch.push(connection.id);

        connection.data.channel = payload.channel;

        helper.emit(connection, helper.createAction(_packetTypes.server.SUCCESS.ENTER));
    },

    auth: (connection, payload) => {
        var ch, username;
        return _regenerator2.default.async(function auth$(_context) {
            while (1) switch (_context.prev = _context.next) {
                case 0:
                    ch = _channel2.default.get(connection.data.channel);

                    // anonymous identity

                    if (!payload.anonymous) {
                        _context.next = 6;
                        break;
                    }

                    connection.data.username = _session2.default.getAnonymousName(payload.sessionID, connection.data.channel);
                    connection.data.anonymous = true;
                    _context.next = 13;
                    break;

                case 6:
                    _context.next = 8;
                    return _regenerator2.default.awrap(_session2.default.get(payload.sessionID));

                case 8:
                    username = _context.sent;

                    if (username) {
                        _context.next = 11;
                        break;
                    }

                    return _context.abrupt('return', helper.emit(connection, (0, _error2.default)(2, _packetTypes.client.AUTH)));

                case 11:

                    connection.data.username = username;
                    connection.data.anonymous = false;

                case 13:

                    connection.data.sessionID = payload.sessionID;
                    connection.data.valid = true;
                    ch.validate(connection.id);

                    helper.emit(connection, helper.createAction(_packetTypes.server.SUCCESS.AUTH, { username: connection.data.username }));

                    // handles multiple window

                    if (!(ch.countUser(connection.data.username) !== 1)) {
                        _context.next = 19;
                        break;
                    }

                    return _context.abrupt('return');

                case 19:

                    // broadcast that user has joined
                    ch.broadcast(helper.createAction(_packetTypes.server.JOIN, {
                        anonymous: connection.data.anonymous,
                        username: connection.data.username,
                        date: new Date().getTime(),
                        suID: helper.generateUID()
                    }));

                case 20:
                case 'end':
                    return _context.stop();
            }
        }, null, undefined);
    },

    message: (connection, payload) => {
        // check session validity
        if (!connection.data.valid) {
            return helper.emit(connection, (0, _error2.default)(1, _packetTypes.client.MSG));
        }

        if (connection.data.counter > 10) {
            connection.data.counter = 20;
            setTimeout(() => {
                connection.data.counter = 0;
            }, 5000);
            return helper.emit(connection, (0, _error2.default)(3));
        }

        chatCount(connection);
        const ch = _channel2.default.get(connection.data.channel);

        setTimeout(() => {
            ch.broadcast(helper.createAction(_packetTypes.server.MSG, {
                anonymous: connection.data.anonymous,
                username: connection.data.username,
                message: payload.message,
                date: new Date().getTime(),
                uID: payload.uID,
                suID: helper.generateUID()
            }));
        }, Math.floor(Math.random() * 300));

        // ch.broadcast(helper.createAction(SEND.MSG, {
        //     anonymous: connection.data.anonymous,
        //     username: connection.data.username,
        //     message: payload.message,
        //     date: (new Date()).getTime(),
        //     uID: payload.uID,
        //     suID: helper.generateUID()
        // }));

        // if(payload.message === '/test') {
        //     let i = 0;
        //     const spam = () => {
        //         if(i>100) {
        //             return;
        //         }
        //         ch.broadcast(helper.createAction(SEND.MSG, {
        //             anonymous: connection.data.anonymous,
        //             username: "tester",
        //             message: i + "",
        //             date: (new Date()).getTime(),
        //             uID: payload.uID,
        //             suID: helper.generateUID()
        //         }));
        //         i++;
        //         setTimeout(spam, Math.floor(Math.random()*500));
        //     }
        //     spam();
        // }
    }
};

function packetHandler(connection, packet) {

    // log the packet (only in dev mode)
    if (process.env.NODE_ENV === 'development') {
        helper.log(packet);
    }

    const o = helper.tryParseJSON(packet);

    if (!o) {
        // INVALID REQUEST
        return helper.emit(connection, (0, _error2.default)(0));
    }

    // validate request
    if (!(0, _validate2.default)(o)) {
        return helper.emit(connection, (0, _error2.default)(0));
    }

    switch (o.type) {
        case _packetTypes.client.ENTER:
            service.enter(connection, o.payload);
            break;
        case _packetTypes.client.AUTH:
            service.auth(connection, o.payload);
            break;
        case _packetTypes.client.MSG:
            service.message(connection, o.payload);
            break;
        default:
            helper.emit(connection, (0, _error2.default)(0));
    }
}

function chatCount(connection) {
    connection.data.counter++;
    console.log(connection.data.counter);
    setTimeout(() => {
        connection.data.counter--;
        if (connection.data.counter < 0) {
            connection.data.counter = 0;
        }
    }, 5000);
}