import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG

import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';

import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

import passport from 'passport';
require('./passport'); // set up passport

import api from './routes';

import path from 'path';

import echo from './echo';
import facebook from './helpers/facebook';



const app = express();
const port = process.env.PORT || 3000;

const MongoStore = connectMongo(session);

/* SETUP MIDDLEWARE */

app.use(bodyParser.json()); // parses json
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60
    }) // store session @ mongodb
})); // setup session


// using passport
app.use(passport.initialize());
app.use(passport.session());



// SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, '../../whotalk-frontend/build/')));

// SETUP ROUTER
app.use('/api', api);

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


mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongod server');
});

// ENABLE DEBUG WHEN DEV ENVIRONMENT
if(process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
    app.use(morgan('tiny')); // server logger
}


mongoose.connect(process.env.DB_URI);

const server = http.createServer(app).listen(port, () => {
    console.log(`Express is running on port ${port}`);
});

echo.installHandlers(server, { prefix: '/echo' });
facebook.init();

// /* bind echo server */
// echo.installHandlers(app, { prefix: '/echo' });

// app.listen(port, () => {
//     console.log(`Express is running on port ${port}`);
// });


