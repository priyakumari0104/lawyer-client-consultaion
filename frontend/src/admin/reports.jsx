import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/reports.css";
import axios from "axios";

const Reports = () => {
  const [stats, setStats] = useState({
    totalConsultaions: 0,
    verifiedlawyers: 0,
    totalclient: 0,
    revenue: 0,
    recentConsultations: [],
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH REPORT DATA
  // =========================
  const fetchReportsData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/dashboard`
    );

    console.log("FULL API RESPONSE:", response);
    console.log("API DATA:", response.data);
    console.log("STATS:", response.data.stats);

    setStats(response.data.stats);

  } catch (error) {
    console.error("REPORT API ERROR:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchReportsData();
  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="reports-container">
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="reports-container">

      {/* BACK TO DASHBOARD */}
      <Link
        to="/admin/dashboard"
        className="back-dashboard-btn"
      >
        <span className="arrow">←</span>
        Back to Dashboard
      </Link>

      {/* HEADER */}
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>

          <p className="subtitle">
            Monitor platform metrics, consultations, and user activity
          </p>
        </div>

        <div className="filter-dropdown-wrapper">
          <select className="time-filter-select">
            <option value="30">Last 30 Days</option>
            <option value="7">Last 7 Days</option>
            <option value="365">This Year</option>
          </select>
        </div>
      </div>


      {/* =========================
          METRICS
      ========================= */}

      <div className="reports-grid">

        {/* TOTAL CONSULTATIONS */}
        <div className="report-card-premium">

          <div className="card-top-row">
            <h3>Total Consultations</h3>

            <span className="trend-indicator up">
              Live
            </span>
          </div>

          <p className="metric-large-value">
            {stats.totalConsultaions}
          </p>

          <span className="metric-subtext">
            Total consultation requests
          </span>

        </div>


        {/* VERIFIED LAWYERS */}
        <div className="report-card-premium">

          <div className="card-top-row">
            <h3>Verified Lawyers</h3>

            <span className="trend-indicator up">
              Verified
            </span>
          </div>

          <p className="metric-large-value">
            {stats.verifiedlawyers}
          </p>

          <span className="metric-subtext">
            Currently verified practitioners
          </span>

        </div>


        {/* CLIENTS */}
        <div className="report-card-premium">

          <div className="card-top-row">
            <h3>Active Clients</h3>

            <span className="trend-indicator up">
              Live
            </span>
          </div>

          <p className="metric-large-value">
            {stats.totalclient}
          </p>

          <span className="metric-subtext">
            Registered clients
          </span>

        </div>


        {/* REVENUE */}
        <div className="report-card-premium">

          <div className="card-top-row">
            <h3>Revenue Generated</h3>

            <span className="trend-indicator">
              N/A
            </span>
          </div>

          <p className="metric-large-value">
            ₹{stats.revenue}
          </p>

          <span className="metric-subtext">
            Payment system not implemented
          </span>

        </div>

      </div>


      {/* =========================
          RECENT CONSULTATIONS
      ========================= */}

      <div className="analytics-lower-section">

        <div className="transactions-audit-block">

          <div className="block-header">

            <h3>Recent Consultations</h3>

            <span className="live-pulse-badge">
              <span className="pulse-dot"></span>
              Live Data
            </span>

          </div>


          <div className="audit-table-wrapper">

            {/* TABLE HEADER */}

            <div className="table-header-row">

              <span>Consultation ID</span>

              <span>Client</span>

              <span>Lawyer</span>

              <span>Issue Type</span>

              <span>Status</span>

            </div>


            {/* TABLE DATA */}

            {stats.recentConsultations &&
            stats.recentConsultations.length > 0 ? (

              stats.recentConsultations.map((consultation) => (

                <div
                  className="table-body-row"
                  key={consultation._id}
                >

                  {/* CONSULTATION ID */}

                  <span className="txn-id">
                    {consultation._id.slice(-6)}
                  </span>


                  {/* CLIENT */}

                  <span className="font-highlight">
                    {consultation.clientId?.fullName ||
                      "Unknown Client"}
                  </span>


                  {/* LAWYER */}

                  <span>
                    {consultation.lawyerId?.fullName ||
                      "Unknown Lawyer"}
                  </span>


                  {/* ISSUE */}

                  <span>
                    {consultation.issueType ||
                      "Not specified"}
                  </span>


                  {/* STATUS */}

                  <span
                    className={`status-pill ${
                      consultation.status
                        ?.toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {consultation.status}
                  </span>

                </div>

              ))

            ) : (

              <div className="no-data-message">
                No consultations found.
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;