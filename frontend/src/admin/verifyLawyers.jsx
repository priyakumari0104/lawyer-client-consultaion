import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/verifyLawyers.css";
import axios from "axios";
// import { getpendinglawyer } from "../../../backend/src/controllers/admin.controller";
// import { response } from "../../../backend/src/app";

const VerifyLawyers = () => {
  // Simulating the full Mongoose dataset fields coming from your lawyer model
  const [lawyers, setLawyers] = useState([]);
 useEffect(()=>{
  getpendinglawyer();
 },[])
  const getpendinglawyer= async ()=>{
     try{
      const response=await axios.get("http://localhost:3000/api/admin/pending-lawyer");
      setLawyers(response.data.lawyer);
     }catch(error){
      console.log(error);

     }
     
  }
  const handleAudit =async (id, action) => {
   try{
    if(action=="approve"){
      await axios.put(`http://localhost:3000/api/admin/approve-lawyer/${id}`)
    }
    if(action=="reject"){
      await axios.put(`http://localhost:3000/api/admin/reject-lawyer/${id}`)
    }
    alert(`The lawyer profile is succesfully ${
      action=="approve"?"verified & activated":
      "rejected"
    } `)
    getpendinglawyer();
   }catch(error){
    console.log(error);
   }
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
                  <button className="audit-btn approve" onClick={() => handleAudit(lawyer._id, "approve")}>
                    🛡️ Approve Practitioner
                  </button>
                  <button className="audit-btn reject" onClick={() => handleAudit(lawyer._id, "reject")}>
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