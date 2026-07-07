import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Filter,
  Upload,
  Link2,
  RefreshCw,
  Plus,
  Star,
  TrendingUp,
  Share2,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  topPortfolio,
  marketTickers,
  myPortfolios,
  curatedPortfolios,
  communityPortfolios,
  politicalPortfolios,
  type PortfolioCard as PortfolioCardT,
} from "@/lib/portfolios-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolios · investwhat" },
      { name: "description", content: "Manage and track all your investment portfolios: personal, curated, community and political." },
    ],
  }),
  component: PortfoliosPage,
});

const FILTERS = ["All", "My Portfolios", "Community", "Trending"] as const;
type FilterT = (typeof FILTERS)[number];

function PortfoliosPage() {
  const [filter, setFilter] = useState<FilterT>("All");
  const [query, setQuery] = useState("");

  const match = (p: PortfolioCardT) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.author.toLowerCase().includes(query.toLowerCase());

  const sections = useMemo(() => {
    const applyFilter = (arr: PortfolioCardT[], cat: PortfolioCardT["category"]) => {
      if (filter === "My Portfolios" && cat !== "Personal") return [];
      if (filter === "Community" && cat !== "Community") return [];
      if (filter === "Trending") return arr.filter((p) => p.return > 10);
      return arr;
    };
    return {
      my: applyFilter(myPortfolios, "Personal").filter(match),
      curated: applyFilter(curatedPortfolios, "Curated").filter(match),
      community: applyFilter(communityPortfolios, "Community").filter(match),
      political: applyFilter(politicalPortfolios, "Political").filter(match),
    };
  }, [filter, query]);

  return (
    <div className="space-y-5">
      {/* Ticker strip */}
      <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto border-y border-border bg-surface px-4 py-2 sm:mx-0 sm:rounded-2xl sm:border">
        {marketTickers.map((t) => (
          <div key={t.symbol} className="flex shrink-0 items-center gap-2 text-xs">
            <span className="font-semibold text-muted-foreground">{t.symbol}</span>
            <span className="num font-semibold">{t.value}</span>
            <span className={cn("num font-semibold", t.change >= 0 ? "text-success" : "text-destructive")}>
              {t.change >= 0 ? "▲" : "▼"} {t.change >= 0 ? "+" : ""}{t.change}%
            </span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Portfolios</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage and track all your investment portfolios</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionBtn icon={Upload} label="Import CSV" />
          <ActionBtn icon={Link2} label="Connect brokerage" />
          <ActionBtn icon={RefreshCw} label="Sync now" />
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
            <Plus className="size-4" /> New Portfolio
          </button>
        </div>
      </header>

      {/* Search + filter */}
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-soft">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search portfolios by name or symbol…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold shadow-soft">
          <Filter className="size-4" /> Filters
        </button>
      </div>

      {/* Filter chips */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Top portfolio */}
      <section>
        <SectionTitle title="Your Top Portfolio" subtitle="Performance overview of your best performing portfolio" />
        <TopCard />
      </section>

      {/* Grids */}
      {sections.my.length > 0 && (
        <PortfolioSection
          title="My Portfolios"
          subtitle={`${sections.my.length} personal portfolios`}
          items={sections.my}
        />
      )}
      {sections.curated.length > 0 && (
        <PortfolioSection
          title="Curated Portfolios"
          subtitle="Expert-managed strategies and themed portfolios"
          items={sections.curated}
        />
      )}
      {sections.community.length > 0 && (
        <PortfolioSection
          title="Community Portfolios"
          subtitle="Strategies shared by our community members"
          items={sections.community}
        />
      )}
      {sections.political.length > 0 && (
        <PortfolioSection
          title="Political Portfolios"
          subtitle="Public disclosure portfolios from political figures"
          items={sections.political}
        />
      )}
    </div>
  );
}

function ActionBtn({ icon: Icon, label }: { icon: typeof Upload; label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold shadow-soft hover:bg-muted">
      <Icon className="size-4" /> {label}
    </button>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-3">
      <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function TopCard() {
  const p = topPortfolio;
  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 via-card to-card p-4 shadow-soft sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display truncate text-xl font-bold">{p.name}</h3>
                <Star className="size-4 fill-warning text-warning" />
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">by {p.author}</div>
            </div>
            <span className="shrink-0 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {p.category}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Stat label="Total Return" value={`+${p.totalReturn}%`} highlight="success" />
            <Stat label="Holdings" value={String(p.holdings)} />
            <Stat label="Portfolio Value" value={`$${p.value.toLocaleString()}`} />
            <Stat label="Diversification" value={p.diversification} />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
              View Portfolio
            </button>
            <button className="grid size-10 place-items-center rounded-xl border border-border bg-card">
              <Share2 className="size-4" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card p-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <TrendingUp className="size-3.5 text-success" /> Performance
            </div>
            <Sparkline trend="up" height={90} strong />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Best Day" value={`+${p.bestDay}%`} tone="success" />
            <MiniStat label="Worst Day" value={`${p.worstDay}%`} tone="destructive" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: "success" }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={cn("num mt-0.5 text-sm font-bold", highlight === "success" && "text-success")}>{value}</div>
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: "success" | "destructive" }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-center">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={cn("num mt-0.5 text-base font-bold", tone === "success" ? "text-success" : "text-destructive")}>
        {value}
      </div>
    </div>
  );
}

function PortfolioSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: PortfolioCardT[];
}) {
  return (
    <section>
      <SectionTitle title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => (
          <PortfolioCard key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

function PortfolioCard({ p }: { p: PortfolioCardT }) {
  const isUp = p.trend === "up";
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:shadow-glow">
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display truncate text-sm font-bold">{p.name}</h3>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{p.author}</div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            p.category === "Personal" && "bg-primary-soft text-primary",
            p.category === "Curated" && "bg-warning/15 text-warning",
            p.category === "Community" && "bg-accent text-accent-foreground",
            p.category === "Political" && "bg-destructive/10 text-destructive",
          )}
        >
          {p.category}
        </span>
      </header>
      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
      <div className="grid grid-cols-4 gap-2 border-t border-border pt-3">
        <Metric
          label="Return"
          value={`${p.return >= 0 ? "+" : ""}${p.return}%`}
          tone={isUp ? "success" : "destructive"}
        />
        <Metric label="Holdings" value={String(p.holdings)} />
        <Metric label="Value" value={`$${p.value >= 1000 ? `${(p.value / 1000).toFixed(p.value >= 100000 ? 0 : 1)}k` : p.value}`} />
        <Metric label="Div" value={p.div} small />
      </div>
      <Sparkline trend={p.trend} height={40} />
      <button className="mt-auto flex items-center justify-center gap-1.5 border-t border-border pt-3 text-xs font-semibold text-primary hover:text-primary/80">
        View Details <ExternalLink className="size-3" />
      </button>
    </article>
  );
}

function Metric({
  label,
  value,
  tone,
  small,
}: {
  label: string;
  value: string;
  tone?: "success" | "destructive";
  small?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={cn(
          "num mt-0.5 truncate font-bold",
          small ? "text-[11px]" : "text-sm",
          tone === "success" && "text-success",
          tone === "destructive" && "text-destructive",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Sparkline({
  trend,
  height = 40,
  strong = false,
}: {
  trend: "up" | "down";
  height?: number;
  strong?: boolean;
}) {
  const up = "M0,30 C10,28 20,22 30,20 C45,17 55,25 70,18 C85,12 95,15 110,10 C125,6 140,8 160,4";
  const down = "M0,10 C15,12 25,18 40,20 C55,22 70,18 85,24 C100,28 115,30 130,32 C145,34 155,32 160,34";
  const stroke = trend === "up" ? "var(--color-success)" : "var(--color-destructive)";
  return (
    <svg viewBox="0 0 160 40" preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`g-${trend}-${strong ? "s" : "n"}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={strong ? 0.35 : 0.2} />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${trend === "up" ? up : down} L160,40 L0,40 Z`} fill={`url(#g-${trend}-${strong ? "s" : "n"})`} />
      <path d={trend === "up" ? up : down} fill="none" stroke={stroke} strokeWidth={strong ? 2 : 1.5} strokeLinecap="round" />
    </svg>
  );
}

// Silence unused warnings for icons available for future features
void ArrowUpRight;
void ArrowDownRight;
