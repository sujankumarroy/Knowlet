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
      NextResponse.json(
        { error: { message: "Unauthorized" } },
        { status: 401 },
      );
    }

    const db = await connectDb();

    // check existing like
    const { data, error } = await db
      .from("likes")
      .select("id")
      .eq("user_id", payload?.user_id)
      .eq("resource_id", resource_id)
      .maybeSingle();

    if (error) throw new Error(error?.message);

    // unlike
    if (data) {
      const { error } = await db
        .from("likes")
        .delete()
        .eq("user_id", payload?.user_id)
        .eq("resource_id", resource_id);

      if (error) throw new Error(error.message);
      return NextResponse.json({ data: { liked: false } });
    }

    // like
    const { error: insertError } = await db.from("likes").insert({
      user_id: payload?.user_id,
      resource_id,
    });

    if (insertError) throw new Error(insertError.message);

    return NextResponse.json({ data: { liked: true } });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
