import React from "react";
import "../styles/documents.css";
import { Link } from "react-router-dom";
const Documents = () => {
  const uploadedFiles = [
    { id: 1, name: "FIR_Copy.pdf", size: "2.4 MB", date: "May 20, 2026" },
    { id: 2, name: "Property_Document.pdf", size: "4.8 MB", date: "May 18, 2026" }
  ];

  return (
    <div className="documents-container">
      {/* Header Segment */}
       {/* 🌟 NEW: Elegant Back to Dashboard Trigger */}
      <Link to="/client/dashboard" className="back-dashboard-btn">
        <span className="arrow">←</span> Back to Dashboard
      </Link>
      <div className="documents-header">
        <h1>Upload Documents</h1>
        <p className="subtitle">Securely store and manage legal case files, contracts, and certificates</p>
      </div>

      {/* Modern Drag & Drop File Zone */}
      <div className="upload-dropzone">
        <div className="dropzone-inner">
          <span className="upload-icon">📁</span>
          <p className="main-drop-text">
            Drag and drop your files here, or <label htmlFor="file-upload" className="browse-link">browse</label>
          </p>
          <p className="hint-text">Supports PDF, DOCX, and PNG up to 10MB</p>
          <input type="file" id="file-upload" className="hidden-file-input" />
        </div>
        <button className="upload-submit-btn">
          <span>🚀</span> Upload File
        </button>
      </div>

      {/* File Explorer Listing */}
      <div className="documents-section-title">
        <h2>Your Documents ({uploadedFiles.length})</h2>
      </div>

      <div className="documents-list">
        {uploadedFiles.map((file) => (
          <div className="document-card-premium" key={file.id}>
            
            {/* Left Content Column */}
            <div className="doc-meta-group">
              <div className="file-icon-avatar">📄</div>
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <div className="file-subdata">
                  <span>{file.size}</span>
                  <span className="divider-dot"></span>
                  <span>Uploaded {file.date}</span>
                </div>
              </div>
            </div>

            {/* Right Action Trigger Group */}
            <div className="doc-actions-group">
              <button className="doc-action-btn view" title="View Document">👁️ View</button>
              <button className="doc-action-btn download" title="Download">📥</button>
              <button className="doc-action-btn delete" title="Delete">🗑️</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;