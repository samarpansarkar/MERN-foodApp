import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import "dotenv/config"
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/oder.route.js';
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors([process.env.FRONTEND_URL]));

//!DB connection
connectDB();

//!Api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use('/api/user', userRouter);
app.use("/api/user/cart", cartRoute);
app.use("/api/order", orderRoute);



app.get('/', (req, res) => {
    res.send('API working!!!');
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})