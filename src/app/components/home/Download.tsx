export default function Download() {
  return (
    <section className="text-center py-12 px-4">
      <h2 className="text-xl font-semibold text-blue-900">
        Download Android App
      </h2>
      <p className="text-gray-700 mt-2 mb-6">
        Compatible with Android devices only
      </p>

      <a
        href="assets/knowlet.apk"
        download
        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        Download APK
      </a>
    </section>
  );
}
