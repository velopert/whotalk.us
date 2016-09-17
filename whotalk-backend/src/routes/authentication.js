import express from 'express';
import passport from 'passport';
import { generateHash, compareHash } from './../helpers/bcrypt';
import inspector from 'schema-inspector';
import PassportError from './../passport/PassportError.js';
import Account from './../models/account.js'

const router = express.Router();

router.get('/', (req, res) => {
   
});

router.get('/success', (req, res) => {
    res.json({
        user: req.user
    });
});

router.get('/failure', (req, res) => {
    res.json({
        success: false
    });
});

/* require addition info for oauth registration */
router.post('/oauth/register', (req, res) => {
    // not logged in through oauth
    if(!req.user) {
        return res.status(401).json({
            code: 0,
            message: 'INVALID REQUEST'
        });
    }

    // is registered already
    if(req.user.username !== null) {
        return res.status(403).json({
            code: 1,
            message: 'REGISTERED ALREADY'
        });
    }

    // might have to set email, for facebook accounts that do not have email
    const info = {
        username: req.body.username,
        email: req.user.common_profile.email.value || req.body.email
    };

    // do data validation
    const validation = {
        username: { type: 'string', minLength: 5 },
        email: { type: 'string', pattern: 'email' }
    };

    if(inspector.validate(validation, info).length > 0) {
        return res.status(400).json({
            code: 2,
            message: 'VALIDATION FAILED'
        });
    }

    // check username / email duplication
    const p1 = Account.findUser(info.username);
    const p2 = Account.findByEmail(info.email);

    // wait for all fulfillments
    Promise.all([p1, p2]).then(
        values => {

            if(values[0]) {
                throw new PassportError(1, "USERNAME EXISTS");
            }

            if(values[1]) {
                throw new PassportError(2, "EMAIL EXISTS");
            }

            // prepare document to save
            const account = new Account(req.user);
            account.common_profile.username = info.username;
            account.common_profile.email = info.email;

            return account.save();
        }
    ).then(
        doc => {
            req.user.common_profile.username = info.username;
            req.user.common_profile.email = info.email;
            req.user._id = doc._id;

            return res.json({
                success: true
            });
        }
    ).catch(
        error => {
            //handle error
            if (error instanceof PassportError) {
                return res.status(422).json({
                    code: error.code,
                    message: error.message
                });
            } else {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    );
});


/* logout */

router.post('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

/* facebook */

router.get('/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/api/authentication/failure' }),

    (req, res) => {
        // SUCCEED
        res.redirect('/api/authentication/success');
    }
);

/* google */

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/authentication/failure' }),

    (req, res) => {
        // SUCCEED
        res.redirect('/api/authentication/success');
    }
);


/* local */

function validateRegisterBody(body) {
    const validation = {
        type: 'object',
        properties: {
            username: { type: 'string', minLength: 1 },
            password: { type: 'string', minLength: 1 },
            familyName: { type: 'string', minLength: 1 },
            givenName: { type: 'string', minLength: 1 },
            gender: { type: 'string', pattern: /(male|female)$/ },
            email: { type: 'string', pattern: 'email' }
        }
    };
    return inspector.validate(validation, body);
}


function validateLoginBody(body) {
    const validation = {
        type: 'object',
        properties: {
            username: { type: 'string', minLength: 1 },
            password: { type: 'string', minLength: 1 }
        }
    };

    return inspector.validate(validation, body);
}

router.post('/register', (req, res, next) => {

    // check whether the request body is valid
    // do the validation @ client.
    if(validateRegisterBody(req.body).error.length > 0) {
        return res.status(400).json({
            code: 0,
            message: 'INVALID REQUEST'
        });
    }


    passport.authenticate('local-register', (err, user, info) => {
        // it's either an error or a success'
        if (err) {
            if (err instanceof PassportError) {
                return res.status(422).json({
                    code: err.code,
                    message: err.message
                });
            }
            return next(err);
        }
        req.login(user, (err) => {
            if (err) { return next(err); }
            res.json({ user });
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {

    // check whether the request body is valid
    if(validateLoginBody(req.body).error.length > 0) {
        return res.status(400).json({
            code: 0,
            message: 'INVALID REQUEST'
        });
    }


    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            if (err instanceof PassportError) {
                return res.status(422).json({
                    code: err.code,
                    message: err.message
                });
            }
            return next(err);
        } else {
            req.login(user, (err) => {
                if (err) { return next(err); }
                res.json({ user });
            });
        }
    })(req, res, next);
});

export default router;
