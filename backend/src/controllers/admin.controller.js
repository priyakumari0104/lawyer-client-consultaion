const lawyermodel= require("../models/lawyer.model");
const clientModel=require("../models/client.model")
const Notification= require("../models/notification.model")
const approvelawyers= async (req,res)=>{
    try{
        const lawyer= await lawyermodel.findByIdAndUpdate(
            req.params.id,
            { verificationStatus:"verified"},
        {new:true});
        if(!lawyer){
            return res.status({
                success:false,
                message:"lawyer not found",
                
            })
        }
await Notification.create({
    userId:lawyer._id,
    title:"Profile  verified",
    message:"Congratulations! Your profile has been verified.You can now accept consultaion requests.",
    type:"success"
})
    res.status(200).json({
        message:"lawyer approved successfully",
        success:true,
        lawyer

    })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
const rejectlawyer=async (req,res)=>{
    try{
        const lawyer= await lawyermodel.findByIdAndUpdate (
            req.params.id,
            {verificationStatus:"rejected"},
        {new:true});
        await Notification.create({
            userId:lawyer._id,
            title:"profile Rejected",
            message:"Your profile verification was rejected. Please upload valid documents and resubmit your request.",
            type:"error"
        })
        res.status(200).json({
            message:"lawyer rejected",
            success:true,
            lawyer
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
const getpendinglawyer= async (req,res)=>{
    try{
        const lawyer= await lawyermodel.find({
            verificationStatus:"pending"
        });
        res.status(200).json({
            message:"pending lawyers fetched successfully",
            success:true,
            lawyer
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
const dashboardStats=async (req,res)=>{
    try{
        const totalLwyers= await  lawyermodel.countDocuments();
        const verifiedlawyers=await lawyermodel.countDocuments({
            verificationStatus:"verified"
        });
        const pendinglawyers=await lawyermodel.countDocuments({
            verificationStatus:"pending"
        });
        const totalclient=await clientModel.countDocuments();
        res.status(200).json({
            success:true,
            message:"dashboard states fetched",
            stats:{
                totalLwyers,
                verifiedlawyers,
                pendinglawyers,
                totalclient
            }
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={approvelawyers,rejectlawyer,getpendinglawyer,dashboardStats};