import express from "express";
import { protectRoute } from "../Middlewares/ProtectRoute";
import { upload } from "../Middlewares/Multer";

const Bookrouter = express.Router();

Bookrouter.post(
  "/createbook",
  protectRoute,
  upload.fields([
    { name: "coverimage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createbook
);
Bookrouter.get("/getbooks", protectRoute, getbooks);

export default Bookrouter;
