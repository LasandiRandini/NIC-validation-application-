import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();
import cors from 'cors';

app.use(cors());

// File upload service
app.use('/api/files', createProxyMiddleware({
    target: 'http://localhost:3000', 
    changeOrigin: true,
    pathRewrite: { '^/api/files': '' },
}));

// NIC validation service
app.use('/api/nicvalidate', createProxyMiddleware({
    target: 'http://localhost:3004', 
    changeOrigin: true,
    pathRewrite: { '^/api/nicvalidate': '' },
}));

// Dashboard service
app.use('/api/dashboard', createProxyMiddleware({
    target: 'http://localhost:3003', 
    changeOrigin: true,
    pathRewrite: { '^/api/dashboard': '' },
}));

// Report service
app.use('/api/report', createProxyMiddleware({
    target: 'http://localhost:3007', 
    changeOrigin: true,
    pathRewrite: { '^/api/report': '' },
}));

// User management service
app.use('/api/user', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/api/user': '' },
}));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});