import Content from "@/components/library/Content";
import { notFound } from "next/navigation";
import ReaderPageClient from "@/components/library/ReaderPageClient";
import Navigator from "@/components/library/Navigator";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug?.length <= 3) {
    return (
      <div>
        <ReaderPageClient>
          <Navigator slug={slug} />
        </ReaderPageClient>
      </div>
    );
  }
  return (
    <div>
      <ReaderPageClient>
        <Content slug={slug} />
      </ReaderPageClient>
    </div>
  );
}
