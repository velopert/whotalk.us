import express from 'express';
import authentication from './authentication';
import channel from './channel';

const router = express.Router();

router.use('/authentication', authentication);
router.use('/channel', channel);

export default router;
