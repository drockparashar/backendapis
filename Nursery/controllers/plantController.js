import Plant from "../models/plant.js";
import { getUnit } from "../utils/getUnit.js";
import { growthStage } from "../utils/growthStage.js";

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
        if(getPlant.isHarvested)return res.status(200).json({message:"Plant has already been harvested"});
        if (!getPlant.isAlive) {
            return res.status(200).json({ message: "Your plant is already dead.", getPlant });
        }

        getPlant.growthProgress=getUnit(getPlant.growthProgress,getPlant.lastGrowthStage,getPlant.growthRate);
        getPlant.growthStage=growthStage(getPlant.growthProgress);
        getPlant.lastGrowthStage=Date.now();

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

        if(plant.isHarvested)return res.status(200).json({message:"Plant has already been harvested"});

        const timeELapsed=Math.floor(((Date.now()-plant.lastWateredDate)/(1000*60*60*24)));
        plant.health = Math.max(plant.health - 10 * timeELapsed, 0);

        if(plant.health<=0)plant.isAlive=false;

        plant.growthProgress=getUnit(plant.growthProgress,plant.lastGrowthStage,plant.growthRate);
        plant.growthStage=growthStage(plant.growthProgress);
        plant.lastGrowthStage=Date.now();

        await plant.save();

        if(plant.isAlive) return res.status(200).json({plant});

        return res.status(200).json({message:"Your plant died",plant});
    }catch(err){
        return res.status(400).json({message:"Couldn't fetch plant details",err});
    }
}

export async function addFertilizer(req,res){
    const _id=req.params.id;

    if(!_id)return res.status(400).json({message:"Enter valid plant id"});
    
    try{
        const plant=await Plant.findById({_id});

        if(plant.isHarvested)return res.status(200).json({message:"Plant has already been harvested"});

        const timeELapsed=Math.floor(((Date.now()-plant.lastWateredDate)/(1000*60*60*24)));
        plant.health = Math.max(plant.health - 10 * timeELapsed, 0);

        if(plant.health<=0)plant.isAlive=false;

        plant.growthProgress=getUnit(plant.growthProgress,plant.lastGrowthStage,plant.growthRate);
        plant.growthStage=growthStage(plant.growthProgress);
        plant.lastGrowthStage=Date.now();

        plant.growthRate+=0.25;
        plant.health=Math.min(plant.health+40,100);
        plant.lastWateredDate=Date.now();

        await plant.save();

        if(plant.isAlive) return res.status(200).json({plant});
        return res.status(200).json({message:"Fertilized plant successfully!",plant});


    }catch(err){
        return res.status(400).json({message:"Couldn't fertilize plant",err});
    }
}

export async function harvest(req,res){
    const _id=req.params.id;

    if(!_id)return res.status(400).json({message:"Enter valid plant id"});
    
    try{

        const plant=await Plant.findById({_id});

        if(plant.isHarvested)return res.status(200).json({message:"Plant has already been harvested"});

        plant.growthProgress=getUnit(plant.growthProgress,plant.lastGrowthStage,plant.growthRate);
        plant.growthStage=growthStage(plant.growthProgress);
        plant.lastGrowthStage=Date.now();

        if(plant.growthStage!='mature')return res.status(400).json({message:"Can't harvest the plant until it's mature",err});

        plant.isHarvested=true;

        await plant.save();

        return res.status(200).json({message:"Harvested plant successfully!",plant});

    }catch(err){
        return res.status(400).json({message:"Couldn't harvest plant",err});
    }
}