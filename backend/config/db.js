const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/Blockchain-Election";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI,{
      autoIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
