const mongoose = require("mongoose");

const getDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://Malviyajay:masai@cluster0.7xg3wkz.mongodb.net/swindia?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is running");
  } catch (error) {
    console.log(`Database error: ${error}`);
  }
};

module.exports = getDb;
