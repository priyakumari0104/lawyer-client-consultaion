import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/reports.css";

const Reports = () => {
  // Simulating a real analytics backend dataset with period trend tracking
  const metrics = [
    { id: 1, title: "Total Consultations", value: "245", trend: "+14.2%", isPositive: true, subtext: "vs previous month" },
    { id: 2, title: "Verified Lawyers", value: "56", trend: "+4 new", isPositive: true, subtext: "this week" },
    { id: 3, title: "Active Clients", value: "180", trend: "+28%", isPositive: true, subtext: "new registrations" },
    { id: 4, title: "Revenue Generated", value: "₹2.5L", trend: "+8.4%", isPositive: true, subtext: "platform commission" }
  ];

  const recentTransactions = [
    { id: "TXN9842", lawyer: "Adv. Rahul Sharma", client: "Nitya Sharma", fee: "₹1,500", status: "Settled" },
    { id: "TXN9843", lawyer: "Adv. Priya Verma", client: "Amit Kapoor", fee: "₹2,500", status: "Processing" }
  ];

  return (
    <div className="reports-container">
      {/* Back to Dashboard Navigation Link */}
      <Link to="/admin/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>

      {/* Analytics Header Section */}
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="subtitle">Monitor platform metrics, transaction pipelines, and user growth parameters</p>
        </div>
        <div className="filter-dropdown-wrapper">
          <select className="time-filter-select">
            <option value="30">Last 30 Days</option>
            <option value="7">Last 7 Days</option>
            <option value="365">This Year</option>
          </select>
        </div>
      </div>

      {/* METRICS OVERVIEW GRID */}
      <div className="reports-grid">
        {metrics.map((metric) => (
          <div className="report-card-premium" key={metric.id}>
            <div className="card-top-row">
              <h3>{metric.title}</h3>
              <span className={`trend-indicator ${metric.isPositive ? "up" : "down"}`}>
                {metric.trend}
              </span>
            </div>
            <p className="metric-large-value">{metric.value}</p>
            <span className="metric-subtext">{metric.subtext}</span>
          </div>
        ))}
      </div>

      {/* REVENUE BREAKDOWN & TRANSACTION DATA TRACKS */}
      <div className="analytics-lower-section">
        <div className="transactions-audit-block">
          <div className="block-header">
            <h3>Recent Platform Billings</h3>
            <span className="live-pulse-badge"><span className="pulse-dot"></span> Live Auditing</span>
          </div>
          
          <div className="audit-table-wrapper">
            <div className="table-header-row">
              <span>Transaction ID</span>
              <span>Practitioner</span>
              <span>Client</span>
              <span>Gross Fee</span>
              <span>Status</span>
            </div>
            {recentTransactions.map((txn) => (
              <div className="table-body-row" key={txn.id}>
                <span className="txn-id">{txn.id}</span>
                <span className="font-highlight">{txn.lawyer}</span>
                <span>{txn.client}</span>
                <span className="fee-highlight">{txn.fee}</span>
                <span className={`status-pill ${txn.status.toLowerCase()}`}>{txn.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;