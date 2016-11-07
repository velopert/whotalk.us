import express from 'express';
import authentication from './authentication';
import channel from './channel';
import follow from './follow';


const router = express.Router();

router.use('/authentication', authentication);
router.use('/channel', channel);
router.use('/follow', follow);
export default router;
