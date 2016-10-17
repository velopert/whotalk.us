import express from 'express';
import * as controller from './channel.controller.js';


const router = express.Router();

router.get('/valid/:username', controller.valid);


export default router;