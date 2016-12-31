import express from 'express';
import * as controller from './channel.controller.js';


const router = express.Router();

router.get('/info/:username', controller.getInfo);
router.post('/favorite/:username', controller.addFavorite);
router.delete('/favorite/:username', controller.deleteFavorite);
router.get('/status-message/:username', controller.getStatusMessage);
// router.get('/thumbtest', (req, res) => {
//     res.redirect('https://avatars0.githubusercontent.com/u/17202261?v=2&s=150');
// })


export default router;