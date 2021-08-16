import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

const user = {
  first_name: 'Bob',
  last_name: 'Dylan',
  email: 'bobdylan@test.com',
  pass: 'Pass1234'
}

const product = {
	name: 'iPhone X-pensive',
	description: 'This smarthphone is really cool and expensive',
	price: 800,
	category: 'smartphones'
}

let access_token = ''
let userId = 0
let productId = 0

describe('📦 /products route suite', () => {

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId = u.body.id
    access_token = response.body.access_token
  })

  afterAll( async () => {
    await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)
  })

  it('Should create product', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${access_token}`)
      .send(product)
      .expect('Content-Type', /json/)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    productId = response.body.id

    expect(response.body.name).toBe(product.name)
    expect(response.body.description).toBe(product.description)
    expect(response.body.price).toBe(product.price)
    expect(response.body.category).toBe(product.category)

    expect(response.status).toBe(201)
  })

  it('Should get list of products', async () => {
    const response = await request.get('/products')

    expect(response.body.length).toBeGreaterThan(0)
    expect(response.status).toBe(200)
  })

  it('Should get single products by id', async () => {
    const response = await request.get(`/products/${productId}`)

    expect(response.body.name).toBe(product.name)
    expect(response.body.description).toBe(product.description)
    expect(response.body.price).toBe(product.price)
    expect(response.body.category).toBe(product.category)
    expect(response.status).toBe(200)
  })

  it('Should delete single product by id', async () => {
    const response = await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${access_token}`)

    expect(response.body.name).toBe(product.name)
    expect(response.body.description).toBe(product.description)
    expect(response.body.price).toBe(product.price)
    expect(response.body.category).toBe(product.category)
    expect(response.status).toBe(200)
  })

})
