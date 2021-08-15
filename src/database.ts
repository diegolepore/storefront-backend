import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PROD_HOST,
  POSTGRES_PROD_DB,
  POSTGRES_PROD_TEST_DB,
  POSTGRES_PROD_USER,
  POSTGRES_PROD_PASSWORD,
  ENV
} = process.env

let client

if(ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}

if(ENV === 'prod') {
  client = new Pool({
    host: POSTGRES_PROD_HOST, 
    database: POSTGRES_PROD_DB,
    user: POSTGRES_PROD_USER, 
    password: POSTGRES_PROD_PASSWORD
  })
}

if(ENV === 'test_dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}

if(ENV === 'test_prod') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_PROD_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}

export default client as Pool