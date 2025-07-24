import { Router } from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryOrderController ,  getOrderDetailsControllere,  paymentController, webhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)

orderRouter.post("/checkout",auth,paymentController)

orderRouter.post("/webhook",webhookStripe)

orderRouter.get('/order-list',auth,getOrderDetailsControllere)



export default orderRouter