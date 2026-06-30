import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Search, ArrowRight } from "lucide-react";
import { investIdeas, trending } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/invest")({
  head: () => ({
    meta: [
      { title: "Invest · investwhat" },
      { name: "description", content: "Browse portfolios, stocks and funds with in-house AI fact sheets." },
    ],
  }),
  component: InvestPage,
});

function InvestPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Invest</h1>
        <p className="mt-1 text-sm text-muted-foreground">Discover ideas, vetted by our AI analysts.</p>
      </header>

      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
        <Search className="size-4 text-muted-foreground" />
        <input
          placeholder="Search stocks, funds, themes..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <section className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary-soft to-card p-5 shadow-soft">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="size-4" /> Build with AI
        </div>
        <h3 className="font-display mt-1 text-lg font-bold">Get a tailored portfolio</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe your goals and risk appetite. We'll draft a complete allocation in seconds.
        </p>
        <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          Start with AI <ArrowRight className="size-3.5" />
        </button>
      </section>

      <section>
        <h2 className="font-display mb-3 text-base font-bold">Curated ideas</h2>
        <div className="space-y-2.5">
          {investIdeas.map((i) => (
            <div key={i.title} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {i.tag}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-semibold">{i.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{i.desc}</div>
                </div>
                <div className={cn("num text-right text-sm font-bold", i.perf >= 0 ? "text-success" : "text-destructive")}>
                  {i.perf >= 0 ? "+" : ""}{i.perf}%
                  <div className="text-[10px] font-medium text-muted-foreground">1y</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display mb-3 text-base font-bold">Popular tickers</h2>
        <div className="flex flex-wrap gap-2">
          {trending.map((t) => (
            <button key={t} className="num rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold">
              {t}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
