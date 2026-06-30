import { createFileRoute } from "@tanstack/react-router";

const screens = [
  { name: "High-quality compounders", desc: "ROIC > 15%, low debt, 10y revenue growth" },
  { name: "Oversold dividend payers", desc: "Yield > 4%, RSI < 30" },
  { name: "AI infrastructure", desc: "Semis, networking, datacenter REITs" },
  { name: "Small-cap momentum", desc: "Mkt cap < $5B, 6m return > 30%" },
];

export const Route = createFileRoute("/screeners")({
  head: () => ({ meta: [{ title: "Screeners · investwhat" }, { name: "description", content: "Pre-built and custom stock screeners." }] }),
  component: () => (
    <div className="space-y-4">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Screeners</h1>
        <p className="mt-1 text-sm text-muted-foreground">Find ideas that match your style.</p>
      </header>
      <div className="space-y-2.5">
        {screens.map((s) => (
          <button key={s.name} className="block w-full rounded-2xl border border-border bg-card p-4 text-left shadow-soft">
            <div className="text-sm font-semibold">{s.name}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  ),
});
