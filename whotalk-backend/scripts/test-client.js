'use strict';

process.env.NODE_ENV = 'development';

var nodemon = require('nodemon');
nodemon('--exec babel-node ./src/echo/test-client.js --watch ./src/echo/');

nodemon.on('start', function () {
    console.log('[nodemon] TestClient has started');
}).on('quit', function () {
    console.log('[nodemon] TestClient has quit');
}).on('restart', function (files) {
    console.log('[nodemon] TestClient restarted due to:', files);
});