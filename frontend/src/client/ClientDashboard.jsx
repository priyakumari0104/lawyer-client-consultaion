import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/clientDashboard.css";
import axios from "axios";
import { Calendar, Clock, MapPin, Menu } from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";

const FILTERS = ["all", "approved", "pending", "rejected"];

const ClientDashboard = () => {
  
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const[notifications,setNotifications]=useState([]);
  const [showNotifications,setShowNotification]=useState(false);
  const [selectNotification,setSelectedNotification]=useState(null);
  const navigate = useNavigate();
const storedUser = JSON.parse(localStorage.getItem("user"));
  const fetchDashboardData = async () => {
    try {
      
      if (!storedUser?._id) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/appointment/client/${storedUser._id}`
      );
      
      const data = response.data.appointments || [];

      setAppointments(data);
      setStats({
        total: data.length,
        pending: data.filter((item) => item.status === "pending").length,
        approved: data.filter((item) => item.status === "approved").length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
const fetchNotification= async ()=>{
  try{
const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/notification/${storedUser._id}`);
setNotifications(response.data.notifications);

  }catch(error){
console.log(error);
  }
}
  useEffect(() => {
    const rawData = localStorage.getItem("user");
    if (rawData) {
      try {
        const storedUser = JSON.parse(rawData);
        setUser(storedUser);
        fetchDashboardData();
        fetchNotification();
      } catch (error) {
        console.error("Failed to parse user from localstorage", error);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  const filteredAppointments =
    activeFilter === "all"
      ? appointments
      : appointments.filter((item) => item.status === activeFilter);

  return (
    <div className={`dashboard-container ${isNavOpen ? "nav-open" : ""}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">JurisDesk</h2>

        <ul>
          <Link to="/client/dashboard">
            <li>🏠 Dashboard</li>
          </Link>
          <Link to="/client/find-lawyers">
            <li>⚖️ Find Lawyers</li>
          </Link>
          <Link to="/client/appointments">
            <li>📅 My Appointments</li>
          </Link>
          <Link to="/client/documents">
            <li>📂 Documents</li>
          </Link>
          <Link to="/client/notifications">
            <li>🔔 Notifications</li>
          </Link>
          <Link to="/client/profile">
            <li>👤 Profile</li>
          </Link>
          <li onClick={logout}>🚪 Logout</li>
        </ul>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        {/* MOBILE TOGGLE BUTTON */}
        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <Menu size={18} /> Menu
        </button>

        {/* HEADER */}
       <header className="dashboard-header">
  <div>
    <h1>Welcome back, {user?.fullName || "User"} 👋</h1>
    <p>Manage your legal consultations securely.</p>
  </div>

  <div className="header-right">

    {/* Notification Bell */}
    <div
      className="notification-wrapper"
      onClick={() => setShowNotification(!showNotifications)}
    >
      <IoNotificationsOutline className="notification-icon" />

      {notifications.filter(notification => !notification.isRead).length > 0 && (
        <span className="notification-badge">
          {notifications.filter(notification => !notification.isRead).length}
        </span>
      )}
    </div>

    {/* Profile Image */}
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="profile"
      className="profile-image"
    />

  </div>
</header>

        {/* STATS */}
        <section className="stats-container">
          <div className="stats-card">
            <h2>{stats.total}</h2>
            <p>Total Appointments</p>
          </div>
          <div className="stats-card">
            <h2>{stats.pending}</h2>
            <p>Pending Requests</p>
          </div>
          <div className="stats-card">
            <h2>{stats.approved}</h2>
            <p>Approved Cases</p>
          </div>
          <div className="stats-card">
            <h2>12</h2>
            <p>Uploaded Documents</p>
          </div>
        </section>

        {/* YOUR APPOINTMENTS */}
        <section className="appointment-section">
          <div className="section-head">
            <div>
              <h2>Your Appointments</h2>
              <p>Every consultation you've booked, newest first.</p>
            </div>

            <span className="badge-count">
              {filteredAppointments.length} Shown
            </span>
          </div>

          {/* FILTER PILLS */}
          <div className="filter-row">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`filter-chip ${
                  activeFilter === filter ? "is-active" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* APPOINTMENT CARDS */}
          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <p>
                No {activeFilter !== "all" ? activeFilter : ""} appointments to
                show.
              </p>
            </div>
          ) : (
            <div className="appointment-grid">
              {filteredAppointments.map((item) => (
                <article key={item._id} className="appointment-card">
                  <div className="appointment-card-top">
                    <h3>{item.lawyerId?.fullName || "Unassigned Lawyer"}</h3>

                    <span
                      className={`status-pill ${
                        item.status ? item.status.toLowerCase() : "pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="appointment-type">
                    {item.issueType || "Legal Consultation"}
                  </p>

                  <div className="appointment-meta">
                    <span>
                      <Calendar size={14} />
                      {new Date(
                        item.appointmentDate || item.createdAt
                      ).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    {item.time && (
                      <span>
                        <Clock size={14} />
                        {item.time}
                      </span>
                    )}

                    {item.mode && (
                      <span>
                        <MapPin size={14} />
                        {item.mode}
                      </span>
                    )}
                  </div>

                  <button type="button">View Details</button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* RECOMMENDED LAWYERS */}
        <section className="lawyer-section">
          <h2>Recommended Lawyers</h2>

          <div className="lawyer-cards">
            <div className="lawyer-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt="Adv. Priya Verma"
              />
              <h3>Adv. Priya Verma</h3>
              <p>Divorce Lawyer</p>
              <button type="button">Book Now</button>
            </div>

            <div className="lawyer-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt="Adv. Aman Gupta"
              />
              <h3>Adv. Aman Gupta</h3>
              <p>Corporate Lawyer</p>
              <button type="button">Book Now</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientDashboard;