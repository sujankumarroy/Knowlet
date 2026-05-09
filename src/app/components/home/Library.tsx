const cards = [
  { title: "Notes and Study Materials", href: "navigator?root=notes" },
  { title: "Previous Year Question Answer", href: "navigator?root=pyq" },
];

export default function Library() {
  return (
    <section className="py-12 px-4">
      <h2 className="text-center text-blue-900 text-xl font-semibold">
        Library
      </h2>

      <div className="max-w-3xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mt-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-[15px] shadow-md text-center p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <a
              href={c.href}
              className="block text-blue-900 font-semibold text-[1.1rem]"
            >
              {c.title}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
