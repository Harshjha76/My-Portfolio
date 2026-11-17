import { NextRequest, NextResponse } from "next/server";
import { isOwnerAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  try {
    const isAuth = await isOwnerAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized file upload access." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "general"; // e.g. "resume", "certificate", "marksheet", "avatar", "screenshot"

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file was uploaded." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File exceeds maximum allowed size of 10MB." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid file type (${file.type}). Only PDF, JPEG, PNG, WEBP, and SVG are supported.`,
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", category);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const ext = path.extname(originalName) || "";
    const base = path.basename(originalName, ext).substring(0, 30);
    const uniqueFileName = `${base}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
    const destinationPath = path.join(uploadDir, uniqueFileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${category}/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully.",
      url: publicUrl,
      filename: originalName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "File processing failed on server." },
      { status: 500 }
    );
  }
}
