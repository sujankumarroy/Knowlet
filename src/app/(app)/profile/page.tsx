import ProfileCard from "@/components/profile/ProfileCard";
import RecentActivity from "@/components/profile/RecentActivity";
import SettingsPanel from "@/components/profile/SettingsPanel";
import StatsSection from "@/components/profile/StatsSection";

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
