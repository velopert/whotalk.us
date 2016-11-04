import {client as SEND, server as RECEIVE} from './packetTypes';
import store from 'store';
import * as channel from 'actions/channel';
import notify from 'helpers/notify';
import * as helper from './helper';
import worker from './worker';

const setSocketState = (payload) => {
    store.dispatch(channel.setSocketState(payload));
};

const receiveRealtimeData = (payload) => {
    // store.dispatch(channel.receiveRealtimeData(payload));
    worker.assign(payload);
};

const service = {
    success: {
        enter: () => {
            setSocketState({enter: true});
        },
        auth: (packet) => {
            setSocketState({auth: true, username: packet.payload.username});
            if (store.getState().channel.chat.identity === 'anonymous') {
                notify({type: 'success', message: `Your ID is <b>${packet.payload.username}</b>`})
            }
        }
    },

    error: (packet) => {
        switch (packet.payload.code) {
            case 0:
                notify({type: 'error', message: 'Invalid request'});
                break;
            case 1:
                notify({type: 'error', message: 'You have to select your identity before you talk.'});
                break;
            case 2:
                notify({type: 'error', message: 'Your session is invalid, try refreshing the page.'});
                setSocketState({auth: false});
                break;
            case 3:
                notify({type: 'warning', message: 'Too many messages! Please slow down...'});
                if(store.getState().channel.chat.socket.controlled) break;
                setSocketState({controlled: true});
                setTimeout(
                    () => {
                        setSocketState({controlled: false});
                    }, 5000
                );
                break;
            default:
        }
    },

    join: (packet) => {
        receiveRealtimeData(packet);
    },

    message: (packet) => {
        receiveRealtimeData(packet);
    },

    leave: (packet) => {
        receiveRealtimeData(packet);
    }
}

export default function packetHandler(packet) {
    const o = helper.tryParseJSON(packet);
    if (!o) {
        return console.error('[SOCKET] Received invalid response from server');
    }

    switch (o.type) {
        case RECEIVE.SUCCESS.ENTER:
            service
                .success
                .enter();
            break;
        case RECEIVE.SUCCESS.AUTH:
            service
                .success
                .auth(o);
            break;
        case RECEIVE.ERROR:
            service.error(o);
            break;
        case RECEIVE.JOIN:
            service.join(o);
            break;
        case RECEIVE.MSG:
            service.message(o);
            break;
        case RECEIVE.LEAVE:
            service.leave(o);
            break;

        default:
            console.error('[SOCKET] Received invalid response from server');
    }
}