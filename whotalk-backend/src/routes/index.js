import express from 'express';
import authentication from './authentication';
import channel from './channel';
import follow from './follow';
import message from './message';
import activity from './activity';

const router = express.Router();

router.use('/authentication', authentication);
router.use('/channel', channel);
router.use('/follow', follow);
router.use('/message', message);
router.use('/activity', activity);

export default router;
