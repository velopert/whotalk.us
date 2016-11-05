'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = error;

var _packetTypes = require('./packetTypes');

// creates error object
function error(code, type = 'DEFAULT') {
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
            message = "TOO MANY MESSAGES";
            break;
        default:
            message = "WHAT ARE YOU DOING?";
            break;
    }

    return {
        type: _packetTypes.server.ERROR,
        payload: {
            code,
            message,
            errType: type
        }
    };
}