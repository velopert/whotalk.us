import express from 'express';
import passport from 'passport';
import { generateHash } from '../helpers/bcrypt';



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




export default router;
