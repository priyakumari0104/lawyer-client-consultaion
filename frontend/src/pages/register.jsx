import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  // ==========================================
  // GET VERIFIED DATA FROM SESSION STORAGE
  // ==========================================

  const verifiedEmail =
    sessionStorage.getItem("verifiedEmail") || "";

  const verifiedPhone =
    sessionStorage.getItem("verifiedPhone") || "";

  const selectedRole =
    sessionStorage.getItem("registrationRole") || "client";

  const verificationToken =
    sessionStorage.getItem("verificationToken") || "";

  console.log("Registration Role:", selectedRole);
  console.log("Verified Email:", verifiedEmail);
  console.log("Verified Phone:", verifiedPhone);
  console.log("Verification Token:", verificationToken);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    // common
    fullName: "",
    email: verifiedEmail,
    password: "",
    phoneNumber: verifiedPhone,
    role: selectedRole,

    // client
    dob: "",
    governmentIdType: "",
    governmentIdNumber: "",
    address: "",
    emergencyContactNumber: "",

    // lawyer
    specialization: "",
    experience: "",
    barCouncilId: "",
    consultationFee: "",
    officeAddress: "",
    bio: "",
    lawDegreeCertificate: "",
    governmentIdProof: "",

  });


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (files) {

      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

    }
  };


  // ==========================================
  // REGISTER
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let res;

      // ======================================
      // LAWYER
      // ======================================

      if (selectedRole === "lawyer") {

        const data = new FormData();

        Object.keys(formData).forEach((key) => {

          if (formData[key] !== null && formData[key] !== "") {
            data.append(key, formData[key]);
          }

        });

        // IMPORTANT
        // Send OTP verification token to backend
        data.append(
          "verificationToken",
          verificationToken
        );


        res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/lawyerregister`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

      }

      // ======================================
      // CLIENT
      // ======================================

      else {

        const clientData = {

          ...formData,

          verificationToken,

        };


        res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/client/register`,
          clientData
        );

      }


      // ======================================
      // SUCCESS
      // ======================================

      alert(res.data.message);

      // Clear registration verification data
      sessionStorage.removeItem("registrationRole");
      sessionStorage.removeItem("verifiedEmail");
      sessionStorage.removeItem("verifiedPhone");
      sessionStorage.removeItem("verificationToken");

      navigate("/login");

    }

    catch (err) {

      console.log("Registration error:", err);

      alert(
        err.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="register-container">

      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="register-card">

        <h1>JurisDesk</h1>

        <h1>
          {selectedRole === "lawyer"
            ? "Verified Lawyer Register"
            : "Client Register"}
        </h1>

        <p>
          Create your secure account
        </p>


        <form onSubmit={handleSubmit}>


          {/* ==================================
              COMMON FIELDS
          ================================== */}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />


          {/* VERIFIED EMAIL */}

          <div className="verified-field">

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              disabled
            />

            <span className="verified-text">
              ✓ Verified
            </span>

          </div>


          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          {/* VERIFIED PHONE */}

          <div className="verified-field">

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              disabled
            />

            <span className="verified-text">
              ✓ Verified
            </span>

          </div>


          {/* ==================================
              CLIENT FORM
          ================================== */}

          {selectedRole === "client" && (

            <>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />


              <select
                name="governmentIdType"
                value={formData.governmentIdType}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Government ID
                </option>

                <option value="Aadhaar Card">
                  Aadhaar Card
                </option>

                <option value="PAN Card">
                  PAN Card
                </option>

                <option value="Passport">
                  Passport
                </option>

                <option value="Driving License">
                  Driving License
                </option>

              </select>


              <input
                type="text"
                name="governmentIdNumber"
                placeholder="Government ID Number"
                value={formData.governmentIdNumber}
                onChange={handleChange}
                required
              />


              <input
                type="text"
                name="address"
                placeholder="Current Address"
                value={formData.address}
                onChange={handleChange}
                required
              />


              <input
                type="text"
                name="emergencyContactNumber"
                placeholder="Emergency Contact"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                required
              />


              <label className="upload-label">
                Upload Identity Proof
              </label>

              <input
                type="file"
                name="governmentIdProof"
                onChange={handleChange}
                required
              />

            </>

          )}


          {/* ==================================
              LAWYER FORM
          ================================== */}

          {selectedRole === "lawyer" && (

            <>

              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Specialization
                </option>

                <option value="Criminal Lawyer">
                  Criminal Lawyer
                </option>

                <option value="Corporate Lawyer">
                  Corporate Lawyer
                </option>

                <option value="Property Lawyer">
                  Property Lawyer
                </option>

                <option value="Divorce Lawyer">
                  Divorce Lawyer
                </option>

                <option value="Cyber Lawyer">
                  Cyber Lawyer
                </option>

              </select>


              <input
                type="text"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />


              <input
                type="text"
                name="barCouncilId"
                placeholder="Bar Council ID"
                value={formData.barCouncilId}
                onChange={handleChange}
                required
              />


              <input
                type="number"
                name="consultationFee"
                placeholder="Consultation Fee"
                value={formData.consultationFee}
                onChange={handleChange}
                required
              />


              <input
                type="text"
                name="officeAddress"
                placeholder="Office Address"
                value={formData.officeAddress}
                onChange={handleChange}
                required
              />


              <textarea
                name="bio"
                placeholder="Write About Yourself"
                value={formData.bio}
                onChange={handleChange}
              />


              {/* PROFILE PICTURE */}

              <label className="upload-label">
                Upload Profile Picture
              </label>

              <input
                type="file"
                name="profilePicture"
                onChange={handleChange}
                required
              />


              {/* LAW CERTIFICATION */}

              <label className="upload-label">
                Upload Law Certification
              </label>

              <input
                type="file"
                name="lawcertification"
                onChange={handleChange}
                required
              />


              {/* GOVERNMENT ID */}

              <label className="upload-label">
                Upload Government ID Proof
              </label>

              <input
                type="file"
                name="governmentIdProof"
                onChange={handleChange}
                required
              />

            </>

          )}


          {/* REGISTER BUTTON */}

          <button type="submit">
            Register
          </button>


          <Link
            className="login-text"
            to="/login"
          >
            Already have an account? Login
          </Link>

        </form>

      </div>

    </div>

  );

};

export default Register;