"use client";

import { useState } from "react";
import NexusInput from "./NexusInput";
import NexusChat from "./NexusChat";
import NexusToolbar from "./NexusToolbar";

export default function NexusPage() {
  const [mode, setMode] = useState<string>("normal");
  const [messages, setMessages] = useState<any[]>([]);

  return (
    <div className="h-full flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-xl h-full flex flex-col border border-slate-700 rounded-xl bg-slate-900">
        <NexusChat messages={messages} />

        {/* <NexusToolbar mode={mode} setMode={setMode} /> */}

        <NexusInput mode={mode} setMessages={setMessages} messages={messages} />
      </div>
    </div>
  );
}
