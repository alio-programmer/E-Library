import jwt from "jsonwebtoken";
import User from "../Model/User.model";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .json({ message: "Unauthorized-No token provided" })
        .status(401);
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.json({ message: "Unauthorized-Invalid token" }).status(401);
    }
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      return res.json({ message: "User not found" }).status(401);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};
