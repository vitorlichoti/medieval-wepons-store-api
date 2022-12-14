import express from 'express';
import ProductController from './controller/product.controller';
import UserController from './controller/user.controller';

const app = express();

app.use(express.json());

const productController = new ProductController();
const userController = new UserController();

app.get('/products', productController.getAll);

app.get('/orders');

app.post('/products', productController.create);

app.post('/users', userController.create);

app.post('/login');

app.post('/orders');

export default app;
