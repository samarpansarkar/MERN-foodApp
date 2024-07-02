import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//!DB connection
connectDB();

//!Api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))

app.get('/', (req, res) => {
    res.send('API working!!!');
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})