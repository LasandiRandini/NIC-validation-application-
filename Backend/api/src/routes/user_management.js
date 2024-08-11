import express from 'express';
import httpProxy from 'http-proxy';

const router = express.Router();
const proxy = httpProxy.createProxyServer();

// Define the target for the user management microservice
const userManagementService = 'http://localhost:3001';

// Proxy requests to the user management service
router.post('/register', (req, res) => {
    proxy.web(req, res, { target: userManagementService });
});

router.post('/login', (req, res) => {
    proxy.web(req, res, { target: userManagementService });
});

export default router;
