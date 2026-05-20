import { verifyAdmin } from "@/lib/auth";
import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description, content, target, type, slug, path }: Resource =
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

    const parts = path.split("/");

    const levelSlug = parts[0];
    const subjectSlug = parts[1];
    const paperSlug = subjectSlug.startsWith("semester") ? parts[2] : null;

    const db = await connectDb();

    // console.log(path.split("/"));

    let { data: level, error: levelError } = await db
      .from("levels")
      .select("id")
      .eq("slug", path.split("/")[0])
      .maybeSingle();

    if (!level) {
      const levelRow = await db
        .from("levels")
        .insert({
          title: levelSlug.split("-").join(" ").toUpperCase(),
          number: levelSlug.split("-")[1],
          slug: levelSlug,
          path: `${levelSlug}`,
        })
        .select()
        .single();

      level = levelRow.data;
    }

    // console.log("level", level);

    let { data: subject, error: subjectError } = await db
      .from("subjects")
      .select("id")
      .eq("slug", path.split("/")[1])
      .eq("level_id", level?.id)
      .maybeSingle();

    if (!subject) {
      const levelRow = await db
        .from("subjects")
        .insert({
          title: levelSlug.split("-").join(" ").toUpperCase(),
          number: levelSlug.split("-")[1],
          slug: levelSlug,
          path: `${levelSlug}`,
        })
        .select()
        .single();

      level = levelRow.data;
    }

    // console.log("subject", subject);

    let { data: paper, error: paperError } = await db
      .from("papers")
      .select("id")
      .eq("slug", path.split("/")[2])
      .eq("subject_id", subject?.id)
      .maybeSingle();
    if (!level) {
      // insert new level
    }
    // console.log("paper", paper);

    // const { data, error } = await db.from("resources").insert({
      level_id: level?.id,
      subject_id: subject?.id,
      paper_id: paper?.id,
      ...resource,
    });

    // if (error) throw new Error(error.message);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: (error as Error).message } },
      { status: 500 },
    );
  }
}
