import { ReactNode } from "react";

export default function ListPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-full p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
        <h2 className="text-sm uppercase tracking-widest text-center text-gray-500 mb-8">
          {subtitle}
        </h2>

        {children}
      </div>
    </div>
  );
}
