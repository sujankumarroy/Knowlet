export default function NexusToolbar({ mode, setMode }: any) {
  const modes = ["quiz", "study", "short", "explain"];

  return (
    <div className="flex gap-2 px-2 py-2 border-t border-gray-200 bg-white">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(mode === m ? "normal" : m)}
          className={`px-3 py-1 rounded-lg text-sm border transition ${
            mode === m
              ? "bg-blue-100 border-blue-400"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
