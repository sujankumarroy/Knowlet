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
    <div className="flex gap-2 p-3 border-t border-gray-200 bg-white">
      <textarea
        className="flex-1 bg-gray-100 text-gray-900 p-2 rounded-lg resize-none h-10 outline-none focus:ring-2 focus:ring-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
        placeholder="Ask Nexus..."
      />

      <button
        onClick={send}
        disabled={loading}
        className="px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "..." : "➤"}
      </button>
    </div>
  );
}
