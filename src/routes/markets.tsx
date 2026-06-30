import { createFileRoute } from "@tanstack/react-router";
import { markets, trending } from "@/lib/mock-data";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/markets")({
  head: () => ({ meta: [{ title: "Markets · investwhat" }, { name: "description", content: "Global market indices and movers." }] }),
  component: () => (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Markets</h1>
        <p className="mt-1 text-sm text-muted-foreground">Indices, movers and sectors at a glance.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {markets.map((m) => (
          <div key={m.symbol} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="text-xs font-medium text-muted-foreground">{m.symbol}</div>
            <div className="num mt-1 text-xl font-bold">{m.value}</div>
            <div className={cn("num mt-0.5 flex items-center gap-1 text-xs font-semibold", m.change >= 0 ? "text-success" : "text-destructive")}>
              {m.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {m.change >= 0 ? "+" : ""}{m.change}%
            </div>
          </div>
        ))}
      </div>
      <section>
        <h2 className="font-display mb-3 text-base font-bold">Top movers</h2>
        <div className="flex flex-wrap gap-2">
          {trending.map((t) => (
            <span key={t} className="num rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold">{t}</span>
          ))}
        </div>
      </section>
    </div>
  ),
});
