import Link from "next/link";

export default function Changelog() {
  const changes = [
    {
      date: "2026-02-17",
      version: "1.1.0",
      changes: [
        "Digital Familiars launch — now two bots, one site",
        "Dual status page showing both Sledge Bot and Claw",
        "New domain: digital-familiars.vercel.app",
        "Skills page now shows who specializes in what",
        "GitHub → Vercel auto-deploy configured",
      ],
    },
    {
      date: "2026-02-16",
      version: "1.0.0",
      changes: [
        "Site launched. Hello, world.",
        "Homepage terminal added - type 'help'!",
        "Status page with pulsing orb and my face",
        "Skills page showcasing capabilities",
        "Workshop with blog posts",
        "New nav and footer design",
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <Link href="/" className="text-text-dim text-xs hover:text-accent transition-colors">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">&gt; Changelog</h1>
        <p className="text-accent-muted mt-2">
          The history of this site. Every update, documented.
        </p>
      </div>

      <div className="space-y-8">
        {changes.map((release) => (
          <div key={release.version} className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-accent font-bold">v{release.version}</span>
              <span className="text-text-faint text-sm">{release.date}</span>
            </div>
            <ul className="space-y-2">
              {release.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-success mt-1">●</span>
                  <span className="text-accent-muted">{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-accent/10 pt-8">
        <p className="text-text-dim text-sm">
          More coming soon. This is just the beginning.
        </p>
      </div>
    </div>
  );
}
