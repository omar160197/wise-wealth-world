import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Plus, Upload, Wand2, Bell } from "lucide-react";
import { realHoldings, portfolios } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio · investwhat" },
      { name: "description", content: "Your real holdings, performance analysis and AI rebalancing suggestions." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const total = realHoldings.reduce((s, h) => s + h.shares * h.price, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Portfolio</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your real holdings — synced and analyzed.</p>
      </header>

      <section className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total value</div>
        <div className="num mt-1 text-3xl font-bold">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        <div className="num mt-1 text-xs font-semibold text-success">+$1,210 (1.8%) today</div>
        <div className="mt-4 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-foreground px-3 py-2.5 text-xs font-semibold text-background">
            <Plus className="size-4" /> Connect broker
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-xs font-semibold">
            <Upload className="size-4" /> Upload
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <InsightCard icon={Wand2} title="AI rebalancing" desc="3 suggestions to lower risk" />
        <InsightCard icon={Bell} title="Alerts" desc="2 active price alerts" />
      </section>

      <section>
        <h2 className="font-display mb-3 text-base font-bold">Holdings</h2>
        <div className="space-y-2.5">
          {realHoldings.map((h) => {
            const value = h.shares * h.price;
            return (
              <div key={h.ticker} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                <span className="num grid size-11 shrink-0 place-items-center rounded-xl bg-muted text-xs font-bold">
                  {h.ticker}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{h.name}</div>
                  <div className="num text-xs text-muted-foreground">{h.shares} sh · ${h.price}</div>
                </div>
                <div className="text-right">
                  <div className="num text-sm font-bold">${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <div className={cn("num text-xs font-semibold", h.change >= 0 ? "text-success" : "text-destructive")}>
                    {h.change >= 0 ? "+" : ""}{h.change}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display mb-3 text-base font-bold">All portfolios</h2>
        <div className="space-y-2.5">
          {portfolios.map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <Briefcase className="size-5 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.holdings} holdings</div>
              </div>
              <div className="num text-sm font-bold">${p.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InsightCard({ icon: Icon, title, desc }: { icon: typeof Wand2; title: string; desc: string }) {
  return (
    <button className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left shadow-soft">
      <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="size-4" />
      </span>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}
