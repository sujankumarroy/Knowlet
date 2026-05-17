export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 text-slate-800">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          Knowlet
        </h1>
        <p className="mt-3 text-base md:text-lg opacity-90">
          A Smart and Simple Learning Companion
        </p>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 py-14 space-y-8">
        {/* Card 1 */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8 transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            What is Knowlet?
          </h2>
          <p className="leading-relaxed text-slate-700">
            Knowlet is a modern web-based learning platform designed to help
            students organize notes, access study materials, and improve
            productivity. It focuses on simplicity, speed, and offline support
            using modern web technologies.
          </p>
        </section>

        {/* Card 2 */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8 transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            When Was It Developed?
          </h2>
          <p className="leading-relaxed text-slate-700">
            Knowlet was developed between
            <span className="font-semibold">September and October 2025</span>
            and officially released on
            <span className="font-semibold">5 December 2025 (Friday)</span> with
            the domain
            <a
              href="https://knowlet.in"
              target="_blank"
              className="text-blue-600 font-semibold underline"
            >
              knowlet.in
            </a>
            . It was built as a lightweight web app for low-resource devices.
          </p>
        </section>

        {/* Card 3 */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8 transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Why Was It Developed?
          </h2>
          <p className="leading-relaxed text-slate-700 mb-4">
            Many students struggle with scattered notes and slow platforms.
            Knowlet solves this by offering:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Managed notes like a digital library</li>
            <li>Fast loading experience</li>
            <li>Simple navigation</li>
            <li>Organized semester & subject structure</li>
            <li>Minimal distraction-free design</li>
            <li>Bookmarks notes system</li>
          </ul>
        </section>

        {/* Card 4 */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8 transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Who Developed It?
          </h2>
          <p className="leading-relaxed text-slate-700 mb-4">
            Knowlet was developed by
            <span className="font-semibold">Sujan Roy</span>, an independent
            student developer focused on building efficient web applications.
          </p>

          <p className="text-slate-700 mb-3">
            Built using <strong>Nextjs</strong>, <strong>Tailwind CSS</strong>
            and <strong>TypeScript</strong> technology.
          </p>

          <div className="flex flex-wrap gap-4 text-blue-600 font-medium">
            <a
              href="https://sujanroy.in"
              target="_blank"
              className="hover:underline"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/sujankumarroy"
              target="_blank"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/skr0411"
              target="_blank"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-slate-500 border-t bg-slate-50">
        © 2026 Knowlet. All rights reserved.
      </footer>
    </div>
  );
}
