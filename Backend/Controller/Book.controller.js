import cloudinary from "../Config/Cloudinary.js";
import path from "path";
import Book from "../Model/Book.model.js";
import fs from "fs";

export const createbook = async (req, res) => {
  try {
    const files = req.files;

    if (!files || !files.coverImage) {
      return res.status(400).json({ message: "No cover image provided" });
    }

    const { title, genre } = req.body;
    const Author = req.user._id;
    const __dirname = path.resolve();

    if (!title || !Author || !genre) {
      return res
        .json({ message: "Please provide all required fields" })
        .status(400);
    }

    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const filename = files.coverImage[0].filename;
    const filepath = path.join(__dirname, "/public/files/uploads", filename);

    const bookfilename = files.file[0].filename;
    const bookfilepath = path.join(
      __dirname,
      "/public/files/uploads",
      bookfilename
    );

    const uploadresult = await cloudinary.uploader.upload(filepath, {
      filename_override: filename,
      folder: "book-cover",
      resource_type: "image",
      public_id: filename,
      format: coverImageMimeType,
    });

    const bookfileupdateresult = await cloudinary.uploader.upload(
      bookfilepath,
      {
        resource_type: "raw",
        filename_override: bookfilename,
        folder: "book-file",
        format: "pdf",
      }
    );
    const coverImageURL = uploadresult.secure_url;
    const fileURL = bookfileupdateresult.secure_url;

    const book = await Book.create({
      title,
      Author,
      genre,
      coverImage: coverImageURL,
      file: fileURL,
    });
    if (!book) {
      return res.json({ message: "Failed to create book" }).status(500);
    }
    try {
      await fs.promises.unlink(filepath);
      await fs.promises.unlink(bookfilepath);
    } catch (error) {
      return res.json({ message: error.message }).status(500);
    }

    return res.json({ message: "Book created successfully" }).status(201);
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};

export const updatebook = async (req, res) => {
  try {
    const bookid = req.params.bookid;
    const files = req.files;
    const curruser = req.user._id;
    const book = await Book.findOne({ _id: bookid });

    if (!book) {
      return res.json({ message: "Book not found" }).status(404);
    }

    if (book.Author.toString() !== curruser.toString()) {
      return res
        .json({ message: "You are not authorized to update this book" })
        .status(401);
    }

    const { title, genre } = req.body;
    const __dirname = path.resolve();

    //coverImage update
    let completecoverImage = "";
    if (req?.files?.coverImage) {
      const filename = files.coverImage[0].filename;
      const filepath = path.join(__dirname, "/public/files/uploads", filename);

      completecoverImage = filename;

      const uploadresult = await cloudinary.uploader.upload(filepath, {
        filename_override: filename,
        folder: "book-cover",
      });

      completecoverImage = uploadresult.secure_url;
      await fs.promises.unlink(filepath);
    }

    //file update
    let completeBookfile = "";
    if (req?.files?.file) {
      const bookfilename = files.file[0].filename;
      const bookfilepath = path.join(
        __dirname,
        "/public/files/uploads",
        bookfilename
      );
      completeBookfile = bookfilename;
      const bookfileupdateresult = await cloudinary.uploader.upload(
        bookfilepath,
        {
          resource_type: "raw",
          filename_override: completeBookfile,
          folder: "book-file",
        }
      );

      completeBookfile = bookfileupdateresult.secure_url;
      await fs.promises.unlink(bookfilepath);
    }

    const updated = await Book.findByIdAndUpdate(
      { _id: bookid },
      {
        title,
        genre,
        coverImage: completecoverImage ? completecoverImage : book.coverImage,
        file: completeBookfile ? completeBookfile : book.file,
      },
      { new: true }
    );

    if (!updated) {
      return res.json({ message: "Failed to update book" }).status(500);
    }
    return res
      .json({ updated, message: "Book updated successfully" })
      .status(200);
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};
