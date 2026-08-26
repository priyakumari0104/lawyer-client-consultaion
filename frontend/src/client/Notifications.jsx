import React, {
  useEffect,
  useState,
} from "react";

import "../styles/notifications.css";

import {
  Link,useLocation
} from "react-router-dom";

import axios from "axios";

const Notifications = () => {

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    selectedNotification,
    setSelectedNotification,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // CURRENT USER
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================
  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?._id) {
        console.log("No user ID found");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/notification/${user._id}`
      );

      const notificationData = response.data.notification || [];

      setNotifications(notificationData);

    } catch (error) {
      console.error("FETCH NOTIFICATION ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ==========================================
  // NOTIFICATION ICON
  // ==========================================

  const getNotificationIcon =
    (type) => {

      switch (type) {

        case "success":
          return "✓";

        case "warning":
          return "⚠";

        case "error":
          return "!";

        case "info":
          return "i";

        default:
          return "🔔";
      }
    };

  // ==========================================
  // MARK AS READ (single, no modal)
  // ==========================================

  const markAsRead = async (notification, event) => {

    // Prevent the row click (open detail) from also firing
    if (event) event.stopPropagation();

    if (notification.isRead) return;

    try {

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/notification/read/${notification._id}`
      );

      setNotifications(
        (previousNotifications) =>
          previousNotifications.map(
            (item) =>
              item._id === notification._id
                ? { ...item, isRead: true }
                : item
          )
      );

      if (selectedNotification?._id === notification._id) {
        setSelectedNotification({
          ...notification,
          isRead: true,
        });
      }

    } catch (error) {
      console.error(
        "Error marking notification as read:",
        error
      );
    }
  };

  // ==========================================
  // CLICK NOTIFICATION (opens detail view)
  // ==========================================

  const handleNotificationClick =
    async (notification) => {

      setSelectedNotification(
        notification
      );

      if (!notification.isRead) {
        markAsRead(notification);
      }
    };

  // ==========================================
  // DELETE NOTIFICATION
  // ==========================================

  const handleDeleteNotification =
    async (id, event) => {

      if (event) event.stopPropagation();

      try {

        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/notification/${id}`
        );

        setNotifications(
          (previousNotifications) =>
            previousNotifications.filter(
              (notification) =>
                notification._id !== id
            )
        );

        if (selectedNotification?._id === id) {
          setSelectedNotification(null);
        }

      } catch (error) {

        console.error(
          "Error deleting notification:",
          error
        );
      }
    };

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const markAllAsRead = async () => {

    try {

      const unreadNotifications =
        notifications.filter(
          (notification) =>
            !notification.isRead
        );

      if (unreadNotifications.length === 0) return;

      await Promise.all(
        unreadNotifications.map(
          (notification) =>
            axios.put(
              `${import.meta.env.VITE_BASE_URL}/api/notification/read/${notification._id}`
            )
        )
      );

      setNotifications(
        (previousNotifications) =>
          previousNotifications.map(
            (notification) => ({
              ...notification,
              isRead: true,
            })
          )
      );

      if (selectedNotification) {

        setSelectedNotification(
          (previous) => ({
            ...previous,
            isRead: true,
          })
        );
      }

    } catch (error) {

      console.error(
        "Error marking all notifications as read:",
        error
      );
    }
  };

  // ==========================================
  // UNREAD COUNT
  // ==========================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;
const location=useLocation();
const dashboardpath =location.pathname.startsWith("/lawyer")
?"/lawyer/dashboard"
:"/client/dashboard";

// ==========================================
  // UI
  // ==========================================

  return (

    <div className="notifications-page">

      <div className="notifications-panel">

        {/* BACK */}

        <Link
          to={dashboardpath}
          className="back-dashboard-btn"
        >
          ← Back to Dashboard
        </Link>

        {/* HEADER */}

        <div className="notifications-header">

          <div className="notifications-header-text">

            <h1>
              Notifications
              {unreadCount > 0 && (
                <span className="unread-badge">{unreadCount}</span>
              )}
            </h1>

            <p className="subtitle">
              Stay updated with your active legal workflows
            </p>

          </div>

          {unreadCount > 0 && (

            <button
              type="button"
              className="mark-all-read-btn"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>

          )}

        </div>


        {/* ======================================
            LOADING
        ====================================== */}

        {loading ? (

          <div className="notification-loading">
            <div className="loading-spinner" />
            Loading notifications...
          </div>

        ) : notifications.length === 0 ? (

          /* ====================================
             EMPTY
          ==================================== */

          <div className="notification-empty">

            <div className="empty-notification-icon">
              🔔
            </div>

            <h2>No notifications</h2>

            <p>You're all caught up!</p>

          </div>

        ) : (

          /* ====================================
             LIST
          ==================================== */

          <div className="notification-list">

            {notifications.map(
              (item) => (

                <div
                  key={item._id}
                  className={`notification-card-premium ${
                    !item.isRead ? "unread" : ""
                  }`}
                  onClick={() =>
                    handleNotificationClick(item)
                  }
                >

                  {/* ICON */}

                  <div
                    className={`noti-icon ${item.type}-icon`}
                  >
                    {getNotificationIcon(item.type)}
                  </div>


                  {/* CONTENT */}

                  <div className="noti-content-wrapper">

                    <div className="noti-top-row">

                      <h3 className="noti-title">
                        {item.title}
                        {!item.isRead && (
                          <span className="unread-dot" />
                        )}
                      </h3>

                      <span className="noti-time">
                        {new Date(item.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>

                    </div>

                    <p className="noti-message">
                      {item.message}
                    </p>

                  </div>


                  {/* ROW ACTIONS */}

                  <div className="noti-row-actions">

                    {!item.isRead && (

                      <button
                        type="button"
                        className="row-action-btn read-btn"
                        title="Mark as read"
                        onClick={(event) =>
                          markAsRead(item, event)
                        }
                      >
                        ✓
                      </button>

                    )}

                    <button
                      type="button"
                      className="row-action-btn delete-btn"
                      title="Delete notification"
                      onClick={(event) =>
                        handleDeleteNotification(item._id, event)
                      }
                    >
                      🗑
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* ======================================
          SELECTED NOTIFICATION
      ====================================== */}

      {selectedNotification && (

        <div
          className="notification-overlay"
          onClick={() => setSelectedNotification(null)}
        >

          <div
            className="notification-detail-card"
            onClick={(event) => event.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              type="button"
              className="notification-close"
              onClick={() =>
                setSelectedNotification(null)
              }
            >
              ×
            </button>


            {/* ICON */}

            <div
              className={`notification-detail-icon ${selectedNotification.type}-icon`}
            >
              {getNotificationIcon(selectedNotification.type)}
            </div>


            <span className="detail-label">
              NOTIFICATION
            </span>


            {/* TITLE */}

            <h2>{selectedNotification.title}</h2>


            {/* MESSAGE */}

            <p className="detail-message">
              {selectedNotification.message}
            </p>


            {/* TIME */}

            <span className="detail-time">
              {new Date(selectedNotification.createdAt).toLocaleString()}
            </span>


            {/* ACTIONS */}

            <div className="detail-actions">

              <button
                type="button"
                className="clear-notification-btn"
                onClick={() =>
                  handleDeleteNotification(selectedNotification._id)
                }
              >
                Clear Notification
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Notifications;