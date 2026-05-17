"use client";

import { useState } from "react";
import NexusInput from "./NexusInput";
import NexusChat from "./NexusChat";
import NexusToolbar from "./NexusToolbar";

export default function NexusPage() {
  const [mode, setMode] = useState<string>("normal");
  const [messages, setMessages] = useState<any[]>([]);

  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl h-full flex flex-col border border-gray-200 rounded-xl bg-white shadow-sm">
        <NexusChat messages={messages} />

        {/* <NexusToolbar mode={mode} setMode={setMode} /> */}

        <NexusInput mode={mode} setMessages={setMessages} messages={messages} />
      </div>
    </div>
  );
}
