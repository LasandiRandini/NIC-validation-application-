import express from 'express';
import { getAllDetails } from '../controller/reportController.js';

const router = express.Router();

router.get('/getdetails', getAllDetails);

export default router;
