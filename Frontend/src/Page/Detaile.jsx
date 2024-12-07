import React from "react";
import "../pagestyle/detail.css";
import { useSelector } from "react-redux";
const ViewDetails = () => {
  const selectedLead = useSelector((state) => state.lead.selectedLead);

  const handlePrint = () => {
    const printContents = document.querySelector(".view-details-container");
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents.outerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div>
      <div className="view-details-container">
        <h2>Lead Details</h2>
        <div className="details-section">
          <div className="detail">
            <label>Name:</label>
            <span>{selectedLead.leadName}</span>
          </div>
          <div className="detail">
            <label>Contact Number:</label>
            <span>{selectedLead.contactNumber}</span>
          </div>
          <div className="detail">
            <label>Email:</label>
            <span>{selectedLead.email}</span>
          </div>
          <div className="detail">
            <label>Address:</label>
            <span>{selectedLead.address}</span>
          </div>
          <div className="detail">
            <label>Status:</label>
            <span>{selectedLead.status}</span>
          </div>
          <div className="detail">
            <label>Assigned To:</label>
            <span>{selectedLead.assignedTo}</span>
          </div>
          <div className="detail">
            <label>Next Follow-Up Date:</label>
            <span>{selectedLead.nextFollowUpDate}</span>
          </div>
          <div className="detail">
            <label>Next Follow-Up Time:</label>
            <span>{selectedLead.nextFollowUpTime}</span>
          </div>
          <div className="detail">
            <label>Lead Source:</label>
            <span>{selectedLead.leadSource}</span>
          </div>
          <div className="detail">
            <label>Conversion Date:</label>
            <span>{selectedLead.conversionDate}</span>
          </div>
          <div className="detail">
            <label>Lead Notes:</label>
            <span>{selectedLead.leadNotes}</span>
          </div>
          <div className="detail">
            <label>Customer Type:</label>
            <span>{selectedLead.customerType}</span>
          </div>
          <div className="detail">
            <label>Purchase History:</label>
            <span>{selectedLead.purchaseHistory}</span>
          </div>
          <div className="detail">
            <label>Medical Needs:</label>
            <span>{selectedLead.medicalNeeds}</span>
          </div>
        </div>
      </div>
     <div className="btn-print">
     <button onClick={handlePrint}> Print</button>
     </div>
    </div>
  );
};

export default ViewDetails;
