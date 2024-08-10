import express from 'express';
import { validateNICs,getNICDetails } from '../controller/nicvalidate_controller.js';

const router = express.Router();

router.post('/validate-nics', validateNICs);
router.get('/nic-details', getNICDetails);

export default router;
