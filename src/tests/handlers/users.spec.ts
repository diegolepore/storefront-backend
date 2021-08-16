import supertest from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'

const request = supertest(app)

const user = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john_doe@test.com',
  pass: 'Pass1234'
}

let access_token = ''

describe('🧪 /users route', () => {

  it('Should create a user', async () => {
    const response = await request
      .post('/users')
      .send(user)
      .expect('Content-Type', /json/)

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
    const decodedJwt = jwt.decode(access_token) as jwt.JwtPayload
    expect(user.email).toBe(decodedJwt.user.email)
    expect(response.status).toBe(200)
  })

  it('Should get list of users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${access_token}`)

    expect(response.body.length).toBe(1)
    expect(response.body[0].email).toBe(user.email)
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
      .get('/users/1')
      .set('Authorization', `Bearer ${access_token}`)

    expect(response.body.first_name).toBe(user.first_name)
    expect(response.body.last_name).toBe(user.last_name)
    expect(response.body.email).toBe(user.email)
    expect(response.status).toBe(200)
  })

  it('Should NOT return single user by id, instead it should return 401 due to invalid access_token', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', `somestuff${access_token}`)

    expect(response.status).toBe(401)
  })
})
