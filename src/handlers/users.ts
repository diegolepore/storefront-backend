import express, { Request, Response } from 'express'
import { User, UserStore as store } from '../models/user'
import jwt from 'jsonwebtoken'
import { verifyJWT } from '../middleware/auth.middleware'

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    pass: req.body.pass
  }

  try {
    const newUser = await store.create(user)
    res.status(201)
    res.json(newUser)
  } catch (error) {
    res.status(400)
    console.log(error)
    res.json(error)
  }
}

const index = async (req: Request, res: Response) => {
  try {
    const user = await store.index()
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const user = await store.show(id)
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const user = await store.delete(id)
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(req.body.email, req.body.pass)
    const access_token = jwt.sign({user}, process.env.TOKEN_SECRET as jwt.Secret)
    res.json({access_token: access_token})
  } catch (error) {
    res.status(401)
    res.json(error)
  }
}

const userRoutes = (app: express.Application): void => {
  app.post('/users', create)
  app.post('/users/auth', authenticate)
  app.get('/users', verifyJWT, index)
  app.get('/users/:id', verifyJWT, show)
  app.delete('/users/:id', verifyJWT, remove)
}

export default userRoutes