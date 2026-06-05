"use client";

import React, { useEffect, useState } from "react";
import { ContactService } from "../../firebase/firestore";
import { ContactMessage } from "../../types/Contact";

export function ContactManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await ContactService.getMessages().catch(() => []);
        setMessages(data);
      } catch (e) {
        console.error("Error loading contact messages: ", e);
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Database Collection
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
          Contact & Messages Manager
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center min-h-[200px] items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Synchronizing visitor messages...
        </div>
      ) : (
        <div className="border border-zinc-800 bg-[#0c0c0d] rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Status</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Name</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Email</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Subject</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs font-mono text-zinc-600 uppercase tracking-wide">
                    No visitor messages recorded.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-zinc-900 hover:bg-zinc-900/30 transition-all">
                    <td className="p-4 text-xs font-mono">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-medium ${
                        msg.status === "unread" ? "bg-amber-900/50 text-amber-300" : "bg-zinc-800 text-zinc-400"
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-zinc-200 font-medium">{msg.name}</td>
                    <td className="p-4 text-xs text-zinc-400">{msg.email}</td>
                    <td className="p-4 text-xs text-zinc-400 max-w-xs truncate">{msg.subject}</td>
                    <td className="p-4 text-xs font-mono text-zinc-400 flex gap-4">
                      <button className="hover:text-zinc-100 transition-all cursor-pointer">[ Read ]</button>
                      <button className="hover:text-zinc-100 transition-all cursor-pointer">[ Reply ]</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default ContactManager;
