import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = process.env.AWS_S3_BUCKET || "happy-tokens";
const REGION = process.env.AWS_REGION || "ap-south-1";
const CDN_BASE =
  process.env.CDN_BASE_URL || "https://d2yhk23ciu9dj0.cloudfront.net";

// Supports both the standard AWS_* names and the legacy awsAccessKeyId/awsAccessKey
// names used by the old rb-iit-api, so whichever is already in .env.local works.
const ACCESS_KEY_ID =
  process.env.AWS_ACCESS_KEY_ID || process.env.awsAccessKeyId;
const SECRET_ACCESS_KEY =
  process.env.AWS_SECRET_ACCESS_KEY || process.env.awsAccessKey;

export async function generateUploadUrl({ fileName, contentType }) {
  if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    throw new Error(
      "Image upload isn't configured: set AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (or the legacy awsAccessKeyId / awsAccessKey) in .env.local and restart the dev server.",
    );
  }

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
    region: REGION,
  });

  const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, "")}`;
  const key = `rb-iit/product-images/${safeName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const publicUrl = `${CDN_BASE}/${key}`;

  return { uploadUrl, publicUrl };
}
