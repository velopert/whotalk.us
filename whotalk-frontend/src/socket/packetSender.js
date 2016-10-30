import { client as SEND } from './packetTypes';
import { createAction } from './helper';
import { send } from './index';

let _sessionID = null, _anonymous = null;

const packetSender = {
    enter: (channel) => {
        const packet = createAction(SEND.ENTER, {
            channel
        });
        
        send(packet);
    },

    auth: (sessionID, anonymous) => {
        const packet = createAction(SEND.AUTH, {
            sessionID, anonymous
        });

        _sessionID = sessionID;
        _anonymous = anonymous;

        send(packet);
    },

    reauth: () => {
        const packet = createAction(SEND.AUTH, {
            sessionID: _sessionID, anonymous: _anonymous
        });

        send(packet); 
    },
    
    message: (payload) => {
        const packet = createAction(SEND.MSG, payload);
        send(packet);
    }
}

export default packetSender;