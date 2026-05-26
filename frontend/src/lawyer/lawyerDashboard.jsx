import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import "../styles/lawyerDashboard.css";

const LawyerDashboard = () => {
  const navigate=useNavigate();
  // Real apps feature secondary actionable modules on the main workspace
  const recentActivity = [
    { id: 1, client: "Nitya Sharma", type: "Property Dispute", time: "Today, 5:00 PM", status: "Upcoming" },
    { id: 2, client: "Aman Gupta", type: "Corporate Review", time: "28 May, 7:00 PM", status: "Pending Approval" }
  ];
   const lawyerData= localStorage.getItem("user");
    const data=JSON.parse(lawyerData);
 const logout=async (e)=>{
  localStorage.removeItem("user");
  localStorage.removeItem("token");
navigate("/login");
 }
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
            <h1>Welcome back, {data.userName} 👋</h1>
            <p className="subtitle">Here is a real-time summary of your legal practice diagnostics</p>
          </div>
          <div className="header-badge">Practitioner Portal</div>
        </header>

        {/* METRICS ROW */}
        <section className="stats-container">
          <div className="stats-card">
            <h2>18</h2>
            <p>Total Clients</p>
          </div>
          <div className="stats-card">
            <h2>5</h2>
            <p>Pending Requests</p>
          </div>
          <div className="stats-card">
            <h2>10</h2>
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
                    <h4>{activity.client}</h4>
                    <span>{activity.type}</span>
                  </div>
                  <div className="schedule-info">
                    <span className="timestamp">{activity.time}</span>
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