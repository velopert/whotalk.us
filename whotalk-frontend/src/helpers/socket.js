import SockJS from 'sockjs-client';


let intervalId = null;
let socket = null;


export const send = (data) => {
    socket.send(JSON.stringify(data));
}

export const initConnection = () => {
    socket = new SockJS("//localhost:3000/echo");
    clearInterval(intervalId);
    socket.onopen = function () {
        console.log('connected');
    };
    socket.onmessage = function (e) {
        console.log(e.data);
    };
    socket.onclose = function () {
        socket = null;
        console.log("disconnected, reconnecting..")
        intervalId = setInterval(function () {
            initConnection();
        }, 2000);
    };
}

export default socket;