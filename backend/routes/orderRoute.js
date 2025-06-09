import express from 'express'
import {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, orderCount } from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)

// verify payment
orderRouter.post('/verifyStripe',authUser, verifyStripe)

// Order count
orderRouter.get('/count', orderCount);  // This route will return the order count
orderRouter.get('/', allOrders);  // This route will return all orders

export default orderRouter