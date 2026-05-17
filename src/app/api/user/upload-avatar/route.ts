import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const image = formData.get("image"); // File object
    const filePath = formData.get("filePath") as string; // normal field

    if (!image) {
      return NextResponse.json(
        { success: false, error: { message: "Image required" } },
        { status: 400 },
      );
    }

    const db = await connectDb();

    const { error } = await db.storage.from("avatars").upload(filePath, image, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        publicUrl: `https://ampwczxrfpbqlkuawrdf.supabase.co/storage/v1/object/public/avatars/${filePath}`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Server Internal Error" } },
      { status: 500 },
    );
  }
}
