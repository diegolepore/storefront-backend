import { Order } from '../../models/order'
import supertest from 'supertest'
import app from '../../server'

let access_token = ''
let userId = 0
let productId = 0
let order: Order = {
  id: 0,
  products: '',
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
	price: 800,
	category: 'smartphones'
}

describe('⭐️ /orders route suite', () => {

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

  it('Should create an order', async () => {
    const o = {
      products: `[{"id": "${productId}", "quantity": "5"}]`,
      order_status: 'active'
    }

    const response = await request
      .post('/orders')
      .set('Authorization', `Bearer ${access_token}`)
      .send(o)
      .expect('Content-Type', /json/)

    order = {
      id: response.body.id,
      products: response.body.products,
      order_status: response.body.order_status,
      user_id: response.body.user_id
    }

    expect(response.body.products).toBe(o.products)
    expect(response.body.order_status).toBe(o.order_status)
    expect(Number(response.body.user_id)).toBe(userId)

    expect(response.status).toBe(201)
  })

  it('Should get list of orders', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${access_token}`)

    expect(response.body.length).toBeGreaterThan(0)
    expect(response.status).toBe(200)
  })

  // app.put('/orders/:id', verifyJWT, editStatus)
  // app.delete('/orders/:id', verifyJWT, remove)

  it('Should get single order by id', async () => {
    const response = await request
      .get(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${access_token}`)

    if (order.products && order.order_status && order.user_id) {
      expect(response.body.products).toBe(order.products)
      expect(response.body.order_status).toBe(order.order_status)
      expect(response.body.user_id).toBe(order.user_id)
    }

    expect(response.status).toBe(200)
  })

  it('Should edit order status', async () => {
    const newOrderStatus = 'complete'
    const response = await request
      .put(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        status: newOrderStatus
      })

      order.order_status = newOrderStatus

      expect(response.body.order_status).toBe(newOrderStatus)
      expect(response.status).toBe(200)
  })

  it('Should delete single order by id', async () => {
    const response = await request
      .delete(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${access_token}`)

    if (order.products && order.order_status && order.user_id) {
      expect(response.body.products).toBe(order.products)
      expect(response.body.order_status).toBe(order.order_status)
      expect(response.body.user_id).toBe(order.user_id)
    }

    expect(response.status).toBe(200)
  })

})
