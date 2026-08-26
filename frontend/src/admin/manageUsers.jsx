import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/manageUsers.css";
import axios from "axios";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  // ============================
  // FETCH USERS FROM BACKEND
  // ============================

  const fetchUsers = async () => {
    try {

      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admin/manage-user`
      );

      console.log("Manage Users Response:", response.data);

      setUsers(response.data.users);

    } catch (error) {

      console.log(
        "Error fetching users:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }
  };


  // Fetch users when page loads
  useEffect(() => {
    fetchUsers();
  }, []);


  // ============================
  // SEARCH USERS
  // ============================

  const filteredUsers = users.filter((user) => {

    const searchValue = search.toLowerCase().trim();

    return (
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.role?.toLowerCase().includes(searchValue)
    );

  });


  // ============================
  // REVOKE ACCESS
  // ============================
  // For now this only removes the card from UI.
  // We will connect the real API later.

  const handleRemoveUser = (id, name) => {

    const confirmSuspension = window.confirm(
      `Are you absolutely sure you want to revoke platform access for ${name}?`
    );

    if (confirmSuspension) {

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== id)
      );

    }

  };


  return (

    <div className="users-container">

      {/* ============================
          BACK TO DASHBOARD
      ============================ */}

      <Link
        to="/admin/dashboard"
        className="back-dashboard-btn"
      >
        <span className="arrow">←</span>
        Back to Dashboard
      </Link>


      {/* ============================
          HEADER
      ============================ */}

      <div className="users-header">

        <div>

          <h1>Manage Users</h1>

          <p className="subtitle">
            Audit platform accounts, track active credentials,
            and manage access privileges
          </p>

        </div>


        {/* ============================
            SEARCH
        ============================ */}

        <div className="search-wrapper">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search accounts by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* ============================
          LOADING
      ============================ */}

      {loading && (

        <div className="loading-state">
          Loading users...
        </div>

      )}


      {/* ============================
          USER LIST
      ============================ */}

      {!loading && (

        <div className="users-list">

          {filteredUsers.length === 0 ? (

            <div className="empty-state">
              No users found.
            </div>

          ) : (

            filteredUsers.map((user) => (

              <div
                className="user-card-premium"
                key={user._id}
              >

                {/* ============================
                    PROFILE SUMMARY
                ============================ */}

                <div className="user-profile-header">

                  <div className="user-avatar-placeholder">

                    {user.name
                      ?.split(" ")
                      .filter((n) => !n.includes("."))
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                    }

                  </div>


                  <div className="identity-block">

                    <h2>
                      {user.name}
                    </h2>

                    <span
                      className={`role-badge ${user.role?.toLowerCase()}`}
                    >
                      {user.role?.toUpperCase()}
                    </span>

                  </div>

                </div>


                {/* ============================
                    ACCOUNT INFORMATION
                ============================ */}

                <div className="account-metadata-grid">

                  {/* EMAIL */}

                  <div className="meta-item">

                    <span className="meta-label">
                      Email Address
                    </span>

                    <span className="meta-value">
                      {user.email}
                    </span>

                  </div>


                  {/* PHONE */}

                  <div className="meta-item">

                    <span className="meta-label">
                      Phone Reference
                    </span>

                    <span className="meta-value">
                      {user.phone || "Not provided"}
                    </span>

                  </div>


                  {/* CREATED DATE */}

                  <div className="meta-item">

                    <span className="meta-label">
                      Account Created
                    </span>

                    <span className="meta-value">

                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            }
                          )
                        : "N/A"
                      }

                    </span>

                  </div>

                </div>


                {/* ============================
                    LAWYER VERIFICATION STATUS
                ============================ */}

                {user.role?.toLowerCase() === "lawyer" && (

                  <div className="user-status">

                    <span className="meta-label">
                      Verification Status -
                    </span>

                    <span
                      className={`verification-status ${user.verificationStatus}`}
                    >
                      {user.verificationStatus}
                    </span>

                  </div>

                )}


                {/* ============================
                    ACTIONS
                ============================ */}

                <div className="user-card-actions">

                  <button
                    className="action-view-btn"
                    onClick={() =>
                      console.log("View logs for:", user._id)
                    }
                  >
                    View Logs
                  </button>


                  <button
                    className="action-remove-btn"
                    onClick={() =>
                      handleRemoveUser(
                        user._id,
                        user.name
                      )
                    }
                  >
                    🚫 Revoke Access
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      )}

    </div>

  );

};

export default ManageUsers;