import readline from 'readline'
import SockJS from 'sockjs-client';

let intervalId = null;
let socket = null;
let username = null;
let channel = null;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question + '\n> ', (answer) => { resolve(answer) })
    });
}

function createMessage(message) {
    return JSON.stringify({
        type: "MSG",
        message
    });
}

function createJoin(username) {
    return JSON.stringify({
        type: "JOIN",
        username
    });
}


// creates action object
function createAction(type, payload) {
    return JSON.stringify({
        type,
        payload
    });
}



async function setUsername() {
    if (!username) {
        const name = await ask("[Client] What is your username?");
        username = name;
    }

    if (!channel) {
        const c = await ask("[Client] Type channel name to join");
        channel = c;
    }

    socket.send(createAction('JOIN', { username, channel }));
}


const initConnection = () => {
    socket = new SockJS("http://localhost:4000/echo");
    clearInterval(intervalId);
    socket.onopen = function () {
        console.log('connected');
        setUsername();
    };
    socket.onmessage = function (e) {
        if (username)
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

initConnection();


// const sock = new SockJS("http://localhost:4000/echo");

//  sock.onopen = function() {
//      console.log('connected');
//  };
//  sock.onmessage = function(e) {
//      console.log('message', e.data);
//  };
//  sock.onclose = function() {
//      console.log('close');
//  };




// async function initialize() {
//     const name = await ask("[Client] What is your username?");
//     console.log("[Client] Welcome, " + name);
// }

rl.setPrompt('');
rl.prompt();

rl.on('line', function (line) {
    const l = line.trim();
    const token = l.split(" ");
    if (token.length === 0) {
        console.log('Invalid Request');
        rl.prompt();
        return;
    }

    const text = l.substring(4, l.length);
    switch (token[0]) {
        case 'say':
            socket.send(createMessage(text));
            break;
        case 'send':
            socket.send(JSON.stringify(text));
            break;
        case 'join':
            socket.send(createJoin(text));
            break;
        default:
            console.log('Invalid Request');
            break;
    }
    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});