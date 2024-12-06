const express = require("express");
const jwt = require("jsonwebtoken");
const LeadModel = require("../Models/leads");
const LeadsRoute = express.Router();

LeadsRoute.get("/lead", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const data = await LeadModel.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.send(data);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res
      .status(500)
      .send({ message: "Error fetching leads", error: error.message });
  }
});

LeadsRoute.post("/lead", async (req, res) => {
  console.log("Received data:", req.body);
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  let payload = req.body;
  payload.user = decoded.id;
  console.log(payload);
  try {
    const leadData = new LeadModel(payload);
    await leadData.save();
    res
      .status(201)
      .json({ message: "Lead saved successfully", lead: leadData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save lead", error: error.message });
    console.log(error);
  }
});

LeadsRoute.put("/lead/:id", async (req, res) => {
  try {
    const leadId = req.params.id;
    const updateData = req.body;

    const updatedLead = await LeadModel.findByIdAndUpdate(leadId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res
      .status(200)
      .json({ message: "Lead updated successfully", lead: updatedLead });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update lead", error: error.message });
  }
});
LeadsRoute.delete("/lead/:id", async (req, res) => {
  try {
    const leadId = req.params.id;

    const deletedLead = await LeadModel.findByIdAndDelete(leadId);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res
      .status(200)
      .json({ message: "Lead deleted successfully", lead: deletedLead });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete lead", error: error.message });
  }
});

module.exports = LeadsRoute;
