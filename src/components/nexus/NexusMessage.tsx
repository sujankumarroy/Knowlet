export default function NexusMessage({ message }: any) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`max-w-[75%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
        isUser
          ? "bg-blue-500 text-white ml-auto"
          : "bg-white text-gray-800 mr-auto border border-gray-200"
      }`}
    >
      {message.text}
      <div className="text-[10px] opacity-60 text-right mt-1">
        {message.time}
      </div>
    </div>
  );
}
