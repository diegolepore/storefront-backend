import client from '../database'
import { Order } from '../models/order'

export const DashboardQueries = {
  async currentOrderByUser(userId: string): Promise<Order | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=\'active\''
      const result = await conn.query(sql, [userId])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could retrieve the order. Error: ${error}`)
    }
  },

  async productsInOrders(): Promise<{name: string, price:number, order_id: string}[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id=order_products.product_id'
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`unable get products and orders: ${error}`)
    }
  }
}