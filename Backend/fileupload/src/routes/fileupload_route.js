import express from 'express';
import { uploadFiles } from '../controller/fileupload_controller.js';
const router = express.Router();

router.post('/upload', uploadFiles);

export default router;
