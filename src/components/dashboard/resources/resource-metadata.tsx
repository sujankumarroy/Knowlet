export default function ResourceMetadata({
  metadata,
}: {
  metadata: { title: string; description: string } | undefined;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <Card title="Title" value="Introduction to C Programming" />
      <Card title="Word Count" value="1,248" />
      <Card title="Reading Time" value="6 min" />
      <Card title="Status" value="Draft" />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h3 className="mt-2 text-lg font-semibold text-slate-900">{value}</h3>
    </div>
  );
}
