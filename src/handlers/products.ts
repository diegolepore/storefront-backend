import express, { Request, Response } from 'express'
import { Product, ProductStore as store } from '../models/product'
import { verifyJWT } from '../middleware/auth.middleware'

const create = async (req: Request, res: Response) => {
  const products: Product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  }

  try {
    const product = await store.create(products)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}
const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const product = await store.show(id)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}
// const edit
// const delete

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyJWT, create)
}

export default productRoutes