// import { Order } from '../../models/order'
import { OrderProductStore as store } from '../../models/order_product'
import supertest from 'supertest'
import app from '../../../server'

let access_token = ''
let userId = 0
let productId = 0
let order = {
  id: 0,
  order_status: '',
  user_id: 0
}
const request = supertest(app)
const user = {
  first_name: 'Bill',
  last_name: 'Gates',
  email: 'billgates@test.com',
  pass: 'Pass1234'
}
const product = {
	name: 'iPhone X-pensive',
	description: 'This smarthphone is really cool and expensive',
  image_url: 'https://d1eh9yux7w8iql.cloudfront.net/product_images/36827_24756a33-907f-4a5a-ac95-73ce492104e7.jpg',
	price: 800,
	category: 'smartphones'
}

describe('👽 Order products model suite', () => {

  beforeAll( async () => {
    const u = await request
      .post('/users')
      .send(user)
      .expect('Content-Type', /json/)

    const response = await request
      .post('/users/auth')
      .send({
        email: user.email,
        pass: user.pass
      })
      .expect('Content-Type', /json/)

    const p = await request
      .post('/products')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .send(product)
      .expect('Content-Type', /json/)

    productId = p.body.id
    userId = u.body.id
    access_token = response.body.access_token

    const o = {
      order_status: 'active'
    }
    const orderResponse = await request
      .post('/orders')
      .set('Authorization', `Bearer ${access_token}`)
      .send(o)
      .expect('Content-Type', /json/)

    order = {
      id: orderResponse.body.id,
      order_status: orderResponse.body.order_status,
      user_id: orderResponse.body.user_id
    }
  })

  afterAll( async () => {
    await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)

    await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)
  })

  it('should have an create method', () => {
    expect(store.create).toBeDefined()
  })


  it('Should add order and product id', async () => {
    const orderProd = { 
      product_id: String(productId), 
      quantity: 2
    }
    const result = await store.create(orderProd.quantity, String(order.id), orderProd.product_id)

    expect(result.quantity).toBe(orderProd.quantity)
    expect(result.product_id).toBe(orderProd.product_id)
    expect(result.order_id).toBe(String(order.id))
  })
})