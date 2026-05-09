const features = [
  "📘 Free access to semester-wise notes",
  "📂 Easy download system",
  "🔎 Smart search system",
  "📱 Mobile-friendly design",
];

export default function Features() {
  return (
    <section className="py-12 px-4">
      <h2 className="text-center text-blue-900 text-xl font-semibold">
        Why Use Knowlet?
      </h2>

      <ul className="max-w-3xl mx-auto mt-6 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="bg-white p-4 rounded-xl shadow-sm flex gap-2">
            {f}
          </li>
        ))}
      </ul>
    </section>
  );
}
