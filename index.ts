import express from 'express';
import apiRoutes from './src/api';  
import cors from 'cors';

const app = express();
app.use(cors());
const port = 4000;

app.use('/api', apiRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to Cricket Match API');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
