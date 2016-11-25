import express from 'express';
import * as controller from './activity.controller.js';

const router = express.Router();

router.get('/', controller.getInitialActivity);
router.get('/before/:activityId', controller.getActivityBefore);


export default router;