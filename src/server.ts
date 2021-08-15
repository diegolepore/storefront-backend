import express from 'express'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'
import dashboardRoutes from './handlers/dashboard'

const app = express()
const { ENV } = process.env
const port = process.env.PORT || (ENV?.includes('dev') ? process.env.APP_PORT : process.env.APP_PROD_PORT)

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



