import connectDb from "@/lib/db";
import styles from "./Content.module.css";

export default async function Content({ slug }: { slug: string[] }) {
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
