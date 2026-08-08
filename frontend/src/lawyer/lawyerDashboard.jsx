import React, { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "../styles/lawyerDashboard.css";
import axios from "axios";
const LawyerDashboard = () => {
  const navigate=useNavigate();
  // Real apps feature secondary actionable modules on the main workspace
  
  const [stats,setStats]=useState({
    totalclients:0,
    pendingRequests:0,
    approvedRequests:0,
    totalAppointments:0,
  });
  const [recentActivity,setRecentActivity]=useState([]);
   const lawyerData= localStorage.getItem("user");
    const data=JSON.parse(lawyerData);
 const logout=async (e)=>{
  localStorage.removeItem("user");
  localStorage.removeItem("token");
navigate("/login");
 }
  useEffect(()=>{
    const fetchdashdata= async (req,res)=>{
      try{
const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/lawyer/dashboard/${data._id}`);
setStats(response.data.stats);
setRecentActivity(response.data.upcoomingAppointments)
      }catch(error){
console.log(error);
      }
    }
    fetchdashdata();
},[])
  return (
    <div className="dashboard-container">
      
      {/* FIXED STATIC SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">JurisDesk</h2>
        <ul>
          <Link to="/lawyer/dashboard" className="nav-link active">
            <li><span>🏠</span> Dashboard</li>
          </Link>
          <Link to="/lawyer/requests" className="nav-link">
            <li><span>📩</span> Client Requests</li>
          </Link>
          <Link to="/lawyer/appoinments" className="nav-link">
            <li><span>📅</span> Appointments</li>
          </Link>
          <Link to="/lawyer/profile" className="nav-link">
            <li><span>👤</span> Profile</li>
          </Link>
          <Link to="/lawyer/status" className="nav-link">
            <li><span>✔</span> Verification</li>
          </Link>
          <Link to="/login" className="nav-link">
            <li  onClick={logout}><span>🚪</span> Logout</li>
          </Link>
        </ul>
      </aside>

      {/* INDEPENDENT MAIN WORKSPACE */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {data.fullName} 👋</h1>
            <p className="subtitle">Here is a real-time summary of your legal practice diagnostics</p>
          </div>
          <div className="header-badge">Practitioner Portal</div>
        </header>

        {/* METRICS ROW */}
        <section className="stats-container">
          <div className="stats-card">
            <h2>{stats.totalclients}</h2>
            <p>Total Clients</p>
          </div>
          <div className="stats-card">
            <h2>{stats.pendingAppointments}</h2>
            <p>Pending Requests</p>
          </div>
          <div className="stats-card">
            <h2>{stats.approvedAppointments}</h2>
            <p>Appointments</p>
          </div>
          <div className="stats-card">
            <h2>₹25K</h2>
            <p>Total Earnings</p>
          </div>
        </section>

        {/* LOWER SECTION: ACTIVE WORKFLOW MONITOR */}
        <section className="dashboard-split-workspace">
          <div className="workspace-block">
            <div className="block-title-bar">
              <h3>Upcoming Live Agenda</h3>
              <Link to="/lawyer/appoinments" className="internal-text-link">View Calendar →</Link>
            </div>
            <div className="agenda-stack">
              {recentActivity.map((activity) => (
                <div className="agenda-row-item" key={activity.id}>
                  <div className="client-info">
                    <h4>{activity.clientId?.fullName}</h4>
                    <span>{activity.issueType}</span>
                  </div>
                  <div className="schedule-info">
                    <span className="timestamp">{new Date(activity.createdAt).toLocaleDateString()}</span>
                    <span className={`mini-badge ${activity.status.toLowerCase().replace(" ", "-")}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default LawyerDashboard;