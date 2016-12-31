import express from 'express';
import * as controller from './mypage.controller.js';

const router = express.Router();

router.get('/', controller.getInitialSetting);
router.patch('/account', controller.updateAccountSetting);
router.patch('/channel', controller.updateChannelSetting);

export default router;