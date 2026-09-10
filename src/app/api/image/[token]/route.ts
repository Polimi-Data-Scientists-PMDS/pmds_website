import { NextRequest } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const dynamic = "force-dynamic";

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

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
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
