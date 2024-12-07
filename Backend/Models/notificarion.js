const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
});
const NotificationModle = mongoose.model("Notification", notificationSchema);
module.exports = NotificationModle;
