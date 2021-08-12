// @ts-ignore
import client from '../database'
import bcrypt from 'bcrypt'

export type User = {
  id?: number,
  first_name?: string; 
  last_name?: string; 
  email: string; 
  pass: string;
}

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env

const pepper = BCRYPT_PASSWORD
const saltRounds = (SALT_ROUNDS as unknown) as string

export const UserStore = {
  async create(u: User): Promise<User | undefined> {
    try {
      const sql = 'INSERT INTO users (first_name, last_name, email, pass) VALUES ($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const hash = bcrypt.hashSync(
        u.pass + pepper,
        parseInt(saltRounds)
      )

      console.log(hash)
      const result = await conn.query(sql, [u.first_name, u.last_name, u.email, hash])
      const user = result.rows[0]

      conn.release()

      return user

    } catch (error) {
      throw new Error(`Could not add new user. Error: ${error}`)
    }
  },

  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get users. Error: ${error}`)
    }
  },

  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot get user. Error: ${error}`)
    }
  },

  async authenticate(email: string, pass:string): Promise<User | null> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE email=($1)'
      const result = await conn.query(sql, [email])

      console.log('pass+pepper: ', pass+pepper)


      if (result.rows.length) {
        const user = result.rows[0]
        console.log('user: ', user)

        if (bcrypt.compareSync(pass+pepper, user.pass)) {
          conn.release()
          return user
        }
      } 
      
      conn.release()
      return null
    } catch (error) {
      throw new Error(`Could not log the user in. Error: ${error}`)
    }
  }
}