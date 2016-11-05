'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportGoogleOauth = require('passport-google-oauth20');

var _passportLocal = require('passport-local');

var _fb = require('./fb');

var _fb2 = _interopRequireDefault(_fb);

var _google = require('./google');

var _google2 = _interopRequireDefault(_google);

var _account2 = require('./../models/account');

var _account3 = _interopRequireDefault(_account2);

var _bcrypt = require('./../helpers/bcrypt');

var _PassportError = require('./PassportError');

var _PassportError2 = _interopRequireDefault(_PassportError);

var _cache = require('./../helpers/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* SETUP PASSPORT SERIALIZATION */
_passport2.default.serializeUser((user, done) => {
    _cache2.default.passport.set(user._id, user); // store user in cache
    done(null, user._id);
});

_passport2.default.deserializeUser((id, done) => {
    if (_cache2.default.passport.has(id)) {
        return done(null, _cache2.default.passport.get(id));
    }
    //cb(null, user);
    _account3.default.findById(id).exec().then(account => {
        _cache2.default.passport.set(id, account);
        done(null, account);
    }).catch(error => {
        done(error);
    });
});

/* facebook */
_passport2.default.use(new _passportFacebook.Strategy({
    clientID: _fb2.default.appID,
    clientSecret: _fb2.default.appSecret,
    callbackURL: _fb2.default.callbackURL,
    profileFields: _fb2.default.profileFields
}, (access_token, refresh_token, profile, done) => {
    _account3.default.findUserByFacebookId(profile.id).then(account => {
        // user is found
        if (account) {
            done(null, account);
            return;
        } else {
            const newAccount = new _account3.default({
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
    }).then(account => {
        if (!account) return; // skip this if user is found
        return done(null, account);
    }).catch(error => {
        done(error);
    });
}));

/* google */
_passport2.default.use(new _passportGoogleOauth.Strategy({
    clientID: _google2.default.appID,
    clientSecret: _google2.default.appSecret,
    callbackURL: _google2.default.callbackURL
}, (access_token, refresh_token, profile, done) => {
    _account3.default.findUserByGoogleId(profile.id).then(account => {
        // user is found
        if (account) {
            done(null, account);
            return;
        } else {
            const newAccount = new _account3.default({
                type: 'google',
                common_profile: {
                    username: null,
                    familyName: profile.name.familyName,
                    givenName: profile.name.givenName,
                    gender: profile.gender || 'hidden', // if the info is not public, it will return undefined,
                    email: profile.emails[0].value
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
    }).then(account => {
        if (!account) return;
        return done(null, account);
    }).catch(error => {
        done(error);
    });
}));

_passport2.default.use('local-register', new _passportLocal.Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    _account3.default.findUser(username).then(account => {
        // account exists
        if (account) {
            throw new _PassportError2.default(1, "USERNAME EXISTS");
        } else {
            console.log(account);
            // check email duplication
            return _account3.default.findUserByEmail(req.body.email);
        }
    }).then(account => {
        // acount with that email exists
        if (account) {
            throw new _PassportError2.default(2, "EMAIL EXISTS");
        } else {
            // generate password hash
            return (0, _bcrypt.generateHash)(password);
        }
    }).then(hash => {
        // create a new account
        const newAccount = new _account3.default();
        newAccount.type = "local";
        newAccount.password = hash;
        newAccount.common_profile.username = username;
        newAccount.common_profile.familyName = req.body.familyName;
        newAccount.common_profile.givenName = req.body.givenName;
        newAccount.common_profile.gender = req.body.gender;
        newAccount.common_profile.email = req.body.email;
        return newAccount.save();
    }).then(doc => {
        return done(null, {
            _id: doc._id,
            type: doc.type,
            common_profile: doc.common_profile
        });
    }).catch(error => {
        console.error(error);
        done(error);
    });
}));

_passport2.default.use('local-login', new _passportLocal.Strategy((username, password, done) => {

    let _account = undefined;

    _account3.default.findUser(username).then(account => {
        // account does not exit
        if (!account) {
            throw new _PassportError2.default(1, 'INVALID AUTH');
        } else {
            if (account.type !== 'local') {
                throw new _PassportError2.default(1, 'INVALID AUTH');
            }
            // account exists, check password validity
            _account = account;
            return (0, _bcrypt.compareHash)(account.password, password);
        }
    }).then(result => {
        if (result) {
            return done(null, {
                _id: _account._id.toString(),
                type: _account.type,
                common_profile: _account.common_profile
            });
        } else {
            throw new _PassportError2.default(1, 'INVALID AUTH');
        }
    }).catch(error => {
        console.error(error);
        return done(error);
    });
}));