import styles from "@/components/library/Content.module.css";

export default function ResourcePreview({
  parsedHtml,
}: {
  parsedHtml: string | undefined;
}) {
  return (
    <div className="h-[650px] overflow-y-auto bg-slate-50 p-6">
      {parsedHtml ? (
        <article
          className={styles.container}
          dangerouslySetInnerHTML={{
            __html: parsedHtml || "",
          }}
        />
      ) : (
        <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-white p-8 shadow-sm">
          <div className="flex h-[500px] flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold text-slate-900">
              Preview will appear here
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Paste HTML to render preview.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
