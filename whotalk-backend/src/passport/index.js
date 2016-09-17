import passport from 'passport';
import { Strategy as FacebookStrategy }  from 'passport-facebook';
import { Strategy as GoogleStrategy }  from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import fbConfig from './fb';
import googleConfig from './google';
import Account from './../models/account';
import { generateHash, compareHash } from './../helpers/bcrypt';
import PassportError from './PassportError';
import inspector from 'schema-inspector';

/* SETUP PASSPORT SERIALIZATION */
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
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
                        return done(null, account);
                    } else {
                        const newAccount = new Account({
                            type: 'facebook',
                            common_profile: {
                                username: null,
                                familyName: profile.name.familyName,
                                givenName: profile.name.givenName,
                                gender: profile.gender,
                                email: profile.emails.length > 0 ? profile.emails[0].value : null
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
        (access_token, refresh_token, profile, cb) => {
            var user = { access_token, profile: profile };
            cb(null, user);
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
                        console.log(account);
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

// passport.use(
//     'local-register',
//     new LocalStrategy(
//         (username, password, done) => {
//             Account.findOne({ type: 'local', 'common_profile.username': username })
//             .exec()
//             .then(
//             account => {
//                 // if account exists
//                 if (account) {
//                     return done(new PassportError(1, "USERNAME EXISTS"));
//                 } else {
//                     // if does not exist, create an account
//                     const newAccount = new Account();
                    
//                     newAccount.type = "local";
//                     newAccount.common_profile.username = username;
//                     newAccount.common_profile.familyName =  req.body.familyName;
//                     newAccount.common_profile.givenName =  req.body.givenName;
//                     newAccount.common_profile.gender =  req.body.gender;
//                     newAccount.common_profile.email =  req.body.email;


//                     // generate hash asyncly
//                     generateHash(password)
//                     .then(
//                         // hash generated
//                         hash => {
//                             newAccount.password = hash;
//                             newAccount.save()
//                             .then(doc => {
//                                 done(null, {
//                                     _id: newAccount._id,
//                                     type: newAccount.type,
//                                     common_profile: newAccount.common_profile
//                                 });
//                             }).catch(
//                                 error => {
//                                     done(new PassportError(0, "DATABASE ERROR"));
//                                 }
//                             );
//                         }
//                     ).catch(
//                         // error occured while hashing
//                         error => {
//                             done(new PassportError(3, "INVALID PASSWORD"));
//                         }
//                     );
//                 }

//             }
//             ).catch(
//                 error => {
//                     return done(new PassportError(0, 'DATABASE ERROR'));
//                 }
//             );
//         }
//     )
// );

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


