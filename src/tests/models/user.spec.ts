/* eslint-disable @typescript-eslint/no-unused-vars */
import { User, UserStore as store } from '../../models/user'

const user = {
  first_name: 'Fat',
  last_name: 'Mike',
  email: 'fatmike@test.com',
  pass: 'Pass1234'
}

let userID: number | undefined = 0

describe('👤 User Model suite', () => {

  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined()
  })

  it('create method should add a user', async () => {
    const result: User | undefined = await store.create({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      pass: user.pass
    })

    userID = result?.id

    expect(result?.first_name).toBe(user.first_name)
    expect(result?.last_name).toBe(user.last_name)
    expect(result?.email).toBe(user.email)
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result.length).toBeGreaterThan(0)

    expect(result[0].first_name).toBe(user.first_name)
    expect(result[0].last_name).toBe(user.last_name)
    expect(result[0].email).toBe(user.email)
  })

  it('show method should return the correct user', async () => {
    const result = await store.show(String(userID))

    expect(result?.first_name).toBe(user.first_name)
    expect(result?.last_name).toBe(user.last_name)
    expect(result?.email).toBe(user.email)
  })

  it('delete method should remove the user', async () => {
    await store.delete(String(userID))
    const result = await store.index()

    // console.log('deletedUser: ', deletedUser)
    // console.log('result: ', result)

    
    expect(result).toEqual([])
  })
})