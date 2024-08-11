import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api/dashboard', createProxyMiddleware({
    target: 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: {
      '^/api/dashboard': '', 
    },
  }));

// User Management Service
app.use('/api/user', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/user': '', 
  },
}));

// File Upload Service
app.use('/api/files', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/files': '', 
  },
}));

// NIC Validation Service
app.use('/api/nicvalidate', createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true,
  pathRewrite: {
    '^/api/nicvalidate': '', 
  },
}));


app.use('/api/report', createProxyMiddleware({
    target: 'http://localhost:3006',
    changeOrigin: true,
    pathRewrite: {
      '^/api/report': '', 
    },
  }));

// Start the API Gateway server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});