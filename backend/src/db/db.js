 const mongoose = require('mongoose');
 
 const connectDB = async () => {
    try {
      
      await mongoose.connect(process.env.MONGO_URL, {
       
      });
      console.log("MongoDB connected", mongoose.connection.name);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  };

  module.exports = connectDB;