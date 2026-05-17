import Content from "@/components/library/Content";
import Navigator from "@/components/library/Navigator";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug?.length <= 4) {
    return (
      <div>
        <Navigator slug={slug} />
      </div>
    );
  }
  return (
    <div>
      <Content slug={slug} />
    </div>
  );
}
