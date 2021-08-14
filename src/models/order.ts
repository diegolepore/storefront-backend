// @ts-ignore
import client from '../database'

export type Order = {
  id?: number,
  products: string,
  order_status: string,
  user_id: number
}

export const OrderStore = {
  async create(o: Order): Promise<Order | undefined> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO orders (products, order_status, user_id) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [JSON.stringify(o.products), o.order_status, o.user_id])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not add new order. Error: ${error}`)
    }
  }
}