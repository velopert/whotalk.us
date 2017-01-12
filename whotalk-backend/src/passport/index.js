import passport from 'passport';
import { Strategy as FacebookStrategy }  from 'passport-facebook';
import { Strategy as GoogleStrategy }  from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import fbConfig from './fb';
import googleConfig from './google';
import Account from './../models/account';
import { generateHash, compareHash } from './../helpers/bcrypt';
import PassportError from './PassportError';
import cache from './../helpers/cache';

/* SETUP PASSPORT SERIALIZATION */
passport.serializeUser((user, done) => {
    cache.passport.set(user._id, user); // store user in cache
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    if(cache.passport.has(id)) {
        // console.log('using cache:', {id}, cache.passport.get(id));
        return done(null, cache.passport.get(id));
    }
    //cb(null, user);
    Account.findById(id).exec().then(
        account => {
            cache.passport.set(id, account);
            done(null, account);
        }
    ).catch(
        (error) => {
            done(error);
        }
    );
});

/* facebook */
passport.use(
    new FacebookStrategy({
        clientID: fbConfig.appID,
        clientSecret: fbConfig.appSecret,
        callbackURL: fbConfig.callbackURL,
        profileFields: fbConfig.profileFields
    },
        (access_token, refresh_token, profile, done) => {
            Account.findUserByFacebookId(profile.id)
            .then(
                account => {
                    // user is found
                    if(account) {
                        done(null, account);
                        return;
                    } else {
                        const newAccount = new Account({
                            type: 'facebook',
                            common_profile: {
                                username: null,
                                familyName: profile.name.familyName,
                                givenName: profile.name.givenName,
                                gender: profile.gender,
                                email: profile.emails ? (profile.emails.length > 0 ? profile.emails[0].value : null) : null
                            },
                            o_auth: {
                                facebook: {
                                    id: profile.id,
                                    access_token
                                }
                            }
                        });

                        return newAccount.save();
                    }
                }
            ).then(
                account => {
                    if(!account) return; // skip this if user is found
                    return done(null, account);
                }
            ).catch(
                error => {
                    done(error);
                }
            );
        }
    ));

/* google */
passport.use(
    new GoogleStrategy({
        clientID: googleConfig.appID,
        clientSecret: googleConfig.appSecret,
        callbackURL: googleConfig.callbackURL,
    },
        (access_token, refresh_token, profile, done) => {
            Account.findUserByGoogleId(profile.id)
            .then(
                account => {
                    // user is found
                    if(account) {
                        done(null, account);
                        return;
                    } else {
                        const newAccount = new Account({
                            type: 'google',
                            common_profile: {
                                username: null,
                                familyName: profile.name.familyName,
                                givenName: profile.name.givenName,
                                gender: profile.gender || 'hidden', // if the info is not public, it will return undefined,
                                email: profile.emails[0].value,
                            }, 
                            o_auth: {
                                google: {
                                    id: profile.id,
                                    access_token
                                }
                            }
                        });

                        return newAccount.save();
                    }
                }
            ).then(
                account => {
                    if(!account) return;
                    return done(null, account);
                }
            ).catch(
                error => {
                    done(error);
                }
            )
        }
    ));


passport.use(
    'local-register',
    new LocalStrategy(
        {passReqToCallback: true},
        (req, username, password, done) => {
            Account.findUser(username)
            .then(
                account => {
                    // account exists
                    if (account) {
                        throw new PassportError(1, "USERNAME EXISTS");
                    } else {
                        // console.log(account);
                        // check email duplication
                        return Account.findUserByEmail(req.body.email);
                    }
                }
            ).then(
                account => {
                    // acount with that email exists
                    if(account) {
                        throw new PassportError(2, "EMAIL EXISTS");
                    } else {
                        // generate password hash
                        return generateHash(password)
                    }
                }
            ).then(
                hash => {
                    // create a new account
                    const newAccount = new Account();
                    newAccount.type = "local";
                    newAccount.password = hash;
                    newAccount.common_profile.username = username;
                    newAccount.common_profile.familyName = req.body.familyName;
                    newAccount.common_profile.givenName = req.body.givenName;
                    newAccount.common_profile.gender = req.body.gender;
                    newAccount.common_profile.email = req.body.email;
                    return newAccount.save();
                }
            ).then(
                doc => {
                    return done(null, {
                        _id: doc._id,
                        type: doc.type,
                        common_profile: doc.common_profile
                    });
                }
            ).catch(
                error => {
                    console.error(error);
                    done(error);
                }
            )
        }
    )
)

passport.use(
    'local-login',
    new LocalStrategy(
        (username, password, done) => {

            let _account = undefined;
            
            Account.findUser(username)
            .then(
                account => {
                    // account does not exit
                    if(!account) {
                        throw new PassportError(1, 'INVALID AUTH');
                    } else {
                        if(account.type !== 'local') {
                            throw new PassportError(1, 'INVALID AUTH');
                        }
                        // account exists, check password validity
                        _account = account;
                        return compareHash(account.password, password);
                    }
                }
            ).then(
                result => {
                    if(result) {
                        return done(null, {
                            _id: _account._id.toString(),
                            type: _account.type,
                            common_profile: _account.common_profile
                        });
                    } else {
                        throw new PassportError(1, 'INVALID AUTH');
                    }
                }
            ).catch(
                error => {
                    console.error(error);
                    return done(error);
                }
            );
        }
    )
);


