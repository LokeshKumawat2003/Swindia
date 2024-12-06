const mongoose = require("mongoose");

const getDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Swindia", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is running");
  } catch (error) {
    console.log(`Database error: ${error}`);
  }
};

module.exports = getDb;
