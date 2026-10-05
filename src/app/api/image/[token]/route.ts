import { NextRequest } from "next/server";
import { Client } from "@notionhq/client";
import sharp from "sharp";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Threshold above which we optimize raster images (250 KB)
const COMPRESSION_THRESHOLD = 250 * 1024;
const MAX_DIMENSION = 1600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  let id: string;
  let prop: string;

  try {
    const decoded = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
    id = decoded.id;
    prop = decoded.prop;
  } catch (err) {
    return new Response("Invalid token", { status: 400 });
  }

  try {
    const page: any = await notion.pages.retrieve({ page_id: id });
    const fileProp = page.properties[prop];
    const files = fileProp?.files || [];
    if (files.length === 0) {
      return new Response("Image not found in page properties", { status: 404 });
    }

    const file = files[0];
    const rawUrl = file.type === "external" ? file.external.url : file.file.url;

    const res = await fetch(rawUrl);
    if (!res.ok) {
      return new Response("Failed to fetch image from storage", { status: res.status });
    }

    let contentType = res.headers.get("content-type") || "image/jpeg";
    const rawBuffer = Buffer.from(await res.arrayBuffer());
    let finalBuffer: Buffer = rawBuffer;

    // Lightweight optimization for raster images exceeding the size threshold
    const isRasterImage =
      contentType.startsWith("image/") && !contentType.includes("svg");

    if (isRasterImage && rawBuffer.length > COMPRESSION_THRESHOLD) {
      try {
        const optimized = await sharp(rawBuffer)
          .rotate() // Automatically orient based on EXIF metadata
          .resize({
            width: MAX_DIMENSION,
            height: MAX_DIMENSION,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 82, effort: 4 })
          .toBuffer();

        // Only adopt optimized version if it actually reduced the payload
        if (optimized.length < rawBuffer.length) {
          finalBuffer = optimized;
          contentType = "image/webp";
        }
      } catch (sharpError) {
        console.warn("Sharp optimization failed, serving original:", sharpError);
      }
    }

    return new Response(new Uint8Array(finalBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Image proxy error:", error);
    return new Response(error.message || "Internal Server Error", { status: 500 });
  }
}
