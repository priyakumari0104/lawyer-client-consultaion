const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});

const sendEmailOtp = async (email, otp) => {
    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "JurisDesk",
                email: process.env.BREVO_SENDER_EMAIL
            },

            to: [
                {
                    email: email
                }
            ],

            subject: "JurisDesk Email Verification OTP",

            htmlContent: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                ">

                    <h2>JurisDesk Email Verification</h2>

                    <p>Hello,</p>

                    <p>
                        Your OTP for verifying your email address is:
                    </p>

                    <h1 style="letter-spacing: 5px;">
                        ${otp}
                    </h1>

                    <p>
                        This OTP is valid for <b>5 minutes</b>.
                    </p>

                    <p>
                        If you did not request this OTP,
                        you can safely ignore this email.
                    </p>

                    <br>

                    <p>
                        Regards,<br>
                        <b>JurisDesk Team</b>
                    </p>

                </div>
            `
        });

        console.log("✅ Brevo email sent:", response);

        return response;

    } catch (error) {
        console.error("❌ Brevo email error:", error);
        throw error;
    }
};

module.exports = sendEmailOtp;