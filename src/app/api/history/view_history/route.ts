import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import { verifyJwt } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { resource_id } = await req.json();

    if (!resource_id) {
      return NextResponse.json(
        { error: { message: "Missing resource id" } },
        { status: 400 },
      );
    }

    const payload = await verifyJwt(req.cookies.get("token")?.value);

    if (!payload?.user_id) {
      return NextResponse.json(
        { error: { message: "Unauthorized" } },
        { status: 401 },
      );
    }

    const db = await connectDb();

    const { error } = await db.rpc("add_view_history", {
      p_user_id: payload.user_id,
      p_resource_id: resource_id,
    });

    if (error)
      return NextResponse.json(
        { error: { message: error.message } },
        { status: 5000 },
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}

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

    // select all history for the user
    const { data, error } = await db
      .from("view_history")
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
