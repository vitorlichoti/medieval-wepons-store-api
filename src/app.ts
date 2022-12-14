import express from 'express';

const app = express();

app.use(express.json());

app.get('/products');

app.post('/products');

export default app;
