import express, { Request, Response } from 'express'
import { Order, OrderStore as store } from '../models/order'
import { verifyJWT } from '../middleware/auth.middleware'

const create = async (req: express.Request, res: express.Response) => {
  try {
    const order: Order = {
      products: req.body.products,
      order_status: req.body.order_status,
      user_id: req.body.user_id
    }

    const result = await store.create(order)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const orderRoutes = (app: express.Application) => {
  app.post('/orders', verifyJWT, create)
  // app.get('/orders/:id', verifyJWT, index),
  // app.get('/orders/:id', verifyJWT, show),
  // app.get('/orders/:id', verifyJWT, delete)
}

export default orderRoutes