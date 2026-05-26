import React from "react";
import { Link } from "react-router-dom";
import "../styles/lawyerAppoinments.css";

const LawyerAppointments = () => {
  // Simulating real-time backend data models with statuses and case details
  const appointments = [
    {
      id: 1,
      client: "Nitya Sharma",
      caseType: "Property Dispute Consultation",
      date: "25 May 2026",
      time: "5:00 PM",
      status: "upcoming"
    },
    {
      id: 2,
      client: "Aman Gupta",
      caseType: "Corporate Contract Review",
      date: "28 May 2026",
      time: "7:00 PM",
      status: "pending"
    }
  ];

  return (
    <div className="appointments-container">
      {/* Back to Dashboard Accent Link */}
      <Link to="/lawyer/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Main Header */}
      <div className="appointments-header">
        <h1>Lawyer Appointments</h1>
        <p className="subtitle">Review and manage your real-time client consultation schedule</p>
      </div>

      {/* Dashboard Canvas Grid */}
      <div className="appointments-list">
        {appointments.map((item) => (
          <div className="appointment-card-premium" key={item.id}>
            
            {/* Top Row: Client Info & Status Badge */}
            <div className="card-header-group">
              <div className="client-meta">
                <h2>{item.client}</h2>
                <span className="case-type-badge">{item.caseType}</span>
              </div>
              <span className={`status-badge-chip ${item.status}`}>
                <span className="status-dot"></span>
                {item.status === "upcoming" ? "Confirmed" : "Pending"}
              </span>
            </div>

            {/* Middle Row: Embedded Schedule Track Box */}
            <div className="schedule-timeline-track">
              <div className="time-block">
                <span className="block-label">Date</span>
                <span className="block-value">📅 {item.date}</span>
              </div>
              <div className="time-block">
                <span className="block-label">Scheduled Time</span>
                <span className="block-value">🕒 {item.time}</span>
              </div>
            </div>

            {/* Bottom Row: Dynamic Context Controls */}
            <div className="appointment-action-footer">
              {item.status === "upcoming" ? (
                <button className="action-btn primary-video-btn">
                  🎥 Launch Video Room
                </button>
              ) : (
                <div className="split-action-row">
                  <button className="action-btn accept-btn">Approve Slot</button>
                  <button className="action-btn decline-btn">Reschedule</button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerAppointments;