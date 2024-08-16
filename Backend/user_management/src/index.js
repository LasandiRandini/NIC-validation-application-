import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerRoutes from './routes/registerRoute.js';
import loginRoutes from './routes/loginRoute.js';
import passwordRoutes from './routes/passwordResetRoute.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/registerRoutes', registerRoutes);
app.use('/loginRoutes', loginRoutes);
app.use('/passwordRoutes', passwordRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`User Management Service running on port ${PORT}`);
});
