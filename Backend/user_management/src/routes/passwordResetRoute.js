import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/passwordResetController.js';

const router = express.Router();


router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
