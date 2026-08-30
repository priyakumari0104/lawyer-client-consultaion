import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/verifyContact.css"; // Ensure this path matches your folder structure

const VerifyContact = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailOtp, setEmailOtp] = useState("");
  

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ============================
  // SEND OTP
  // ============================
  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/otp/send-otp`,
        {
          email,
          phoneNumber,
        }
      );

      if (response.data.success) {
        alert("OTP sent successfully");
        setOtpSent(true);
      }
    } catch (error) {
      console.log("Send OTP error:", error);
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // VERIFY OTP
  // ============================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
console.log("verify data from frontend",
  email,phoneNumber,emailOtp
)
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/otp/verify-otp`,
        {
          email,
          phoneNumber,
          emailOtp,
          
        }
      );

      if (
        response.data.success &&
        response.data.emailVerified 
        
      ) {
        alert("Email and Phone number verified successfully");

        // Save verification information
        sessionStorage.setItem(
          "verificationToken",
          response.data.verificationToken
        );
        sessionStorage.setItem("verifiedEmail", email);
        sessionStorage.setItem("verifiedPhone", phoneNumber);

        // Get saved role from RoleSelect screen
        const role = sessionStorage.getItem("registrationRole");

        // Go to registration
        if(role==="client"){
            navigate("/register",{
                state:{role:"client"}
            })
        }else if(role==="lawyer"){
            navigate("/register",{
                state:{role:"lawyer"}
            })
        }else{
            alert("registeration role not found");
        }
      }
    } catch (error) {
      console.log("Verify OTP error:", error);
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      {/* Background Glow Effects */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="verify-card">
        {!otpSent ? (
          // ============================
          // EMAIL + PHONE FORM
          // ============================
          <form onSubmit={handleSendOtp} className="verify-form">
            <h1>Verify Contact Details</h1>
            <p>Enter your details to receive verification OTPs.</p>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  const value=e.target.value;
                  if(/^\d{0,10}$/.test(value)){
                    setPhoneNumber(value);
                  }
                }
                  
                }
                placeholder="Enter phone number"
                maxLength={10}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          // ============================
          // OTP FORM
          // ============================
          <form onSubmit={handleVerifyOtp} className="verify-form">
            <h1>Verify OTP</h1>
            <p>OTPs have been sent to your email and phone number.</p>

            <div className="form-group">
              <label>Email OTP</label>
              <input
                type="text"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                placeholder="Enter email OTP"
                required
              />
            </div>



            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyContact;