import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  FlaskConical,
  Wrench,
  Sparkles,
  Send,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { user, markets, portfolios, trending, samplePrompts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home · investwhat" },
      { name: "description", content: "Your daily investing dashboard, AI copilot and portfolio highlights." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [prompt, setPrompt] = useState("");
  const positive = user.dailyPnl >= 0;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <section>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {user.firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You're{" "}
          <span className={cn("num font-semibold", positive ? "text-success" : "text-destructive")}>
            {positive ? "up" : "down"} ${Math.abs(user.dailyPnl).toLocaleString()}
          </span>{" "}
          today. Nice work.
        </p>
      </section>

      {/* Action cards */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Make your first portfolio
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <ActionCard
            icon={BookOpen}
            title="Browse portfolios"
            desc="See what others invest in"
            tone="surface"
          />
          <ActionCard
            icon={FlaskConical}
            title="Try fantasy"
            desc="Practice with zero real dollars"
            tone="surface"
          />
          <ActionCard
            icon={Wrench}
            title="Build your own"
            desc="Pick the stocks you believe in"
            tone="surface"
          />
          <ActionCard
            icon={Sparkles}
            title="Build with AI"
            desc="Describe your goals, get a tailored portfolio"
            tone="primary"
            featured
          />
        </div>
      </section>

      {/* AI assistant input */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h2 className="text-sm font-semibold">Your personal AI investment assistant</h2>
        </div>
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft focus-within:border-primary/50">
          <Sparkles className="mt-1 size-4 shrink-0 text-primary" />
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything about stocks, markets, or your portfolio..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            aria-label="Send"
            disabled={!prompt.trim()}
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40"
          >
            <Send className="size-4" />
          </button>
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {samplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Markets snapshot */}
      <section>
        <SectionHeader title="Markets" />
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {markets.map((m) => (
            <div
              key={m.symbol}
              className="min-w-[150px] rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="text-xs font-medium text-muted-foreground">{m.symbol}</div>
              <div className="num mt-1 text-xl font-bold">{m.value}</div>
              <div
                className={cn(
                  "num mt-0.5 flex items-center gap-1 text-xs font-semibold",
                  m.change >= 0 ? "text-success" : "text-destructive",
                )}
              >
                {m.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {m.change >= 0 ? "+" : ""}
                {m.change}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Your portfolios */}
      <section>
        <SectionHeader title="Your portfolios" action="View all" />
        <div className="space-y-2.5">
          {portfolios.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {p.holdings} holdings · {p.status}
                </div>
              </div>
              <div className="text-right">
                <div className="num text-base font-bold">${p.value.toLocaleString()}</div>
                <div className="num text-xs font-semibold text-success">+{p.change}%</div>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      {/* Style check-up */}
      <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-card p-5 shadow-soft">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-card">
            <Star className="size-5 text-primary" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              2 minutes
            </div>
            <h3 className="font-display mt-1 text-lg font-bold leading-snug">
              Investing style check-up
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              6 quick questions to find a portfolio that fits your timeline, comfort with risk,
              and how hands-on you want to be.
            </p>
            <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:opacity-90">
              Start check-up <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section>
        <SectionHeader title="Trending" />
        <div className="flex flex-wrap gap-2">
          {trending.map((t) => (
            <button
              key={t}
              className="num rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold tracking-wide transition hover:border-primary/40"
            >
              {t}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <h2 className="font-display text-base font-bold">{title}</h2>
      {action && (
        <button className="text-xs font-semibold text-primary hover:underline">{action}</button>
      )}
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  desc,
  tone,
  featured,
}: {
  icon: typeof BookOpen;
  title: string;
  desc: string;
  tone: "surface" | "primary";
  featured?: boolean;
}) {
  return (
    <button
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border p-4 text-left shadow-soft transition hover:-translate-y-0.5",
        tone === "primary"
          ? "border-primary/30 bg-gradient-to-br from-primary-soft via-card to-card"
          : "border-border bg-card",
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl",
          tone === "primary"
            ? "bg-primary text-primary-foreground shadow-glow"
            : "bg-muted text-foreground",
        )}
      >
        <Icon className="size-5" />
      </span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-0.5 text-xs leading-snug text-muted-foreground">{desc}</div>
      </div>
      {featured && (
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          AI
        </span>
      )}
    </button>
  );
}
