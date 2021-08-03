import express, { Request, Response } from 'express'
import { User, UserStore as store } from '../models/user'

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password_digest: req.body.password
  }

  try {
    const newUser = await store.create(user)
    res.json(newUser)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const index = async (req: Request, res: Response) => {
  try {
    const user = await store.index()
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.post('/users', create)
}

export default userRoutes