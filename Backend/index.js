import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import Userrouter from "./Routes/User.routes.js";
dotenv.config();
const app = express();

app.use(express.json());

const startserver = async () => {
  await connectDB();

  try {
    app.listen(process.env.PORT || 5050, () => {
      console.log(`server listening on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
startserver();

app.use("/api", Userrouter);

app.get("/", (req, res) => {
  res.send("API is running");
});
