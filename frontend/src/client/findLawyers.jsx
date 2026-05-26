import React from "react";
import "../styles/findLawyers.css";
import{Link} from "react-router-dom"
const FindLawyers = () => {
  const lawyers = [
    {
      id: 1,
      name: "Adv. Rahul Sharma",
      specialization: "Criminal Lawyer",
      experience: "5 Years",
      fee: "₹1,500"
    },
    {
      id: 2,
      name: "Adv. Priya Verma",
      specialization: "Corporate Lawyer",
      experience: "7 Years",
      fee: "₹2,500"
    },
    {
      id: 3,
      name: "Adv. Aman Gupta",
      specialization: "Divorce Lawyer",
      experience: "4 Years",
      fee: "₹1,200"
    }
  ];

  return (
    <div className="findlawyers-container">
       {/* 🌟 NEW: Elegant Back to Dashboard Trigger */}
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
          <input
            type="text"
            placeholder="Search lawyer by specialization..."
          />
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="lawyers-grid">
        {lawyers.map((lawyer) => (
          <div className="lawyer-card-premium" key={lawyer.id}>
            
            {/* Profile Core Segment */}
            <div className="profile-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt={lawyer.name}
              />
              <h2>{lawyer.name}</h2>
              {/* Specialized Tagging Badge System */}
              <span className={`specialization-tag ${lawyer.specialization.toLowerCase().replace(" ", "-")}`}>
                {lawyer.specialization}
              </span>
            </div>

            {/* Split Data Segment */}
            <div className="metadata-row">
              <div className="meta-block">
                <span className="meta-label">Experience</span>
                <span className="meta-value">{lawyer.experience}</span>
              </div>
              <div className="meta-block">
                <span className="meta-label">Consultation Fee</span>
                <span className="meta-value fee-highlight">{lawyer.fee}</span>
              </div>
            </div>

            {/* Call to Action Button */}
            <button className="book-btn">
              Book Consultation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindLawyers;