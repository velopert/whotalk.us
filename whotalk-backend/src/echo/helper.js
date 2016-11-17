import { SEND } from './packetTypes';

// log the packet
export const log = (packet) => {
    console.log("[SOCKET] " + packet);
}


// emits data to specific connection
export function emit(connection, data) {
    connection.write(JSON.stringify(data));
}

// creates action object
export function createAction(type, payload) {
    return {
        type,
        payload
    };
}

// parse JSON from a string, return false when error
export function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

let counter = 0;
let reset = false;


export function generateUID() {

    if(!reset) {
        reset = true;
        process.nextTick(
            () => {
                counter = 0;
                reset = false;
            }, 100
        )
    }
    
    return (new Date().valueOf()).toString(36) + (counter++).toString(36);
}
