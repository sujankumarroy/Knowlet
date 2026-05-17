import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Knowlet <noreply@knowlet.in>",
      to: "mr.sujan.kumar.roy@gmail.com",
      subject: "Hello from Knowlet",
      html: "<p>Email system is working.</p>",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
