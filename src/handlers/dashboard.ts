import express from 'express'
import { DashboardQueries } from '../services/dashboard'
import { verifyJWT } from '../middleware/auth.middleware'

const currentOrderByUser = async (req: express.Request, res: express.Response) => {
  try {
    const userIdFromVerifyJWTMiddleware = req.body.userId
    const activeOrder = await DashboardQueries.currentOrderByUser(userIdFromVerifyJWTMiddleware)
    res.json(activeOrder)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const productsInOrders = async (req: express.Request, res: express.Response) => {
  try {
    const prodsInOrders = await DashboardQueries.productsInOrders()
    res.json(prodsInOrders)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const productsInActiveOrder = async (req: express.Request, res: express.Response) => {
  try {
    const prodsInActiveOrders = await DashboardQueries.productsInActiveOrder()
    res.json(prodsInActiveOrders)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const dashboardRoutes = (app: express.Application): void => {
  app.get('/active-order', verifyJWT, currentOrderByUser)
  app.get('/products-in-orders', verifyJWT, productsInOrders)
  app.get('/products-in-active-order', verifyJWT, productsInActiveOrder)
}

export default dashboardRoutes