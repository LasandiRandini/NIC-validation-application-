import express from 'express';
import httpProxy from 'http-proxy';

const app = express();
const proxy = httpProxy.createProxyServer();

const PORT = process.env.PORT || 3002;

// Proxy route to handle errors
const proxyRoute = (path, target) => {
    app.use(path, (req, res) => {
        proxy.web(req, res, { target }, (error) => {
            console.error(`Error proxying to ${target}:`, error.message);
            res.status(502).send('Bad Gateway');
        });
    });
};

// Dashboard Service
proxyRoute('/dashboard', 'http://localhost:3003');

// File Upload Service
proxyRoute('/fileupload', 'http://localhost:3000');

// NIC Validate Service
proxyRoute('/nicvalidate', 'http://localhost:3004');

// User Management Service
proxyRoute('/user_management', 'http://localhost:3001');

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
