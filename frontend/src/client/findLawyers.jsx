import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/findLawyers.css";

const FindLawyers = () => {
  const [lawyers, setLawyers] = useState([]);

  const fetchLawyers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/lawyer/all");
      setLawyers(res.data.allLawyers);
    } catch (error) {
      console.error("Failed to retrieve legal roster:", error);
    }
  };

  // FIXED: Added an empty dependency array [] to prevent server call loops
  useEffect(() => {
    fetchLawyers();
  }, []);

  return (
    <div className="findlawyers-container">
      {/* Elegant Back to Dashboard Trigger */}
      <Link to="/client/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Top Bar with Page Actions */}
      <div className="findlawyers-header">
        <div>
          <h1>Find Lawyers</h1>
          <p className="subtitle">Discover verified legal experts for immediate consultation</p>
        </div>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search lawyer by specialization..." />
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="lawyers-grid">
        {lawyers.map((item) => (
          // Using item._id from your MongoDB Mongoose document
          <div className="lawyer-card-premium" key={item._id}>
            
            {/* Profile Core Segment */}
            <div className="profile-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt={item.name}
                className="lawyer-avatar"
              />
              <h2>{item.name}</h2>
              {/* Specialized Tagging Badge System */}
              <span className={`specialization-tag ${(item.specialization || "general").toLowerCase().replace(/\s+/g, "-")}`}>
                {item.specialization}
              </span>
            </div>

            {/* Split Data Segment */}
            <div className="metadata-row">
              <div className="meta-block">
                <span className="meta-label">Experience</span>
                <span className="meta-value">{item.experience} Yrs</span>
              </div>
              <div className="meta-block">
                <span className="meta-label">Consultation Fee</span>
                <span className="meta-value fee-highlight">₹{item.consultationFee}</span>
              </div>
            </div>

            {/* UPGRADED: Dual Action Button Row */}
            <div className="card-action-row">
              {/* View Profile Viewport Route */}
              <Link to={`/client/lawyer-profile/${item._id}`} className="view-profile-btn">
                🔍 View Profile
              </Link>
              
              {/* Dynamic Intake Form Route (Passes the explicit ID via params) */}
              <Link to={`/client/bookappoinment/${item._id}`} className="book-btn-link">
                <button className="book-btn">Request</button>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default FindLawyers;