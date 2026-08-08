import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";
import {
  useNavigate,
  useLocation,
  Link
} from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const selectedRole =
    location.state?.role || "client";

  const [formData, setFormData] = useState({

    // common
    fullName: "",
    
    email: "",
    password: "",
    phoneNumber: "",
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
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    let res;

    // LAWYER

    if(selectedRole === "lawyer"){

      const data = new FormData();

      Object.keys(formData).forEach((key)=>{

        data.append(key, formData[key]);

      });

      res = await axios.post(

        
        `${import.meta.env.VITE_BASE_URL}/api/lawyerregister`,

        data,

        {

          headers:{
            "Content-Type":
            "multipart/form-data"
          }

        }

      );

    }

    // CLIENT

    else{

      res = await axios.post(

        
        `${import.meta.env.VITE_BASE_URL}/api/client/register`,

        formData

      );

    }

    alert(res.data.message);

    navigate("/login");

  }

  catch(err){

    console.log(err);

    alert(
      err.response?.data?.message
    );

  }

};


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

          {/* COMMON FIELDS */}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          {/* CLIENT FORM */}

          {selectedRole === "client" && (

            <>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />

              <select
                name="governmentIdType"
                value={
                  formData.governmentIdType
                }
                onChange={handleChange}
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
                value={
                  formData.governmentIdNumber
                }
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Current Address"
                value={formData.address}
                onChange={handleChange}
              />

              <input
                type="text"
                name="emergencyContactNumber"
                placeholder="Emergency Contact"
                value={
                  formData.emergencyContactNumber
                }
                onChange={handleChange}
              />

              <label className="upload-label">
                Upload Identity Proof
              </label>

              <input
                type="file"
                name="governmentIdProof"
                onChange={handleChange}
              />

            </>

          )}

          {/* LAWYER FORM */}

          {selectedRole === "lawyer" && (

            <>

              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
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
              />

              <input
                type="text"
                name="barCouncilId"
                placeholder="Bar Council ID"
                value={formData.barCouncilId}
                onChange={handleChange}
              />

              <input
                type="number"
                name="consultationFee"
                placeholder="Consultation Fee"
                value={
                  formData.consultationFee
                }
                onChange={handleChange}
              />

              <input
                type="text"
                name="officeAddress"
                placeholder="Office Address"
                value={formData.officeAddress}
                onChange={handleChange}
              />

              <textarea
                name="bio"
                placeholder="Write About Yourself"
                value={formData.bio}
                onChange={handleChange}
              />
              <label className="upload-label">
                Upload Government ID Proof
              </label>

              <input
                type="file"
                name="profilePicture"
                onChange={handleChange}
              />

              <label className="upload-label">
                Upload Profile Picture
              </label>

              <input
                type="file"
                name="lawcertification"
                onChange={handleChange}
              />

              <label className="upload-label">
                Upload Government ID Proof
              </label>

              <input
                type="file"
                name="governmentIdProof"
                onChange={handleChange}
              />

            </>

          )}

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