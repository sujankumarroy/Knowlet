"use client";

import { useState } from "react";

export default function NexusInput({ mode, setMessages, messages }: any) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "api/nexus/chat";

  const send = async () => {
    if (!text.trim() || loading) return;

    const userMsg = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, userMsg]);
    setText("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });

      const { success, type, message, quiz, retryAfter } = await res.json();

      const aiMsg = {
        sender: "ai",
        text: message || "No response",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev: any) => [...prev, aiMsg]);
    } catch {
      setMessages((prev: any) => [
        ...prev,
        { sender: "ai", text: "Request failed", time: "" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex gap-2 p-2 border-t border-slate-700">
      <textarea
        className="flex-1 bg-slate-800 text-white p-2 rounded-lg resize-none h-10"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
      />

      <button
        onClick={send}
        disabled={loading}
        className="px-4 bg-green-500 text-black rounded-lg"
      >
        {loading ? "..." : "➤"}
      </button>
    </div>
  );
}
