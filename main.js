const express = require("express")
const mongoose = require("mongoose")

const PORT = 3000

const app = express()

//mongodb connection..

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/mydatabase', {
  
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1); // Exit process with failure
    }
  };

  connectDB()
  
  app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
  })