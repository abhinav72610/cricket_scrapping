import express from 'express';
import apiRoutes from './src/api';  
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 4000;

app.use(cors());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    message: "Too many requests from this IP, please try again later."
});

app.use('/api',apiLimiter, apiRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to Cricket Match API');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
