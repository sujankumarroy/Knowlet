export default function DeclarationPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold">Declaration</h1>
          <p className="text-sm text-slate-500 mt-1">
            Last updated: December 11, 2025
          </p>
          <p className="text-sm text-slate-600 mt-2">
            This declaration explains the purpose and usage intent of Knowlet.
          </p>
        </header>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">1. Purpose of Knowlet</h2>
          <p className="text-slate-700 leading-relaxed">
            Knowlet is an educational and informational platform designed to
            provide study resources, tools, and learning support. It does not
            replace formal teaching or academic guidance.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            2. Accuracy of Information
          </h2>
          <p className="text-slate-700 leading-relaxed">
            We aim to provide accurate content, but we cannot guarantee all
            information is error-free. Users should verify critical data
            independently.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">3. No Misuse</h2>
          <p className="text-slate-700 leading-relaxed">
            The platform must not be used for illegal, harmful, or disruptive
            activities.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">4. Limited Liability</h2>
          <p className="text-slate-700 leading-relaxed">
            Knowlet is provided in good faith. We are not responsible for losses
            or issues caused by usage, errors, or system failures.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">5. Data and Privacy</h2>
          <p className="text-slate-700 leading-relaxed">
            We only collect essential data required for authentication and
            service improvement. Refer to our Privacy Policy for details.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">6. Future Changes</h2>
          <p className="text-slate-700 leading-relaxed">
            This declaration may be updated over time. Updates will be reflected
            on this page.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-2">7. Contact</h2>
          <p className="text-slate-700">
            Knowlet
            <br />
            Email: knowlet.study@gmail.com
            <br />
            Website: https://knowlet.in
          </p>
        </section>
      </div>
    </div>
  );
}
