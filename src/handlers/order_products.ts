import express, { Request, Response } from 'express'
import { OrderProductStore as store } from '../models/order_product'
import { verifyJWT } from '../middleware/auth.middleware'


const create = async (req: Request, res: Response) => {
  try {
    const orderId: string = req.params.id
    const productId: string = req.body.product_id
    const quantity: number = parseInt(req.body.quantity)

    const productAddedToCart = await store.create(quantity, orderId, productId)
    res.status(201)
    res.json(productAddedToCart)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json(error)
  }
}

const editQuantity = async (req: Request, res: Response) => {
    try {
    const product_id: string = req.body.product_id
    const quantity: number = parseInt(req.body.quantity)

    const productQuantityUpdateResponse = await store.editQuantity(product_id, quantity)
    res.status(201)
    res.json(productQuantityUpdateResponse)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json(error)
  }
}

const orderRoutes = (app: express.Application): void => {
  app.post('/orders/:id/products', verifyJWT, create)
  app.patch('/orders/edit-product-quantity', verifyJWT, editQuantity)
}

export default orderRoutes