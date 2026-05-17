export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mt-1">
            Last updated: December 13, 2025
          </p>
          <p className="text-sm text-slate-600 mt-2">
            This policy explains how Knowlet collects, uses, and protects your
            data.
          </p>
        </header>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            1. Information we collect
          </h2>
          <p className="text-slate-700 mb-3">
            We collect information you provide directly and data generated while
            using the service.
          </p>

          <h3 className="font-semibold mb-1">1.1 Information you provide</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Account information (name, email, profile details)</li>
            <li>User content (notes, uploads, bookmarks)</li>
            <li>Communication (support messages, emails)</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            2. How we use your information
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>To provide and maintain the service</li>
            <li>To authenticate and manage accounts</li>
            <li>To improve features and user experience</li>
            <li>To send updates and security alerts</li>
            <li>To prevent abuse and ensure safety</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            3. Sharing and disclosure
          </h2>
          <p className="text-slate-700 mb-2">
            We do not sell personal data. We may share data only in limited
            cases:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Service providers (hosting, analytics, authentication)</li>
            <li>Legal obligations or government requests</li>
            <li>Business transfers (mergers or acquisitions)</li>
            <li>Security or fraud prevention</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">4. Data retention</h2>
          <p className="text-slate-700">
            We retain data only as long as necessary to operate the service,
            comply with laws, or resolve disputes. You may request deletion
            anytime.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">5. Security</h2>
          <p className="text-slate-700">
            We use reasonable technical measures to protect data, but no system
            is 100% secure.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">6. Your rights</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Access your data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent</li>
            <li>Request data portability (where applicable)</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">7. Children</h2>
          <p className="text-slate-700">
            Knowlet is not intended for children under 13. We do not knowingly
            collect data from children.
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
