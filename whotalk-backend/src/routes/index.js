import express from 'express';
import authentication from './authentication';

const router = express.Router();

router.use('/authentication', authentication);

export default router;
