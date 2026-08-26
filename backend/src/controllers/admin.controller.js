const lawyermodel= require("../models/lawyer.model");
const clientModel=require("../models/client.model")
const Notification= require("../models/notification.model")
const createActivity=require("../utils/createActivity");
const appointmentModel=require("../models/appoinment.model")
const { create } = require("../models/document.model");
const approvelawyers= async (req,res)=>{
    try{
        const lawyer= await lawyermodel.findByIdAndUpdate(
            req.params.id,
            { verificationStatus:"verified"},
        {new:true});
        if(!lawyer){
            return res.status(404).json({
                success:false,
                message:"lawyer not found",

            })
        }
        const activity=await createActivity({
            category:"verification",
            title:"Lawyer Approved",
            message:`${lawyer.fullName}has been verified and approved`,
            relatedId:lawyer._id,
            relatedModel:"lawyers"
        })
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
         if(!lawyer){
            return res.status(404).json({
                success:false,
                message:"lawyer not found",

            })
        }
        const activity= await createActivity({
            category:"alert",
            title:"Lawyer verification Rejected",
            message:`${lawyer.fullName}'s verification request was rejected`,
            relatedId:lawyer._id,
            relatedModel:"lawyers"
        })
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
        const totalConsultaions=await appointmentModel.countDocuments({
            status:"approved"
        });
        const  recentConsultations=await appointmentModel.find()
        .populate("lawyerId","fullName")
        .populate("clientId","fullName")
        .sort({created:-1})
        .limit(10);
        res.status(200).json({
            success:true,
            message:"dashboard states fetched",
            stats:{
                totalLwyers,
                verifiedlawyers,
                pendinglawyers,
                totalclient,
                totalConsultaions,
                revenue:0,
                recentConsultations
            }
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
const manageUsers= async(req,res)=>{
    try{
const lawyers=await lawyermodel.find({})
.select("fullName email phoneNumber createdAt verificationStatus")
const clients=await clientModel.find({})
.select("fullName email phoneNumber createdAt")
 const lawyerUsers = lawyers.map((lawyer) => ({
            _id: lawyer._id,
            name: lawyer.fullName,
            email: lawyer.email,
            phone: lawyer.phoneNumber,
            role: "lawyer",
            createdAt: lawyer.createdAt,
            verificationStatus: lawyer.verificationStatus
        }));

        const clientUsers = clients.map((client) => ({
            _id: client._id,
            name: client.fullName,
            email: client.email,
            phone: client.phoneNumber,
            role: "client",
            createdAt: client.createdAt
        }));
        const users = [
            ...lawyerUsers,
            ...clientUsers
        ];
          users.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            totalUsers: users.length,
            users
        });
    }catch(error){
 console.log("Manage users error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports={approvelawyers,
    rejectlawyer,
    getpendinglawyer,
    dashboardStats,
manageUsers};