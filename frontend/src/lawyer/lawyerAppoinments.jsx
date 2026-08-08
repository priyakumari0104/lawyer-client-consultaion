import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/lawyerAppoinments.css";
import axios from "axios";

// 🌟 NESTED SUB-COMPONENT: Manages "Read More" individually for each card
const DescriptionBlock = ({ text }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text)
    return (
      <p className="brief-clamped-text">
        No supplementary background brief was declared.
      </p>
    );

  // Set the character threshold (e.g., 150 characters)
  const characterLimit = 150;
  const isLongText = text.length > characterLimit;

  return (
    <div className="case-brief-dock">
      <h4>Submitted Brief Summary</h4>
      <p className="brief-clamped-text">
        {isExpanded || !isLongText
          ? text
          : `${text.substring(0, characterLimit)}...`}

        {isLongText && (
          <button
            type="button"
            className="read-more-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? " Show Less" : " Read More"}
          </button>
        )}
      </p>
    </div>
  );
};

const LawyerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
const navigate = useNavigate();
  const approvedrequests = async () => {
    try {
      const lawyer = JSON.parse(localStorage.getItem("user"));
      if (!lawyer?._id) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/appointment/approved/${lawyer._id}`,
      );
      setAppointments(response.data.requests || []);
    } catch (error) {
      console.error("Error retrieving active appointments:", error);
    }
  };

  useEffect(() => {
    approvedrequests();
  }, []);

  return (
    <div className="appointments-container">
      <Link to="/lawyer/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      <div className="appointments-header">
        <div>
          <h1>Active Consultations</h1>
          <p className="subtitle">
            Review your upcoming confirmed schedule and open secure client
            communication briefs.
          </p>
        </div>
        <span className="schedule-count-pill">
          {appointments.length} Confirmed
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-schedule-state">
          <div className="empty-calendar-icon">📅</div>
          <h3>No Confirmed Consultations</h3>
          <p>
            Approved appointments and scheduled slots will populate directly
            within this workspace panel.
          </p>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map((item) => (
            <div className="appointment-card-premium" key={item._id}>
              {/* TOP PROFILE & STATE BADGE ROW */}
              <div className="card-header-group">
                <div className="client-meta">
                  <h2>{item.clientId?.fullName || "Verified Client"}</h2>
                  <span className="case-type-badge">{item.issueType}</span>
                </div>
                <span className="status-badge-chip active-confirmed">
                  <span className="status-dot"></span>
                  Confirmed
                </span>
              </div>

              {/* SCHEDULE TIMELINE DOCK */}
              <div className="schedule-timeline-track">
                <div className="time-block">
                  <span className="block-label">Consultation Date</span>
                  <span className="block-value">
                    📅{" "}
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="time-block">
                  <span className="block-label">Session Window</span>
                  <span className="block-value">
                    🕒{" "}
                    {new Date(item.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* NEW RENDER BLOCK: Includes individual Read More handling */}
              <DescriptionBlock text={item.description} />

              {/* FUTURE-PROOF FOOTER ACTIONS */}
              <div className="appointment-action-footer">
                <button
                  className="secondary-action-btn disabled-placeholder"
                  disabled
                >
                  📁 0 Files Attached
                </button>
                <button
                  className="action-btn primary-chat-btn"
                  onClick={() => {
                    navigate(`/chat/${item._id}`);
                  }}
                >
                  💬 Launch Secure Chat Room
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LawyerAppointments;
