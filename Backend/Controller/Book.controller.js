import Book from "../Model/Book.model.js";

const createbook = (req, res) => {
  try {
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};
