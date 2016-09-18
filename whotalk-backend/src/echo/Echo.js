import sockjs from 'sockjs';
import _ from 'lodash';

const options = { sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' };

class Echo {
    constructor() {
        this.server = sockjs.createServer(options);
        this.sockets = {};
        this.counter = 0;
        this.freeSlot = [];
        console.log("Echo is initialized");
    }

    configureServer() {
        this.server.on('connection', (connection) => {

        });
    }
}

export default Echo;
