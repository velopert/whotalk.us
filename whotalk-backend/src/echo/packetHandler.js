import { client as RECEIVE, server as SEND } from './packetTypes';
import * as helper from './helper';
import error from './error';
import validate from './validate';
import channel from './channel';
import session from './session';


const service = {
    enter: (connection, payload) => {
        // get the channel (creates one if does not exist)
        const ch = channel.get(payload.channel);
        ch.push(connection.id);
        
        connection.data.channel = payload.channel;

        helper.emit(connection, helper.createAction(SEND.SUCCESS.ENTER));
    },

    auth: (connection, payload) => {
        const ch = channel.get(connection.data.channel);

        // anonymous identity
        if(payload.anonymous) {
            connection.data.username = session.getAnonymousName(payload.sessionID, connection.data.channel);
            connection.data.sessionID = payload.sessionID;
            connection.data.anonymous = true;
            connection.data.valid = true;
            
            ch.validate(connection.id);

            helper.emit(connection, helper.createAction(
                SEND.SUCCESS.AUTH, {
                    username: connection.data.username
                }
            ));
            
            // handles multiple window
            if (ch.countUser(connection.data.username) !== 1) {
                return;
            }

            // broadcast that user has joined
            ch.broadcast(helper.createAction(SEND.JOIN, {
                username: connection.data.username,
                date: (new Date()).getTime()
            }));

        }
    },

    message: (connection, payload) => {
        // check session validity
        if(!connection.data.valid) {
            return helper.emit(connection, error(1));
        }

        const ch = channel.get(connection.data.channel);
        ch.broadcast(helper.createAction(SEND.MSG, {
            username: connection.data.username,
            message: payload.message,
            uID: payload.uID,
            suID: helper.generateUID()
        }));

    }
}







export default function packetHandler(connection, packet) {

    // log the packet (only in dev mode)
    if(process.env.NODE_ENV === 'development') {
        helper.log(packet);
    }

    const o = helper.tryParseJSON(packet);

    if(!o) {
        // INVALID REQUEST
        return helper.emit(connection, error(0));
    }

    // validate request
    if(!validate(o)) {
        return helper.emit(connection, error(0));
    }

    switch (o.type) {
        case RECEIVE.ENTER:
            service.enter(connection, o.payload);
            break;
        case RECEIVE.AUTH:
            service.auth(connection, o.payload);
            break;
        case RECEIVE.MSG: 
            service.message(connection, o.payload);
            break;
        default:
            helper.emit(connection, error(0));
    }


}