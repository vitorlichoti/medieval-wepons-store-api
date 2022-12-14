import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/Iproducts';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    const [result] = await this.connection.execute(
      'SELECT * FROM Trybesmith.products',
    );

    return result as IProduct[];
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    
    const { insertId } = result;
    return { id: insertId, ...product };
  }
}
