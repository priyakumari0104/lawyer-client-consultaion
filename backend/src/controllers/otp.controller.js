
const lawyermodel=require("../models/lawyer.model");
const clientmodel=require("../models/client.model");
const generateOtp=require("../utils/generateOtp");
const {redisClient}=require("../config/redis");
const crypto=require("crypto");
const sendEmailOtp=require("../utils/sendEmail");


const sendOtp=async(req,res)=>{
    try{
        const {email,phoneNumber}=req.body;

        console.log("email received",email);
        console.log("phone number received",phoneNumber);
        if(!email||!phoneNumber){
            return res.status(400).json({
                success:false,
                message:"Email and Phone Number are required"
            })
        }
        const normalizedEmail=email.trim().toLowerCase();
        const normalizedPhoneNumber=phoneNumber.trim();
        const phoneRegex=/^[6-9]\d{9}$/;
        if(!phoneRegex.test(normalizedPhoneNumber)){
            return res.status(400).json({
                success:false,
                message:"Please Enter a valid 10-digit Mobile Number"
            })
        }

        const existingLawyerEmail= await lawyermodel.findOne({email:normalizedEmail});
        const existingClientEmail=await clientmodel.findOne({email:normalizedEmail});
        console.log("existing lawyer emai",existingLawyerEmail);
        console.log("existing client email",existingClientEmail);
        if(existingLawyerEmail||existingClientEmail){
            return res.status(400).json({
                success:false,
                message:"Email alread exists"
            })
        }
        const existingLawyerPhoneNumber=await lawyermodel.findOne({phoneNumber:normalizedPhoneNumber});
        const existingClientPhoneNmber=await clientmodel.findOne({phoneNumber:normalizedPhoneNumber});
        if(existingClientPhoneNmber||existingLawyerPhoneNumber){
            return res.status(400).json({
                success:false,
                message:"Phone Number Already Exists"
            })
        }
        console.log("phone inlawyer ",existingLawyerPhoneNumber);
        console.log("phone in client",existingClientPhoneNmber);
        const emailOtp=generateOtp();
        
        const key=`registration:otp:${normalizedEmail}`;
        const otpData={
            email:normalizedEmail,
            phoneNumber:normalizedPhoneNumber,
            emailOtp,
        
        }
       
 await redisClient.set(
            key,
            JSON.stringify(otpData),
            {
                EX:300
            }
        );
        await sendEmailOtp(
            normalizedEmail,
            emailOtp
        )

        console.log("OTP strordinredis",{
            key,
            emailOtp,
            
        })
        return res.status(200).json({
            success:true,
            message:"Otp genarted successfully"
        })
    }
    catch(error){
console.log("otp generation error",error.message);
return res.status(500).json({
    success:false,
    message:error.message
})
    }
}
const verifyOtp= async(req,res)=>{
    try{
        const {
            email,
            phoneNumber,
            emailOtp,
            
        }=req.body;
        if(!email||!phoneNumber||!emailOtp){
            return res.status(400).json({
                success:false,
                message:"Email ,Phone Number and Email OTPs is  required"
            })
        }
        const normalizedEmail=email.trim().toLowerCase();
        const normalizedPhoneNumber=phoneNumber.trim();
        const key=`registration:otp:${normalizedEmail}`;
        const storedOtp= await redisClient.get(key);
        console.log("stored otp data",storedOtp);
        if(!storedOtp){
            return res.status(400).json({
                success:false,
                message:"OTP not found or expired. Please request a new OTP"
            })
        }
        const otpData= JSON.parse(storedOtp);
        if(otpData.phoneNumber!==normalizedPhoneNumber){
            return res.status(400).json({
                status:false,
                message:"Phone number did not match with the requested otp request"
            })
        }
        if(otpData.email!==normalizedEmail){
            return res.status(400).json({
                success:false,
                message:"Email did not match with the requested email for otp"
            })
        }
        const emailVerified=String(otpData.emailOtp)===String(emailOtp);
        if(!emailVerified){
            return res.status(400).json({
                success:false,
                message:"INVALID email OTP"
            })
        }
       
       
        const verificationToken=crypto.randomBytes(32).toString("hex");
        const verificationKey=`registration:verified:${verificationToken}`;
        const verifiedData={
            email:normalizedEmail,
            phoneNumber:normalizedPhoneNumber,
            emailVerified:true,
            
        };
        await redisClient.set(
            verificationKey,
            JSON.stringify(verifiedData),{
                EX:600
            }
        );
        await redisClient.del(key);
        return res.status(200).json({
            success:true,
            message:"Email and Phone Number are verified succesfully",
            emailVerified:true,
            
            verificationToken
        })

    }
    catch(error){
console.log("Verify OTP error",error);
return res.status(500).json({
    success:false,
    message:error.message
})
    }
}
module.exports={sendOtp,verifyOtp};