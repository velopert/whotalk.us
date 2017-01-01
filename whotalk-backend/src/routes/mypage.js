import express from 'express';
import * as controller from './mypage.controller.js';

const router = express.Router();

router.get('/', controller.getInitialSetting);
router.patch('/account', controller.updateAccountSetting);
router.patch('/channel', controller.updateChannelSetting);
router.delete('/message', controller.clearMessage);
router.delete('/unregister', controller.unregister);

export default router;