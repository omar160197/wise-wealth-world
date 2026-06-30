import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trophy, FlaskConical } from "lucide-react";
import { fantasyPortfolios } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fantasy")({
  head: () => ({
    meta: [
      { title: "Fantasy · investwhat" },
      { name: "description", content: "Create fantasy portfolios, forward-test ideas with zero risk." },
    ],
  }),
  component: FantasyPage,
});

function FantasyPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Fantasy</h1>
          <p className="mt-1 text-sm text-muted-foreground">Test ideas. No real money at stake.</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft">
          <Plus className="size-4" /> New
        </button>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <Stat label="Avg return" value="+6.2%" tone="success" />
        <Stat label="Best run" value="+22.1%" tone="success" />
      </section>

      <section>
        <h2 className="font-display mb-3 text-base font-bold">Your fantasy portfolios</h2>
        <div className="space-y-2.5">
          {fantasyPortfolios.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <FlaskConical className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.holdings} holdings · {p.age}</div>
                </div>
                <div className="text-right">
                  <div className="num text-base font-bold">${p.value.toLocaleString()}</div>
                  <div className={cn("num text-xs font-semibold", p.change >= 0 ? "text-success" : "text-destructive")}>
                    {p.change >= 0 ? "+" : ""}{p.change}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-card p-5 shadow-soft">
        <Trophy className="size-6 text-primary" />
        <h3 className="font-display mt-2 text-lg font-bold">Weekly fantasy league</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          You're ranked #142 of 4,820. Top 50 wins premium features.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "destructive" }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={cn("num mt-1 text-xl font-bold", tone === "success" ? "text-success" : "text-destructive")}>
        {value}
      </div>
    </div>
  );
}
