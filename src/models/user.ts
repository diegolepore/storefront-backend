// @ts-ignore
import client from '../database'
import bcrypt from 'bcrypt'

export type User = {
  id?: number,
  first_name?: string; 
  last_name?: string; 
  email: string; 
  password_digest: string;
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
      const sql = 'INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
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
  }
}