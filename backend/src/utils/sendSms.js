const twilio=require("twilio");
const twilioClient= twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const sendSmsOtp=async(PhoneNumber,otp)=>{
    console.log("Sending Sms OTP to :",PhoneNumber);
    const message=await twilioClient.messages.create({
        body:`Your JurisDesk verificationOTP is${otp}. This OTP is valid for 5 minute .Do not share with anyone.`,
        from:process.env.TWILIO_PHONE_NUMBER,
        to:PhoneNumber
    });
    console.log("SMS SENT SUCCESSFULLY");
    console.log("message sid:",message.sid);
    return message;
}
module.exports=sendSmsOtp;