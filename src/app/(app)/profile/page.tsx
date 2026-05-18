import type { Metadata } from "next";
import ProfileCard from "@/components/profile/ProfileCard";
import RecentActivity from "@/components/profile/RecentActivity";
import SettingsPanel from "@/components/profile/SettingsPanel";
import StatsSection from "@/components/profile/StatsSection";

export const metadata: Metadata = {
  title: "Your Profile | Knowlet",

  description:
    "Manage your Knowlet profile, account settings, and personal learning preferences.",

  alternates: {
    canonical: "https://knowlet.in/profile",
  },

  openGraph: {
    title: "Your Profile | Knowlet",
    description:
      "Manage your account and personal learning preferences on Knowlet.",
    url: "https://knowlet.in/profile",
    siteName: "Knowlet",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Your Profile | Knowlet",
    description:
      "Manage your account and personal learning preferences on Knowlet.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <ProfileCard />
      {/* <StatsSection /> */}
      {/* <RecentActivity /> */}
      {/* <SettingsPanel /> */}
    </div>
  );
}
