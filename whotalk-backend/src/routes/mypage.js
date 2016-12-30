import express from 'express';
import * as controller from './mypage.controller.js';

const router = express.Router();

router.get('/', controller.getAccountSetting);
router.get('/account', controller.getAccountSetting);
router.patch('/account', controller.updateAccountSetting);
router.post('/status-message', controller.changeStatusMessage);

export default router;