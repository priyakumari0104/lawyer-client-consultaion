const messageModel=require("../models/message.model");
const  getMessages= async (req,res)=>{
    try{
         const message= await messageModel.find({
            appointmentId:req.params.appointmentId
         });
         res.status(200).json({
            message:"messages fetched successfully",
            success:true,
            message
         })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
module.exports={getMessages};