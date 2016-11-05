'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _schemaInspector = require('schema-inspector');

var _schemaInspector2 = _interopRequireDefault(_schemaInspector);

var _packetTypes = require('./packetTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const actionSchema = {
    type: 'object',
    properties: {
        type: { type: 'string', pattern: /(ENTER|AUTH|MSG)$/ },
        payload: { type: 'object' }
    }
};

const schema = {
    enter: {
        channel: { type: 'string', minLength: 1 }
    },
    auth: {
        sessionID: { type: 'string', minLength: 1 },
        anonymous: { type: 'boolean' }
    },
    message: {
        message: { type: 'string', minLength: 1 },
        uID: { type: 'string', exactLength: 11 }
    }
};

function validate(action) {
    // validate action schema
    if (!_schemaInspector2.default.validate(actionSchema, action).valid) {
        return false;
    }

    const payloadSchema = {
        type: 'object'
    };

    switch (action.type) {
        case _packetTypes.client.ENTER:
            payloadSchema.properties = schema.join;
            break;

        case _packetTypes.client.AUTH:
            payloadSchema.properties = schema.auth;
            break;

        case _packetTypes.client.MSG:
            payloadSchema.properties = schema.message;
            break;

        default:
            return false;
    }

    return _schemaInspector2.default.validate(payloadSchema, action.payload).valid;
}

exports.default = validate;