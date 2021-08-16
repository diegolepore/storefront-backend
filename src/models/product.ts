import client from '../database'

export type Product = {
  id?: number,
  name: string,
  description: string,
  price: number,
  category: string
}

export const ProductStore = {
  async create(p: Product): Promise<Product | undefined> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *'
      const result = await conn.query(sql, [p.name, p.description, p.price, p.category])
      const product = result.rows[0]
      conn.release()

      return product
    } catch (error) {
      throw new Error(`Could not add new product. Error: ${error}`)
    }
  },

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could not retrieve products. Error: ${error}`)
    }
  },

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      const product = result.rows[0]
      conn.release()

      return product
    } catch (error) {
      throw new Error(`Could not retrieve product ${id}. Error: ${error}`)
    }
  },

  async delete(id: string): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      const product = result.rows[0]
      conn.release()

      return product
    } catch (error) {
      throw new Error(`Could not retrieve product ${id}. Error: ${error}`)
    }
  }
}