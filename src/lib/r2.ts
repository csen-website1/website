import { S3Client } from "@aws-sdk/client-s3";

// Cloudflare R2 configuration using S3-compatible API
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "f51bbbeb366b8db54a926e78c3c82bd8";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "csen";
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "https://pub-e92af673a3c2432c934a6465802a4b3e.r2.dev";

// Create S3 client configured for Cloudflare R2
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// Helper function to generate public URL for uploaded files
export function getPublicUrl(key: string): string {
  return `${R2_PUBLIC_URL}/${key}`;
}

// Helper function to generate a unique file key
export function generateFileKey(originalName: string, folder: string = "uploads"): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const ext = originalName.split(".").pop() || "";
  const safeName = originalName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[^a-zA-Z0-9]/g, "_") // Replace special chars
    .substring(0, 50); // Limit length

  return `${folder}/${timestamp}-${randomStr}-${safeName}.${ext}`;
}
