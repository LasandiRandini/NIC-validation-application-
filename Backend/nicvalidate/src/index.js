import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import nicValidationRoutes from './routes/nicValidationRoutes.js';
import nicValidationRoutes from './routes/nicvalidate_route.js';

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/nicvalidate', nicValidationRoutes);

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`NIC Validation Service is running on port ${PORT}`);
});