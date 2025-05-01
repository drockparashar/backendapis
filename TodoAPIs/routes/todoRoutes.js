import express from "express";
import {add,del,update} from "../controllers/todoController";

const router=express.Router();

router.post("/add",add);
router.put("/update",update);
router.delete("/delete/:id",del);

export default router;