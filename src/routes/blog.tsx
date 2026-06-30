import { createFileRoute } from "@tanstack/react-router";

const posts = [
  { title: "How to read an earnings report in 5 minutes", read: "6 min" },
  { title: "Position sizing for new investors", read: "8 min" },
  { title: "Why dollar-cost averaging still works", read: "4 min" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog · investwhat" }, { name: "description", content: "Investing essays and guides." }] }),
  component: () => (
    <div className="space-y-4">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Blog</h1>
        <p className="mt-1 text-sm text-muted-foreground">Learn investing, one short read at a time.</p>
      </header>
      <div className="space-y-2.5">
        {posts.map((p) => (
          <article key={p.title} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.read}</div>
            <h3 className="mt-1 text-sm font-semibold">{p.title}</h3>
          </article>
        ))}
      </div>
    </div>
  ),
});
