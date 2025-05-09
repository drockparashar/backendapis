import mongoose from "mongoose";

const processSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:"A new task"
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    }
})

const Process= mongoose.model('process',processSchema);

export default Process;