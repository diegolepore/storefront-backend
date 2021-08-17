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

describe('👽 Order products route suite', () => {

  beforeAll( async () => {
    const u = await request
      .post('/users')
      .send(user)
      .expect('Content-Type', /json/)

    const responseAuth = await request
      .post('/users/auth')
      .send({
        email: u.body.email,
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

  it('Should add order and product id', async () => {
    const response = await request
      .post(`/orders/${order.id}/products`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({ 
        product_id: String(productId), 
        quantity: '2'
       })
      .expect('Content-Type', /json/)

    expect(response.status).toBe(201)
  })
})



