import sockjs from 'sockjs';
import channel from './channel';
import packetHandler from './packetHandler';

import sockets, { connect, disconnect } from './sockets';

import * as helper from './helper';
import { server as SEND } from './packetTypes';


// initialize server
const options = { sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' };
const echo = sockjs.createServer(options);



// initialize channel
channel(sockets);

echo.on('connection', connection => {
    connect(connection);

    connection.on('data', data => {
        packetHandler(connection, data);
    });

    connection.on('close', data => {
        const ch = channel.get(connection.data.channel);
        ch.remove(connection.id);

        if(connection.data.valid) {
            // handle user leave
            if(!ch.countUser(connection.data.username)) {
                ch.broadcast(helper.createAction(
                    SEND.LEAVE,
                    {
                        username: connection.data.username
                    }
                ));
            }
        }
        
        disconnect(connection);
    });
});

// function authenticate(connection, payload) {
//     if (payload.anon) {
//         const username = session.getAnon(payload.session, payload.channel);
//         connection.data.username = username;
//         connection.data.session = payload.session;
//         connection.data.anon = true;
//         connection.data.channel = payload.channel;
//         connection.data.valid = true;
//         emit(connection, createAction(TYPE.SUCCESS, { username }));

//         // join to the channel
//         const ch = channel.get(payload.channel);
//         ch.push(connection.id);

//         // multiple window
//         if (ch.userCount(username) > 1) return;

//         // broadcast that following user has joined
//         ch.broadcast(createAction(TYPE.JOIN, {
//             username
//         }));
//     } else {
//         session.get(payload.session, (username) => {
//             if (!username) {
//                 // username not found
//                 return emit(connection, error(2));
//             }

//             connection.data.username = username;
//             connection.data.session = payload.session;
//             connection.data.anon = false;
//             connection.data.channel = payload.channel;
//             connection.data.valid = true;
//             emit(connection, createAction(TYPE.SUCCESS));

//             // join to the channel
//             const ch = channel.get(payload.channel)
//             ch.push(connection.id);

//             // multiple window
//             if (ch.userCount(username) > 1) return;

//             // broadcast that following user has joined
//             ch.broadcast(createAction(TYPE.JOIN, {
//                 username
//             }));
//         });
//     }
// }

// function message(connection, payload) {
//     const ch = channel.get(connection.data.channel);
//     ch.broadcast(createAction(TYPE.MSG,{
//         username: connection.data.username,
//         msg: payload.message
//     }));
// }




// function handleData(connection, data) {
//     log(data);
//     const o = tryParseJSON(data);

//     // not an object
//     if(!o) {
//         return emit(connection, error(0));
//     }

//     // if session not valid, only accept JOIN
//     if(!connection.data.valid && o.type !== TYPE.AUTH) {
//         return emit(connection, error(1));
//     }

//     // validate request
//     if(!validate(o)) {
//         return emit(connection, error(0));
//     }

//     switch (o.type) {
//         case TYPE.AUTH: 
//             authenticate(connection, o.payload);
//             break;
//         case TYPE.MSG:
//             message(connection, o.payload);
//             break;
//         default:
//             emit(connection, error(0));
//     }


// }



export default echo;