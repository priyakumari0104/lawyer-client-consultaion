const{createClient}=require("redis");
const redisClient= createClient({
    url:process.env.REDIS_URL||"redis://localhost:6379"
});
redisClient.on("error",(error)=>{
    console.log("redis error",error);
})
 const connectRedis=async()=>{
    try{
if(!redisClient.isOpen){
    await redisClient.connect();
}console.log("Redis connected succesfully");
    }catch(error){
console.log("redis connection failed",error.message);
    }
 }
 module.exports={redisClient,connectRedis};