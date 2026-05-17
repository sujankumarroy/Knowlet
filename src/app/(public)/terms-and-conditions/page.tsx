export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Last updated: December 11, 2025
          </p>
          <p className="text-sm text-slate-600 mt-2">
            By using Knowlet, you agree to these terms and conditions.
          </p>
        </header>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">1. Using Knowlet</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Use the service only for lawful purposes</li>
            <li>Do not upload harmful or illegal content</li>
            <li>Do not attempt to break or disrupt the system</li>
            <li>Do not scrape or misuse platform data</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">2. Accounts</h2>
          <p className="text-slate-700 mb-2">
            You are responsible for maintaining your account security.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Keep login credentials safe</li>
            <li>Be responsible for all activity in your account</li>
            <li>Provide accurate information</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">3. Content Ownership</h2>
          <p className="text-slate-700">
            You own your content, but you give us permission to store and
            process it to operate the service. Knowlet branding, design, and
            code remain our property.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">4. Privacy</h2>
          <p className="text-slate-700">
            Your use of Knowlet is also governed by our Privacy Policy.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            5. Third-party services
          </h2>
          <p className="text-slate-700">
            We may use third-party services (auth, analytics, hosting). They
            have their own policies, and we are not responsible for them.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">6. Availability</h2>
          <p className="text-slate-700">
            We do not guarantee uninterrupted access. Features may change or be
            removed at any time.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">7. Termination</h2>
          <p className="text-slate-700">
            We may suspend or terminate accounts that violate these terms.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">8. Disclaimer</h2>
          <p className="text-slate-700">
            The service is provided "as is" without warranties of any kind.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            9. Limitation of liability
          </h2>
          <p className="text-slate-700">
            We are not liable for indirect or incidental damages resulting from
            use of the service.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">10. Changes to terms</h2>
          <p className="text-slate-700">
            We may update these terms. Continued use means you accept changes.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-slate-700">
            Email: knowlet.study@gmail.com
            <br />
            Website: https://knowlet.in
          </p>
        </section>
      </div>
    </div>
  );
}
