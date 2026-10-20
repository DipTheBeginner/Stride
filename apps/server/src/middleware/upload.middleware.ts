import multer from "multer";

const storage = multer.memoryStorage();

export const uploadWorkspacelogo = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("logo");
