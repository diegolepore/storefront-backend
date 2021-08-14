import express, { Request, Response } from 'express'
import { Order, OrderStore as store } from '../models/order'
import { verifyJWT } from '../middleware/auth.middleware'
import jwt from 'jsonwebtoken'

const create = async (req: express.Request, res: express.Response) => {
  try {
    const order: Order = {
      products: req.body.products,
      order_status: req.body.order_status,
      user_id: req.body.user_id
    }

    // @ts-ignore
    console.log('req.userId ⭐️ :', req.userId)
    // @ts-ignore
    const result = await store.create(order, req.userId)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const index = async (req: express.Request, res: express.Response) => {
  try {
    // @ts-ignore
    const result = await store.index(req.userId)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const show = async (req: express.Request, res: express.Response) => {
  try {
    // @ts-ignore
    const result = await store.show(req.params.id, req.userId)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const remove = async (req: express.Request, res: express.Response) => {
  try {
    // @ts-ignore
    const result = await store.delete(req.params.id, req.userId)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const editStatus = async (req: express.Request, res: express.Response) => {
  try {
    // @ts-ignore
    console.log('req ⭐️ :', req.body)
    // @ts-ignore
    const result = await store.editStatus(req.params.id, req.userId, req.body.status)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const orderRoutes = (app: express.Application) => {
  app.post('/orders', verifyJWT, create),
  app.get('/orders', verifyJWT, index)
  app.get('/orders/:id', verifyJWT, show),
  app.delete('/orders/:id', verifyJWT, remove)
  app.put('/orders/:id', verifyJWT, editStatus)
}

export default orderRoutes