import express from 'express';
import * as controller from './activity.controller.js';


const router = express.Router();

router.get('/', controller.getActivity);


export default router;