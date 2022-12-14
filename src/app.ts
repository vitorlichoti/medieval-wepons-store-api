import express from 'express';
import ProductController from './controller/product.controller';

const app = express();

app.use(express.json());

const productController = new ProductController();

app.get('/products', productController.getAll);

app.get('/orders');

app.post('/products', productController.create);

app.post('/users');

app.post('/login');

app.post('/orders');

export default app;
