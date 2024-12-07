import "../pagestyle/admin.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const initialLeadState = {
    leadName: "",
    contactNumber: "",
    email: "",
    address: "",
    status: "",
    assignedTo: "",
    nextFollowUpDate: "",
    nextFollowUpTime: "",
    leadSource: "",
    conversionDate: "",
    leadNotes: "",
    customerType: "",
    purchaseHistory: "",
    medicalNeeds: "",
  };

  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState(initialLeadState);
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:8080/api/lead", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("Failed to fetch leads.");
    }
    setLoading(false);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:8080/notification", {
        title: inputValue,
      });
      alert(`message add: `);
      setInputValue("");
    } catch (error) {
      alert("err submit");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddOrEditLead = async () => {
    const token = localStorage.getItem("authToken");
    try {
      if (editingLeadId) {
        await axios.put(
          `http://localhost:8080/api/lead/${editingLeadId}`,
          newLead,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Lead updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/lead", newLead, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Lead added successfully!");
      }
      setNewLead(initialLeadState);
      setEditingLeadId(null);
      fetchLeads();
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Failed to save lead.");
    }
  };

  const handleDeleteLead = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:8080/api/lead/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Lead deleted successfully!");
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead.");
    }
  };

  const handleEditClick = (lead) => {
    setEditingLeadId(lead._id);
    setNewLead({ ...lead });
  };

  return (
    <div className="admin-lead-container">
      <h2>Admin Lead Management</h2>
      <div className="add-lead-form">
        <h3>{editingLeadId ? "Edit Lead" : "Add New Lead"}</h3>
        {Object.keys(initialLeadState).map((field) =>
          field === "leadNotes" ? (
            <textarea
              key={field}
              name={field}
              placeholder="Lead Notes"
              value={newLead[field]}
              onChange={handleChange}
            />
          ) : (
            <input
              key={field}
              type={
                field.includes("Date")
                  ? "date"
                  : field.includes("Time")
                  ? "time"
                  : "text"
              }
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1").trim()}
              value={newLead[field]}
              onChange={handleChange}
            />
          )
        )}
        <button className="add-lead-btn" onClick={handleAddOrEditLead}>
          {editingLeadId ? "Update Lead" : "Add Lead"}
        </button>
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleChangeInput}
          placeholder="Enter Notification..."
          className="input-box"
        />
        <button onClick={handleClick} className="submit-btn">
          Submit
        </button>
      </div>

      <div className="lead-list">
        <h3>Lead List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.leadName}</td>
                  <td>{lead.status}</td>
                  <td>{lead.assignedTo}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(lead)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteLead(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
