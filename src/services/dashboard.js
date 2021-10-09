const client = require('../database')
// import { Order } from '../models/order'

const DashboardQueries = {
  async currentOrderByUser(userId) {
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

  async productsInOrders() {
    try {
      const conn = await client.connect()
      const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id=order_products.product_id'
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`unable get products and orders: ${error}`)
    }
  },

  async productsInActiveOrder(userId) {
    try {
      const conn = await client.connect()
      // const sql = 'SELECT name, quantity, price, order_id FROM products INNER JOIN order_products ON products.id=order_products.product_id'
      const sql = 'SELECT p.id as product_id, p.name, p.price, p.image_url, o.order_status, quantity, order_id FROM products p INNER JOIN order_products op ON p.id=op.product_id INNER JOIN orders o ON op.order_id=o.id WHERE o.order_status=\'active\' AND o.user_id=($1) ORDER BY p.id ASC'
      const result = await conn.query(sql, [userId])

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`unable get products and orders: ${error}`)
    }
  }
}

module.exports = { DashboardQueries }