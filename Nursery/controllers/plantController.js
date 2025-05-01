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
        const watered_plant= await Plant.findByIdAndUpdate(_id,{lastWateredDate:Date.now(),health:100});
        return res.status(200).json({message:"Watered plant successfully!",watered_plant});
    }catch(err){
        res.status(400).json({message:"Error in watering plant !"})
    }
}