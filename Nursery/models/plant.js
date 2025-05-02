import mongoose from "mongoose";

const plantSchema=new mongoose.Schema({
    species:{
        type:String,
        required:true
    },
    plantingDate:{
        type:Date,
        default:Date.now()
    },
    lastWateredDate:{
        type:Date,
        default:Date.now()
    },
    health:{
        type:Number,
        default:100
    },
    growthStage:{
        type:String,
        enum:['seed', 'seedling', 'young', 'mature'],
        default:'seed'
    },
    isAlive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const Plant=mongoose.model('plant',plantSchema);
export default Plant;