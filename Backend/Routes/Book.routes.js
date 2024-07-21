import express from "express";
import { protectRoute } from "../Middlewares/ProtectRoute";

const Bookrouter = express.Router();

Bookrouter.post("/createbook", protectRoute, createbook);
Bookrouter.get("/getbooks", protectRoute, getbooks);

export default Bookrouter;
