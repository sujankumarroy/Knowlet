import connectDb from "@/lib/db";
import Header from "./Header";
import Main from "./Main";
import { notFound } from "next/navigation";

type SelectQuery =
  | "*, subjects(title, description, path)"
  | "*, papers(title, description, path)"
  | "*, resources(title, description, path)";

type Table = "levels" | "subjects" | "papers" | "resources";

export default async function Navigator({
  slug,
  variant,
}: {
  slug?: string[];
  variant?: "home" | "library";
}) {
  const tables = ["levels", "subjects", "papers", "resources"];
  const depth = !slug ? 0 : slug.length - 1;

  const currentTable = tables[depth] as Table;
  const nextTable = tables[depth + 1] as Table;

  let academicPattern: "semester" | "class" | null = slug
    ? slug[0].startsWith("semester")
      ? "semester"
      : slug[0].startsWith("class")
        ? "class"
        : null
    : null;

  const db = await connectDb();

  let query;
  let special = false;

  if (slug) {
    if (academicPattern === "semester" && slug.length >= 3) {
      // "/library/semester-1/ecology/idc-101"
      query = db
        .from("resources")
        .select("title, description, path, type")
        .like("path", `${slug.join("/")}%`);
      special = true;
      console.log("special");
    } else {
      // "/library/semester-1/ecology"
      // "/library/semester-1"
      query = db
        .from(currentTable)
        .select(`*, ${nextTable}(title, description, path)` as SelectQuery)
        .eq("path", slug?.join("/"));
    }
  } else {
    // "/library"
    query = db
      .from(currentTable)
      .select(`*, ${nextTable}(title, description, path)` as SelectQuery);
  }

  const { data, error } = await query;

  if (error || !data) return notFound();

  const title = slug
    ? special
      ? "Resources"
      : data[0].title || tables[slug.length - 1]
    : "Semesters";
  const subtitle = slug
    ? special
      ? `Open any resource to start reading.`
      : data[0].description ||
        `Open any ${tables[slug.length].slice(0, -1)} to view more.`
    : "Open any semester to view more.";
  const path = slug ? slug : [];

  const items = !slug || special ? data : data[0]?.[nextTable];

  return (
    <>
      {variant !== "home" && (
        <Header title={title} subtitle={subtitle} path={path} />
      )}
      <Main items={items} resources={!!special} />
    </>
  );
}
