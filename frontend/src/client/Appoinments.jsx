import React from "react";
import "../styles/appoinments.css";
import {Link} from "react-router-dom"
const Appointments = () => {
  const appointments = [
    {
      id: 1,
      lawyer: "Adv. Rahul Sharma",
      type: "Criminal Lawyer",
      date: "25 May 2026",
      time: "10:30 AM",
      status: "Approved"
    },
    {
      id: 2,
      lawyer: "Adv. Priya Verma",
      type: "Corporate Lawyer",
      date: "28 May 2026",
      time: "03:15 PM",
      status: "Pending"
    }
  ];

  return (
    <div className="appointments-container">
       {/* 🌟 NEW: Elegant Back to Dashboard Trigger */}
      <Link to="/client/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>
      {/* Page Heading Section */}
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p className="subtitle">Review, track, and manage your scheduled legal consultations</p>
      </div>

      {/* Main Grid Wrapper */}
      <div className="appointments-list">
        {appointments.map((item) => (
          <div className="appointment-card-premium" key={item.id}>
            
            {/* Top Row: Info Stack + Status Badge */}
            <div className="card-top-group">
              <div className="lawyer-meta">
                <h2>{item.lawyer}</h2>
                <span className="lawyer-specialty">{item.type}</span>
              </div>
              <div className={`status-badge ${item.status.toLowerCase()}`}>
                <span className="status-dot"></span>
                {item.status}
              </div>
            </div>

            {/* Middle Row: Schedule Timing Blocks */}
            <div className="schedule-timeline-block">
              <div className="time-metric">
                <span className="metric-label">Date</span>
                <span className="metric-value">📅 {item.date}</span>
              </div>
              <div className="time-metric">
                <span className="metric-label">Scheduled Time</span>
                <span className="metric-value">🕒 {item.time || "TBD"}</span>
              </div>
            </div>

            {/* Bottom Row: Contextual Functional Controls */}
            <div className="appointment-actions-row">
              {item.status === "Approved" ? (
                <button className="action-btn primary-action">Join Consultation</button>
              ) : (
                <button className="action-btn disabled-action" disabled>Awaiting Approval</button>
              )}
              <button className="action-btn secondary-action">Reschedule</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;