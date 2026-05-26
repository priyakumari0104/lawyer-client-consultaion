import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/manageUsers.css";

const ManageUsers = () => {
  // Simulating live backend user records matching your core Mongoose models
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nitya Sharma",
      email: "nitya@gmail.com",
      phoneNumber: "+91 9876543210",
      role: "Client",
      joinedDate: "15 Jan 2026"
    },
    {
      id: 2,
      name: "Adv. Rahul Verma",
      email: "rahul.verma@jurisdesk.com",
      phoneNumber: "+91 9988776655",
      role: "Lawyer",
      joinedDate: "02 Feb 2026"
    }
  ]);

  const handleRemoveUser = (id, name) => {
    // Production integration hook for your Axios.delete API route: /api/admin/user/:id
    const confirmSuspension = window.confirm(`Are you absolutely sure you want to revoke platform access for ${name}?`);
    if (confirmSuspension) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="users-container">
      {/* Back to Dashboard Navigation Trigger */}
      <Link to="/admin/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Control Panel Header Segment */}
      <div className="users-header">
        <div>
          <h1>Manage Users</h1>
          <p className="subtitle">Audit platform accounts, track active credentials, and manage access privileges</p>
        </div>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search accounts by name, email, or role..." />
        </div>
      </div>

      {/* Accounts List Canvas */}
      <div className="users-list">
        {users.map((user) => (
          <div className="user-card-premium" key={user.id}>
            
            {/* Profile Summary Segment */}
            <div className="user-profile-header">
              <div className="user-avatar-placeholder">
                {user.name.split(" ").filter(n => !n.includes(".")).map(n => n[0]).join("")}
              </div>
              <div className="identity-block">
                <h2>{user.name}</h2>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </div>
            </div>

            {/* Core Database Attributes Sub-Grid */}
            <div className="account-metadata-grid">
              <div className="meta-item">
                <span className="meta-label">Email Address</span>
                <span className="meta-value">{user.email}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Phone Reference</span>
                <span className="meta-value">{user.phoneNumber}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Account Created</span>
                <span className="meta-value">{user.joinedDate}</span>
              </div>
            </div>

            {/* Administrative Access Actions */}
            <div className="user-card-actions">
              <button className="action-view-btn">View Logs</button>
              <button 
                className="action-remove-btn"
                onClick={() => handleRemoveUser(user.id, user.name)}
              >
                🚫 Revoke Access
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;