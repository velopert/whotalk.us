import express from 'express';
import * as controller from './channel.controller.js';


const router = express.Router();

router.get('/valid/:username', controller.valid);

router.get('/get-recent/:username', controller.getRecent);


router.get('/thumbtest', (req, res) => {
    res.redirect('https://avatars0.githubusercontent.com/u/17202261?v=2&s=150');
})


router.get('/errtest', (req, res) => {
    var e = new Error();
    throw e;
})

export default router;