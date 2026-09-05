const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});

const sendEmailOtp = async (email, otp) => {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
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
                <div>
                    <h2>JurisDesk Email Verification</h2>

                    <p>Your OTP is:</p>

                    <h1>${otp}</h1>

                    <p>This OTP is valid for 5 minutes.</p>

                    <p>If you did not request this OTP, please ignore this email.</p>
                </div>
            `
        });

        console.log("Brevo email sent:", result.messageId);

        return result;

    } catch (error) {
        console.error("Brevo email error:", error);
        throw error;
    }
};

module.exports = sendEmailOtp;