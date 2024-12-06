import React, { useEffect, useState } from "react";
import "../componentStyle/table.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setLeadDetail } from "../redux/detail";

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    assignedTo: "",
    leadSource: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 1;
  const parseDate = (date) => {
    return new Date(date).getTime();
  };



  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let response = await axios.get(
          `http://localhost:8080/api/lead?page=1&limit=`
        );
        console.log(response.data);
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...leads].sort((a, b) => {
      if (key === "nextFollowUpDate" || key === "conversionDate") {
        const dateA = parseDate(a[key]);
        const dateB = parseDate(b[key]);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    });

    setLeads(sortedData);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredAndSearchedLeads = leads.filter((lead) => {
    return (
      (!filters.status || lead.status === filters.status) &&
      (!filters.assignedTo || lead.assignedTo === filters.assignedTo) &&
      (!filters.leadSource || lead.leadSource === filters.leadSource) &&
      (lead.leadName.toLowerCase().includes(searchQuery) ||
        lead.email.toLowerCase().includes(searchQuery) ||
        lead.contactNumber.includes(searchQuery))
    );
  });

  const totalPages = Math.ceil(filteredAndSearchedLeads.length / itemsPerPage);
  const paginatedLeads = filteredAndSearchedLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleView = (lead) => {
    // console.log(lead);
    dispatch(setLeadDetail(lead));
    navigate('/detaile'); 
  };
  return (
    <div>
      {loading ? (
        <h1 style={{ marginTop: "150px", textAlign: "center" }}>Loading...</h1>
      ) : (
        <div className="table-container">
          <div className="controls">
            <div className="table-input">
              <input
                type="text"
                placeholder="Search by name, email, or contact"
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <select name="status" onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
            <select name="assignedTo" onChange={handleFilterChange}>
              <option value="">All Agents</option>
              <option value="Agent A">Agent A</option>
              <option value="Agent B">Agent B</option>
            </select>
            <select name="leadSource" onChange={handleFilterChange}>
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
            </select>
          </div>

          <table className="lead-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("leadName")}>Lead Name</th>
                <th onClick={() => handleSort("contactNumber")}>
                  Contact Number
                </th>
                <th>Email</th>
                <th>Address</th>
                <th onClick={() => handleSort("status")}>Status</th>
                <th>Assigned To</th>
                <th onClick={() => handleSort("nextFollowUpDate")}>
                  Next Follow-Up Date
                </th>
                <th>Next Follow-Up Time</th>
                <th onClick={() => handleSort("leadSource")}>Lead Source</th>
                <th>Conversion Date</th>
                <th>Lead Notes</th>
                <th>Customer Type</th>
                <th>Purchase History</th>
                <th>Medical Needs</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((lead, index) => (
                <tr key={index} onClick={() => handleView(lead)}>
                  <td>{lead.leadName}</td>
                  <td>{lead.contactNumber}</td>
                  <td>{lead.email}</td>
                  <td>{lead.address}</td>
                  <td>{lead.status}</td>
                  <td>{lead.assignedTo}</td>
                  <td>{lead.nextFollowUpDate}</td>
                  <td>{lead.nextFollowUpTime}</td>
                  <td>{lead.leadSource}</td>
                  <td>{lead.conversionDate}</td>
                  <td>{lead.leadNotes}</td>
                  <td>{lead.customerType}</td>
                  <td>{lead.purchaseHistory}</td>
                  <td>{lead.medicalNeeds}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
