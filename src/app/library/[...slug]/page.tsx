import styles from "./library.module.css";
import connectDb from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params; // ["semester-1", "methematics", "dsc-101", "unit-1", "notes"]

  if (!slug || slug.length === 0) {
    return notFound();
  }

  if (slug.length <= 3) return notFound();

  const db = await connectDb();

  const { data, error } = await db
    .from("resources")
    .select("*")
    .eq("resource_path", slug.join("/"));

  console.log("error", error);
  console.log(data);

  return (
    <article
      className={styles.container}
      dangerouslySetInnerHTML={{
        __html: data?.[0]?.content || "",
      }}
    />
  );
}
