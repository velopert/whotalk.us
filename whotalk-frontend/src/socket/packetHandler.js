import {client as SEND, server as RECEIVE} from './packetTypes';
import store from 'store';
import * as channel from 'actions/channel';
import notify from 'helpers/notify';
import * as helper from './helper';
import worker from './worker';
import { prepareMessages } from 'locale/helper';


let _intl = false;

const messages = prepareMessages({
    "Chat.notify.invalidReq": "Invalid Request",
    "Chat.notify.selectIdentity": "You have to select your identity before you talk.",
    "Chat.notify.invalidSession": "Your session is invalid, try refreshing the page.",
    "Chat.notify.tooMany": "Too many messages! Please slow down...",
    "Chat.notify.anonySuccess":"Your ID is <b>{name}</b>"
})


const setSocketState = (payload) => {
    store.dispatch(channel.setSocketState(payload));
};

const setInitialOnlineList = (list) => {
    store.dispatch(channel.setInitialOnlineList(list));
}

const addOnlineUser = (user) => {
    store.dispatch(channel.addOnlineUser(user));
}

const removeOnlineUser = (username) => {
    store.dispatch(channel.removeOnlineUser(username));
}



const receiveRealtimeData = (payload) => {
    // store.dispatch(channel.receiveRealtimeData(payload));
    worker.assign(payload);
};

const service = {
    success: {
        enter: (packet) => {
            setSocketState({enter: true});
            setInitialOnlineList(packet.payload.userList);
        },
        auth: (packet) => {
            setSocketState({auth: true, username: packet.payload.username});
            if (store.getState().channel.chat.identity === 'anonymous') {
                notify({type: 'success', message: _intl.formatHTMLMessage(messages.anonySuccess, {name: packet.payload.username})})
            }
        }
    },

    error: (packet) => {
        switch (packet.payload.code) {
            case 0:
                notify({type: 'error', message: _intl.formatMessage(messages.invalidReq)});
                break;
            case 1:
                notify({type: 'error', message: _intl.formatMessage(messages.selectIdentity)});
                break;
            case 2:
                notify({type: 'error', message: _intl.formatMessage(messages.invalidSession)});
                setSocketState({auth: false});
                break;
            case 3:
                notify({type: 'warning', message: _intl.formatMessage(messages.tooMany)});
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
        addOnlineUser({
            username: packet.payload.username,
            anonymous: packet.payload.anonymous
        });
    },

    message: (packet) => {
        receiveRealtimeData(packet);
    },

    leave: (packet) => {
        receiveRealtimeData(packet);
        removeOnlineUser(packet.payload.username);
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
                .enter(o);
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

packetHandler.configure = (intl) => {
    _intl = intl;
}