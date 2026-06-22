import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/myAppointments.css";
import axios from "axios";

const ClientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const fetchClientAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) return;

      // Replace this endpoint with your actual client-side appointments route
      const response = await axios.get(
        `http://localhost:3000/api/appointment/client/${user._id}`,
      );
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Error fetching your appointment schedule:", error);
    }
  };

  useEffect(() => {
    fetchClientAppointments();
  }, []);

  return (
    <div className="client-appointments-container">
      {/* Return to Core Dashboard */}
      <Link to="/client/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Main Header Row */}
      <div className="appointments-header">
        <div>
          <h1>My Consultations</h1>
          <p className="subtitle">
            Track your legal intake requests, monitor approval statuses, and
            connect with your advocates.
          </p>
        </div>
        <span className="total-badge">{appointments.length} Total</span>
      </div>

      {/* Appointments Grid/List */}
      {appointments.length === 0 ? (
        <div className="empty-appointments-card">
          <div className="empty-icon">⚖️</div>
          <h3>No Legal Consultations Found</h3>
          <p>
            You haven't requested any legal consultations yet. Head over to the
            directory to find a lawyer.
          </p>
          <Link to="/client/find-lawyers" className="browse-lawyers-cta">
            Browse Legal Directory
          </Link>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map((item) => (
            <div className="appointment-card-premium" key={item._id}>
              {/* TOP ROW: Lawyer Info & Status Badge */}
              <div className="card-header-group">
                <div className="lawyer-meta">
                  <h2>{item.lawyerId?.fullName || "Verified Advocate"}</h2>
                  <span className="case-type-badge">{item.issueType}</span>
                </div>
                {/* Dynamic Status Badging */}
                <span
                  className={`status-badge-chip ${item.status?.toLowerCase() || "pending"}`}
                >
                  <span className="status-dot"></span>
                  {item.status || "Pending"}
                </span>
              </div>

              {/* MIDDLE ROW: Schedule Information Block */}
              <div className="schedule-timeline-track">
                <div className="time-block">
                  <span className="block-label">Request Date</span>
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
                  <span className="block-label">Preferred Window</span>
                  <span className="block-value">
                    🕒{" "}
                    {new Date(item.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* BOTTOM ROW: Brief Summary Box */}
              <div className="case-brief-dock">
                <h4>Your Case Summary Brief</h4>
                <p className="brief-text">{item.description}</p>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="appointment-action-footer">
                {item.status?.toLowerCase() === "approved" ? (
                  <button
                    className="action-btn primary-chat-btn"
                    onClick={() => {
                      navigate(`/chat/${item._id}`);
                    }}
                  >
                    💬 Launch Secure Chat Room
                  </button>
                ) : item.status?.toLowerCase() === "rejected" ? (
                  <span className="footer-notice status-declined">
                    ✕ This request was declined by the practitioner
                  </span>
                ) : (
                  <span className="footer-notice status-waiting">
                    ⏳ Awaiting advocate review & conflict clearance
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientAppointments;
