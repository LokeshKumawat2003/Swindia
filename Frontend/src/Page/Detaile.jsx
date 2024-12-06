import React from 'react';
import '../pagestyle/detail.css'
import { useSelector } from "react-redux";
const ViewDetails = () => {
  const leadData = {
    leadName: 'John Doe',
    contactNumber: '1234567890',
    email: 'john.doe@example.com',
    address: '123 Main St',
    status: 'Interested',
    assignedTo: 'Agent A',
    nextFollowUpDate: '2024-12-15',
    nextFollowUpTime: '10:00 AM',
    leadSource: 'Website',
    conversionDate: '2024-12-01',
    leadNotes: 'Needs more information about the product',
    customerType: 'New',
    purchaseHistory: 'No previous purchases',
    medicalNeeds: 'None',
  };


 
    // const detailItem = useSelector((state) => state.detail.detailItem);
  
//  console.log(detailItem)
  return (
    <div className="view-details-container">
      <h2>Lead Details</h2>
      <div className="details-section">
        <div className="detail">
          <label>Name:</label>
          <span>{leadData.leadName}</span>
        </div>
        <div className="detail">
          <label>Contact Number:</label>
          <span>{leadData.contactNumber}</span>
        </div>
        <div className="detail">
          <label>Email:</label>
          <span>{leadData.email}</span>
        </div>
        <div className="detail">
          <label>Address:</label>
          <span>{leadData.address}</span>
        </div>
        <div className="detail">
          <label>Status:</label>
          <span>{leadData.status}</span>
        </div>
        <div className="detail">
          <label>Assigned To:</label>
          <span>{leadData.assignedTo}</span>
        </div>
        <div className="detail">
          <label>Next Follow-Up Date:</label>
          <span>{leadData.nextFollowUpDate}</span>
        </div>
        <div className="detail">
          <label>Next Follow-Up Time:</label>
          <span>{leadData.nextFollowUpTime}</span>
        </div>
        <div className="detail">
          <label>Lead Source:</label>
          <span>{leadData.leadSource}</span>
        </div>
        <div className="detail">
          <label>Conversion Date:</label>
          <span>{leadData.conversionDate}</span>
        </div>
        <div className="detail">
          <label>Lead Notes:</label>
          <span>{leadData.leadNotes}</span>
        </div>
        <div className="detail">
          <label>Customer Type:</label>
          <span>{leadData.customerType}</span>
        </div>
        <div className="detail">
          <label>Purchase History:</label>
          <span>{leadData.purchaseHistory}</span>
        </div>
        <div className="detail">
          <label>Medical Needs:</label>
          <span>{leadData.medicalNeeds}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
