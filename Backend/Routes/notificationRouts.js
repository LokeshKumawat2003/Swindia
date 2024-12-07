const express = require("express");
const NotificationModle = require("../Models/notificarion");

const notificationrouter = express.Router();

notificationrouter.get("/", async (req, res) => {
  try {
    const notifications = await NotificationModle.find().sort({
      createdAt: -1,
    });

    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch notifications", details: error.message });
  }
});
notificationrouter.post("/", async (req, res) => {
  try {
    const notification = new NotificationModle(req.body);
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create notification", details: error.message });
  }
});

module.exports =notificationrouter