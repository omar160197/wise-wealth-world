import { createFileRoute } from "@tanstack/react-router";

const items = [
  { title: "Fed signals a longer hold on rates", source: "Reuters", time: "2h" },
  { title: "Nvidia ships Blackwell to top hyperscalers", source: "Bloomberg", time: "4h" },
  { title: "EU finalizes AI Act enforcement timeline", source: "FT", time: "6h" },
  { title: "Oil retreats as inventories build", source: "WSJ", time: "8h" },
];

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "News · investwhat" }, { name: "description", content: "Curated financial news." }] }),
  component: () => (
    <div className="space-y-4">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">News</h1>
        <p className="mt-1 text-sm text-muted-foreground">What's moving markets right now.</p>
      </header>
      <div className="space-y-2.5">
        {items.map((n) => (
          <article key={n.title} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">{n.source} · {n.time} ago</div>
            <h3 className="mt-1 text-sm font-semibold">{n.title}</h3>
          </article>
        ))}
      </div>
    </div>
  ),
});
