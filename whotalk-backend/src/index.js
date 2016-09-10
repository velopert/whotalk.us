import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';

import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

import passport from 'passport';
import { Strategy as FacebookStrategy}  from 'passport-facebook';
import fbConfig from './passport/fb';

import api from './routes';

import dotenv from 'dotenv';

import path from 'path';

dotenv.config(); // LOAD CONFIG

const app = express();
const port = process.env.PORT || 3000;

const MongoStore = connectMongo(session);

/* SETUP PASSPORT */
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});


passport.use(
    new FacebookStrategy({
        clientID: fbConfig.appID,
        clientSecret: fbConfig.appSecret,
        callbackURL: fbConfig.callbackURL,
        profileFields: fbConfig.profileFields
    },
    (access_token, refresh_token, profile, cb) => {

        console.log(JSON.stringify(profile));
        var user = {access_token, profile};
        cb(null, user);
    }
));


/* SETUP MIDDLEWARE */

app.use(bodyParser.json()); // parses json
app.use(morgan('tiny')) // server logger
app.use(session({
    secret: 'tHeSeCrEtKeY@#)#*&',
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

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongod server');
})

mongoose.connect(process.env.DB_URI);

app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});
