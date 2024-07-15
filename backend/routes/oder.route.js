import express from 'express';
import { placeOrder, verifyOrder } from '../controllers/oder.controller.js';
import authMiddleware from './../middleware/auth.js';

const orderRoute = express.Router();

//!Order Placement route
orderRoute.post('/place', authMiddleware, placeOrder)

//! verify order
orderRoute.post('/verify', verifyOrder)

export default orderRoute;