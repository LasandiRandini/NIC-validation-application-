import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard_route.js';

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Dashboard Service is running on port ${PORT}`);
});