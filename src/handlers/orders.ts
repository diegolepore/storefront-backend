import express, { Request, Response } from 'express'
import { Order, OrderStore as store } from '../models/order'
import { verifyJWT } from '../middleware/auth.middleware'

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      products: req.body.products,
      order_status: req.body.order_status,
      user_id: req.body.user_id
    }

    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.create(
      order, 
      userIdFromDecodedJWTMiddleware
    )
    res.status(201)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const index = async (req: express.Request, res: express.Response) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.index(userIdFromDecodedJWTMiddleware)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const show = async (req: express.Request, res: express.Response) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.show(req.params.id, userIdFromDecodedJWTMiddleware)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const remove = async (req: express.Request, res: express.Response) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.delete(
      req.params.id,
      userIdFromDecodedJWTMiddleware
    )
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const editStatus = async (req: express.Request, res: express.Response) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.editStatus(
      req.params.id, 
      userIdFromDecodedJWTMiddleware,
      req.body.status
    )
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const orderRoutes = (app: express.Application): void => {
  app.post('/orders', verifyJWT, create),
  app.get('/orders', verifyJWT, index)
  app.get('/orders/:id', verifyJWT, show),
  app.delete('/orders/:id', verifyJWT, remove)
  app.put('/orders/:id', verifyJWT, editStatus)
}

export default orderRoutes