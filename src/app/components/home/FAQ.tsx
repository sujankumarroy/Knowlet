const faqs = [
  {
    q: "Is Knowlet free to use?",
    a: "Yes. All materials are free for students.",
  },
  {
    q: "Can I download notes?",
    a: "Yes, you can download or view directly.",
  },
  {
    q: "Can I contribute?",
    a: "Yes, contact us via email.",
  },
];

export default function FAQ() {
  return (
    <section className="py-12 px-4">
      <h2 className="text-center text-blue-900 text-xl font-semibold mb-6">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-blue-900">{f.q}</h3>
            <p className="text-gray-700 mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
