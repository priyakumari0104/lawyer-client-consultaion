  const clientmodel=require('../models/client.model');
  const jwt=require('jsonwebtoken');
  const bcrypt=require('bcrypt');
 async function register(req,res){
    const {userName,email,password,role,fullName,phoneNumber,
      dob,governmentIdType,governmentIdNumber,
      emergencyContactNumber,address}= req.body || {};
         
     try{
         if (!userName || !email || !password) {
            return res.status(400).json({
               success:false,
               message:"username, email and password are required"
            });
         }
 const isuseralreadyexist= await clientmodel.findOne({
         $or:[
            {userName:userName},
            {email:email}
         ]
      });
               if(isuseralreadyexist){
         return res.status(400).json({
            success:false,
            message:"User with the same username or email already exists"
         })
      }
      const hash= await  bcrypt.hash(password,10);
         const user= await clientmodel.create({
             userName:userName,
             email:email,
             password:hash,
             role:role,
             fullName:fullName,
             phoneNumber:phoneNumber,
             dob:dob,
             governmentIdType:governmentIdType,
             governmentIdNumber:governmentIdNumber,
             emergencyContactNumber:emergencyContactNumber,
             address:address
         })
         const token=jwt.sign({
            id:user._id
         },process.env.JWT_SECRETKEY)
          res.status(201).json({
            success:true,
            message:"User registered successfully",
            user,
            token
          })
         
     } 
     catch(error){
        res.status(500).json({
            success:false,
            message:"User registration failed",
            error:error.message
        })
         
   }
     };
 const updateClient= async(req,res)=>{
   try{
      const client= await clientmodel.findByIdAndUpdate(
         req.params.id,req.body,{
            new:true
         }
      )
      res.status(200).json({
         message:"Profile updated succesfully",
         success:true,
         client
      })
   }
   catch(error){
       res.status(500).json({
         message:error.message,
         success:false
      })
   }
 }
 
   
    module.exports = { register,updateClient };
