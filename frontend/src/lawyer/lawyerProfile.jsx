import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lawyerProfile.css";
import axios from "axios";

const LawyerProfile = () => {
  // Toggle form editing capability
  const [isEditing, setIsEditing] = useState(false);

  // Initializing explicit form fields to map directly to your backend Mongoose model
   const lawyerData= JSON.parse(localStorage.getItem("user"));
   const [formData,setFormData]= useState(lawyerData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try{
      const res= await axios.put(`http://localhost:3000/api/lawyer/update/${formData._id}`,formData);
      //update localStorage
      localStorage.setItem("user",JSON.stringify(res.data.lawyer));
      //update state
      setFormData(res.data.lawyer);
      alert(res.data.message);
      setIsEditing(false);
    }
    catch(error){
console.log(error);
alert("Updatation Failed");
    }
  };

  return (
    <div className="profile-container">
      {/* Back Navigation Link */}
      <Link to="/lawyer/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Page Header */}
      <div className="profile-header">
        <h1>Lawyer Profile</h1>
        <p className="subtitle">Manage your public directory listing details, pricing tiers, and credentials</p>
      </div>

      <form onSubmit={handleFormSubmit} className="profile-layout-grid">
        
        {/* LEFT COLUMN: STATIC STICKY IDENTITY CARD */}
        <div className="profile-avatar-card">
          <div className="avatar-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
              alt="Advocate Profile"
            />
          </div>
          <h2>{formData.fullName}</h2>
          <span className="specialty-badge">{formData.specialization}</span>
          <span className="bar-verified-pill">⚖️ BAR VERIFIED</span>
          
          {!isEditing ? (
            <button type="button" className="edit-toggle-btn" onClick={() => setIsEditing(true)}>
              📝 Edit Profile Details
            </button>
          ) : (
            <div className="form-action-buttons">
              <button type="submit" className="save-btn">Save Parameters</button>
              <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SCROLLABLE FORM FIELD SECTIONS */}
        <div className="profile-details-form">
          
          {/* Section 1: Core Credentials */}
          <div className="form-section">
            <h3>Account & Bar Credentials</h3>
            <div className="input-fields-grid">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-group">
                <label>Bar Council ID</label>
                <input
                  type="text"
                  name="barCouncilId"
                  value={formData.barCouncilId}
                  disabled // Locked security parameters should remain disabled
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Professional Practice Parameters */}
          <div className="form-section">
            <h3>Practice Details & Financials</h3>
            <div className="input-fields-grid">
              <div className="form-group">
                <label>Legal Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-group">
                <label>Consultation Fee</label>
                <input
                  type="text"
                  name="consultationFee"
                  className="fee-input-field"
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
            
            <div className="form-group full-width-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          {/* Section 3: Office Chambers Location */}
          <div className="form-section">
            <h3>Office Chamber Location</h3>
            <div className="form-group">
              <label>Chamber / Office Address</label>
              <textarea
                name="officeAddress"
                rows="3"
                value={formData.officeAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

        </div>

      </form>
    </div>
  );
};

export default LawyerProfile;