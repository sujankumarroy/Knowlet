export default function SettingsPage() {
  const sections = [
    // {
    //   title: "Profile",
    //   description: "Manage your personal information and account details.",
    //   links: [
    //     {
    //       label: "Edit Profile",
    //       href: "/profile/edit",
    //     },
    //     {
    //       label: "Change Avatar",
    //       href: "/profile/avatar",
    //     },
    //   ],
    // },
    {
      title: "Security",
      description: "Update your password and secure your account.",
      links: [
        {
          label: "Set Password",
          href: "/settings/password/set",
        },
        {
          label: "Change Password",
          href: "/settings/password/change",
        },
      ],
    },
    {
      title: "Activity",
      description: "Access your reading history and saved resources.",
      links: [
        {
          label: "Bookmarks",
          href: "/bookmarks",
        },
        {
          label: "History",
          href: "/history",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <section className="rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
          <p className="text-sm font-medium text-blue-100">Account Settings</p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Manage Your Account
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
            Update your profile, manage passwords, review your activity, and
            control your Knowlet account settings from one place.
          </p>
        </section>

        {/* Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {section.description}
              </p>

              <div className="mt-6 space-y-3">
                {section.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span>{link.label}</span>

                    <span>→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <section className="rounded-[28px] border border-red-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                These actions are sensitive and may permanently affect your
                account.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50">
                Sign Out All Devices
              </button>

              <button className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600">
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
