import express from "express";
import { getPlantData, newPlant, waterPlant } from "../controllers/plantController.js";

const router=express.Router();

router.post("/plant",newPlant);

router.put("/plant/:id/water",waterPlant);

router.get("/plant/:id",getPlantData);

export default router;