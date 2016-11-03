import {client as RECEIVE, server as SEND} from './packetTypes';
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

    auth: async (connection, payload) => {
        const ch = channel.get(connection.data.channel);

        // anonymous identity
        if (payload.anonymous) {
            connection.data.username = session.getAnonymousName(payload.sessionID, connection.data.channel);
            connection.data.anonymous = true;
        } else {
            const username = await session.get(payload.sessionID)
            if (!username) {
                // username not found
                return helper.emit(connection, error(2, RECEIVE.AUTH));
            }

            connection.data.username = username;
            connection.data.anonymous = false;
        }

        connection.data.sessionID = payload.sessionID;
        connection.data.valid = true;
        ch.validate(connection.id);

        helper.emit(connection, helper.createAction(SEND.SUCCESS.AUTH, {username: connection.data.username}));

        // handles multiple window
        if (ch.countUser(connection.data.username) !== 1) {
            return;
        }

        // broadcast that user has joined
        ch.broadcast(helper.createAction(SEND.JOIN, {
            anonymous: connection.data.anonymous,
            username: connection.data.username,
            date: (new Date()).getTime(),
            suID: helper.generateUID()
        }));
    },

    message: (connection, payload) => {
        // check session validity
        if (!connection.data.valid) {
            return helper.emit(connection, error(1, RECEIVE.MSG));
        }

        

        // if(connection.data.counter > 10) {
        //     connection.data.counter = 20;
        //     setTimeout(()=>{
        //         connection.data.counter = 0;
        //     }, 5000);
        //     return helper.emit(connection, error(3));
        // }

        chatCount(connection);
        const ch = channel.get(connection.data.channel);
        
        // setTimeout(
        //     () => {
        //         ch.broadcast(helper.createAction(SEND.MSG, {
        //             anonymous: connection.data.anonymous,
        //             username: connection.data.username,
        //             message: payload.message,
        //             date: (new Date()).getTime(),
        //             uID: payload.uID,
        //             suID: helper.generateUID()
        //         }));
        //     },  Math.floor(Math.random()*1500)
        // );

        ch.broadcast(helper.createAction(SEND.MSG, {
            anonymous: connection.data.anonymous,
            username: connection.data.username,
            message: payload.message,
            date: (new Date()).getTime(),
            uID: payload.uID,
            suID: helper.generateUID()
        }));

        if(payload.message === '/test') {
            let i = 0;
            const spam = () => {
                if(i>100) {
                    return;
                }
                ch.broadcast(helper.createAction(SEND.MSG, {
                    anonymous: connection.data.anonymous,
                    username: "tester",
                    message: i + "",
                    date: (new Date()).getTime(),
                    uID: payload.uID,
                    suID: helper.generateUID()
                }));
                i++;
                setTimeout(spam, Math.floor(Math.random()*500));
            }
            spam();
        }

    }
}

export default function packetHandler(connection, packet) {

    // log the packet (only in dev mode)
    if (process.env.NODE_ENV === 'development') {
        helper.log(packet);
    }

    const o = helper.tryParseJSON(packet);

    if (!o) {
        // INVALID REQUEST
        return helper.emit(connection, error(0));
    }

    // validate request
    if (!validate(o)) {
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


function chatCount(connection) {
    connection.data.counter++;
    console.log(connection.data.counter);
    setTimeout(() => {
        connection.data.counter--;
        if(connection.data.counter < 0) {
            connection.data.counter = 0;
        }
    }, 5000)
}