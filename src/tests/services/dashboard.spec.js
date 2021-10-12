/* eslint-disable no-undef */
const DashboardQueries = require('../../services/dashboard').DashboardQueries
// import { User } from '../../models/user'
const supertest =  require('supertest')
const app = require('../../../server')
const jwt = require('jsonwebtoken')

let access_token = ''
let userFromJWT = {}
let productId = 0
let order = {
  id: 0,
  order_status: '',
  user_id: 0
}
const request = supertest(app)
const user = {
  first_name: 'Sponge',
  last_name: 'Bob',
  email: 'spongebob@test.com',
  pass: 'Pass1234'
}
const product = {
	name: 'iPhone X-pensive',
	description: 'This smarthphone is really cool and expensive',
  image_url: 'https://d1eh9yux7w8iql.cloudfront.net/product_images/36827_24756a33-907f-4a5a-ac95-73ce492104e7.jpg',
	price: 800,
	category: 'smartphones'
}

describe('👾 Dashboard model suite', () => {

  beforeAll( async () => {
    const responseAuth = await request
      .post('/users/auth')
      .send({
        email: user.email,
        pass: user.pass
      })
      .expect('Content-Type', /json/)

    const p = await request
      .post('/products')
      .set('Authorization', `Bearer ${responseAuth.body.access_token}`)
      .send(product)
      .expect('Content-Type', /json/)

    productId = p.body.id
    access_token = responseAuth.body.access_token
    userFromJWT = (jwt.decode(access_token)).user

    const responseOrder = await request
      .post('/orders')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        order_status: 'active'
      })
      .expect('Content-Type', /json/)

    order = {
      id: responseOrder.body.id,
      order_status: responseOrder.body.order_status,
      user_id: responseOrder.body.user_id
    }

    await request
      .post(`/orders/${order.id}/products`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({ 
        product_id: String(productId), 
        quantity: '2'
       })
      .expect('Content-Type', /json/)
  })

  afterAll( async () => {
    await request
      .delete(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${access_token}`)

    await request
      .delete(`/users/${userFromJWT.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)

    await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)
  })

  it('should have an currentOrderByUser method', () => {
    expect(DashboardQueries.currentOrderByUser).toBeDefined()
  })

  it('should have a productsInOrders method', () => {
    expect(DashboardQueries.productsInOrders).toBeDefined()
  })

  it('Should get active order by user', async () => {
    const result = await DashboardQueries.currentOrderByUser(String(userFromJWT.id))

    if(result) {
      expect(result.order_status).toBe(order.order_status)
      expect(result.user_id).toBe(order.user_id)
    }
  })

  it('Should get products in orders', async () => {
    const result = await DashboardQueries.productsInOrders()
    expect(result.length).toBeGreaterThan(0)
  })
})