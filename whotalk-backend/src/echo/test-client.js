import readline from 'readline';
import SockJS from 'sockjs-client';
let intervalId = null;
let socket = null;


const TYPE = {
    MSG: "MSG",
    JOIN: "JOIN",
    ERROR: "ERROR",
    LEAVE: "LEAVE",
    AUTH: "AUTH"
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(question) {
    return new Promise((resolve) => {
        rl.question("[CLIENT] " + question + '\n> ', (answer) => { resolve(answer) })
    });
}

function createMessage(message) {
    return JSON.stringify({
        type: "MSG",
        message
    });
}

// creates action object
function createAction(type, payload) {
    return {
        type,
        payload
    };
}

// creates action object
function send(data) {
    socket.send(JSON.stringify(data));
}


async function authenticate() {
    let anon = await ask("Anonymously? y/n");
    let session = null;
    if(anon === "n") {
        session = await ask("Input your sessionId");
    } else {
        session = (new Date()).toString();
    }
    
    let channel = await ask("Channel Name?");
    const action = createAction(
        TYPE.AUTH,
        {
            session,
            channel,
            anon: anon === 'y'
        }
    );
    send(action);
}

// async function setUsername() {
//     if (!username) {
//         const name = await ask("[Client] What is your username?");
//         username = name;
//     }

//     if (!channel) {
//         const c = await ask("[Client] Type channel name to join");
//         channel = c;
//     }

//     socket.send(createAction('JOIN', { username, channel }));
// }

function authenticate(session) {
    // later-fix: should get the req.sessionID instead of data
    const data = new Date();

}

const initConnection = () => {
    socket = new SockJS("http://localhost:4000/echo");
    clearInterval(intervalId);
    socket.onopen = function () {
        console.log('connected');
        authenticate();
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
    // const token = l.split(" ");
    // if (token.length === 0) {
    //     console.log('Invalid Request');
    //     rl.prompt();
    //     return;
    // }

    // const text = l.substring(4, l.length);
    // switch (token[0]) {
    //     case 'say':
    //         send(createAction(TYPE.MSG, {
    //             message: text
    //         }));
    //         break;
    //     case 'send':
    //         socket.send(text);
    //         break;
    //     default:
    //         console.log('Invalid Request');
    //         break;
    // }
    send(createAction(TYPE.MSG, {
        message: line
    }));
    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});