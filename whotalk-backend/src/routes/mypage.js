import express from 'express';
import * as controller from './mypage.controller.js';

const router = express.Router();

router.get('/account', controller.getAccountSetting);

export default router;