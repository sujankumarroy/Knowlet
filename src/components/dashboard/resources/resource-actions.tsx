export default function ResourceActions() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Ready to publish?
        </h3>

        <p className="text-sm text-slate-500">
          Save as draft or publish directly to the library.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-2xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
          Save Draft
        </button>

        <button className="rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
          Publish Resource
        </button>
      </div>
    </div>
  );
}
