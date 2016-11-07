import express from 'express';
import * as controller from './follow.controller.js';

// wrapper that catches all errors and sends them as 500 response using express
const asyncRequest = (asyncFn, req, res) =>
    asyncFn(req, res)
    .catch(e => res.status(500).json({message: e.message}));


const router = express.Router();

router.post('/:followee', controller.follow);
router.delete('/:followee', controller.unfollow);

router.get('/:followee', controller.getFollowers);
router.get('/:followee/:cursorId', asyncRequest.bind(null, controller.getFollowersAfter));

export default router;