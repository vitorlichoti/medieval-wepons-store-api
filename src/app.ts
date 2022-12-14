import express from 'express';
import OrderController from './controller/order.controller';
import ProductController from './controller/product.controller';
import UserController from './controller/user.controller';

const app = express();

app.use(express.json());

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.get('/products', productController.getAll);

app.get('/orders', orderController.getAll);

app.post('/products', productController.create);

app.post('/users', userController.create);

app.post('/login');

app.post('/orders');

export default app;
