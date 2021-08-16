import express from 'express'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'
import dashboardRoutes from './handlers/dashboard'

let env
const { ENV } = process.env

if (ENV === 'test_dev' || ENV === 'test_prod') {
  env = 3333
} else if (ENV === 'dev') {
  env = process.env.APP_PORT
} else if (ENV === 'prod') {
  env = process.env.APP_PROD_PORT
}

const app = express()
const port = process.env.PORT || env

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api root')
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)
dashboardRoutes(app)

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`)
})

export default app



