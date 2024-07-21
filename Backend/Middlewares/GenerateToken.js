import jwt from "jsonwebtoken";

const generatetoke = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attacks (cross site attacks)
    sameSite: "strict", //CSRF attacks cross site request forgery attacks
  });
};

export default generatetoke;
