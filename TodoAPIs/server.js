import express from "express";
import todoRouter from "./routes/todoRoutes";
const app= express();
app.use("/",todoRouter);

app.listen(5000, ()=>console.log("Server started on port:5000"));