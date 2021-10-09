const express = require('express')
const userRoutes = require('./src/handlers/users')
const productRoutes = require('./src/handlers/products')
const orderRoutes = require('./src/handlers/orders')
const dashboardRoutes = require('./src/handlers/dashboard')
const orderProductsRoutes = require('./src/handlers/order_products')
const cartRoutes = require('./src/handlers/cart')
const cors = require('cors')
require('regenerator-runtime/runtime')

let envPort
const { ENV } = process.env

if (ENV === 'test_dev' || ENV === 'test_aws') {
  envPort = 3333
} else if (ENV === 'dev') {
  envPort = process.env.APP_PORT
} else if (ENV === 'production') {
  envPort = process.env.APP_PROD_PORT
} else if (ENV === 'staging') {
  envPort = process.env.APP_STAGING_PORT
}

const app = express()
const port = process.env.PORT || envPort

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send('Api root')
})

userRoutes(app)
productRoutes(app)
dashboardRoutes(app)
orderRoutes(app)
orderProductsRoutes(app)
cartRoutes(app)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`)
})

module.exports = app



