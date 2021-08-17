import { Order, OrderStore as store } from '../../models/order'
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
  first_name: 'Bill',
  last_name: 'Gates',
  email: 'billgates@test.com',
  pass: 'Pass1234'
}
const product = {
	name: 'iPhone X-pensive',
	description: 'This smarthphone is really cool and expensive',
	price: 800,
	category: 'smartphones'
}

describe('⭐️ Order Model suite', () => {

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

  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a editStatus method', () => {
    expect(store.editStatus).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('create method should create an order', async () => {

    const o = {
      order_status: 'active'
    }
    const result: Order | undefined = await store.create({
      order_status: o.order_status
    }, String(userId))

    if (result) {
      order = {
        id: result.id,
        order_status: result.order_status,
        user_id: result.user_id
      }

      expect(result.order_status).toBe(o.order_status)
      expect(Number(result.user_id)).toBe(userId)
    }
  })

  it('index method should return a list of orders', async () => {
    const result: Order[] | undefined = await store.index(String(userId))
    if(result) {
      expect(result.length).toBeGreaterThan(0)
    }
  })

  it('show method should return the correct order', async () => {
    const result: Order | undefined = await store.show(String(order.id), String(userId))

    if(result) {
      expect(result.order_status).toBe(order.order_status)
      expect(Number(result.user_id)).toBe(userId)
    }
  })

  it('edits an order status', async () => {
    const newOrderStatus = 'complete'
    const result: Order | undefined = await store.editStatus(String(order.id), String(userId), newOrderStatus)

    if(result) {
      expect(result.order_status).toBe(newOrderStatus)
      expect(Number(result.user_id)).toBe(userId)
    }
  })

  it('delete method should remove the order', async () => {
    await store.delete(String(order.id), String(userId))
    const result = await store.index(String(userId))
    expect(result).toEqual([])
  })
})