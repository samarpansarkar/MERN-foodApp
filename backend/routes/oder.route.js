import express from 'express';
import placeOrder from '../controllers/oder.controller.js';
import authMiddleware from './../middleware/auth.js';

const orderRoute = express.Router();

//!Order Placement route
orderRoute.post('/place', authMiddleware, placeOrder)

export default orderRoute;