export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Knowlet Help Center
          </h1>
          <p className="text-slate-600 mt-2">
            Learn how to use Knowlet with short tutorials
          </p>
        </header>

        {/* Section 1 */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Install the Knowlet Web App
          </h2>

          <p className="text-slate-600 mb-4 leading-relaxed">
            This tutorial shows how to install Knowlet on your device for faster
            access.
          </p>

          <ul className="list-disc pl-5 space-y-1 text-slate-700 mb-6">
            <li>Open Knowlet in your browser</li>
            <li>Scroll to download section</li>
            <li>Select Install Web App or APK</li>
            <li>Confirm install popup</li>
          </ul>

          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/N6p0fq2jSuU"
              allowFullScreen
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-2">
            Create a Knowlet Account
          </h2>

          <p className="text-slate-600 mb-4 leading-relaxed">
            Learn how to register and access personalised features.
          </p>

          <ul className="list-disc pl-5 space-y-1 text-slate-700 mb-6">
            <li>Go to profile section</li>
            <li>Click Sign Up</li>
            <li>Enter name, email, password</li>
            <li>Submit form</li>
          </ul>

          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/JmjlW5EyMUU"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </div>
  );
}
