import express from 'express';
import * as controller from './common.controller.js';

const router = express.Router();

router.get('/sidebar-links', controller.getSidebarLinks);
router.get('/friend-list', controller.getFriendList);
router.get('/search-user/:username', controller.getSearchUser);

export default router;