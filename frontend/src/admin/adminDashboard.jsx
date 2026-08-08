import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/adminDashboard.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AdminDashboard = () => {
  // Simulating live real-time system events that an admin needs to monitor
  const liveSystemLogs = [
    { id: 1, type: "security", text: "New Lawyer Registration: Adv. Priya Verma submitted Bar credentials.", time: "4 mins ago" },
    { id: 2, type: "transaction", text: "Escrow Payment: Client Nitya Sharma deposited ₹1,500 for consultation.", time: "18 mins ago" },
    { id: 3, type: "system", text: "Automated Cleanup: Cleared 4 expired pending appointment requests.", time: "1 hour ago" }
  ];
const [stats,setStats]=useState({
  totalLawyers:0,
  pendinglawyers:0,
  verifiedlawyers:0,
  totalclients:0

})
  const dashboardStats=async()=>{
    try{
      const response= await axios.get (`${import.meta.env.VITE_BASE_URL}/api/admin/dashboard`);
      setStats(response.data.stats);
    }catch(error){
      console.log(error.message);
    }
  }
  useEffect(()=>{dashboardStats()},[]);
  return (
    <div className="dashboard-container">
      
      {/* FIXED ASIDE SIDEBAR */}
      <aside className="sidebar">
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

      {/* COMPONENT MAIN WORKSPACE CONTAINER */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Admin Dashboard 👨‍💼</h1>
            <p className="subtitle">Central management console for legal consultants, escrow streams, and users.</p>
          </div>
          <div className="system-status-indicator">
            <span className="pulse-dot"></span> System Status: Operational
          </div>
        </header>

        {/* METRICS ROW */}
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
            <h2>₹2.5L</h2>
            <p>Platform Revenue</p>
          </div>
        </section>

        {/* REVENUE-GRADE REAL WORKSPACE: SYSTEM ACTION TRACKS */}
        <section className="dashboard-activity-log">
          <div className="log-card-wrapper">
            <div className="log-header-row">
              <h3>Live Platform Activity Stream</h3>
              <span className="live-pill">Real-time Feed</span>
            </div>
            
            <div className="log-entries-stack">
              {liveSystemLogs.map((log) => (
                <div className="log-row-item" key={log.id}>
                  <div className="log-left-meta">
                    <span className={`log-indicator-dot ${log.type}`}></span>
                    <p className="log-main-text">{log.text}</p>
                  </div>
                  <span className="log-time-label">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;