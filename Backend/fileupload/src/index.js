import express from 'express';
import cors from 'cors';
// import fileUploadRoutes from './routes/fileupload_route.js';
import fileUploadRoutes from './routes/fileupload_route.js';

const app = express();

app.use(cors());
// Use file upload routes
app.use('/api/files', fileUploadRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`File Upload Service is running on port ${PORT}`);
});
