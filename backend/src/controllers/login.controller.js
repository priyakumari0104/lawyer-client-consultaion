  const adminModel = require("../models/admin.model");
const clientModel=require("../models/client.model");
   const lawyerModel=require("../models/lawyer.model");
   const bcrypt=require("bcrypt");
   const jwt=require("jsonwebtoken");
 const Login= async(req,res)=>{
    try{
         const {email,password}=req.body;
          let  user= await clientModel.findOne({email:email});
           let role="client";
            if(!user){
                 user= await  lawyerModel.findOne({email:email});
                  role="lawyer";
            }if(!user){
                user=await adminModel.findOne({email:email});
                role="admin";
            }
         if(!user){
            return res.status(401).json({
                message:"User not found",
                success:false
            })
         }
         const isPasswordValid= await bcrypt.compare(password,user.password);
         if(!isPasswordValid){
             return res.status(401).json({
                message:"Invalid password",
                success:false
             })
         }
          const token = jwt.sign({
            id:user._id
          },process.env.JWT_SECRETKEY)
         res.status(200).json({
             message:"Login successful",
             success:true,
             user,
             token,
             role
         })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Login failed",
            error:error.message
        })
    }
 }
  module.exports={Login};