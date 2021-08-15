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
  }
}