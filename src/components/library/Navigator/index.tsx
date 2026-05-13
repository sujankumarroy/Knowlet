import connectDb from "@/lib/db";
import Header from "./Header";
import Main from "./Main";
import { notFound } from "next/navigation";

export default async function Navigator({
  slug,
}: {
  slug: string[] | null | undefined;
}) {
  const tables = ["levels", "subjects", "papers", "units", "resources"];
  const slugHeight = !slug ? 0 : slug.length - 1;
  const db = await connectDb();

  let query = db
    .from(tables[slugHeight])
    .select(`*, ${tables[slugHeight + 1]}(*)`);

  if (slug) query = query.eq("path", slug?.join("/"));
  const { data, error } = await query;

  if (error || !data) {
    console.log("error", error);
    return notFound();
  }
  console.log("data", data);

  return (
    <>
      <Header title="title" subtitle="subtitles" path={["dlfk", "sldkjf"]} />
      <Main items={data[0]?.[tables[slugHeight + 1]]} />
    </>
  );
}
