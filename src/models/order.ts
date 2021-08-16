import client from '../database'

export type Order = {
  id?: number,
  products?: string,
  order_status?: string,
  user_id?: number
}

export const OrderStore = {
  async create(o: Order, userId: string): Promise<Order | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO orders (products, order_status, user_id) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [JSON.stringify(o.products), o.order_status, userId])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not add new order. Error: ${error}`)
    }
  },

  async index(userId: string): Promise<Order[] | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      const result = await conn.query(sql, [userId])
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could retrieve the orders. Error: ${error}`)
    }
  },

  async show(id: string, userId: string): Promise<Order | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)'
      const result = await conn.query(sql, [id, userId])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could retrieve the order. Error: ${error}`)
    }
  },

  async editStatus(id: string, userId: string, status: string ): Promise<Order | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'UPDATE orders SET order_status=($1) WHERE id=($2) AND user_id=($3) RETURNING *'
      const result = await conn.query(sql, [status, id, userId])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could retrieve the order. Error: ${error}`)
    }
  },

  async delete(id: string, userId: string): Promise<Order | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM orders WHERE id=($1) AND user_id=($2) RETURNING *'
      const result = await conn.query(sql, [id, userId])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could retrieve the order. Error: ${error}`)
    }
  }
}