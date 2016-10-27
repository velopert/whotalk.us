import SockJS from 'sockjs-client';
import store from 'store';
import sender from './packetSender';
import * as helper from './helper';


let intervalId = null;
let socket = 'null';
let closing = false;

let counter = 0;

export const init = () => {
    socket = new SockJS("/echo");
    clearInterval(intervalId);
    socket.onopen = function () {
        closing = false;
        console.log('connected');

        sender.enter(store.getState().channel.info.username);
    };
    socket.onmessage = function (e) {
        if(process.env.NODE_ENV === 'development') {
            helper.log(e.data);
        }
    };
    socket.onclose = function () {
        socket = null;

        if (!closing) {
            console.log("disconnected, reconnecting..")
           
            intervalId = setInterval(function () {
                init();
            }, 2000);
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

export default socket;