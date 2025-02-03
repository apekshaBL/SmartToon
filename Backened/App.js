import {config} from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './router/user.routes.js';
import bookRoutes from "./router/book.routes.js";
config();

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.FE_URL,
    credentials:true
}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/book',bookRoutes);

export default app;