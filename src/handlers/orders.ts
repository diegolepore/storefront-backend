import express, { Request, Response } from 'express'
import { Order, OrderStore as store } from '../models/order'
import { verifyJWT } from '../middleware/auth.middleware'

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
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

const addOrderProducts = async (req: express.Request, res: express.Response) => {
  try {
    const orderId: string = req.params.id
    const productId: string = req.body.product_id
    const quantity: number = parseInt(req.body.quantity)

    const productAddedToCart = await store.addOrderProducts(quantity, orderId, productId)
    res.status(201)
    res.json(productAddedToCart)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const orderRoutes = (app: express.Application): void => {
  app.post('/orders', verifyJWT, create)
  app.get('/orders', verifyJWT, index)
  app.get('/orders/:id', verifyJWT, show)
  app.put('/orders/:id', verifyJWT, editStatus)
  app.post('/orders/:id/products', verifyJWT, addOrderProducts)
  app.delete('/orders/:id', verifyJWT, remove)
}

export default orderRoutes