/* eslint-disable no-undef */
const supertest =  require('supertest')
const app = require('../../../server')

let access_token = ''
let userId = 0
let productId = 0
const request = supertest(app)
const user = {
  first_name: 'Michael',
  last_name: 'Jordan',
  email: 'mj@test.com',
  pass: 'Pass1234'
}
const product = {
	name: 'iPhone X-pensive',
	description: 'This smarthphone is really cool and expensive',
  image_url: 'https://d1eh9yux7w8iql.cloudfront.net/product_images/36827_24756a33-907f-4a5a-ac95-73ce492104e7.jpg',
	price: 800,
	category: 'smartphones'
}

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

    userId = u.body.id
    access_token = response.body.access_token
  })

  afterAll( async () => {
    await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect('Content-Type', /json/)
  })

  it('Should create a product', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${access_token}`)
      .send(product)
      .expect('Content-Type', /json/)

    productId = response.body.id

    expect(response.body.name).toBe(product.name)
    expect(response.body.description).toBe(product.description)
    expect(response.body.image_url).toBe(product.image_url)
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
    expect(response.body.image_url).toBe(product.image_url)
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
    expect(response.body.image_url).toBe(product.image_url)
    expect(response.body.price).toBe(product.price)
    expect(response.body.category).toBe(product.category)
    expect(response.status).toBe(200)
  })

})
