import _ from 'lodash';
import {log} from './helper';
import channel from './channel';
import * as helper from './helper';
import { server as SEND } from './packetTypes';

let counter = 0;
let freeSlot = [];
const sockets = {};

// tells valid socket lengths
function getSocketsLength() {
    return Object
        .keys(sockets)
        .length - freeSlot.length;
}

// register new connection
export function connect(connection) {
    // if there is a free slot, assign if not, create a new slot
    const freeId = freeSlot.shift();
    if (freeId) {
        connection.id = freeId;
    } else {
        connection.id = ++counter;
    }

    // store connection in sockets
    sockets[connection.id] = connection;
    connection.data = {
        username: null,
        channel: null,
        sessionID: null,
        valid: false,
        counter: 0
    };

    // const test = () => {     connection.write('you alive');     setTimeout(test,
    // 1000); } test();

    log(`Socket ${connection.id} Connected - ${getSocketsLength()}`);
}

// unregister lost connection
export function disconnect(connection) {

    const ch = channel.get(connection.data.channel);
    if(ch) {
        ch.remove(connection.id);
        if (connection.data.valid) {
            if (!ch.countUser(connection.data.username)) {
                ch.broadcast(helper.createAction(SEND.LEAVE, {
                    date: (new Date()).getTime(),
                    suID: helper.generateUID(),
                    username: connection.data.username,
                    anonymous: connection.data.anonymous
                }));
            }
        }
    }

    _.remove(sockets, (socket) => {
        return connection.id === socket.id
    });

    freeSlot.push(connection.id);
    log(`Socket ${connection.id} Disconnected - ${getSocketsLength()}`);
}

export default sockets;
