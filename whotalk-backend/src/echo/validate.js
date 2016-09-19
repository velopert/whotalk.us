import inspector from 'schema-inspector';

const TYPE = {
    MSG: "MSG",
    JOIN: "JOIN",
    ERROR: "ERROR",
    LEAVE: "LEAVE",
    AUTH: "AUTH"
};

const actionSchema = {
    type: 'object',
    properties: {
        type: { type: 'string', pattern: /(MSG|JOIN|ERROR|LEAVE|AUTH)$/ },
        payload: { type: 'object' }
    }
}

const authSchema = {
    session: { type: 'string', minLength: 1 },
    channel: { type: 'string', minLength: 1 },
    anon: { type: 'boolean' }
};

const messageSchema = {
    message: { type: 'string', minLength: 1 }
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
        case TYPE.AUTH:
            payloadSchema.properties = authSchema;
            break;
        case TYPE.MSG:
            payloadSchema.properties = messageSchema;
            break;
        default:
            return false;
    }

     return inspector.validate(payloadSchema, action.payload).valid;
}

export default validate;
