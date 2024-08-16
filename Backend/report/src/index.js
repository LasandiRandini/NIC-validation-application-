import express from 'express';
import cors from 'cors';
import reportRoutes from './routes/report_route.js';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use('/report', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
