import React from "react";
import { useNotification } from "../context/NotificationContext";
import "./Toast.css";

const Toast = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`toast toast-${notification.type}`}
        >
          <div className="toast-content">
            <span>{notification.message}</span>
            <button
              className="toast-close"
              onClick={() => removeNotification(notification.id)}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
