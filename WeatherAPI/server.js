import express from"express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";

const app= express();

app.use(cors());
app.use("/",weatherRoutes);
app.listen(5000, ()=>
    console.log("Server started on port: 3000"));