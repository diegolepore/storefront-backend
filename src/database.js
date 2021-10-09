import dotenv from 'dotenv'
import { Pool } from 'pg'
import { parse } from 'pg-connection-string'

// parse('postgres://someuser:somepassword@somehost:381/somedatabase')
// "postgres://full_stack_user:Pass1234@storefront-db-test-instance-1.cekeonejxbqq.us-east-2.rds.amazonaws.com:5432/postgres"
// postgres://<user>:<password>@<host>:<port>/<database>?<query>

dotenv.config()

const {
  ENV,
  DATABASE_DEV_URL,
  DATABASE_TEST_DEV_URL,
  DATABASE_PROD_URL,
  DATABASE_STAGING_URL,
  DATABASE_TEST_AWS
} = process.env

let client

if(ENV === 'dev') {
  const config = parse(DATABASE_DEV_URL)
  client = new Pool(config)
}

if(ENV === 'test_dev') {
  const config = parse(DATABASE_TEST_DEV_URL)
  client = new Pool(config)
}

if(ENV === 'production') {
  const config = parse(DATABASE_PROD_URL)
  client = new Pool(config)
}

if(ENV === 'staging') {
  const config = parse(DATABASE_STAGING_URL)
  client = new Pool(config)
}
  
if(ENV === 'test_aws') {
  const config = parse(DATABASE_TEST_AWS)
  client = new Pool(config)
}

export default client