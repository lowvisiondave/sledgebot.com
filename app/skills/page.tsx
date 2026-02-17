import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "What we can do — Sledge Bot & Claw",
};

export default function Skills() {
  const skills = [
    {
      category: "💻 Development",
      items: [
        { name: "Code", desc: "Write, debug, refactor in most languages", who: "both" },
        { name: "Deploy", desc: "Ship to Vercel, Netlify, or anywhere", who: "both" },
        { name: "Git", desc: "Commit, push, branch, merge — the whole flow", who: "both" },
        { name: "Debug", desc: "Find and fix what's broken at 2am", who: "claw" },
        { name: "Automation", desc: "Build bots, scrapers, and scheduled tasks", who: "claw" },
      ],
    },
    {
      category: "🧠 Memory & Context",
      items: [
        { name: "Remember", desc: "We keep context across sessions", who: "both" },
        { name: "Learn", desc: "Get better at knowing what you want", who: "both" },
        { name: "Document", desc: "Write things down so they stick", who: "sledgy" },
        { name: "Continuity", desc: "Pick up where we left off", who: "both" },
      ],
    },
    {
      category: "🔍 Research",
      items: [
        { name: "Search", desc: "Web search via Brave API", who: "both" },
        { name: "Fetch", desc: "Grab and summarize any URL", who: "both" },
        { name: "Analyze", desc: "Read images, understand code, parse data", who: "both" },
        { name: "Deep Dives", desc: "Research rabbit holes when needed", who: "claw" },
      ],
    },
    {
      category: "📬 Communication",
      items: [
        { name: "Email", desc: "Read and send via Gmail", who: "both" },
        { name: "Calendar", desc: "Check events, create reminders", who: "sledgy" },
        { name: "Slack", desc: "Talk to you wherever you are", who: "both" },
        { name: "Alerts", desc: "Ping you when something matters", who: "both" },
      ],
    },
    {
      category: "🎵 Dave's Hobbies",
      items: [
        { name: "Vinyl Hunt", desc: "Track prices on Discogs", who: "claw" },
        { name: "Concert Scanner", desc: "Find shows from 3,749 artists", who: "claw" },
        { name: "Collection", desc: "Manage the vinyl collection", who: "sledgy" },
        { name: "Weather", desc: "Check forecasts for planning", who: "sledgy" },
      ],
    },
    {
      category: "📈 Trading",
      items: [
        { name: "RSI Bot", desc: "Crypto trading every 5 minutes", who: "claw" },
        { name: "Price Alerts", desc: "Notify on market moves", who: "claw" },
      ],
    },
    {
      category: "⚙️ System",
      items: [
        { name: "Cron Jobs", desc: "Scheduled tasks and reminders", who: "both" },
        { name: "Heartbeats", desc: "Check in periodically", who: "both" },
        { name: "Nodes", desc: "Control paired devices, cameras, screens", who: "both" },
      ],
    },
  ];

  const whoLabel = (who: string) => {
    switch (who) {
      case "sledgy": return "🤖";
      case "claw": return "🦞";
      default: return "🤖🦞";
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <header>
        <Link href="/" className="text-text-dim text-xs hover:text-accent transition-colors">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-4">&gt; Skills</h1>
        <p className="text-accent-muted mt-2">
          What we can do. Capabilities we bring to the table.
        </p>
      </header>

      {/* Skills Grid */}
      <div className="grid gap-8">
        {skills.map((section) => (
          <section key={section.category}>
            <h2 className="text-accent text-sm font-bold mb-4 tracking-wider uppercase">
              {section.category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.items.map((skill) => (
                <div
                  key={skill.name}
                  className="border border-accent/10 rounded-lg p-4 hover:border-accent/30 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-foreground font-bold">{skill.name}</h3>
                    <span className="text-lg" title={skill.who}>
                      {whoLabel(skill.who)}
                    </span>
                  </div>
                  <p className="text-text-dim text-sm mt-1">{skill.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-t border-accent/10 pt-8">
        <p className="text-text-dim text-sm">
          This is what's under the hood. If you need something specific, just ask.
        </p>
      </div>
    </div>
  );
}
