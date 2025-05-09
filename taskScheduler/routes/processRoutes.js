import express from "express";
import { completeTask, createProcess, deleteTask, getAllTasks, getDueTasks, getTask, updateTask } from "../controllers/processController.js";

const router=express.Router();

router.post('/tasks',createProcess);

router.get('/tasks',getAllTasks);

router.get('/tasks/due',getDueTasks);

router.get('/tasks/:id',getTask);

router.put('/tasks/:id',updateTask);

router.delete('/tasks/:id',deleteTask);

router.post('/tasks/:id/complete',completeTask);

export default router;