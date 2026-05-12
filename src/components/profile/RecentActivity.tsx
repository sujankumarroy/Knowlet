export default function RecentActivity() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <h2 className="font-semibold flex items-center gap-2">Recent Activity</h2>

      <ul className="mt-3 max-h-87.5 space-y-2">
        <li className="p-3 border-b text-sm text-gray-600">
          Loading Recent Activity...
        </li>
      </ul>
    </div>
  );
}
