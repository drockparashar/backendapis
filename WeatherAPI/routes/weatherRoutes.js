import express from "express";
import getData from "../controller/weatherController.js";

const router=express.Router();

router.get("/getData/:city", getData );

export default router;