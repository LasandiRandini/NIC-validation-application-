import express from 'express';
import { validateNICs } from '../controller/nicvalidate_controller.js';

const router = express.Router();

router.post('/validate-nics', validateNICs);

export default router;
