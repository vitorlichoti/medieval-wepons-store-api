import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/Iproducts';

export default class BookModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
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