const {createClient}=require("redis");
const redisClient= createClient({
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD,
    socket:{
        host:process.env.REDIS_HOST,
        port:Number(process.env.REDIS_PORT),
        family:4
    }
});
redisClient.on("error",(error)=>{
    console.log("redis  error",error);
});
const connectRedis= async()=>{
    try{
await  redisClient.connect();
console.log("redis issuccessfully connected");
    }catch(error){
console.log("redis connection error",error);
    }
}
module.exports={
    redisClient,
    connectRedis
};