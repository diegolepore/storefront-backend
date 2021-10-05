import dotenv from 'dotenv'
import { Pool, PoolConfig } from 'pg'

import { parse } from 'pg-connection-string'

// parse('postgres://someuser:somepassword@somehost:381/somedatabase')

// "postgres://full_stack_user:Pass1234@storefront-db-test-instance-1.cekeonejxbqq.us-east-2.rds.amazonaws.com:5432/postgres"
// postgres://<user>:<password>@<host>:<port>/<database>?<query>

dotenv.config()

const {
  ENV,
  DATABASE_DEV_URL,
  DATABASE_PROD_URL,
  DATABASE_TEST_DEV_URL,
  DATABASE_TEST_PROD_URL
} = process.env

let client

if(ENV === 'dev') {
  const config = parse(DATABASE_DEV_URL as string) as unknown as PoolConfig

  client = new Pool(config)

  // client = new Pool({
  //   host: POSTGRES_HOST,
  //   database: POSTGRES_DB,
  //   user: POSTGRES_USER,
  //   password: POSTGRES_PASSWORD
  // })


  // console.log('client', client)
  // console.log('config', config)
}

if(ENV === 'prod') {

  const config = parse(DATABASE_PROD_URL as string) as unknown as PoolConfig

  client = new Pool(config)

  // client = new Pool({
  //   host: POSTGRES_PROD_HOST, 
  //   database: POSTGRES_PROD_DB,
  //   user: POSTGRES_PROD_USER, 
  //   password: POSTGRES_PROD_PASSWORD
  // })
}

if(ENV === 'test_dev') {

  const config = parse(DATABASE_TEST_DEV_URL as string) as unknown as PoolConfig

  client = new Pool(config)
  
  // client = new Pool({
    //   host: POSTGRES_HOST,
    //   database: POSTGRES_TEST_DB,
    //   user: POSTGRES_USER,
    //   password: POSTGRES_PASSWORD
    // })
  }
  
  if(ENV === 'test_prod') {
    const config = parse(DATABASE_TEST_PROD_URL as string) as unknown as PoolConfig

    client = new Pool(config)

    // client = new Pool({
    //   host: POSTGRES_PROD_HOST,
    //   database: POSTGRES_PROD_TEST_DB,
    //   user: POSTGRES_PROD_USER,
    //   password: POSTGRES_PROD_PASSWORD
    // })
}

export default client as Pool