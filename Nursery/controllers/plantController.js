import { get } from "mongoose";
import Plant from "../models/plant.js";

export async function newPlant(req,res) {
    const species = req.body.species.toLowerCase();
    if(!species)return res.status(400).json({message:"Enter a valid species!"});
    try{
        const new_plant=new Plant({species});
        await new_plant.save();
        return res.status(200).json({message:"New seed planted successfully!",new_plant});
    }catch(err){
        return res.status(400).json({message:"Something went wrong!", err});
    }
}

export async function waterPlant(req,res) {
    const _id=req.params.id;
    if(!_id)return res.status(400).json({message:"Enter a valid Id !"});

    try{
        const getPlant=await Plant.findById({_id});

        if (!getPlant.isAlive) {
            return res.status(200).json({ message: "Your plant is already dead.", plant });
        }

        const timeELapsed=Math.floor(((Date.now()-getPlant.lastWateredDate)/(1000*60*60))/24);
        getPlant.health=getPlant.health-(10*timeELapsed);

        if(getPlant.health<=0){
            getPlant.isAlive=false;
            await getPlant.save();
            return res.status(200).json({message:"Your plant died",Plant});
        }

        getPlant.health=Math.min(getPlant.health+20,100);
        getPlant.lastWateredDate=Date.now();
        await getPlant.save();
        return res.status(200).json({message:"Watered plant successfully!",getPlant});
    }catch(err){
        res.status(400).json({message:"Error in watering plant !"})
    }
}

export async function getPlantData(req,res) {
    const _id=req.params.id;

    if(!_id)return res.status(400).json({message:"Enter valid plant id"});

    try{
        const plant=await Plant.findById({_id});

        const timeELapsed=Math.floor(((Date.now()-plant.lastWateredDate)/(1000*60*60*24)));
        plant.health = Math.max(plant.health - 10 * timeELapsed, 0);

        if(plant.health<=0)plant.isAlive=false;

        await plant.save();

        if(plant.isAlive) return res.status(200).json({plant});

        return res.status(200).json({message:"Your plant died",plant});
    }catch(err){
        return res.status(400).json({message:"Couldn't fetch plant details",err});
    }
}

