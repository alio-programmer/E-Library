import express from "express";
import { protectRoute } from "../Middlewares/ProtectRoute.js";
import { upload } from "../Middlewares/Multer.js";
import {
  createbook,
  updatebook,
  getbooks,
  listbook,
  deletebook,
} from "../Controller/Book.controller.js";

const Bookrouter = express.Router();

Bookrouter.get("/", getbooks);

Bookrouter.get("/:bookid", listbook);

Bookrouter.post(
  "/createbook",
  protectRoute,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createbook
);

Bookrouter.patch(
  "/updatebook/:bookid",
  protectRoute,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updatebook
);

Bookrouter.delete("/delete/:bookid", protectRoute, deletebook);

export default Bookrouter;
