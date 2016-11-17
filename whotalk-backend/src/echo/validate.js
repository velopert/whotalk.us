import inspector from 'schema-inspector';

import { client as RECEIVE } from './packetTypes';

const actionSchema = {
    type: 'object',
    properties: {
        type: { type: 'string', pattern: /(ENTER|AUTH|MSG)$/ },
        payload: { type: 'object' }
    }
}

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
        uID: { type: 'string' }
    }
}


function validate(action) {
    // validate action schema
    if(!inspector.validate(actionSchema, action).valid) {
        return false;
    }

    const payloadSchema = {
        type: 'object',
    };

    switch(action.type) {
        case RECEIVE.ENTER:
            payloadSchema.properties = schema.join;
            break;
        
        case RECEIVE.AUTH:
            payloadSchema.properties = schema.auth;
            break;

        case RECEIVE.MSG:
            payloadSchema.properties = schema.message;
            break;

        default:
            return false;
    }

     return inspector.validate(payloadSchema, action.payload).valid;
}

export default validate;
