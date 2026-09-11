import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/roleSelect.css";

const RoleSelect = () => {

  const navigate = useNavigate();

  const handleRole = (role) => {
    // Store selected role
    sessionStorage.setItem("registrationRole", role);

    // Go to the common registration page
    navigate("/register");
  };

  return (
    <div className="role-container">

      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="role-card">

        <h1>Welcome To JurisDesk</h1>

        <p>
          Choose how you want to continue
        </p>

        <div className="role-options">

          {/* Client */}
          <div
            className="role-box"
            onClick={() => handleRole("client")}
          >
            <div className="icon">👤</div>

            <h2>Client</h2>

            <span>
              Book consultations, upload legal documents,
              and connect with trusted lawyers.
            </span>
          </div>

          {/* Lawyer */}
          <div
            className="role-box"
            onClick={() => handleRole("lawyer")}
          >
            <div className="icon">⚖️</div>

            <h2>Lawyer</h2>

            <span>
              Manage appointments, review cases,
              and help clients professionally.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default RoleSelect;