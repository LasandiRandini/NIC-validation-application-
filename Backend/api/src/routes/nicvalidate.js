import express from 'express';
import httpProxy from 'http-proxy';

const router = express.Router();
const proxy = httpProxy.createProxyServer();

// Define the target for the NIC validation microservice
const nicValidateService = 'http://localhost:3004';

// Proxy requests to the NIC validation service
router.post('/validate', (req, res) => {
    proxy.web(req, res, { target: nicValidateService });
});

export default router;
