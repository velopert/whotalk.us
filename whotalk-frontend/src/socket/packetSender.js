import { client as SEND } from './packetTypes';
import { createAction } from './helper';
import { send } from './index';

const packetSender = {
    enter: (channel) => {
        const packet = createAction(SEND.ENTER, {
            channel
        });
        
        send(packet);
    }
}

export default packetSender;