import express from 'express'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'

const app = express()
const port = process.env.PORT || process.env.APP_PORT

app.use(express.json())

let count = 0

app.get('/', (req, res) => {
  count++
  res.send(`Api root ${count}`)
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)

app.listen(port, (): void => { 
  console.log(`Server started at http://localhost:${port}`)
})

export default app



