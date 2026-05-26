import React from "react";
import "../styles/notifications.css";
import { Link } from "react-router-dom";
const Notifications = () => {
  // Real apps use structured objects instead of raw strings
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Appointment Approved",
      message: "Your consultation request with Adv. Rahul Sharma has been formally confirmed.",
      time: "2 mins ago",
      isUnread: true,
    },
    {
      id: 2,
      type: "info",
      title: "Document Uploaded",
      message: "Case file 'Property_Dispute_Draft.pdf' has been successfully uploaded to cloud storage.",
      time: "1 hour ago",
      isUnread: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Upcoming Consultation",
      message: "Reminder: Your scheduled audio/video legal session begins in exactly 60 minutes.",
      time: "2 hours ago",
      isUnread: true,
    },
  ];

  // Helper mapping function to render modern icons contextually
  const getNotificationIcon = (type) => {
    switch (type) {
      case "success": return <span className="noti-icon success-icon">✅</span>;
      case "warning": return <span className="noti-icon warning-icon">⏳</span>;
      case "info": return <span className="noti-icon info-icon">📄</span>;
      default: return <span className="noti-icon">🔔</span>;
    }
  };

  return (
    <div className="notifications-container">
       {/* 🌟 NEW: Elegant Back to Dashboard Trigger */}
      <Link to="/client/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p className="subtitle">Stay updated with your active legal workflows</p>
        </div>
        <button className="mark-all-read-btn">Mark all as read</button>
      </div>

      <div className="notification-list">
        {notifications.map((item) => (
          <div 
            className={`notification-card-premium ${item.isUnread ? "unread" : ""}`} 
            key={item.id}
          >
            {/* Left Column: Icon */}
            {getNotificationIcon(item.type)}

            {/* Middle Column: Text Stack */}
            <div className="noti-content-wrapper">
              <div className="noti-top-row">
                <h3 className="noti-title">{item.title}</h3>
                <span className="noti-time">{item.time}</span>
              </div>
              <p className="noti-message">{item.message}</p>
            </div>

            {/* Right Column: Mini Unread Indicator Dot */}
            {item.isUnread && <span className="unread-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;