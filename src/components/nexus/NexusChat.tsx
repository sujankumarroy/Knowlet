import NexusMessage from "./NexusMessage";

export default function NexusChat({ messages }: any) {
  return (
    <div className="h-full flex-1 p-3 space-y-2">
      {messages.length === 0 && (
        <p className="text-center text-slate-400 mt-10">
          Start a conversation with Knowlet Nexus
        </p>
      )}

      {messages.map((msg: any, i: number) => (
        <NexusMessage key={i} message={msg} />
      ))}
    </div>
  );
}
