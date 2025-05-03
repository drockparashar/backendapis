import express from "express";
import { addFertilizer, getPlantData, harvest, newPlant, waterPlant } from "../controllers/plantController.js";

const router=express.Router();

router.post("/plant",newPlant);

router.patch("/plant/:id/water",waterPlant);

router.get("/plant/:id",getPlantData);

router.patch("/plant/:id/fertilize", addFertilizer);

router.patch("/plant/:id/harvest",harvest);

export default router;