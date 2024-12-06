import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pagestyle/profile.css";
import axios from "axios";

const Profile = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8080/enter/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data. Please try again.");
        setLoading(false);
      }
    };

    if (token) {
      fetchProfileData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);
  console.log(formData.user);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-summary">
        <p>
          <strong>Name:</strong> {formData.user.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.user.email}
        </p>
        <p>
          <strong>Role:</strong> {formData.user.role}
        </p>
        <p>
          <strong>Status:</strong> {formData.user.status}
        </p>
      </div>
      <div>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
        {formData.user.role === "Admin" && (
          <button className="edit-admin-button" onClick={handleAdmin}>
            Go to Admin
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
