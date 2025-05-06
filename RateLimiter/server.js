import express from "express";
import timeRouter from "./route.js"
const app=express();

app.use("/api",timeRouter);

app.listen(5000,()=>{
    console.log("Server started on port:3000")
})

