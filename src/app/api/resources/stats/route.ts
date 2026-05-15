import { verifyJwt } from "@/lib/auth";
import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
    const db = await connectDb();

    const [counts, userState] = await Promise.all([
      db.rpc("get_resource_counts", { res_id: resource_id }),
      payload?.user_id
        ? db.rpc("get_user_states", {
            res_id: resource_id,
            uid: payload?.user_id,
          })
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (counts.error || userState.error) {
      return NextResponse.json(
        { error: counts.error || userState.error },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: { ...(counts.data ?? {}), ...(userState.data ?? {}) },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
