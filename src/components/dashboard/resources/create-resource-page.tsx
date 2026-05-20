"use client";

import HtmlEditor from "./html-editor";
import ResourcePreview from "./resource-preview";
import ResourceActions from "./resource-actions";
import ResourceDetails from "./resource-details";
import { useEffect, useState } from "react";

interface Details {
  title: string;
  description: string;
  target: string;
  type: string;
  slug: string;
  path: string;
}

export default function CreateResourcePage() {
  const [resource, setResource] = useState<Resource>();
  const [rowHtml, setRowHtml] = useState<string>("");
  const [parsedHtml, setParsedHtml] = useState<string>("");
  const [details, setDetails] = useState<Details>({
    title: "",
    description: "",
    target: "",
    type: "",
    slug: "",
    path: "",
  });

  const [preview, setPreview] = useState<boolean>(false);

  useEffect(() => {
    setResource({
      ...details,
      content: rowHtml,
    });
  }, [parsedHtml, details, rowHtml]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Create Resource</h1>

          <p className="mt-2 text-sm text-slate-600">
            Paste your HTML note container, preview the rendered output, and
            save it to the database.
          </p>
        </div>

        {/* Editor + Preview */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {preview ? "Live Preview" : "HTML Editor"}
              </h2>

              <p className="text-sm text-slate-500">
                {preview
                  ? "Sanitized rendered note output."
                  : "Paste only the .container HTML."}
              </p>
            </div>

            <button
              onClick={() => setPreview((pre) => !pre)}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {preview ? "Show Editor" : "Show Preview"}
            </button>
          </div>

          {preview ? (
            <ResourcePreview parsedHtml={rowHtml} />
          ) : (
            <HtmlEditor rowHtml={rowHtml} setRowHtml={setRowHtml} />
          )}
        </div>

        {/* Metadata */}
        {/* <ResourceMetadata metadata={metadata} /> */}

        {/* Resource Form */}
        <ResourceDetails details={details} setDetails={setDetails} />

        {/* Actions */}
        <ResourceActions resource={resource} />
      </div>
    </div>
  );
}
