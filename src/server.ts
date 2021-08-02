import express from 'express'
import userRoutes from './handlers/users'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api root')
})

userRoutes(app)

app.listen(port, (): void => { 
  console.log(`Server started at http://localhost:${port}`)
})

export default app



