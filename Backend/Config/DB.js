import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on("error", () => {
      console.log("Error in connecting to database");
    });

    await mongoose.connect("mongodb://localhost:27017/libname");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
