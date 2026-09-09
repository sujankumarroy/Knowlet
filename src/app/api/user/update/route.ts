import { apiError } from "@/lib/api-response";
import { authGate } from "@/lib/auth/authGate";
import { updateUserInfo } from "@/db/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ok, res, payload } = await authGate(req, "user");

    if (!ok || !payload) return res;

    const user = await updateUserInfo(payload.user_id, {
      name: body.name,
      picture: body.picture,
      age: body.age,
      stream: body.stream,
      standard: body.standard,
      fav_subject: body.fav_subject,
    });

    return NextResponse.json({ data: user });
  } catch (error) {
    return apiError("Server Error", 500);
  }
}
