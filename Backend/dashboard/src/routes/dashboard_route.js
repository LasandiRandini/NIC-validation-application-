import express from 'express';
import {getAllDetails,getGenderCounts,getAgeDistribution} from '../controller/dashboardController.js';

const router = express.Router();
router.get('/getdetails', getAllDetails);


router.get('/gender-counts', getGenderCounts);


router.get('/age-distribution', getAgeDistribution);

export default router;

