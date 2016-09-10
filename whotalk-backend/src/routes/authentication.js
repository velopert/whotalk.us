import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

router.get('/failure', (req, res) => {
    res.json({
        success: true
    });
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['user_friends'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/authentication/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/authentication/');
  });



export default router;
