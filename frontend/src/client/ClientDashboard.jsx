import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/clientDashboard.css";
import axios from "axios";
import { Calendar, Clock, MapPin, Menu ,X} from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";

const FILTERS = ["all", "approved", "pending", "rejected"];

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    documents:0
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  // ==========================================
  // FETCH DASHBOARD DATA
  // ==========================================

  const fetchDashboardData = async (userId) => {
  try {
    if (!userId) return;

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/appointment/client/${userId}`
    );

    const data = response.data.appointments || [];

    setAppointments(data);

    // Get documents for every appointment
    const documentResponses = await Promise.all(
      data.map(async (appointment) => {
        try {
          const documentResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/document/appointment/${appointment._id}`
          );

          return documentResponse.data.documents || [];
        } catch (error) {
          console.error(
            `Error fetching documents for appointment ${appointment._id}:`,
            error
          );

          return [];
        }
      })
    );

    // Count all uploaded documents
    const totalDocuments = documentResponses.reduce(
      (total, documents) => total + documents.length,
      0
    );

    setStats({
      total: data.length,

      pending: data.filter(
        (item) => item.status === "pending"
      ).length,

      approved: data.filter(
        (item) => item.status === "approved"
      ).length,

      documents: totalDocuments,
    });

  } catch (error) {
    console.error(
      "Error fetching dashboard data:",
      error
    );
  }
};

  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================

  const fetchNotifications = async (userId) => {
    try {
      if (!userId) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/notification/${userId}`
      );

      console.log(
        "Notifications:",
        response.data
      );

      setNotifications(
        response.data.notifications || []
      );
    } catch (error) {
      console.error(
        "Error fetching notifications:",
        error
      );
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    const rawData =
      localStorage.getItem("user");

    if (!rawData) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser =
        JSON.parse(rawData);

      setUser(parsedUser);

      fetchDashboardData(
        parsedUser._id
      );

      fetchNotifications(
        parsedUser._id
      );
    } catch (error) {
      console.error(
        "Failed to parse user from localStorage:",
        error
      );

      navigate("/login");
    }
  }, [navigate]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };

  // ==========================================
  // FILTER APPOINTMENTS
  // ==========================================

  const filteredAppointments =
    activeFilter === "all"
      ? appointments
      : appointments.filter(
          (item) =>
            item.status === activeFilter
        );

  // ==========================================
  // UNREAD NOTIFICATION COUNT
  // ==========================================

  const unreadNotificationCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;

  return (
    <div
      className={`dashboard-container ${
        isNavOpen ? "nav-open" : ""
      }`}
    >
      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className={`sidebar ${isNavOpen ? "sidebar-open" : ""}`}>
  <button
    type="button"
    className="sidebar-close-btn"
    onClick={() => setIsNavOpen(false)}
  >
    <X size={22} />
  </button>

  <h2 className="logo">
    JurisDesk
  </h2>

  <ul>
    <Link
      to="/client/dashboard"
      onClick={() => setIsNavOpen(false)}
    >
      <li>🏠 Dashboard</li>
    </Link>

    <Link
      to="/client/find-lawyers"
      onClick={() => setIsNavOpen(false)}
    >
      <li>⚖️ Find Lawyers</li>
    </Link>

    <Link
      to="/client/appointments"
      onClick={() => setIsNavOpen(false)}
    >
      <li>📅 My Appointments</li>
    </Link>

    <Link
      to="/client/documents"
      onClick={() => setIsNavOpen(false)}
    >
      <li>📂 Documents</li>
    </Link>

    <Link
      to="/client/profile"
      onClick={() => setIsNavOpen(false)}
    >
      <li>👤 Profile</li>
    </Link>

    <li
      onClick={() => {
        setIsNavOpen(false);
        logout();
      }}
    >
      🚪 Logout
    </li>
  </ul>
</aside>
{isNavOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setIsNavOpen(false)}
  />
)}
      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="dashboard-main">

        {/* MOBILE MENU */}

       <button
  type="button"
  className="sidebar-toggle"
  onClick={() => setIsNavOpen(true)}
>
  <Menu size={18} />
  Menu
</button>
        {/* ====================================
            HEADER
        ==================================== */}

        <header className="dashboard-header">

          <div>
            <h1>
              Welcome back,{" "}
              {user?.fullName || "User"} 👋
            </h1>

            <p>
              Manage your legal consultation
              securely.
            </p>
          </div>

          {/* HEADER RIGHT */}

          <div className="header-right">

            {/* ================================
                NOTIFICATION BELL
            ================================= */}

            <div
              className="notification-wrapper"
              onClick={() =>
                navigate(
                  "/client/notifications"
                )
              }
            >
              <IoNotificationsOutline
                className="notification-icon"
              />

              {unreadNotificationCount >
                0 && (
                <span className="notification-badge">
                  {unreadNotificationCount}
                </span>
              )}
            </div>

            {/* PROFILE IMAGE */}

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="profile-image"
            />

          </div>
        </header>

        {/* ======================================
            STATS
        ====================================== */}

        <section className="stats-container">

          <div className="stats-card">
            <h2>
              {stats.total}
            </h2>

            <p>
              Total Appointments
            </p>
          </div>

          <div className="stats-card">
            <h2>
              {stats.pending}
            </h2>

            <p>
              Pending Requests
            </p>
          </div>

          <div className="stats-card">
            <h2>
              {stats.approved}
            </h2>

            <p>
              Approved Cases
            </p>
          </div>

          <div className="stats-card">
            <h2>{stats.documents}</h2>

            <p>
              Uploaded Documents
            </p>
          </div>

        </section>

        {/* ======================================
            APPOINTMENTS
        ====================================== */}

        <section className="appointment-section">

          <div className="section-head">

            <div>
              <h2>
                Your Appointments
              </h2>

              <p>
                Every consultation you've
                booked, newest first.
              </p>
            </div>

            <span className="badge-count">
              {filteredAppointments.length}{" "}
              Shown
            </span>

          </div>

          {/* FILTERS */}

          <div className="filter-row">

            {FILTERS.map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(
                      filter
                    )
                  }
                  className={`filter-chip ${
                    activeFilter ===
                    filter
                      ? "is-active"
                      : ""
                  }`}
                >
                  {filter}
                </button>
              )
            )}

          </div>

          {/* APPOINTMENT CARDS */}

          {filteredAppointments.length ===
          0 ? (
            <div className="empty-state">

              <p>
                No{" "}
                {activeFilter !==
                "all"
                  ? activeFilter
                  : ""}{" "}
                appointments to show.
              </p>

            </div>
          ) : (

            <div className="appointment-grid">

              {filteredAppointments.map(
                (item) => (

                  <article
                    key={item._id}
                    className="appointment-card"
                  >

                    <div className="appointment-card-top">

                      <h3>
                        {item.lawyerId
                          ?.fullName ||
                          "Unassigned Lawyer"}
                      </h3>

                      <span
                        className={`status-pill ${
                          item.status
                            ? item.status.toLowerCase()
                            : "pending"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                    <p className="appointment-type">
                      {item.issueType ||
                        "Legal Consultation"}
                    </p>

                    <div className="appointment-meta">

                      <span>
                        <Calendar
                          size={14}
                        />

                        {new Date(
                          item.appointmentDate ||
                            item.createdAt
                        ).toLocaleDateString(
                          undefined,
                          {
                            month:
                              "short",
                            day:
                              "numeric",
                            year:
                              "numeric",
                          }
                        )}
                      </span>

                      {item.time && (
                        <span>
                          <Clock
                            size={14}
                          />
                          {item.time}
                        </span>
                      )}

                      {item.mode && (
                        <span>
                          <MapPin
                            size={14}
                          />
                          {item.mode}
                        </span>
                      )}

                    </div>

                    <button
                      type="button"
                    >
                      View Details
                    </button>

                  </article>

                )
              )}

            </div>
          )}

        </section>

        {/* ======================================
            RECOMMENDED LAWYERS
        ====================================== */}

        <section className="lawyer-section">

          <h2>
            Recommended Lawyers
          </h2>

          <div className="lawyer-cards">

            <div className="lawyer-card">

              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt="Adv. Priya Verma"
              />

              <h3>
                Adv. Priya Verma
              </h3>

              <p>
                Divorce Lawyer
              </p>

              <button type="button">
                Book Now
              </button>

            </div>

            <div className="lawyer-card">

              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt="Adv. Aman Gupta"
              />

              <h3>
                Adv. Aman Gupta
              </h3>

              <p>
                Corporate Lawyer
              </p>

              <button type="button">
                Book Now
              </button>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default ClientDashboard;