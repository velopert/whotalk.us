'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _schemaInspector = require('schema-inspector');

var _schemaInspector2 = _interopRequireDefault(_schemaInspector);

var _PassportError = require('./../passport/PassportError.js');

var _PassportError2 = _interopRequireDefault(_PassportError);

var _account = require('./../models/account.js');

var _account2 = _interopRequireDefault(_account);

var _cache = require('./../helpers/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const tempFix = {};

router.get('/', (req, res) => {
    res.json({ sessionID: req.sessionID, session: req.session });
});

router.get('/success', (req, res) => {
    //res.json({user: req.user});
    if (process.env.NODE_ENV === 'development') {
        let url = req.protocol + '://' + req.get('host');
        url = url.replace(process.env.PORT, process.env.DEVPORT);

        if (!req.user) {
            // check whether this is the first error
            if (!tempFix[req.sessionID]) {
                // try one more time
                console.error('User is NULL');
                tempFix[req.sessionID] = true;
                res.redirect('/api/authentication/success');
            } else {
                // second time receiving this error
                delete tempFix[req.sessionID];
                res.redirect(url + '/auth/oauth-failure');
            }
            return;
        }

        if (tempFix[req.sessionID]) {
            delete tempFix[req.sessionID];
        }

        if (req.user.common_profile.username !== null) {
            res.redirect(url + '/auth/oauth-success');
        } else {
            res.redirect(url + '/auth/register/additional-o');
        }
    }
});

router.get('/check', (req, res) => {

    let user = null;

    if (req.user) {
        const { _id, type, common_profile } = req.user;
        user = {
            _id,
            type,
            common_profile
        };
    }

    res.json({ sessionID: req.sessionID, user });
});

router.get('/failure', (req, res) => {

    let url = req.protocol + '://' + req.get('host');
    url = url.replace(process.env.PORT, process.env.DEVPORT);

    if (process.env.NODE_ENV === 'development') {
        res.redirect(url + '/auth/oauth-failure');
    }
});

/* require addition info for oauth registration */
router.post('/oauth/register', (req, res) => {
    // not logged in through oauth
    if (!req.user) {
        return res.status(401).json({ code: 0, message: 'INVALID REQUEST' });
    }

    // is registered already
    if (req.user.common_profile.username !== null) {
        return res.status(403).json({ code: 1, message: 'REGISTERED ALREADY' });
    }

    // might have to set email, for facebook accounts that do not have email
    const info = {
        username: req.body.username,
        email: req.user.common_profile.email.value || req.body.email
    };

    // do data validation
    const validation = {
        username: {
            type: 'string',
            pattern: /^[0-9a-z_]{4,20}$/
        },
        email: {
            type: 'string',
            pattern: 'email',
            optional: true
        }
    };

    if (_schemaInspector2.default.validate(validation, info).length > 0) {
        return res.status(400).json({ code: 2, message: 'VALIDATION FAILED' });
    }

    // check username / email duplication
    const p1 = _account2.default.findUser(info.username);
    const p2 = _account2.default.findUserByEmail(info.email);

    // wait for all fulfillments
    Promise.all([p1 /*, p2*/
    ]).then(values => {

        if (values[0]) {
            throw new _PassportError2.default(1, "USERNAME EXISTS");
        }

        /* email duplication */
        // if (values[1]) {     throw new PassportError(2, "EMAIL EXISTS"); } find User
        return _account2.default.findById(req.user._id).exec();
    }).then(account => {
        account.common_profile.username = info.username;
        //account.common_profile.email = info.email;
        return account.save();
    }).then(account => {
        req.user.common_profile.username = info.username;
        //req.user.common_profile.email = info.email;
        req.user._id = account._id;
        _cache2.default.passport.set(req.user._id.toString(), account); // store user in cache

        return res.json({ success: true });
    }).catch(error => {
        //handle error
        if (error instanceof _PassportError2.default) {
            return res.status(422).json({ code: error.code, message: error.message });
        } else {
            return res.status(500).json({ message: error.message });
        }
    });
});

/* logout */

router.post('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
});

/* facebook */

router.get('/facebook', _passport2.default.authenticate('facebook', {
    scope: ['user_friends', 'email']
}));

router.get('/facebook/callback', _passport2.default.authenticate('facebook', { failureRedirect: '/api/authentication/failure' }), (req, res) => {
    // SUCCEED
    res.redirect('/api/authentication/success');
});

/* google */

router.get('/google', _passport2.default.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'email']
}));

router.get('/google/callback', _passport2.default.authenticate('google', { failureRedirect: '/api/authentication/failure' }), (req, res) => {
    // SUCCEED
    res.redirect('/api/authentication/success');
});

/* local */

function validateRegisterBody(body) {
    const validation = {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                pattern: /^[0-9a-z_]{4,20}$/
            },
            password: {
                type: 'string',
                minLength: 5
            },
            familyName: {
                type: 'string',
                minLength: 1
            },
            givenName: {
                type: 'string',
                minLength: 1
            },
            gender: {
                type: 'string',
                pattern: /(male|female)$/
            },
            email: {
                type: 'string',
                pattern: 'email'
            }
        }
    };

    return _schemaInspector2.default.validate(validation, body);
}

function validateLoginBody(body) {
    const validation = {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                minLength: 1
            },
            password: {
                type: 'string',
                minLength: 1
            }
        }
    };

    return _schemaInspector2.default.validate(validation, body);
}

router.get('/exists/:username', (req, res) => {
    _account2.default.findUser(req.params.username).then(account => {
        if (account) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    });
});

router.get('/exists/email/:email', (req, res) => {
    _account2.default.findUserByEmail(req.params.email).then(account => {
        if (account) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    });
});

router.post('/register', (req, res, next) => {

    // check whether the request body is valid do the validation @ client.
    if (validateRegisterBody(req.body).error.length > 0) {
        return res.status(400).json({ code: 0, message: 'INVALID REQUEST' });
    }

    _passport2.default.authenticate('local-register', (err, user, info) => {
        // it's either an error or a success'
        if (err) {
            if (err instanceof _PassportError2.default) {
                return res.status(422).json({ code: err.code, message: err.message });
            }
            return next(err);
        }
        req.login(user, err => {
            if (err) {
                return next(err);
            }
            res.json({ user });
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {

    // check whether the request body is valid
    if (validateLoginBody(req.body).error.length > 0) {
        return res.status(400).json({ code: 0, message: 'INVALID REQUEST' });
    }

    _passport2.default.authenticate('local-login', (err, user, info) => {
        if (err) {
            if (err instanceof _PassportError2.default) {
                return res.status(422).json({ code: err.code, message: err.message });
            }
            return next(err);
        } else {
            req.login(user, err => {
                if (err) {
                    return next(err);
                }
                res.json({ user });
            });
        }
    })(req, res, next);
});

exports.default = router;