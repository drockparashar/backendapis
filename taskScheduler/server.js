import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import processRouter from "./routes/processRoutes.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api',processRouter);

await mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log("Couldn't connect to MongoDB"))

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server started at port: ${process.env.PORT}`);
})