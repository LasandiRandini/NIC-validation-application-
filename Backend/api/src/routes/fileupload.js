import express from 'express';
import httpProxy from 'http-proxy';

const router = express.Router();
const proxy = httpProxy.createProxyServer();

// Define the target for the file upload microservice
const fileUploadService = 'http://localhost:3000';

// Proxy requests to the file upload service
router.post('/upload', (req, res) => {
    proxy.web(req, res, { target: fileUploadService });
});

export default router;
