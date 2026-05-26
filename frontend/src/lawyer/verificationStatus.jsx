import React from "react";
import { Link } from "react-router-dom";
import "../styles/verificationStatus.css";

const VerificationStatus = () => {
  // Real apps map out structural verification checklist items
  const verificationSteps = [
    { id: 1, title: "Account Registration", desc: "Basic practitioner account configured", status: "completed" },
    { id: 2, title: "Legal Documentation Upload", desc: "BAR license files and identity proofs received", status: "completed" },
    { id: 3, title: "Administrative Review", desc: "Our compliance team is cross-checking records with the Bar Council", status: "current" },
    { id: 4, title: "Portal Activation", desc: "Unlock verified lawyer badge and customer matching engine", status: "upcoming" }
  ];

  return (
    <div className="verification-container">
      {/* Back Navigation Link */}
      <Link to="/lawyer/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Main Header */}
      <div className="verification-header">
        <h1>Verification Status</h1>
        <p className="subtitle">Track your onboarding verification and credential approval timeline</p>
      </div>

      <div className="verification-content-layout">
        
        {/* LEFT CARD: Current Status Banner */}
        <div className="status-overview-card">
          <div className="status-icon-glow delay-pulse">⏳</div>
          <div className="status-title-group">
            <span className="badge-alert-text">CURRENT STATUS</span>
            <h2>Under Review</h2>
          </div>
          <p className="status-description">
            Your legal documents are undergoing manual background compliance validation.
          </p>
          
          <div className="time-estimate-box">
            <span className="clock-icon">🕒</span>
            <div>
              <h4>Estimated Completion</h4>
              <p>Within 24 to 48 business hours</p>
            </div>
          </div>

          <div className="support-footer-note">
            <p>Need urgent verification? <a href="#support" className="support-link">Contact Admin Support</a></p>
          </div>
        </div>

        {/* RIGHT CARD: Interactive Timeline Tracker */}
        <div className="timeline-tracker-card">
          <h3>Verification Pipeline</h3>
          <p className="timeline-sub">Follow the step-by-step verification milestones of your profile</p>
          
          <div className="stepper-vertical-list">
            {verificationSteps.map((step) => (
              <div className={`stepper-item ${step.status}`} key={step.id}>
                {/* Visual Line Anchor and Marker */}
                <div className="stepper-node-wrapper">
                  <div className="stepper-node">
                    {step.status === "completed" ? "✓" : step.id}
                  </div>
                  <div className="stepper-line"></div>
                </div>
                
                {/* Meta Text Blocks */}
                <div className="stepper-info-block">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>

                {/* Conceptual Status Text Badge */}
                <span className={`pill-badge ${step.status}`}>
                  {step.status === "current" ? "In Progress" : step.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerificationStatus;