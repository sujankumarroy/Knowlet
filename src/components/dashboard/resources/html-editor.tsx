export default function HtmlEditor({
  rowHtml,
  setRowHtml,
}: {
  rowHtml: string;
  setRowHtml: (rowHtml: string) => void;
}) {
  return (
    <div className="p-5">
      <textarea
        value={rowHtml}
        onChange={(e) => setRowHtml(e.target.value)}
        spellCheck={false}
        className="h-[650px] w-full resize-none rounded-2xl border border-slate-300 bg-slate-950 p-5 font-mono text-sm text-slate-100 outline-none focus:border-blue-500"
      />
    </div>
  );
}
