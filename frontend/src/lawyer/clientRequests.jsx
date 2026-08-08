import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/clientRequests.css";
import {Link} from "react-router-dom";
const ClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isProcessing, setIsProcessing] = useState(null); // Tracks button loaders

  const fetchPendingRequests = async () => {
    try {
      const lawyer = JSON.parse(localStorage.getItem("user"));
      if (!lawyer?._id) return;
      
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/appointment/pending/${lawyer._id}`);
      console.log(response.data.requests);
      setRequests(response.data.requests || []);
    } catch (error) {
      console.error("Failed to fetch client inquiries:", error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  // UPDATED: Connected your frontend buttons to handle active server or state updates
 const approveRequest = async (id) => {
  try {
    setIsProcessing(id);

    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/appointment/approve/${id}`
    );

    alert(response.data.message);

    fetchPendingRequests();

  } catch (error) {
    console.log(error);
  } finally {
    setIsProcessing(null);
  }
};
const rejectRequest = async (id) => {
  try {
    setIsProcessing(id);

    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/appointment/reject/${id}`
    );

    alert(response.data.message);

    fetchPendingRequests();

  } catch (error) {
    console.log(error);
  } finally {
    setIsProcessing(null);
  }
};

  return (
    <div className="requests-container">
      {/* Return to Dashboard Header utility link */}
      <Link to="/lawyer/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      <div className="requests-header">
        <div>
          <h1>Client Consultations</h1>
          <p className="subtitle">Audit preliminary intake files, review conflict checks, and accept case assignments.</p>
        </div>
        <span className="badge-pulse-counter">{requests.length} Inbound</span>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">📁</div>
          <h3>Queue Fully Cleared</h3>
          <p>All client intake forms have been verified. No pending items require attention.</p>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((item) => (
            <div className="request-card-premium" key={item._id}>
              
              {/* Left Column: Client metadata details */}
              <div className="card-profile-section">
                <div className="client-meta-header">
                  <h2>{item.clientId?.fullName || "Anonymous Client"}</h2>
                  <span className="timestamp-badge">
                    ⏱️ Received: {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {/* Specific Emphasis: Bold Category Title */}
                <div className="issue-type-highlight">
                  {item.issueType || "General Consultation"}
                </div>
                
                {/* Clean, descriptive small-font summary */}
                <p className="case-description-text">
                  {item.description}
                </p>
              </div>

              {/* Right Column: Interactive Processing Panel */}
              <div className="card-control-panel">
                <span className={`status-pill ${item.status?.toLowerCase() || "pending"}`}>
                  {item.status || "Pending Review"}
                </span>

                <div className="request-action-buttons">
                  <button
                    className="btn-reject"
                    disabled={isProcessing === item._id}
                   onClick={() => rejectRequest(item._id)}
                  >
                    Decline
                  </button>

                  <button
                    className="btn-accept"
                    disabled={isProcessing === item._id}
                    onClick={() => approveRequest(item._id)}
                  >
                    Accept Case
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientRequests;