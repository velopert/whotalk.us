'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // LOAD CONFIG

require('./passport'); // set up passport

const app = (0, _express2.default)();
const port = process.env.PORT || 3000;

const MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

/* SETUP MIDDLEWARE */

app.use(_bodyParser2.default.json()); // parses json
app.use((0, _expressSession2.default)({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
        mongooseConnection: _mongoose2.default.connection,
        ttl: 14 * 24 * 60 * 60
    }) // store session @ mongodb
})); // setup session

// using passport
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// SERVE STATIC FILES
app.use('/', _express2.default.static(_path2.default.join(__dirname, '../../whotalk-frontend/build/')));

// SETUP ROUTER
app.use('/api', _routes2.default);

/* handle error */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: 'Something Broke!',
            code: 0
        }
    });
    next();
});

_mongoose2.default.Promise = global.Promise;
const db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongod server');
});

// ENABLE DEBUG WHEN DEV ENVIRONMENT
if (process.env.NODE_ENV === 'development') {
    _mongoose2.default.set('debug', true);
    app.use((0, _morgan2.default)('tiny')); // server logger
}

_mongoose2.default.connect(process.env.DB_URI);

const server = _http2.default.createServer(app).listen(port, () => {
    console.log(`Express is running on port ${ port }`);
});

_echo2.default.installHandlers(server, { prefix: '/echo' });

// /* bind echo server */
// echo.installHandlers(app, { prefix: '/echo' });

// app.listen(port, () => {
//     console.log(`Express is running on port ${port}`);
// });