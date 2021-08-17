import { Order } from '../../models/order'
import supertest from 'supertest'
import app from '../../server'

let access_token = ''
let userId = 0
let productId = 0
let order: Order = {
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
	price: 800,
	category: 'smartphones'
}

describe('👾 /dashboard routes suite', () => {

  beforeAll( async () => {
    const u = await request
      .post('/users')
      .send(user)
      .expect('Content-Type', /json/)

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
    userId = u.body.id
    access_token = responseAuth.body.access_token

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
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)

    await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)
  })

  it('Should get active order by user', async () => {
    const response = await request
      .get('/active-order')
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)


    expect(response.body.id).toBe(order.id)
    expect(response.body.order_status).toBe(order.order_status)
    expect(Number(response.body.user_id)).toBe(userId)

    expect(response.status).toBe(200)
  })

  it('Should get products in orders', async () => {
    const response = await request
      .get('/products-in-orders')
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)

    expect(response.body[0]).toEqual({ 
      name: 'iPhone X-pensive', 
      price: 800, 
      order_id: '1' 
    })
    expect(response.status).toBe(200)
  })
})
