import cloudinary from "../Config/Cloudinary.js";
import path from "path";

export const createbook = async (req, res) => {
  try {
    const files = req.files;

    if (!files || !files.coverImage) {
      return res.status(400).json({ message: "No cover image provided" });
    }

    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

    const filename = files.coverImage[0].filename;

    const __dirname = path.resolve();

    const filepath = path.join(__dirname, "/public/files/uploads", filename);

    const uploadresult = await cloudinary.uploader.upload(filepath, {
      filename_override: filename,
      folder: "book-cover",
      resource_type: "image",
      public_id: filename,
      format: coverImageMimeType,
    });

    const bookfilename = files.file[0].filename;
    const bookfilepath = path.join(
      __dirname,
      "/public/files/uploads",
      bookfilename
    );

    const bookfileupdateresult = await cloudinary.uploader.upload(
      bookfilepath,
      {
        resource_type: "raw",
        filename_override: bookfilename,
        folder: "book-file",
        format: "pdf",
      }
    );

    console.log("bookfileupdateresult", bookfileupdateresult);

    console.log("uploadresult", uploadresult);
    return res.json({ message: "Book created successfully" }).status(201);
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};
