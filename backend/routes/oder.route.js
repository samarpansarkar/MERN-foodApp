import express from 'express';
import { listOrders, placeOrder, userOrder, verifyOrder } from '../controllers/oder.controller.js';
import authMiddleware from './../middleware/auth.js';

const orderRoute = express.Router();

//!Order Placement route
orderRoute.post('/place', authMiddleware, placeOrder)

//! verify order
orderRoute.post('/verify', verifyOrder)

//! user orders
orderRoute.post('/myorder', authMiddleware, userOrder)

//!ADMIN
//!all orders route
orderRoute.get('/list', listOrders)

export default orderRoute;