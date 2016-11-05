'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sockjs = require('sockjs');

var _sockjs2 = _interopRequireDefault(_sockjs);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _packetHandler = require('./packetHandler');

var _packetHandler2 = _interopRequireDefault(_packetHandler);

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize server
const options = { sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' };
const echo = _sockjs2.default.createServer(options);

// initialize channel
(0, _channel2.default)(_sockets2.default);

echo.on('connection', connection => {
    (0, _sockets.connect)(connection);

    connection.on('data', data => {
        (0, _packetHandler2.default)(connection, data);
    });

    connection.on('close', data => {
        (0, _sockets.disconnect)(connection);
    });
});

exports.default = echo;