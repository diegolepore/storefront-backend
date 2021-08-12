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

const show = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const user = await store.show(id)
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const authUser: User = {
    email: req.body.email,
    pass: req.body.pass
  }
  try {
    const user = await store.authenticate(req.body.email,req.body.pass)
    // @ts-ignore
    const access_token = jwt.sign({user}, process.env.TOKEN_SECRET)
    res.json({access_token: access_token})
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const userRoutes = (app: express.Application) => {
  app.post('/users', create)
  app.post('/users/auth', authenticate)
  app.get('/users', verifyJWT, index)
  app.get('/user/:id', verifyJWT, show)
}

export default userRoutes