import React, { useState } from "react";
import "../styles/clientRequests.css";
import {Link} from "react-router-dom";
const ClientRequests = () => {
  // Using state so the accept/reject buttons actually update the UI interactively
  const [requests, setRequests] = useState([
    { id: 1, client: "Nitya Sharma", issue: "Property Dispute", date: "Received 2 hours ago" },
    { id: 2, client: "Rahul Verma", issue: "Divorce Case", date: "Received Yesterday" }
  ]);

  const handleAction = (id, action) => {
    // Mimic real database action by filtering out or updating the request status
    setRequests(prev => prev.filter(req => req.id !== id));
    console.log(`Request ${id} was ${action}ed`);
  };

  return (
    <div className="requests-container">
       <Link to="/lawyer/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>
      <div className="requests-header">
        <div>
          <h1>Client Requests</h1>
          <p className="subtitle">Review and manage incoming consultation inquiries.</p>
        </div>
        <span className="badge">{requests.length} Pending</span>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          <p>All caught up! No pending requests.</p>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((item) => (
            <div className="request-card" key={item.id}>
              <div className="card-header">
                <h2>{item.client}</h2>
                <span className="timestamp">{item.date}</span>
              </div>
              
              <div className="card-body">
                <span className="tag">Issue</span>
                <p className="issue-text">{item.issue}</p>
              </div>

              <div className="request-buttons">
                <button 
                  className="btn-reject" 
                  onClick={() => handleAction(item.id, "reject")}
                  aria-label="Decline request"
                >
                  Decline
                </button>
                <button 
                  className="btn-accept" 
                  onClick={() => handleAction(item.id, "accept")}
                  aria-label="Accept request"
                >
                  Accept Case
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientRequests;