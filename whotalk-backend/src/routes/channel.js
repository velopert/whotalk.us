import express from 'express';
import * as controller from './channel.controller.js';


const router = express.Router();

router.get('/valid/:username', controller.valid);

router.get('/get-recent-msg/:username', controller.getRecentMsg);
router.get('/get-msg-before/:username/:cursorId', controller.getMsgBefore);
router.get('/get-msg-between/:username/:startId/:endId', controller.getMsgBetween);

router.get('/thumbtest', (req, res) => {
    res.redirect('https://avatars0.githubusercontent.com/u/17202261?v=2&s=150');
})


router.get('/errtest', (req, res) => {
    res.json({test: 1})
})

export default router;