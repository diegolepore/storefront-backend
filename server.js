import express from 'express'
import userRoutes from './src/handlers/users'
import productRoutes from './src/handlers/products'
import orderRoutes from './src/handlers/orders'
import dashboardRoutes from './src/handlers/dashboard'
import orderProductsRoutes from './src/handlers/order_products'
import cartRoutes from './src/handlers/cart'
const cors = require('cors')

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

export default app



