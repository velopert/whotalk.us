import {client as SEND, server as RECEIVE} from './packetTypes';
import store from 'store';
import * as channel from 'actions/channel';
import notify from 'helpers/notify';
import * as helper from './helper';

const setSocketState = (payload) => {
    store.dispatch(channel.setSocketState(payload));
};

const receiveRealtimeData = (payload) => {
    store.dispatch(channel.receiveRealtimeData(payload));
};

const service = {
    success: {
        enter: () => {
            setSocketState({enter: true});
        },
        auth: (payload) => {
            setSocketState({auth: true, username: payload.username});
            if (store.getState().channel.chat.identity === 'anonymous') {
                notify({type: 'success', message: `Your ID is <b>${payload.username}</b>`})
            }
        }
    },

    error: (payload) => {
        switch (payload.code) {
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
            default:
        }
    },

    join: (payload) => {
        receiveRealtimeData(payload);
    },

    message: (payload) => {
        receiveRealtimeData(payload);
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
                .auth(o.payload);
            break;
        case RECEIVE.JOIN:
            service.join(o.payload);
            break;
        case RECEIVE.MSG:
            service.message(o.payload);
            break;

        default:
            console.error('[SOCKET] Received invalid response from server');
    }
}