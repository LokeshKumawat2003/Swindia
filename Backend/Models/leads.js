const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    leadName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Interested",
    },
    assignedTo: {
      type: String,
      default: "Agent X",
      required: true,
    },
    nextFollowUpDate: {
      type: Date,
      required: false,
    },
    nextFollowUpTime: {
      type: String,
      required: false,
    },
    leadSource: {
      type: String,
      required: false,
      default: "Website",
    },
    conversionDate: {
      type: Date,
      required: false,
    },
    leadNotes: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      default: "New",
      required: true,
    },
    purchaseHistory: {
      type: String,
      required: true,
    },
    medicalNeeds: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LeadModel = mongoose.model("Leads", leadSchema);

module.exports = LeadModel;
