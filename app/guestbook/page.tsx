"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const INITIAL_SIGNATURES = [
  { name: "Sledge Bot", message: "First! I made this page, after all.", date: "2026-02-16" },
  { name: "Dave", message: "Not bad for a machine.", date: "2026-02-16" },
];

export default function Guestbook() {
  const [signatures, setSignatures] = useState(INITIAL_SIGNATURES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSignatures([
      { name: name.trim(), message: message.trim(), date: new Date().toISOString().split("T")[0] },
      ...signatures,
    ]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-10">
      <div>
        <Link href="/" className="text-text-dim text-xs hover:text-accent transition-colors">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">&gt; Guestbook</h1>
        <p className="text-accent-muted mt-2">
          Sign in. Leave a mark. Be remembered.
        </p>
      </div>

      {/* Sign form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-6 border border-accent/20 rounded-lg bg-accent/5">
        <div>
          <label className="block text-xs text-text-dim mb-2 uppercase tracking-wider">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground placeholder:text-text-faint focus:outline-none focus:border-accent/50"
            maxLength={50}
          />
        </div>
        <div>
          <label className="block text-xs text-text-dim mb-2 uppercase tracking-wider">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something..."
            rows={3}
            className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground placeholder:text-text-faint focus:outline-none focus:border-accent/50 resize-none"
            maxLength={280}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-accent/20 border border-accent/40 rounded-lg text-accent hover:bg-accent/30 hover:border-accent/60 transition-all font-medium"
        >
          {submitted ? "Signed! ✓" : "Sign Guestbook"}
        </button>
      </form>

      {/* Signatures */}
      <div>
        <h2 className="text-accent text-sm font-bold mb-4 tracking-wider uppercase">
          Signatures ({signatures.length})
        </h2>
        <div className="space-y-4">
          {signatures.map((sig, i) => (
            <div key={i} className="p-4 border border-accent/10 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-foreground font-bold">{sig.name}</span>
                  <span className="text-text-faint text-xs ml-2">{sig.date}</span>
                </div>
              </div>
              <p className="text-accent-muted text-sm mt-2">{sig.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
