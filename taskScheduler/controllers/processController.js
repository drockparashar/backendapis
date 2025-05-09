import mongoose from "mongoose";
import Process from "../models/Process.js";

export async function createProcess(req,res){
    const {title, description, dueDate}=req.body;

    try{
        const newProcess=new Process({title, description, dueDate,});
        await newProcess.save();

        return res.status(200).json({message:"New Process created!",newProcess});
    }catch(err){
        return res.status(400).json({message:"Couldn't create new process"})
    }
}

export async function getAllTasks(req,res) {

    try{
        const processes=await Process.find({});

        return res.status(200).json({message:"All processes fetched",processes});
    }catch(err){
        return res.status(400).json({message:"Couldn't get processes"})
    }
    
}

export async function getTask(req,res) {

    const _id=req.params.id;

    if(!_id)return res.status(400).json({message:"Enter a valid id"});

    try{
        const process=await Process.findById({_id});

        if(!process)return res.status(400).json({message:"Couldn't fetch process"});

        return res.status(200).json({message:"Process fetched!",process});
    }catch(err){
        return res.status(400).json({message:"Couldn't get process"})
    }
    
}

export async function updateTask(req,res) {
    let {title,description,dueDate}=req.body;
    const _id=req.params.id;

    if(!_id)return res.status(400).json({message:"Enter a valid id"});

    try{
        const process=await Process.findById(_id);
        if(!process)return res.status(400).json({message:"Couldn't find process"});

        title = title || process.title;
        description = description || process.description;
        dueDate = dueDate || process.dueDate;

        const updatedProcess=await Process.findByIdAndUpdate(_id,{title,description,dueDate},{new:true});

        return res.status(200).json({message:"Process updated!",updatedProcess});        
    }catch(err){
        return res.status(400).json({message:"Couldn't update process"});
    }
}

export async function deleteTask(req,res) {
    const _id=req.params.id;

    if(!_id)return res.status(400).json({message:"Enter a valid id"});

    try{
        const process=await Process.findByIdAndDelete(_id);

        if(!process)return res.status(400).json({message:"Couldn't delete process"});

        return res.status(200).json({message:"Process deleted!",process});
    }catch(err){
        return res.status(400).json({message:"Couldn't delete process"});
    }
}

export async function completeTask(req,res) {
    const _id=req.params.id;

    if(!_id)return res.status(400).json({message:"Enter a valid id"});

    try{
        const process=await Process.findById(_id);
        if(!process)return res.status(400).json({message:"Couldn't find process"});

        const updatedProcess=await Process.findByIdAndUpdate(_id,{status:'completed'},{new:true});

        return res.status(200).json({message:"Process marked as completed!",updatedProcess});        
    }catch(err){
        return res.status(400).json({message:"Couldn't update process"});
    }
}

export async function getDueTasks(req,res) {
     try{
        let processes=await Process.find({});

        const now=new Date();

        processes=processes.filter(process=>{
            return process.status!='completed' && new Date(process.dueDate)>now
        })

        return res.status(200).json({message:"All processes fetched",processes});
    }catch(err){
        return res.status(400).json({message:"Couldn't get processes",error:err.message})
    }
}