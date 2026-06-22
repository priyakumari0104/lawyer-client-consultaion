const lawyermodel= require("../models/lawyer.model");
const approvelawyers= async (req,res)=>{
    try{
        const lawyer= await lawyermodel.findByIdAndUpdate(
            req.params.id,
            { verificationStatus:"verified"},
        {new:"true"});
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
        {new:"true"});
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
module.exports={approvelawyers,rejectlawyer,getpendinglawyer};