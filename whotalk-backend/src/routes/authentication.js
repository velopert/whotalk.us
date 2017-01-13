import express from 'express';
import passport from 'passport';
import inspector from 'schema-inspector';
import PassportError from './../passport/PassportError.js';
import Account from './../models/account.js'
import cache from './../helpers/cache';
import Follow from './../models/follow.js';


const router = express.Router();

const tempFix = {};

router.get('/', (req, res) => {
    res.json({sessionID: req.sessionID, session: req.session});
});

router.get('/success', (req, res) => {

    let url = req.protocol + '://' + req.get('host');
    //res.json({user: req.user});
    
    if (process.env.NODE_ENV === 'development') {
        url = url.replace(process.env.PORT, process.env.DEVPORT);
    }

    if(!req.user) {
        return res.redirect('/auth/oauth-failure');
    }

    if (req.user.common_profile.username !== null) {
        res.redirect('/auth/oauth-success');
    } else {
        res.redirect('/auth/register/additional-o');
    }
});

router.get('/check', async (req, res) => {

    let user = null;
    let followInfo = null;

    if (req.user) {
        const {_id, type, common_profile} = req.user;
        const followers = await Follow.getFollowerCount(req.user._id);
        const following = await Follow.getFollowingCount(req.user._id);
        followInfo = {
            followers,
            following
        }

        user = {
            _id,
            type,
            common_profile,
        };


    }

    res.json({sessionID: req.sessionID, user, followInfo});
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
        return res
            .status(401)
            .json({code: 0, message: 'INVALID REQUEST'});
    }

    // is registered already
    if (req.user.common_profile.username !== null) {
        return res
            .status(403)
            .json({code: 1, message: 'REGISTERED ALREADY'});
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

    if (inspector.validate(validation, info).length > 0) {
        return res
            .status(400)
            .json({code: 2, message: 'VALIDATION FAILED'});
    }

    // check username / email duplication
    const p1 = Account.findUser(info.username);
    const p2 = Account.findUserByEmail(info.email);

    // wait for all fulfillments
    Promise
        .all([p1/*, p2*/
        ])
        .then(values => {

            if (values[0]) {
                throw new PassportError(1, "USERNAME EXISTS");
            }

            /* email duplication */
            // if (values[1]) {     throw new PassportError(2, "EMAIL EXISTS"); } find User
            return Account
                .findById(req.user._id)
                .exec();
        })
        .then(account => {
            account.common_profile.username = info.username;
            //account.common_profile.email = info.email;
            return account.save();
        })
        .then(account => {
            req.user.common_profile.username = info.username;
            //req.user.common_profile.email = info.email;
            req.user._id = account._id;
            cache
                .passport
                .set(req.user._id.toString(), account); // store user in cache

            return res.json({success: true});
        })
        .catch(error => {
            //handle error
            if (error instanceof PassportError) {
                return res
                    .status(422)
                    .json({code: error.code, message: error.message});
            } else {
                return res
                    .status(500)
                    .json({message: error.message});
            }
        });
});

/* logout */

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    // if(cache.session.has(req.sessionID)) {
    //     cache.session.del(req.sessionID);
    // }
    res.json({success: true});
});

/* facebook */

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['user_friends', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/api/authentication/failure'}), (req, res) => {
    // SUCCEED
    res.redirect('/api/authentication/success');
});

/* google */

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/api/authentication/failure'}), (req, res) => {
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

    return inspector.validate(validation, body);
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

    return inspector.validate(validation, body);
}

router.get('/exists/:username', (req, res) => {
    Account
        .findUser(req.params.username)
        .then(account => {
            if (account) {
                res.json({exists: true});
            } else {
                res.json({exists: false});
            }
        });
});

router.get('/exists/email/:email', (req, res) => {
    Account
        .findUserByEmail(req.params.email)
        .then(account => {
            if (account) {
                res.json({exists: true});
            } else {
                res.json({exists: false});
            }
        });
});

router.post('/register', (req, res, next) => {

    // check whether the request body is valid do the validation @ client.
    if (validateRegisterBody(req.body).error.length > 0) {
        return res
            .status(400)
            .json({code: 0, message: 'INVALID REQUEST'});
    }

    passport.authenticate('local-register', (err, user, info) => {
        // it's either an error or a success'
        if (err) {
            if (err instanceof PassportError) {
                return res
                    .status(422)
                    .json({code: err.code, message: err.message});
            }
            return next(err);
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.json({user});
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {

    // check whether the request body is valid
    if (validateLoginBody(req.body).error.length > 0) {
        return res
            .status(400)
            .json({code: 0, message: 'INVALID REQUEST'});
    }

    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            if (err instanceof PassportError) {
                return res
                    .status(422)
                    .json({code: err.code, message: err.message});
            }
            return next(err);
        } else {
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.json({user});
            });
        }
    })(req, res, next);
});

export default router;