import express from "express";
import { login, logout, signup } from "../Controller/Auth.controller.js";

const Userrouter = express.Router();

Userrouter.post("/signup", signup);
Userrouter.post("/login", login);
Userrouter.post("/logout", logout);

export default Userrouter;
