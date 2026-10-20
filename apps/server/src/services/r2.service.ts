import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { r2Client } from "../config/r2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadLogoToR2(
  workspaceId: string,
  file: Express.Multer.File,
  validatedMimeType: string,
) {
  const bucket = process.env.R2_BUCKET_NAME;

  if (!bucket) {
    throw new Error("R2_BUCKET_NAME is missing");
  }

  const key = `workspaces/${workspaceId}/logos/${crypto.randomUUID()}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await r2Client.send(command);

  return key;
}

export async function deleteLogofromR2(key: string) {
  const bucket = process.env.R2_BUCKET_NAME;

  if (!bucket) {
    throw new Error("Biucket is missing");
  }

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  await r2Client.send(command);
}

export async function getLogoSignedUrl(key: string) {
  const bucket = process.env.R2_BUCKET_NAME;

  if (!bucket) {
    throw new Error("Bucket not found");
  }

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return getSignedUrl(r2Client, command, {
    expiresIn: 3600,
  });
}
