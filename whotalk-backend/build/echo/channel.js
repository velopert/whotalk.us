'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _message = require('./../models/message.js');

var _message2 = _interopRequireDefault(_message);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let sockets = null;
const channels = {};


function emit(connection, data) {
    connection.write(JSON.stringify(data));
}

function Channel(name) {
    this.name = name;
    this.users = []; // stores userId
    this.usernames = {}; // stores username

    // adds userId
    this.push = userId => {
        this.users.push(userId);

        // // handles multiple window
        // if(!this.usernames[sockets[userId].data.username]){
        //     this.usernames[sockets[userId].data.username] = 1;
        // } else {
        //     this.usernames[sockets[userId].data.username]++;
        // }
    };

    this.validate = userId => {
        // handles multiple window
        if (!this.usernames[sockets[userId].data.username]) {
            this.usernames[sockets[userId].data.username] = 1;
        } else {
            this.usernames[sockets[userId].data.username]++;
        }
    };

    // removes userId
    this.remove = userId => {
        // handles multiple window
        if (sockets[userId].data.valid) {
            if (this.usernames[sockets[userId].data.username] !== 1) {
                this.usernames[sockets[userId].data.username]--;
            } else {
                delete this.usernames[sockets[userId].data.username];
            }
        }

        _lodash2.default.remove(this.users, n => {
            return n === userId;
        });

        if (this.users.length === 0) {
            channel.remove(this.name);
        }
    };

    //broadcast the data to this Channel
    this.broadcast = data => {
        var i;
        return _regenerator2.default.async(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
                case 0:
                    for (i = 0; i < this.users.length; i++) {
                        emit(sockets[this.users[i]], data);
                    }

                    //({suID, type, channel, anonymous, username, message}
                    _context.next = 3;
                    return _regenerator2.default.awrap(_message2.default.write({
                        suID: data.payload.suID,
                        type: data.type,
                        channel: this.name,
                        anonymous: data.payload.anonymous,
                        username: data.payload.username,
                        message: data.payload.message
                    }));

                case 3:
                case 'end':
                    return _context.stop();
            }
        }, null, this);
    };

    this.countUser = username => {
        return this.usernames[username];
    };
}

function channel(_sockets) {
    sockets = _sockets;
}

channel.create = name => {
    channels[name] = new Channel(name);
    (0, _helper.log)(name + ' channel is created');
    (0, _helper.log)(Object.keys(channels).length + ' channels alive');
};

channel.remove = name => {
    delete channels[name];
    (0, _helper.log)(name + ' channel is dying..');
    (0, _helper.log)(Object.keys(channels).length + ' channels alive');
};

channel.get = name => {
    if (!channels[name]) {
        //create one if not existing
        channel.create(name);
    }
    return channels[name];
};

exports.default = channel;