import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard_route.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/dashboard', dashboardRoutes);

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Dashboard Service is running on port ${PORT}`);
});