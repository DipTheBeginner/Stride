import { fileTypeFromBuffer } from "file-type";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function validateWorkspaceLogo(file: Express.Multer.File) {
  const detected = await fileTypeFromBuffer(file.buffer);

  if (!detected || !allowedTypes.has(detected.mime)) {
    throw new Error("Only PNG, JPEG and WebP images are allowed");
  }

  return detected.mime;
}
