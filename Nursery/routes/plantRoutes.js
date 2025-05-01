import express from "express";
import { newPlant, waterPlant } from "../controllers/plantController.js";

const router=express.Router();

router.post("/plant",newPlant);

router.put("/plant/:id/water",waterPlant);

export default router;