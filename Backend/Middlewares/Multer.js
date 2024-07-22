import path from "node:path";
export const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { filesize: 1e7 },
});
