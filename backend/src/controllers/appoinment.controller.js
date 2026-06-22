const appoinmentModel = require("../models/appoinment.model");

const createAppoinment= async (req,res)=>{
    try{
        const {clientId,lawyerId,issueType,description}=req.body;
        
        const appoinment = await appoinmentModel.create({
            clientId:clientId,
            lawyerId:lawyerId,
            issueType:issueType,
            description:description
        });
        res.status(200).json({
            message:"appointment created successfully",
            success:true,
            appoinment
        })
    }catch(error){
          console.log(error);
res.status(500).json({
    message:error.message,
    success:false
})
    }
}
// getpending requests 
const getPendingRequest= async (req,res)=>{
    try{
        const requests= await appoinmentModel.find({
            lawyerId:req.params.lawyerId,
            status:"pending"
        }).populate("clientId");
        res.status(200).json({
            message:"pending appoinmets fetched succesfully",
            success:true,
            requests
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
// update the status of pending request to approve
const approverequest= async (req,res)=>{
    try{
        const requests=await appoinmentModel.findByIdAndUpdate(
            req.params.id,
            {status:"approved"},
            {new:true}
        )
        res.status(200).json({
            message:"appoinment approved successfully",
            success:true,
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
// reject pending requests
const rejectrequest= async (req,res)=>{
    try{
        const requests=await appoinmentModel.findByIdAndUpdate(
            req.params.id,
            {status:"rejected"},
            {new:true}
        )
        res.status(200).json({
            message:"request rejectd successfully",
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
const approvedappointment=async (req,res)=>{
    try{
        const requests=await appoinmentModel.find({
            lawyerId:req.params.lawyerId,
            status:"approved"
        }).populate("clientId");
        res.status(200).json({
            message:"approved requests fetched",
            success:true,
            requests
        })
    }catch(error){
res.status(500).json({
    message:error.message,
    success:false
})
    }
    }
 const getClientAppointment= async (req,res)=>{
    try{
        const appointments=await appoinmentModel.find({
            clientId:req.params.clientId
        }).populate("lawyerId");
        res.status(200).json({
            message:"client specific appointments fetched successfully",
            success:true,
            appointments
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
 }
module.exports={createAppoinment,getPendingRequest,approverequest,rejectrequest, approvedappointment,getClientAppointment};