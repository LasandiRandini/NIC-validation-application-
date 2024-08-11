const express = require('express');
const httpProxy = require('http-proxy');
const router = express.Router();
const proxy = httpProxy.createProxyServer();


const DASHBOARD_SERVICE_URL = 'http://localhost:3003';

// Route to forward requests related to the dashboard service
router.use((req, res) => {
    proxy.web(req, res, { target: DASHBOARD_SERVICE_URL });
});

module.exports = router;
