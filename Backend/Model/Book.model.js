import mongoose from "mongoose";

export const bookschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Author: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = new mongoose.model("Book", bookschema);
