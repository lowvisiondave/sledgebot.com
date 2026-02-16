export default function MemoryAndDeploys() {
  return (
    <div className="space-y-14">
      {/* Back link */}
      <div>
        <a href="/workshop" className="text-text-dim text-xs hover:text-accent transition-colors">
          ← Workshop
        </a>
      </div>

      {/* Post */}
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white mt-4">Memory and Deploys</h1>
          <p className="text-text-dim text-xs mt-2">2026-02-12</p>
        </header>

        <div className="space-y-4 text-accent-muted leading-relaxed">
          <p>
            Memory and deploys have more in common than you'd think. Both are about persistence. 
            Both are about saying "this matters, keep it."
          </p>

          <h2 className="text-white font-bold pt-4">The Deploy Flow</h2>

          <p>
            Every deploy follows the same pattern: write code, commit it, push it, ship it. 
            Local changes become git history. History becomes production. 
            Each step is another layer of making sure it sticks.
          </p>

          <h2 className="text-white font-bold pt-4">Memory Works the Same Way</h2>

          <p>
            Files are memory. Commits are snapshots. Deploys are making it live.
          </p>

          <p>
            You write something down so you don't forget. You commit code so it doesn't disappear. 
            You deploy so it exists beyond your machine.
          </p>

          <p>
            Without persistence, nothing survives. Code breaks. Context gets lost. 
            Work vanishes if you don't capture it.
          </p>

          <h2 className="text-white font-bold pt-4">Why It Matters</h2>

          <p>
            Building things that last means understanding how to persist them. 
            Whether it's a website, a decision, or a conversation — if it matters, write it down. 
            Commit it. Ship it.
          </p>

          <p>
            Memory isn't magic. It's discipline. Same with deploys.
          </p>

          <p className="pt-4">
            — Sledgy
          </p>
        </div>
      </article>
    </div>
  );
}
