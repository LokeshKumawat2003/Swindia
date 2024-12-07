import React from "react";
import "../componentStyle/notification.css";

const Notification = ({ message, type, onClose }) => {


  return (
    <div className={`notification-box ${type}`}>
      <p>
        {message || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore unde ipsa placeat veritatis provident, officiis laborum dolorum error et rerum possimus nisi culpa? Reprehenderit incidunt pariatur quia. Quod, iusto consequatur?"}
      </p>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Notification;

