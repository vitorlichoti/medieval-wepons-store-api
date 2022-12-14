import { Request, Response } from 'express';
import ProductService from '../service/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (req: Request, res: Response) => {
    const productList = await this.productService.getAll();
    return res.status(200).json(productList);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.create(product);
    return res.status(201).json(productCreated);
  };
}

export default ProductController;