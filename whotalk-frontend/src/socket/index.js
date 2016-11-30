import SockJS from 'sockjs-client';
import store from 'store';
import sender from './packetSender';
import handler from './packetHandler';
import * as helper from './helper';
import notify from 'helpers/notify';
import worker from './worker';
import { prepareMessages } from 'locale/helper';


let intervalId = null;
let socket = null;
let closing = false;
let reconnected = false;
let _intl = null;

const messages = prepareMessages({
    "Chat.notify.reconnect": "Reconnected successfully",
    "Chat.notify.disconnect": "Disconnected from server. Reconnecting..."
})

export const configure = (intl) => {
    _intl = intl;
    handler.configure(intl);
}


export const init = () => {    
    socket = new SockJS("/echo");
    clearInterval(intervalId);
    socket.onopen = function () {
        closing = false;
        console.log('connected');
        worker.start();
        sender.enter(store.getState().channel.info.username);
        if(reconnected) {
            notify({type: 'success', message: _intl.formatMessage(messages.reconnect)})
            if(store.getState().channel.chat.socket.auth) {
                sender.reauth();
            }
        }
        reconnected = false;

    };
    socket.onmessage = function (e) {
        if(process.env.NODE_ENV === 'development') {
            helper.log(e.data);
        }
        handler(e.data);
    };
    socket.onclose = function () {
        socket = null;

        if (!closing) {
            console.log("[SOCKET] disconnected, reconnecting..")
            if(!reconnected) {
                notify({type: 'error', message: _intl.formatMessage(messages.disconnect)});
            }
            reconnected = true;
            intervalId = setInterval(function () {
                init();
            }, 2000);
        } else {
            console.log("[SOCKET] disconnected");
            worker.stop();
        }
    };
}

export const send = (data) => {
    socket.send(JSON.stringify(data));
}

export const close = () => {
    closing = true;
    socket.close();
}

export const getSocket = () => {
    return socket;
}