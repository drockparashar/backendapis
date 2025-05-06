import express from "express";
import requestIp from "request-ip";

const router=express.Router();

function getData(req,res){
    var clientIp = requestIp.getClientIp(req);
    return res.status(200).json({message:"Sample data",clientIp});
}

router.get("/time",getData);

export default router;