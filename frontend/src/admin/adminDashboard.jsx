import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/adminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [stats, setStats] = useState({
    totalLawyers: 0,
    pendinglawyers: 0,
    verifiedlawyers: 0,
    totalclients: 0,
  });

  // Real activities from MongoDB
  const [activities, setActivities] = useState([]);

  const dashboardStats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admin/dashboard`
      );

      setStats(response.data.stats);
    } catch (error) {
      console.log("Dashboard stats error:", error.message);
    }
  };

  // Fetch recent activities
  const getRecentActivities = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/activity/recent`
      );

      console.log("Activities:", response.data);

      setActivities(response.data.activities || []);
    } catch (error) {
      console.log("Activity fetch error:", error.message);
    }
  };

  useEffect(() => {
    dashboardStats();
    getRecentActivities();
  }, []);

  // Activity time formatter
  const getTimeAgo = (date) => {
    const seconds = Math.floor(
      (new Date() - new Date(date)) / 1000
    );

    if (seconds < 60) {
      return "Just now";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}
      >
        <button
          className="close-menu-btn"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        <h2 className="logo">JurisDesk</h2>

        <ul>
          <Link to="/admin/dashboard" className="nav-link active">
            <li><span>🏠</span> Dashboard</li>
          </Link>

          <Link to="/admin/verifylawyer" className="nav-link">
            <li><span>✔</span> Verify Lawyers</li>
          </Link>

          <Link to="/admin/manageusers" className="nav-link">
            <li><span>👥</span> Manage Users</li>
          </Link>

          <Link to="/admin/reports" className="nav-link">
            <li><span>📊</span> Reports</li>
          </Link>

          <Link to="/login" className="nav-link logout-item">
            <li><span>🚪</span> Logout</li>
          </Link>
        </ul>
      </aside>

      {/* MOBILE OVERLAY */}
      {isMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* MAIN */}
      <main className="dashboard-main">

        {!isMenuOpen && (
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>
        )}

        <header className="dashboard-header">
          <div>
            <h1>Admin Dashboard 👨‍💼</h1>
            <p className="subtitle">
              Central management console for legal consultants and users.
            </p>
          </div>

          <div className="system-status-indicator">
            <span className="pulse-dot"></span>
            System Status: Operational
          </div>
        </header>

        {/* STATS */}
        <section className="stats-container">

          <div className="stats-card">
            <h2>{stats.totalLwyers}</h2>
            <p>Total Lawyers</p>
          </div>

          <div className="stats-card highlight-orange">
            <h2>{stats.pendinglawyers}</h2>
            <p>Pending Verifications</p>
          </div>

          <div className="stats-card">
            <h2>{stats.totalclient}</h2>
            <p>Total Clients</p>
          </div>

          <div className="stats-card highlight-green">
            <h2>₹0L</h2>
            <p>Platform Revenue</p>
          </div>

        </section>

        {/* LIVE ACTIVITY */}
        <section className="dashboard-activity-log">
          <div className="log-card-wrapper">

            <div className="log-header-row">
              <h3>Live Platform Activity Stream</h3>
              <span className="live-pill">
                Recent Activity
              </span>
            </div>

            <div className="log-entries-stack">

              {activities.length === 0 ? (
                <p className="no-activity-message">
                  No recent platform activity.
                </p>
              ) : (
                activities.map((activity) => (
                  <div
                    className="log-row-item"
                    key={activity._id}
                  >
                    <div className="log-left-meta">

                      <span
                        className={`log-indicator-dot ${activity.category}`}
                      ></span>

                      <div>
                        <p className="activity-title">
                          {activity.title}
                        </p>

                        <p className="log-main-text">
                          {activity.message}
                        </p>
                      </div>

                    </div>

                    <span className="log-time-label">
                      {getTimeAgo(activity.createdAt)}
                    </span>

                  </div>
                ))
              )}

            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;