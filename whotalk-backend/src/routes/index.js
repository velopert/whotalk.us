import express from 'express';
import authentication from './authentication';
import channel from './channel';
import follow from './follow';
import message from './message';
import activity from './activity';
import common from './common';
import mypage from './mypage';


const router = express.Router();

router.use('/authentication', authentication);
router.use('/channel', channel);
router.use('/follow', follow);
router.use('/message', message);
router.use('/activity', activity);
router.use('/common', common);
router.use('/mypage', mypage);

export default router;
