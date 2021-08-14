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
  },

  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could retrieve the orders. Error: ${error}`)
    }
  },

  async show(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could retrieve the order. Error: ${error}`)
    }
  },

  async delete(id: string): Promise<Order | undefined> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could retrieve the order. Error: ${error}`)
    }
  }
}