import Navigator from "../library/Navigator";

export default function OpenLibraryFull() {
  return (
    <section className="w-full px-4 md:px-10 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-blue-900">Open Library</h2>
        <p className="text-gray-600 mt-2">
          Browse notes, subjects, papers, and previous year questions
        </p>
      </div>

      {/* Navigator Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
        <Navigator variant={"home"} />
      </div>
    </section>
  );
}
