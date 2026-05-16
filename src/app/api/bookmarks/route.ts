import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import { verifyJwt } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const payload = await verifyJwt(req.cookies.get("token")?.value);

    if (!payload?.user_id) {
      return NextResponse.json(
        { error: { message: "Unauthorized" } },
        { status: 401 },
      );
    }

    const db = await connectDb();

    // select all bookmarks for the user
    const { data, error } = await db
      .from("bookmarks")
      .select(
        "id, created_at, resources(id, title, description, path, created_at)",
      )
      .eq("user_id", payload.user_id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: { message: error.message } },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: data?.map((b) => ({
        id: b.id,
        created_at: b.created_at,
        resource: b.resources,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
