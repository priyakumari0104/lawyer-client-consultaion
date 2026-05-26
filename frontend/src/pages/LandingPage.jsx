import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

const LandingPage = () => {
  return (
    <div className="landing-container">

      {/* Background Glow */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">JurisDesk</h1>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/role-select" className="register-btn">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-left">
          <h1>
            Connect With <span>Trusted Lawyers</span>
          </h1>

          <p>
            Book legal consultations, upload important documents,
            chat securely with lawyers, and manage your legal
            appointments — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/role-select" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="hero-right">

          <div className="glass-card">
            <h2>Why JurisDesk?</h2>

            <div className="feature">
              ⚖️ Easy Lawyer Consultation
            </div>

            <div className="feature">
              📄 Secure Document Upload
            </div>

            <div className="feature">
              📅 Appointment Scheduling
            </div>

            <div className="feature">
              💬 Real-time Communication
            </div>

            <div className="feature">
              🔒 Safe & Encrypted Platform
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};

export default LandingPage;