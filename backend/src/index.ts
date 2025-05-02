const dotenv=require("dotenv");
dotenv.config();
import express from 'express';
import { userRouter } from './router/user';
import cors from 'cors'
import cookieparser from 'cookie-parser';
const app=express();
app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
}))
app.use(express.json());


app.use("/user",userRouter);


app.listen(3000,()=>{
    console.log("Server started!!!");
})