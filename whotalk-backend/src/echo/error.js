import { server as SEND } from './packetTypes';

// creates error object
export default function error(code) {
    let message;
    switch (code) {
        case 0:
            message = "INVALID REQUEST";
            break;
        case 1:
            message = "SESSION NOT VALIDATED";
            break;
        case 2:
            message = "INVALID SESSION";
            break;
        case 3:
            message = "SESSION NOT VALIDATED"
        default:
            message = "WHAT ARE YOU DOING?";
            break;
    }

    return {
        type: SEND.ERROR,
        payload: {
            code,
            message
        }
    };
}