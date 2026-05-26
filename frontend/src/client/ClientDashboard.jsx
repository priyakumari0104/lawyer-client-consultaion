import {React, useEffect,useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "../styles/clientDashboard.css";

const ClientDashboard = () => {
 const [user,setUser]= useState(null);
 const navigate= useNavigate();
 useEffect(()=>{
  const rawData= localStorage.getItem("user");
  if(rawData){
    try{
      const storedUser=JSON.parse(rawData);
      setUser(storedUser);
    }
    catch(error){
      console.error("failed to fetch user data from localstorage",error);
    }
  }
 },[])
  const logout=()=>{
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     alert("Logged out successfully");
navigate("/login");
  }
  return (

    <div className="dashboard-container">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="logo">
          JurisDesk
        </h2>

        <ul>

          <Link to="/client/dashboard">

            <li>
              🏠 Dashboard
            </li>

          </Link>

          <Link to="/client/find-lawyers">

            <li>
              ⚖️ Find Lawyers
            </li>

          </Link>

          <Link to="/client/appointments">

            <li>
              📅 My Appointments
            </li>

          </Link>

          <Link to="/client/documents">

            <li>
              📂 Documents
            </li>

          </Link>

          <Link to="/client/notifications">

            <li>
              🔔 Notifications
            </li>

          </Link>

          <Link to="/client/profile">

            <li>
              👤 Profile
            </li>

          </Link>

          

            <li onClick={logout}>
              🚪 Logout
            </li>
          

        </ul>

      </div>

      {/* MAIN SECTION */}

      <div className="dashboard-main">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <h1>
              Welcome Back  {user?.fullName}👋
            </h1>

            <p>
              Manage your legal consultations securely.
            </p>

          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-image"
          />

        </div>

        {/* STATS */}

        <div className="stats-container">

          <div className="stats-card">

            <h2>
              5
            </h2>

            <p>
              Total Appointments
            </p>

          </div>

          <div className="stats-card">

            <h2>
              2
            </h2>

            <p>
              Pending Requests
            </p>

          </div>

          <div className="stats-card">

            <h2>
              3
            </h2>

            <p>
              Approved Cases
            </p>

          </div>

          <div className="stats-card">

            <h2>
              12
            </h2>

            <p>
              Uploaded Documents
            </p>

          </div>

        </div>

        {/* UPCOMING APPOINTMENT */}

        <div className="appointment-section">

          <h2>
            Upcoming Appointment
          </h2>

          <div className="appointment-card">

            <h3>
              Adv. Rahul Sharma
            </h3>

            <p>
              Criminal Lawyer
            </p>

            <p>
              📅 25 May 2026
            </p>

            <p>
              ⏰ 5:00 PM
            </p>

            <button>
              View Details
            </button>

          </div>

        </div>

        {/* RECOMMENDED LAWYERS */}

        <div className="lawyer-section">

          <h2>
            Recommended Lawyers
          </h2>

          <div className="lawyer-cards">

            <div className="lawyer-card">

              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt=""
              />

              <h3>
                Adv. Priya Verma
              </h3>

              <p>
                Divorce Lawyer
              </p>

              <button>
                Book Now
              </button>

            </div>

            <div className="lawyer-card">

              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt=""
              />

              <h3>
                Adv. Aman Gupta
              </h3>

              <p>
                Corporate Lawyer
              </p>

              <button>
                Book Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ClientDashboard;