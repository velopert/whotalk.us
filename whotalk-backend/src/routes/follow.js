import express from 'express';
import * as controller from './follow.controller.js';

// wrapper that catches all errors and sends them as 500 response using express
const asyncRequest = (asyncFn, req, res) => asyncFn(req, res).catch(e => {
    res
        .status(500)
        .json({message: e.message})
    console.error(e)
});

const router = express.Router();

router.post('/:followee', asyncRequest.bind(null, controller.follow));
router.delete('/:followee', asyncRequest.bind(null, controller.unfollow));

router.get('/following/:username', controller.getFollowing);
router.get('/following/:username/:cursorId', controller.getFollowingAfter);

router.get('/:followee', controller.getFollowers);
router.get('/:followee/:cursorId', asyncRequest.bind(null, controller.getFollowersAfter));

export default router;