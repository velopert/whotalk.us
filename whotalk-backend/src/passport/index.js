import passport from 'passport';
import { Strategy as FacebookStrategy}  from 'passport-facebook';
import { Strategy as GoogleStrategy}  from 'passport-google-oauth20';
import fbConfig from './fb';
import googleConfig from './google';


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
        var user = {access_token, profile: profile};
        cb(null, user);
    }
));


passport.use(
    new GoogleStrategy({
        clientID: googleConfig.appID,
        clientSecret: googleConfig.appSecret,
        callbackURL: googleConfig.callbackURL,
    },
    (access_token, refresh_token, profile, cb) => {
        
        var user = {access_token, profile: profile};
        cb(null, user);
    }
));
