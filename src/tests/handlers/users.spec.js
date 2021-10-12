/* eslint-disable no-undef */
const supertest =  require('supertest')
const app = require('../../../server')
const jwt = require('jsonwebtoken')

const request = supertest(app)
const user = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john_doe@test.com',
  pass: 'Pass1234'
}
let access_token = ''
let usersLength = 0
let userId = 0

describe('👤 /users route suite', () => {

  it('Should create a user', async () => {
    const response = await request
      .post('/users')
      .send(user)
      .expect('Content-Type', /json/)

    userId = response.body.id

    expect(response.body.first_name).toBe(user.first_name)
    expect(response.body.last_name).toBe(user.last_name)
    expect(response.body.email).toBe(user.email)

    expect(response.status).toBe(201)
  })

  it('Should log the user in and return a JWT token', async () => {
    const response = await request
      .post('/users/auth')
      .send({
        email: user.email,
        pass: user.pass
      })
      .expect('Content-Type', /json/)

    access_token = response.body.access_token
    const decodedJwt = jwt.decode(access_token)
    expect(user.email).toBe(decodedJwt.user.email)
    expect(response.status).toBe(200)
  })

  it('Should get list of users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${access_token}`)

    usersLength = response.body.length

    expect(response.body.length).toBe(usersLength)
    expect(response.status).toBe(200)
  })

  it('Should NOT return users, instead it should return 401 due to invalid access_token', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `somestuff${access_token}`)

    expect(response.status).toBe(401)
  })

  it('Should get single user by id', async () => {
    const response = await request
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)

    expect(response.body.first_name).toBe(user.first_name)
    expect(response.body.last_name).toBe(user.last_name)
    expect(response.body.email).toBe(user.email)
    expect(response.status).toBe(200)
  })

  it('Should NOT return single user by id, instead it should return 401 due to invalid access_token', async () => {
    const response = await request
      .get(`/users/${userId}`)
      .set('Authorization', `somestuff${access_token}`)

    expect(response.status).toBe(401)
  })


  it('Should NOT delete single user by id, instead it should return 401 due to invalid access_token', async () => {
    const response = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `somestuff${access_token}`)

    expect(response.status).toBe(401)
  })

  it('Should delete single user by id', async () => {
    const response = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)

    expect(response.body.first_name).toBe(user.first_name)
    expect(response.body.last_name).toBe(user.last_name)
    expect(response.body.email).toBe(user.email)
    expect(response.status).toBe(200)
  })

})
