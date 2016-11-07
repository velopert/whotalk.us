import express from 'express';
import * as controller from './follow.controller.js';

const router = express.Router();

router.post('/:followee', controller.follow);
router.delete('/:followee', controller.unfollow);

router.get('/:followee', controller.getFollowers);
router.get('/:followee/:cursorId', controller.getFollowersAfter);

export default router;