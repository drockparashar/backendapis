import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import plantRouter from "./routes/plantRoutes.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api",plantRouter);

mongoose.connect(process.env.MONGO_URI).then(
    ()=>console.log("MongoDb connected")
).catch((err)=>console.log("Couldn't connect to database. Error: ",err))

app.listen(process.env.PORT|| 3001, ()=>console.log("Server started on PORT: 5000"));