import multer from "multer";
import path from "path";
const __dirname = path.resolve();
export const upload = multer({
  dest: path.join(__dirname, "./public/files/uploads"),
  limits: { filesize: 1e7 },
});
