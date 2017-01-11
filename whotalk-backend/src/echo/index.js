import sockjs from 'sockjs';
import channel from './channel';
import packetHandler from './packetHandler';

import sockets, { connect, disconnect } from './sockets';


// initialize server
const options = { sockjs_url: 'https://cdn.jsdelivr.net/sockjs/1.1.1/sockjs.min.js' };
const echo = sockjs.createServer(options);

// initialize channel
channel(sockets);

echo.on('connection', connection => {
    connect(connection);

    connection.on('data', data => {
        packetHandler(connection, data);
    });

    connection.on('close', data => {
        disconnect(connection);
    });
});

export default echo;