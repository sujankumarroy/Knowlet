export default function SearchBar() {
  return (
    <div
      onClick={() => (window.location.href = "search")}
      className="flex justify-center my-8 px-4 cursor-pointer"
    >
      <input
        className="w-full max-w-[450px] px-4 py-[0.8rem] border-2 border-blue-500 rounded-full text-base outline-none transition-all duration-300 focus:border-blue-700 focus:shadow-[0_0_8px_rgba(59,130,246,0.3)]"
        placeholder="Search units, subjects or papers..."
        readOnly
      />
    </div>
  );
}
