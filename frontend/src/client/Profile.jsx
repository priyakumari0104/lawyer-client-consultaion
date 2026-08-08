import React, { useState } from "react";
import "../styles/profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  // Toggle editing state
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state using your precise backend schema fields
 const userData= JSON.parse(localStorage.getItem("user")) ;
 const[formData,setFormData]=useState(userData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit =  async(e) => {
    e.preventDefault();
    try{
      const res= await  axios.put(`${import.meta.env.VITE_BASE_URL}/api/client/update/${formData._id}`,formData);
      localStorage.setItem("user",JSON.stringify(res.data.client));
      setFormData(res.data.client);
      alert(res.data.message);
      setIsEditing(false);
    }
    catch(error){
      console.log(error);
      alert("Updatation failed");
    }
    
  };

  return (
    <div className="profile-container">
      {/* 🌟 NEW: Elegant Back to Dashboard Trigger */}
      <Link to="/client/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="subtitle">Manage your personal account details and identification files</p>
      </div>

      <form onSubmit={handleFormSubmit} className="profile-layout-grid">
        
        {/* LEFT COLUMN: AVATAR CARD */}
        <div className="profile-avatar-card">
          <div className="avatar-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
            />
          </div>
          <h2>{formData.fullName}</h2>
          <span className="role-tag">{formData.role.toUpperCase()}</span>
          
          {!isEditing ? (
            <button type="button" className="edit-toggle-btn" onClick={() => setIsEditing(true)}>
              📝 Edit Profile
            </button>
          ) : (
            <div className="form-action-buttons">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: REVENUE-GRADE FORM DATA SEGMENTS */}
        <div className="profile-details-form">
          
          {/* Group 1: Account Core */}
          <div className="form-section">
            <h3>Account Credentials</h3>
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
          </div>

          {/* Group 2: Personal Details */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="input-fields-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob? formData.dob.split("T")[0]
  : ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-group">
                <label>Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Group 3: Verification Details */}
          <div className="form-section">
            <h3>Government Verification</h3>
            <div className="input-fields-grid">
              <div className="form-group">
                <label>ID Document Type</label>
                <input
                  type="text"
                  name="governmentIdType"
                  placeholder="e.g. Passport, Driver's License"
                  value={formData.governmentIdType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>ID Document Number</label>
                <input
                  type="text"
                  name="governmentIdNumber"
                  value={formData.governmentIdNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-group full-width-field">
              <label>Residential Address</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

        </div>

      </form>
    </div>
  );
};

export default Profile;