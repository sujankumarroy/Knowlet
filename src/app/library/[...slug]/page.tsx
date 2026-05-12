import Content from "@/components/library/Content";
import { notFound } from "next/navigation";
import ReaderPageClient from "@/components/library/ReaderPageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  if (slug.length <= 3) return notFound();
  return (
    <div>
      <ReaderPageClient>
        <Content slug={slug} />
      </ReaderPageClient>
    </div>
  );
}
