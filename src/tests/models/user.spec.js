import { User, UserStore as store } from '../../models/user'

let userId = 0
const user = {
  first_name: 'Fat',
  last_name: 'Mike',
  email: 'fatmike@test.com',
  pass: 'Pass1234'
}

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
    const result = await store.create({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      pass: user.pass
    })

    if(result) {
      userId = result.id
  
      expect(result.first_name).toBe(user.first_name)
      expect(result.last_name).toBe(user.last_name)
      expect(result.email).toBe(user.email)
    }
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    
    if(result) {
      expect(result.length).toBeGreaterThan(0)
    }
  })

  it('show method should return the correct user', async () => {
    const result = await store.show(String(userId))

    if(result) {
      expect(result.first_name).toBe(user.first_name)
      expect(result.last_name).toBe(user.last_name)
      expect(result.email).toBe(user.email)
    }
  })

  it('delete method should remove the user', async () => {
    const deletedUser = await store.delete(String(userId))
    
    if(deletedUser) {
      expect(deletedUser.email).toBe(user.email)
    }
  })
})