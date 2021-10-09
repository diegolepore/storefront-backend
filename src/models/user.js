import client from '../database'
import bcrypt from 'bcrypt'

// export type User = {
//   id?: number,
//   first_name?; 
//   last_name?; 
//   email?; 
//   pass?;
// }

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env

const pepper = BCRYPT_PASSWORD
const saltRounds = (SALT_ROUNDS)

const excludeObjectProps = (objToFilter, prop) => {
  return Object.keys(objToFilter).filter((key) => {
    return key !== prop
  }).reduce((obj, current) => {
    return {
      ...obj,
      [current]: objToFilter[current]
    }
  }, {})
}

export const UserStore = {
  async create(u) {
    try {
      const sql = 'INSERT INTO users (first_name, last_name, email, pass) VALUES ($1, $2, $3, $4) RETURNING *'
      const conn = await client.connect()
      const hash = bcrypt.hashSync(
        (u.pass) + pepper,
        parseInt(saltRounds)
      )
      const result = await conn.query(sql, [u.first_name, u.last_name, u.email, hash])
      const user = result.rows[0]

      conn.release()

      return excludeObjectProps(user, 'pass')
    } catch (error) {
      throw new Error(`Could not add new user. Error: ${error}`)
    }
  },

  async index() {
    try {
      const sql = 'SELECT * FROM users'
      const conn = await client.connect()
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Cannot get users. Error: ${error}`)
    }
  },

  async show(id) {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      
      conn.release()

      return excludeObjectProps(result.rows[0], 'pass')
    } catch (error) {
      throw new Error(`Cannot get user. Error: ${error}`)
    }
  },

  async delete(id) {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      
      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot delete user. Error: ${error}`)
    }
  },

  async authenticate(email, pass) {
    try {
      
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE email=($1)'
      const result = await conn.query(sql, [email])
      
      let user
      
      if (result.rows.length) {
        user = result.rows[0]
        if (bcrypt.compareSync(pass+pepper, user.pass)) {
          conn.release()
          return excludeObjectProps(user, 'pass')
        }
      } 
      
      conn.release()
    } catch (error) {
      throw new Error(`Could not log the user in. Error: ${error}`)
    }
  }
}