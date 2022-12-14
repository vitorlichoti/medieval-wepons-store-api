import { Pool } from 'mysql2/promise';
import IOrders from '../interfaces/IOrders';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrders[]> {
    const [result] = await this.connection.execute(
      `SELECT ord.id, ord.user_id as userId, JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.orders as ord
      INNER JOIN Trybesmith.products as p
      ON ord.id = p.order_id
      GROUP BY p.order_id`,
    );

    return result as IOrders[];
  }
}