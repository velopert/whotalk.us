import store from 'store';
import * as channel from 'actions/channel';

let working = false;

let packets = [];
let sum = 0;
let avg = 0;

let workDelay = 50;

let timeoutId = null;
let avgTimeoutId = null;

async function work() {
    if(packets.length > 0) {
        const chat = store.getState().channel.chat;
        const username = store.getState().channel.info.username;
        
        if(chat.lastInitId && !chat.loadedBetween) {
            try {
                await store.dispatch(channel.getMsgBetween({
                    username,
                    startId: chat.lastInitId,
                    endId: packets[0].payload.suID
                }));
            } catch (error) {
                
            }
        }

        store.dispatch(channel.receiveRealtimeData(packets));
        packets = [];
    }
    timeoutId = setTimeout(work, workDelay);
}

function getAvg() {
    avg = Math.floor(sum / 3);
    sum = 0;
    if(avg < 3) {
        workDelay = 50;
    } else if (avg < 10) {
        workDelay = 100;
    } else if (avg < 20 ) {
        workDelay = 300;
    } else if ( avg < 40 ) {
        workDelay = 400;
    } else if ( avg < 50 ) {
        workDelay = 600;
    } else if (avg >= 50) {
        workDelay = 800;
    }

    if(avg>=3) {
        console.log('[SOCKET] pps: ' + avg, 'workDelay: ', workDelay);
    }
    

    avgTimeoutId = setTimeout(getAvg, 3000);
}
const worker = {
    start: () => {
        work();
        getAvg();
    },
    stop: () => {
        clearTimeout(timeoutId);
        clearTimeout(avgTimeoutId);
    },
    assign: (packet) => {
        packets.push(packet);
        sum++;
    }
};



export default worker;

