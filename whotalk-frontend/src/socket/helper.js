// creates action object
export function createAction(type, payload) {
    return {
        type,
        payload
    };
}

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

export const log = (packet) => {
    console.log("[SOCKET]", tryParseJSON(packet));
}

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
