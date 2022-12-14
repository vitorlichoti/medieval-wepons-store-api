import { Request, Response } from 'express';
import OrderService from '../service/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const orderList = await this.orderService.getAll();
    return res.status(200).json(orderList);
  };
}

export default OrderController;