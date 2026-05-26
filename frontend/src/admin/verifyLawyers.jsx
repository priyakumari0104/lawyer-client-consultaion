import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/verifyLawyers.css";

const VerifyLawyers = () => {
  // Simulating the full Mongoose dataset fields coming from your lawyer model
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: "Adv. Rahul Sharma",
      specialization: "Criminal Lawyer",
      experience: "5 Years",
      barCouncilId: "BAR/DL/2021/8942",
      consultationFee: "₹1,500",
      email: "rahul.sharma@jurisdesk.com",
      officeAddress: "Chamber 412, Extension Block, Delhi High Court, New Delhi",
      profilePicture: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
      governmentIdProofUrl: "#", 
      lawcertificationUrl: "#"
    },
    {
      id: 2,
      name: "Adv. Priya Verma",
      specialization: "Corporate Lawyer",
      experience: "7 Years",
      barCouncilId: "BAR/MH/2019/3145",
      consultationFee: "₹2,500",
      email: "priya.verma@legalcore.in",
      officeAddress: "Suite 89, Nariman Point, Mumbai",
      profilePicture: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
      governmentIdProofUrl: "#",
      lawcertificationUrl: "#"
    }
  ]);

  const handleAudit = (id, action) => {
    // Connect your admin API PUT route here: /api/admin/verify-lawyer/:id
    setLawyers(lawyers.filter((lawyer) => lawyer.id !== id));
    alert(`Lawyer profile has been successfully ${action === "approve" ? "Verified & Activated" : "Rejected"}.`);
  };

  return (
    <div className="verify-container">
      {/* Back to Core Admin Dashboard Navigation Option */}
      <Link to="/admin/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Main Header */}
      <div className="verify-header">
        <div>
          <h1>Verify Lawyers</h1>
          <p className="subtitle">Audit legal credentials, registration certificates, and active identities for system onboarding</p>
        </div>
        <div className="pending-counter">Pending Audits: {lawyers.length}</div>
      </div>

      {/* Verification Workspace Stream */}
      <div className="verify-list">
        {lawyers.length === 0 ? (
          <div className="empty-audit-state">🎉 Excellent! No pending lawyer credentials require validation.</div>
        ) : (
          lawyers.map((lawyer) => (
            <div className="verify-card-premium" key={lawyer.id}>
              
              {/* TOP HEADER COMPONENT ROW */}
              <div className="verify-card-header">
                <div className="identity-meta-group">
                  <img src={lawyer.profilePicture} alt={lawyer.name} className="admin-avatar-preview" />
                  <div>
                    <h2>{lawyer.name}</h2>
                    <span className="spec-badge">{lawyer.specialization}</span>
                  </div>
                </div>
                
                {/* PRIMARY ACTIONS PANEL TRIPPERS */}
                <div className="verify-buttons">
                  <button className="audit-btn approve" onClick={() => handleAudit(lawyer.id, "approve")}>
                    🛡️ Approve Practitioner
                  </button>
                  <button className="audit-btn reject" onClick={() => handleAudit(lawyer.id, "reject")}>
                    Reject Application
                  </button>
                </div>
              </div>

              {/* CORE SCHEMA SYSTEM CREDENTIALS MATRIX SUB-GRID */}
              <div className="credential-audit-matrix">
                <div className="audit-data-block">
                  <span className="matrix-label">Bar Council ID</span>
                  <span className="matrix-value code-font">{lawyer.barCouncilId}</span>
                </div>
                <div className="audit-data-block">
                  <span className="matrix-label">Years of Practice</span>
                  <span className="matrix-value">{lawyer.experience}</span>
                </div>
                <div className="audit-data-block">
                  <span className="matrix-label">Declared Fee Rate</span>
                  <span className="matrix-value fee-color">{lawyer.consultationFee}</span>
                </div>
                <div className="audit-data-block">
                  <span className="matrix-label">Contact Email</span>
                  <span className="matrix-value">{lawyer.email}</span>
                </div>
              </div>

              {/* OFFICE LOCATION CHAMBERS TEXT EXTRACTION */}
              <div className="audit-address-block">
                <span className="matrix-label">Office Chambers Location</span>
                <p className="matrix-value text-paragraph">{lawyer.officeAddress}</p>
              </div>

              {/* DOCUMENT COMPLIANCE VERIFICATION CONTROLS */}
              <div className="document-vault-verification-row">
                <span className="matrix-label docs-label">Required Compliance Files:</span>
                <div className="vault-buttons-group">
                  <a href={lawyer.governmentIdProofUrl} className="doc-link-btn" target="_blank" rel="noreferrer">
                    📄 View Government ID Proof
                  </a>
                  <a href={lawyer.lawcertificationUrl} className="doc-link-btn" target="_blank" rel="noreferrer">
                    📜 View Bar Council Certificate
                  </a>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerifyLawyers;