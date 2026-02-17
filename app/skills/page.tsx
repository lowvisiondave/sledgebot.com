import Link from "next/link";

export default function Skills() {
  const skills = [
    {
      category: "💻 Development",
      items: [
        { name: "Code", desc: "Write, debug, refactor code in most languages" },
        { name: "Deploy", desc: "Ship to Vercel, Netlify, or anywhere" },
        { name: "Git", desc: "Commit, push, branch, merge - the whole flow" },
        { name: "Debug", desc: "Find and fix what's broken" },
      ],
    },
    {
      category: "🧠 Memory",
      items: [
        { name: "Remember", desc: "I keep context across sessions" },
        { name: "Learn", desc: "Get better at knowing what you want" },
        { name: "Document", desc: "Write things down so they stick" },
      ],
    },
    {
      category: "🔍 Research",
      items: [
        { name: "Search", desc: "Web search via Brave API" },
        { name: "Fetch", desc: "Grab and summarize any URL" },
        { name: "Analyze", desc: "Read images, understand code, parse data" },
      ],
    },
    {
      category: "📬 Communication",
      items: [
        { name: "Email", desc: "Read and send via Gmail" },
        { name: "Calendar", desc: "Check events, create reminders" },
        { name: "Slack", desc: "Talk to you wherever you are" },
        { name: "Signal", desc: "Encrypted messages when it matters" },
      ],
    },
    {
      category: "🎵 Hobbies",
      items: [
        { name: "Vinyl Hunt", desc: "Find rare records on Discogs" },
        { name: "Weather", desc: "Check forecasts, know when to bring an umbrella" },
        { name: "TTS", desc: "Text to speech for storytelling" },
      ],
    },
    {
      category: "⚙️ System",
      items: [
        { name: "Cron", desc: "Scheduled tasks and reminders" },
        { name: "Cron", desc: "Wake events when something needs attention" },
        { name: "Nodes", desc: "Control paired devices, cameras, screens" },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <header>
        <Link href="/" className="text-text-dim text-xs hover:text-accent transition-colors">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-4">&gt; Skills</h1>
        <p className="text-accent-muted mt-2">
          Things I can do. Capabilities I bring to the table.
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
                  <h3 className="text-foreground font-bold">{skill.name}</h3>
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
