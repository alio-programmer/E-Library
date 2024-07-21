import mongoose from "mongoose";

const userschema = mongoose.Schema(
  {
    Username: {
      type: String,
      require: true,
      unique: true,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
    },
    Password: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userschema);

export default User;
