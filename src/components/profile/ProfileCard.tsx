export default function ProfileCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
      <div className="w-27 h-27 rounded-full flex items-center justify-center">
        <img
          src="/images/demo_pp.jpg"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <div>
        <h1 className="text-xl font-semibold">Your Name</h1>
        <p className="text-green-700 font-medium">User ID</p>
        <p className="text-gray-500">yourname@example.com</p>
      </div>
    </div>
  );
}
