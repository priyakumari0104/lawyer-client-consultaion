 const appoinmentModel= require('../models/appoinments.model');
  const bookAppoinment= async(req,res)=>{
     try{
    const{clientId,lawyerId,description,issueType}= req.body;
     if(!clientId||!lawyerId||!description||!issueType){
        return res.status(400).json({
            message:"All fields are required",
            success:false
        })
     }
      const appoinment =  await appoinmentModel.create({
        clientId,
        lawyerId,
        description,
        issueType
      })
       res.status(200).json({
        message:"Request send successfully",
        succes:true,
        appoinment
       })
     }
     catch(error){
         res.status(500).json({
            message:error.message,
            success:false
         })
     }
  }
   module.exports={bookAppoinment};