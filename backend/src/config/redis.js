const {createClient}=require("redis");
const redisClient=createClient({
    url:process.env.REDIS_URL
});
redisClient.on("error",(error)=>{
    console.log("Redis Error",error);
})
const connectRedis=async()=>{
    try{
await redisClient.connect();
console.log("Redis connected successfully");
    }catch(error){
console.log("Redis connection failed:",error);
    }
}
module.exports={
    redisClient,
    connectRedis
}