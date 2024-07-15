import express from 'express';
import { placeOrder, userOrder, verifyOrder } from '../controllers/oder.controller.js';
import authMiddleware from './../middleware/auth.js';

const orderRoute = express.Router();

//!Order Placement route
orderRoute.post('/place', authMiddleware, placeOrder)

//! verify order
orderRoute.post('/verify', verifyOrder)

//! user orders
orderRoute.post('/myorder', authMiddleware, userOrder)

export default orderRoute;