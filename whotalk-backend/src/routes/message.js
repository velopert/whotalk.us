import express from 'express';
import * as controller from './message.controller.js';


const router = express.Router();

router.get('/recent/:username', controller.getRecentMsg);
router.get('/before/:username/:cursorId', controller.getMsgBefore);
router.get('/between/:username/:startId/:endId', controller.getMsgBetween);

export default router;