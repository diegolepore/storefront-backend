import express from 'express'
import { CartQueries } from '../services/cart'
import { verifyJWT } from '../middleware/auth.middleware'

const addProductToCart = async (req: express.Request, res: express.Response) => {
  try {
    const cartRes = await CartQueries.addProductToCart(
      req.body.userId,
      req.body.productId,
      req.body.quantity
    )
    res.json(cartRes)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json(error)
  }
}

const cartRoutes = (app: express.Application): void => {
  app.post('/add-to-cart', verifyJWT, addProductToCart)
}

export default cartRoutes