import SockJS from 'sockjs-client';
import store from 'store';
import sender from './packetSender';
import handler from './packetHandler';
import * as helper from './helper';
import notify from 'helpers/notify';
import worker from './worker';


let intervalId = null;
let socket = null;
let closing = false;
let reconnected = false;

export const init = () => {
    socket = new SockJS("/echo");
    clearInterval(intervalId);
    socket.onopen = function () {
        closing = false;
        console.log('connected');
        worker.start();
        sender.enter(store.getState().channel.info.username);
        if(reconnected) {
            notify({type: 'success', message: 'Reconnected successfully'})
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
                notify({type: 'error', message:'Disconnected from server. Reconnecting...'});
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