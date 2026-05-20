import { verifyAdmin } from "@/lib/auth";
import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description, content, target, type, slug, path } =
      await req.json();

    if (
      !title ||
      !description ||
      !content ||
      !target ||
      !type ||
      !slug ||
      !path
    ) {
      return NextResponse.json(
        { error: { message: "All fields are required." } },
        { status: 400 },
      );
    }

    const payload = await verifyAdmin(req.cookies.get("token")?.value);

    if (!payload) {
      return NextResponse.json(
        { error: { message: "Unauthorized User" } },
        { status: 403 },
      );
    }

    const resource = { title, description, content, target, type, slug, path };

    const db = await connectDb();

    const { data, error } = await db.from("resources").insert(resource);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: (error as Error).message } },
      { status: 500 },
    );
  }
}
