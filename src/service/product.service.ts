import IProduct from '../interfaces/Iproducts';
import connection from '../models/connection';
import ProductModel from '../models/product.model';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    return this.model.getAll();
  }

  public async create(product: IProduct): Promise<IProduct> {
    return this.model.create(product);
  }
}

export default ProductService;