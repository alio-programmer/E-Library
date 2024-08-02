import generatetoke from "../Middlewares/GenerateToken.js";
import User from "../Model/User.model.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    const check = await User.findOne({
      $or: [{ Username: Username }, { Email: Email }],
    });
    if (check) {
      return res.json({ message: "User already exists" }).status(400);
    }

    const salt = await bcrypt.genSalt(10);
    console.log("working");
    const hashpassword = await bcrypt.hash(Password, salt);
    console.log("working");
    const newuser = await User.create({
      Username,
      Email,
      Password: hashpassword,
    });
    if (newuser) {
      generatetoke(newuser._id, res);
      return res.json({ message: "User created successfully" }).status(201);
    }
    return res
      .json({ message: "User not created please try again" })
      .status(500);
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    if (!user) {
      return res.json({ message: "User not found" }).status(404);
    }
    const ispass = await bcrypt.compare(Password, user.Password);
    if (ispass) {
      generatetoke(user._id, res);
      return res
        .json({
          _id: user._id,
          username: user.username,
          email: user.email,
          message: "User logged in successfully",
        })
        .status(200);
    }
    return res.json({ message: "Invalid credentials" }).status(401);
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};

const logout = (req, res) => {
  try {
    const clearjwt = res.clearCookie("jwt");
    if (clearjwt) {
      return res.json({ message: "User logged out successfully" }).status(200);
    }
    return res.json({ message: "User logged out error" }).status(500);
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};

export { signup, login, logout };
