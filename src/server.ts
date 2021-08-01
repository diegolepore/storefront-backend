import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/api', (req, res) => {
  res.send('Api root')
})

app.listen(port, (): void => { 
  console.log(`Server started at http://localhost:${port}`)
})

export default app



