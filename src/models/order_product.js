const client = require('../database')

// export type OrderProduct = {
//   quantity: number,
//   order_id,
//   product_id
// }

const OrderProductStore = {
  async create(quantity, orderId, productId) {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(ordersql, [orderId])
      const order = result.rows[0]

      if(order.order_status !== 'active') {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.order_status}`)
      }

      conn.release()
    } catch (error) {
      throw new Error(`${error}`)
    }
    
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [quantity, orderId, productId])
      const order = result.rows[0]

      conn.release()

      return order

    } catch (error) {
      throw new Error(`Could not add new product ${productId}. Error: ${error}`)
    }
  },

  async editQuantity(product_id, quantity) {
    try {
      const conn = await client.connect()
      const sql = 'UPDATE order_products SET quantity=($2) WHERE product_id=($1) RETURNING *'
      const result = await conn.query(sql, [product_id, quantity])
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Could edit the quantity. Error: ${error}`)
    }
  }
}

module.exports = { OrderProductStore }