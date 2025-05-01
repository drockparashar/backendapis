
import { TodoModel } from "../models/todoSchema";

export default async function add(req,res) {
    const task=req.body;

    try{
        const newEntry= new TodoModel({task});
        await newEntry.save();

    }catch(err){
        return res.status(400).json({message:"Something went wrong"});
    }

    res.status(200).json({message:"Item added successfully"});
}

export default async function update(req,res) {
    const {_id,completed}=req.body; 
    const todo=await TodoModel.findOne(_id);
    if(!todo){
        return res.status(400).json({message:"Item not found"});
    }   
    try{
        const entry=await TodoModel.findByIdAndUpdate(_id, {completed:completed},{new:true});
        return res.status(200).json({message:"Item update successfully",entry})
    }catch(err){
        return res.status(400).json({message:"Something went wrong"});
    }
   ;
}

export default async function del(req,res) {
    const _id=req.params;
    try{
        const entry=await TodoModel.findByIdAndDelete(_id,{new:true});
        return res.status(200).json({message:"Item deleted successfully",entry});
    }catch(err){
        return res.status(400).json({message:"Something went wrong"});
    }
}