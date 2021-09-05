import client from '../database'
import { OrderStore } from '../models/order'
import { OrderProductStore } from '../models/order_product'

export const CartQueries = {
  async addProductToCart(userId: string, productId: string, quantity: number ): Promise<unknown> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=\'active\''
      const conn = await client.connect()
      const result = await conn.query(ordersql, [userId])
      const order = result.rows[0]
      
      // IF there is an 'active' order for the current authenticated user
      if(order) {
        const orderProductQuery = 'SELECT * FROM order_products WHERE product_id=($1)'
        const result = await conn.query(orderProductQuery, [productId])
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
        const orderId = order?.id as unknown as string
        return await OrderProductStore.create(quantity, orderId, productId)
      }
      
    } catch (error) {
      throw new Error(`${error}`)
    }
    
    // try {
    //   const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
    //   const conn = await client.connect()
    //   const result = await conn.query(sql, [quantity, orderId, productId])
    //   const order = result.rows[0]

    //   conn.release()

    //   return order

    // } catch (error) {
    //   throw new Error(`Could not add new product ${productId}. Error: ${error}`)
    // }
  }
}