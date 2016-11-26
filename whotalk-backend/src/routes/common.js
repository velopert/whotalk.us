import express from 'express';
import * as controller from './common.controller.js';

const router = express.Router();

router.get('/sidebar-links', controller.getSidebarLinks);

export default router;