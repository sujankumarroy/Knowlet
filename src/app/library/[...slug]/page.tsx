import Content from "@/components/library/Content";
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
  return (
    <div>
      <Content slug={slug} />
    </div>
  );
}
