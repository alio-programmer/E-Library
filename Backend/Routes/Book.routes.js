import express from "express";
import { protectRoute } from "../Middlewares/ProtectRoute.js";
import { upload } from "../Middlewares/Multer.js";
import { createbook } from "../Controller/Book.controller.js";

const Bookrouter = express.Router();

Bookrouter.post(
  "/createbook",
  protectRoute,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createbook
);
// Bookrouter.get("/getbooks", protectRoute, getbooks);

export default Bookrouter;
