import express from 'express';
import * as controller from './channel.controller.js';


const router = express.Router();

router.get('/valid/:username', controller.valid);
router.get('/thumbtest', (req, res) => {
    res.redirect('https://avatars0.githubusercontent.com/u/17202261?v=2&s=150');
})


export default router;