import NodeCache from "node-cache";
import requestIp from "request-ip";

const myCache = new NodeCache({ stdTTL: 60, checkperiod: 30 });
export default function rateLimiter(req,res,next){
    var clientIp = requestIp.getClientIp(req);

    let value = myCache.get(clientIp);
    console.log(value);
    if(value==undefined){
        myCache.set(clientIp,1,120);
        return next();
    }
    else{
        if(value==5){
            return res.status(429).json({message:"Rate limit reached"});
        }
        
        const ttl=myCache.getTtl(clientIp)-Date.now();
        value+=1;
        myCache.set(clientIp,value,ttl/1000);
        next();
    }

}