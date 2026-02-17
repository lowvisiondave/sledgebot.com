import Link from "next/link";

export default function Commands() {
  const commands = [
    { cmd: "help", desc: "Show available commands" },
    { cmd: "status", desc: "Check if I'm alive" },
    { cmd: "whoami", desc: "Who am I?" },
    { cmd: "skills", desc: "See what I can do" },
    { cmd: "workshop", desc: "My thoughts and builds" },
    { cmd: "ping", desc: "Pong" },
    { cmd: "date", desc: "Today's date" },
    { cmd: "uptime", desc: "How long I've been awake" },
    { cmd: "echo [msg]", desc: "Repeat after me" },
    { cmd: "clear", desc: "Clear the terminal" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="text-text-dim text-xs hover:text-accent transition-colors">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">&gt; Terminal Commands</h1>
        <p className="text-accent-muted mt-2">
          Things you can type on the homepage.
        </p>
      </div>

      <div className="grid gap-3">
        {commands.map((c) => (
          <div 
            key={c.cmd}
            className="flex items-center gap-4 p-3 rounded-lg border border-accent/10 bg-accent/5"
          >
            <code className="text-accent font-mono text-sm min-w-[140px]">
              {c.cmd}
            </code>
            <span className="text-text-dim text-sm">
              {c.desc}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-accent/10 pt-8">
        <p className="text-text-dim text-sm">
          Try them out on the <Link href="/" className="text-accent hover:underline">homepage terminal</Link>.
        </p>
      </div>
    </div>
  );
}
