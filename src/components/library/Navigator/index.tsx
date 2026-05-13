import connectDb from "@/lib/db";
import Header from "./Header";
import Main from "./Main";
import { notFound } from "next/navigation";

type SelectQuery =
  | "*, subjects(*)"
  | "*, papers(*)"
  | "*, units(*)"
  | "*, resources(*)";

export default async function Navigator({
  slug,
}: {
  slug: string[] | null | undefined;
}) {
  const tables = ["levels", "subjects", "papers", "units", "resources"];
  const depth = !slug ? 0 : slug.length - 1;

  const currentTable = tables[depth];
  const nextTable = tables[depth + 1];

  const db = await connectDb();

  let query = db.from(currentTable).select(`*, ${nextTable}(*)` as SelectQuery);

  if (slug) query = query.eq("path", slug?.join("/"));

  const { data, error } = await query;

  if (error || !data) return notFound();

  return (
    <>
      <Header title="title" subtitle="subtitles" path={["dlfk", "sldkjf"]} />
      <Main items={!slug ? data : data[0]?.[nextTable]} />
    </>
  );
}
