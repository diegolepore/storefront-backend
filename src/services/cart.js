const client =  require('../database')
const OrderStore = require('../models/order').OrderStore
const OrderProductStore = require('../models/order_product').OrderProductStore

const CartQueries = {
  async addProductToCart(userId, productId, quantity ) {
    try {
      const ordersql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=\'active\''
      const conn = await client.connect()
      const result = await conn.query(ordersql, [userId])
      const order = result.rows[0]
      
      // IF there is an 'active' order for the current authenticated user
      if(order) {
        // const orderProductQuery = 'SELECT * FROM order_products WHERE product_id=($1)'
        const orderProductQuery = `SELECT p.id as product_id, op.order_id, u.id as user_id, o.order_status as order_status 
        FROM products p 
        INNER JOIN order_products op ON p.id=op.product_id 
        INNER JOIN orders o ON op.order_id=o.id 
        INNER JOIN users u ON o.user_id=u.id 
        WHERE o.order_status='active' 
        AND u.id=($1) 
        AND p.id=($2)`
        
        const result = await conn.query(orderProductQuery, [userId, productId])
        const orderProducts = result.rows[0]
        
        conn.release()
        // IF the product is already in the order_products table
        if(orderProducts) {
          return { message: 'Product is alredy in the cart'}
        } 
        // ELSE, add the quantity, order id and products id to the 'order_products' table
        else {
          return await OrderProductStore.create(quantity, order.id, productId)
        }
      } else {
        const order = await OrderStore.create({ order_status: 'active'}, userId)
        const orderId = order?.id
        return await OrderProductStore.create(quantity, orderId, productId)
      }
      
    } catch (error) {
      throw new Error(`${error}`)
    }
  },

  async deleteProductFromCart(order_id, product_id) {
    try {
      const sql = 'DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [order_id, product_id])
        
      conn.release()

      return result.rows[0]

    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}

module.exports = { CartQueries }