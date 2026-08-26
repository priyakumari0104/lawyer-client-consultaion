const otpmodel=require("../models/otp.model");
const lawyermodel=require("../models/lawyer.model");
const clientmodel=require("../models/client.model");
const otpGenerator=require("../utils/generateOtp");
const generateOtp = require("../utils/generateOtp");
const crypto=require("crypto");

const sendOtp= async(req,res)=>{
    try{
const {email ,phoneNumber}=req.body;
if(!email||!phoneNumber){
    return res.status(400).json({
        success:false,
        message:"Email and Phone Number are required"
    })
}
const existingLawyerEmail= await lawyermodel.findOne({email});
const existingclientEmail=await clientmodel.findOne({email});
if(existingLawyerEmail||existingclientEmail){
    return res.status(400).json({
        success:false,
        message:"Email Already registed"
    })
}
 const existingLawyerPhone = await lawyermodel.findOne({ phoneNumber });
    const existingClientPhone = await clientmodel.findOne({ phoneNumber });

    if (existingLawyerPhone || existingClientPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is already registered",
      });
    }
    const emailOtp=generateOtp();
    const phoneOtp=generateOtp();
    const expiresAt=new Date(Date.now()+5*60*1000);
    await otpmodel.deleteMany({email});
    const otp=await otpmodel.create({
        email,
        phoneNumber,
        emailOtp,
        phoneOtp,
        expiresAt
    })
    console.log("otp created",otp);
    res.status(200).json({
        success:true,
        message:"Otp generated successfully"
    })
    }catch(error){
res.status(500).json({
    success:false,
    message:error.message
});
    }
};
const verifyOtp=async(req,res)=>{
    try{
const {email,phoneNumber,emailOtp,phoneOtp}=req.body;
if(!email||!phoneNumber||!emailOtp||!phoneOtp){
    return res.status(400).json({
        success:false,
        message:"Email ,Phone Number and both OTPs are required"
    });
}
const otpRecord=await otpmodel.findOne({
    email,
    phoneNumber
}).sort({createdAt:-1});
if(!otpRecord){
    return res.status(400).json({
        success:false,
        message:"OTP not found!. Please request a new OTP"
    })
}
if(new Date()>otpRecord.expiresAt){
    await otpmodel.deleteOne({_id:otpRecord._id})
    return res.status(400).json({
        success:false,
        message:"OTP has expired. Please request a new OTP."
    })
}
if(otpRecord.emailOtp!=emailOtp){
    return res.status(400).json({
        success:false,
        message:"Invalid Otp"
    })
}
if(otpRecord.phoneOtp!=phoneOtp){
    return res.status(400).json({
        success:false,
        message:"INVALID OTP"
    })
}
const verificationToken=crypto.randomBytes(32).toString("hex");
otpRecord.emailVerified=true;
otpRecord.phoneVerified=true;
otpRecord.verificationToken=verificationToken;
otpRecord.emailOtp="USED";
otpRecord.phoneOtp="USED";
await otpRecord.save();
res.status(200).json({
    success:true,
    message:"Email and Phone number Verified Successfully",
    verificationToken
})

    }catch(error){
        console.log("verify otp error",error);
      res.status(500).json({
     message:error.message,
    success:false
})
    }
}
module.exports={sendOtp,verifyOtp};