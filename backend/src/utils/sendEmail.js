const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    family:4,
    

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
transporter.verify((error,success)=>{
    if(error){
        console.log("Email SMTP connection failed:",error);
    }else{
        console.log("Email SMTP server is ready");
    }
})

const sendEmailOtp = async (email, otp) => {

    const mailOptions = {

        from: `"JurisDesk" <${process.env.SMTP_USER}>`,

        to: email,

        subject: "JurisDesk Email Verification OTP",

        text: `Your JurisDesk verification OTP is ${otp}. This OTP is valid for 5 minutes. Do not share this OTP with anyone.`,

        html: `
            <div style="
                font-family: Arial, sans-serif;
                padding: 20px;
            ">

                <h2>JurisDesk Email Verification</h2>

                <p>
                    Your verification OTP is:
                </p>

                <h1 style="letter-spacing: 5px;">
                    ${otp}
                </h1>

                <p>
                    This OTP is valid for 5 minutes.
                </p>

                <p>
                    Please do not share this OTP with anyone.
                </p>

                <hr>

                <p>
                    If you did not request this OTP,
                    you can safely ignore this email.
                </p>

            </div>
        `
    };

    const info=await transporter.sendMail(mailOptions);
    console.log("EMAIL sent succesfully");
    console.log("Message ID:",info.messageId);
    console.log("Response:",info.response);
    return info;
};


module.exports = sendEmailOtp;