import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Send,
  ArrowRight,
  ArrowLeft,
  Compass,
  Link2,
  Wand2,
  Check,
  Landmark,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Zap,
  Loader2,
  PiggyBank,
  BarChart3,
  Brain,
  X,
} from "lucide-react";
import { AiMeshBackground } from "@/components/home/AiMeshBackground";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/role-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "investwhat — investing, explained by AI" },
      {
        name: "description",
        content:
          "Meet an AI copilot that helps you understand investing, connect your accounts, and build a portfolio in minutes.",
      },
    ],
  }),
  component: HomePage,
});

type Track = "new" | "connect" | "build" | null;

/* ─────────────────────── HOME ─────────────────────── */

function HomePage() {
  const [track, setTrack] = useState<Track>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const { role } = useRole();

  return (
    <div className="flex h-[calc(100svh-56px)] flex-col gap-0 overflow-hidden pb-[env(safe-area-inset-bottom)] lg:h-[calc(100svh-56px-40px)]">

      {/* ── Top header bar: full width, unified ── */}
      <div className="relative shrink-0 overflow-hidden rounded-t-2xl border border-border/60 bg-card/80 px-5 py-4 backdrop-blur-md">
        <AiMeshBackground className="rounded-t-2xl" />
        <div className="relative z-10 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {role === "experienced" ? (
              <>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  <BarChart3 className="size-3" /> Pro dashboard
                </div>
                <h1 className="font-display mt-1 text-xl font-bold leading-tight sm:text-2xl">
                  Welcome back, <span className="text-primary">Alex.</span>{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    Portfolio up <span className="font-semibold text-primary">+2.4%</span> this week.
                  </span>
                </h1>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  <Sparkles className="size-3" /> AI copilot for investors
                </div>
                <h1 className="font-display mt-1 text-xl font-bold leading-tight sm:text-2xl">
                  Your money, finally{" "}
                  <span className="text-primary">working for you.</span>
                </h1>
              </>
            )}
          </div>
          {/* Trust / stats row — inline on desktop */}
          <div className="flex items-center gap-4">
            {role === "experienced" ? (
              <>
                <StatChip value="$22,700" label="Total" />
                <StatChip value="+$542" label="7d P&L" up />
                <StatChip value="1.42" label="Sharpe" />
              </>
            ) : (
              <>
                <StatChip value="50k+" label="investors" />
                <StatChip value="$2.4B+" label="analyzed" />
                <StatChip value="Free" label="to start" up />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Bento grid — fills remaining height ── */}
      <div className={cn(
        "min-h-0 flex-1 grid gap-[1px] bg-border/40 rounded-b-2xl overflow-hidden",
        role === "experienced"
          ? "grid-cols-1 grid-rows-[1fr_auto] lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-1"
          : "grid-cols-1 grid-rows-[1fr_auto] lg:grid-cols-[1fr_1fr] lg:grid-rows-1",
      )}>

        {/* ── CELL A: main action area ── */}
        <div className="relative flex min-h-0 flex-col overflow-hidden bg-card/90 p-4 backdrop-blur-md sm:p-5">
          {role === "experienced" ? (
            <ExperiencedMainCell />
          ) : track !== null ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
              <button
                onClick={() => setTrack(null)}
                className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> Back
              </button>
              {track === "new" && <NewInvestorTrack onFinish={() => { setTrack(null); setShowWelcome(true); }} />}
              {track === "connect" && <ConnectTrack onFinish={() => { setTrack(null); setShowWelcome(true); }} />}
              {track === "build" && <BuildTrack onFinish={() => { setTrack(null); setShowWelcome(true); }} />}
            </div>
          ) : (
            <BeginnerMainCell onSelect={setTrack} />
          )}
        </div>

        {/* ── CELL B: secondary panel ── */}
        <div className={cn(
          "min-h-0 overflow-hidden bg-card/70 backdrop-blur-md",
          role === "experienced"
            ? "grid grid-rows-[auto_1fr] lg:flex lg:flex-col"
            : "flex flex-col",
        )}>
          {role === "experienced" ? (
            <ExperiencedSecondaryCell />
          ) : (
            <BeginnerSecondaryCell />
          )}
        </div>

      </div>

      {showWelcome && <WelcomeInterstitial onClose={() => setShowWelcome(false)} />}
    </div>
  );
}

/* ─────────────────────── STAT CHIP ─────────────────────── */

function StatChip({ value, label, up }: { value: string; label: string; up?: boolean }) {
  return (
    <div className="text-right">
      <div className={cn("text-sm font-bold leading-tight", up && "text-primary")}>{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

/* ─────────────────────── BEGINNER MAIN CELL ─────────────────────── */

function BeginnerMainCell({ onSelect }: { onSelect: (t: Track) => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {/* AI chat preview */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <AiChatPreview />
      </div>

      {/* Start paths */}
      <div className="shrink-0">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Choose your starting point
        </p>
        <div className="flex flex-col gap-1.5">
          <StartTile icon={Compass} title="Brand new to investing" desc="2 questions → starter portfolio" onClick={() => onSelect("new")} />
          <StartTile icon={Link2} title="I already have accounts" desc="Connect bank or broker — read-only" onClick={() => onSelect("connect")} />
          <StartTile icon={Wand2} title="Build with AI" desc="One sentence → tailored portfolio" featured onClick={() => onSelect("build")} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── BEGINNER SECONDARY CELL ─────────────────────── */

const HOW_STEPS = [
  { num: "01", icon: Compass, title: "Tell us where you are", body: "Two quick questions — no finance degree needed." },
  { num: "02", icon: Brain, title: "AI builds your plan", body: "A personalised portfolio crafted in seconds." },
  { num: "03", icon: BarChart3, title: "Track and grow", body: "The AI monitors and explains — you stay in control." },
];

function BeginnerSecondaryCell() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-0 divide-y divide-border/50">
      {/* How it works — compact horizontal steps */}
      <div className="shrink-0 p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-primary">How it works</p>
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          {HOW_STEPS.map((s) => (
            <div key={s.num} className="flex items-start gap-3 flex-1">
              <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                <s.icon className="size-3.5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-[10px] font-bold leading-snug">{s.title}</span>
                  <span className="font-display text-base font-bold text-muted-foreground/20 select-none leading-none">{s.num}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust signals */}
      <div className="shrink-0 flex flex-wrap gap-x-4 gap-y-1.5 p-4">
        {[
          { icon: ShieldCheck, text: "256-bit encrypted" },
          { icon: Check, text: "Read-only connections" },
          { icon: Sparkles, text: "No ads or data selling" },
        ].map((t) => (
          <span key={t.text} className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <t.icon className="size-3 text-primary" /> {t.text}
          </span>
        ))}
      </div>

      {/* Features mini-grid */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">What you get</p>
        <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-3">
          {[
            { icon: Brain, title: "AI explains it all" },
            { icon: ShieldCheck, title: "Read-only, secure" },
            { icon: PiggyBank, title: "Goal saving" },
            { icon: TrendingUp, title: "Fantasy mode" },
            { icon: Zap, title: "Market signals" },
            { icon: BookOpen, title: "Bite-sized lessons" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-2.5 py-2">
              <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <f.icon className="size-3" />
              </span>
              <span className="text-[11px] font-semibold leading-tight">{f.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── EXPERIENCED MAIN CELL ─────────────────────── */

const PORTFOLIO_ROWS = [
  { ticker: "VOO", name: "Vanguard S&P 500", value: "$12,480", change: "+1.24%", up: true },
  { ticker: "AAPL", name: "Apple Inc.", value: "$4,320", change: "-0.38%", up: false },
  { ticker: "BTC", name: "Bitcoin", value: "$3,100", change: "+3.12%", up: true },
  { ticker: "AGG", name: "US Bond ETF", value: "$2,800", change: "+0.06%", up: true },
];

function ExperiencedMainCell() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      {/* Portfolio table */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border/60 bg-background/60">
        <div className="sticky top-0 flex items-center justify-between border-b border-border/50 bg-background/90 px-3 py-2 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Holdings</span>
          <span className="text-[10px] font-semibold text-primary">$22,700 total</span>
        </div>
        <div className="divide-y divide-border/40">
          {PORTFOLIO_ROWS.map((r) => (
            <div key={r.ticker} className="flex items-center gap-3 px-3 py-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-muted text-[11px] font-bold">
                {r.ticker.slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold">{r.ticker}</div>
                <div className="truncate text-[10px] text-muted-foreground">{r.name}</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-semibold">{r.value}</div>
                <div className={cn("text-[10px] font-semibold", r.up ? "text-primary" : "text-destructive")}>
                  {r.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid shrink-0 grid-cols-3 gap-2">
        <MiniStat label="7-day P&L" value="+$542" accent />
        <MiniStat label="Sharpe ratio" value="1.42" />
        <MiniStat label="Risk score" value="6/10" />
      </div>

      {/* AI portfolio insight */}
      <div className="shrink-0 flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary-soft/20 p-3">
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">AI insight</span>
          <p className="mt-0.5 text-[11px] leading-relaxed text-foreground">
            Tech is leading today on NVDA earnings. Your 28% tech exposure is within target — no rebalance needed yet.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── EXPERIENCED SECONDARY CELL ─────────────────────── */

const INDICES = [
  { name: "S&P 500", value: "5,483", change: "+0.74%" },
  { name: "NASDAQ", value: "17,461", change: "+1.02%" },
  { name: "DOW", value: "39,118", change: "+0.43%" },
];

const MARKET_MOVERS = [
  { ticker: "NVDA", change: "+4.8%", up: true, name: "NVIDIA" },
  { ticker: "MSFT", change: "+1.2%", up: true, name: "Microsoft" },
  { ticker: "TSLA", change: "-2.9%", up: false, name: "Tesla" },
  { ticker: "META", change: "+2.1%", up: true, name: "Meta" },
];

const QUICK_ACTIONS = [
  { icon: Zap, title: "Rebalance", desc: "AI-suggested shift" },
  { icon: BarChart3, title: "Screener", desc: "Filter by criteria" },
  { icon: TrendingUp, title: "Backtest", desc: "Historical sim" },
  { icon: PiggyBank, title: "Tax harvest", desc: "Year-end offsets" },
];

function ExperiencedSecondaryCell() {
  const [activeTab, setActiveTab] = useState<"market" | "actions">("market");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Tab strip */}
      <div className="flex shrink-0 gap-0 border-b border-border/50">
        {(["market", "actions"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(
              "flex-1 py-2.5 text-[11px] font-semibold transition",
              activeTab === t
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t === "market" ? "Market Pulse" : "Quick Actions"}
          </button>
        ))}
      </div>

      {activeTab === "market" ? (
        <div className="min-h-0 flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {/* Indices */}
          <div className="grid grid-cols-3 gap-1.5">
            {INDICES.map((idx) => (
              <div key={idx.name} className="rounded-xl border border-border/60 bg-background/60 px-2.5 py-2">
                <div className="text-[10px] font-medium text-muted-foreground">{idx.name}</div>
                <div className="mt-0.5 text-sm font-bold leading-none">{idx.value}</div>
                <div className="mt-0.5 text-[10px] font-semibold text-primary">{idx.change}</div>
              </div>
            ))}
          </div>
          {/* Movers */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Top movers</p>
            <div className="grid grid-cols-2 gap-1.5">
              {MARKET_MOVERS.map((m) => (
                <div
                  key={m.ticker}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-3 py-2",
                    m.up ? "border-primary/20 bg-primary-soft/30" : "border-destructive/20 bg-destructive/5",
                  )}
                >
                  <div>
                    <div className="text-[12px] font-bold">{m.ticker}</div>
                    <div className="text-[9px] text-muted-foreground">{m.name}</div>
                  </div>
                  <span className={cn("text-[11px] font-bold", m.up ? "text-primary" : "text-destructive")}>
                    {m.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-2 content-start">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.title}
              className="group flex flex-col gap-2 rounded-xl border border-border/60 bg-background/60 p-3 text-left transition hover:border-primary/40 hover:-translate-y-0.5"
            >
              <span className="grid size-8 place-items-center rounded-xl bg-primary-soft text-primary">
                <a.icon className="size-4" />
              </span>
              <div>
                <div className="text-xs font-bold">{a.title}</div>
                <div className="text-[11px] text-muted-foreground">{a.desc}</div>
              </div>
              <ArrowRight className="size-3 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </button>
          ))}
          {/* AI audit full-width */}
          <button className="group col-span-2 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-soft/20 px-4 py-3 text-left transition hover:border-primary/40">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Brain className="size-4" />
            </span>
            <div className="flex-1">
              <div className="text-xs font-bold">AI portfolio audit</div>
              <div className="text-[11px] text-muted-foreground">Identify overlaps, gaps and hidden fees</div>
            </div>
            <ArrowRight className="size-3.5 shrink-0 text-primary transition group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────── AI CHAT PREVIEW (beginner) ─────────────────────── */

const BEGINNER_CHIPS = [
  "Explain ETFs like I'm 12",
  "What's a safe first portfolio?",
  "How do I start with $100?",
  "Is investing risky right now?",
];

function AiChatPreview() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your AI investing copilot. No question is too basic — ask me anything." },
  ]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      { role: "ai", text: "Great question! Once connected to the AI backend, I'll give you a real answer grounded in your data." },
    ]);
    setText("");
  };

  return (
    <div className="flex h-full flex-col gap-2">
      {/* Messages */}
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-xl border border-border/60 bg-background/60 p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[88%] rounded-xl px-3 py-2 text-xs leading-relaxed",
              m.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted text-foreground",
            )}
          >
            {m.text}
          </div>
        ))}
      </div>
      {/* Chips */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto shrink-0">
        {BEGINNER_CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setText(c)}
            className="shrink-0 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition"
          >
            {c}
          </button>
        ))}
      </div>
      {/* Input */}
      <div className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 focus-within:border-primary/50">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) { e.preventDefault(); send(); }
          }}
          placeholder="Ask anything about investing…"
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />
        <button
          disabled={!text.trim()}
          onClick={send}
          aria-label="Send"
          className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── START TILE ─────────────────────── */

function StartTile({
  icon: Icon,
  title,
  desc,
  featured,
  onClick,
}: {
  icon: typeof Compass;
  title: string;
  desc: string;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl border p-2.5 text-left transition hover:-translate-y-0.5 hover:shadow-glow",
        featured
          ? "border-primary/40 bg-gradient-to-r from-primary-soft/90 to-card/70 shadow-glow"
          : "border-border/70 bg-background/60 hover:border-primary/40",
      )}
    >
      <span className={cn(
        "grid size-8 shrink-0 place-items-center rounded-xl",
        featured ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-foreground",
      )}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold leading-tight">{title}</div>
        <div className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{desc}</div>
      </div>
      {featured && (
        <span className="absolute right-2.5 top-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
          AI
        </span>
      )}
      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  );
}

/* ─────────────────────── TRACK PANELS ─────────────────────── */

function NewInvestorTrack({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
        <Compass className="size-3.5" /> New here · step {Math.min(step + 1, 3)} of 3
      </div>
      {step === 0 && (
        <QuizStep
          title="When would you like to use this money?"
          hint="No wrong answer — this shapes your risk level."
          options={["Less than 2 years", "3–5 years", "5–10 years", "10+ years"]}
          value={timeline}
          onSelect={(v) => { setTimeline(v); setStep(1); }}
        />
      )}
      {step === 1 && (
        <QuizStep
          title="If your portfolio dropped 20%, you'd…"
          hint="Be honest — this only trains the AI, not the market."
          options={["Sell everything", "Sell some", "Hold and wait", "Buy more"]}
          value={risk}
          onSelect={(v) => { setRisk(v); setStep(2); }}
        />
      )}
      {step === 2 && (
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[10px] font-semibold text-accent-foreground">
            <Check className="size-3" /> Your match is ready
          </div>
          <div>
            <h3 className="font-display text-base font-bold">A balanced starter portfolio</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Based on a <b className="text-foreground">{timeline}</b> horizon and your{" "}
              <b className="text-foreground">{risk?.toLowerCase()}</b> instinct.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MiniStat label="Est. return" value="7–9%" />
            <MiniStat label="Volatility" value="Low" />
            <MiniStat label="Holdings" value="12" />
          </div>
          <div className="rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="mb-1.5 text-[10px] font-semibold">5-year projection vs benchmarks</div>
            <BenchmarkChart />
            <div className="mt-1.5 flex gap-3 text-[10px]">
              <LegendDot className="bg-primary" label="AI portfolio" />
              <LegendDot className="bg-muted-foreground/60" label="S&P 500" />
            </div>
          </div>
          <button
            onClick={onFinish}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            <Sparkles className="size-3.5" /> See it in the AI copilot
          </button>
        </div>
      )}
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      <span className={cn("size-2 rounded-full", className)} /> {label}
    </span>
  );
}

function BenchmarkChart() {
  const ai = [100, 108, 118, 131, 146, 164];
  const sp = [100, 106, 112, 119, 128, 138];
  const all = [...ai, ...sp];
  const max = Math.max(...all);
  const min = Math.min(...all);
  const toPath = (arr: number[]) =>
    arr.map((v, i) => {
      const x = (i / (arr.length - 1)) * 100;
      const y = 32 - ((v - min) / (max - min)) * 30;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 100 32" className="h-12 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ai-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${toPath(ai)} L100,32 L0,32 Z`} fill="url(#ai-fill)" />
      <path d={toPath(sp)} fill="none" stroke="currentColor" className="text-muted-foreground/70" strokeWidth="1.4" strokeDasharray="3 2" />
      <path d={toPath(ai)} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuizStep({ title, hint, options, value, onSelect }: {
  title: string; hint: string; options: string[]; value: string | null; onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="font-display text-base font-bold leading-snug">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onSelect(o)}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-xs font-medium transition",
              value === o
                ? "border-primary bg-primary-soft text-accent-foreground"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

const SCAN_PHRASES = [
  "Reading tickers…",
  "Mapping risk vectors…",
  "Identifying overlapping expense ratios…",
  "Detecting concentration risk…",
  "Optimization complete!",
];

function ConnectTrack({ onFinish }: { onFinish: () => void }) {
  const [bank, setBank] = useState(false);
  const [broker, setBroker] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const done = bank && broker;

  if (scanning) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
          <Loader2 className="size-3.5 animate-spin" /> AI scanning your portfolio
        </div>
        <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary-soft/20 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Step {phraseIdx + 1} of {SCAN_PHRASES.length}
          </div>
          <div className="font-display mt-1 text-base font-bold">{SCAN_PHRASES[phraseIdx]}</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((phraseIdx + 1) / SCAN_PHRASES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
        <Link2 className="size-3.5" /> Connect your accounts
      </div>
      <h3 className="font-display text-base font-bold">Bring your money in — read-only.</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">
        We only read your balances and positions. Nothing moves unless you say so.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <ConnectRow icon={Landmark} label="Bank or credit card" connected={bank} onClick={() => setBank((v) => !v)} />
        <ConnectRow icon={Briefcase} label="Brokerage account" connected={broker} onClick={() => setBroker((v) => !v)} />
      </div>
      <button
        disabled={!done}
        onClick={() => {
          setPhraseIdx(0);
          setScanning(true);
          let i = 0;
          const iv = setInterval(() => {
            i++;
            if (i >= SCAN_PHRASES.length) { clearInterval(iv); setScanning(false); onFinish(); return; }
            setPhraseIdx(i);
          }, 480);
        }}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-40"
      >
        <Sparkles className="size-3.5" /> Analyze my holdings with AI
      </button>
    </div>
  );
}

function ConnectRow({ icon: Icon, label, connected, onClick }: {
  icon: typeof Landmark; label: string; connected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
        connected ? "border-primary/50 bg-primary-soft/60" : "border-border bg-card hover:border-primary/40",
      )}
    >
      <span className={cn("grid size-8 place-items-center rounded-xl", connected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        <Icon className="size-4" />
      </span>
      <div className="flex-1 text-xs font-semibold">{label}</div>
      {connected ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
          <Check className="size-2.5" /> Connected
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
          Connect <ArrowRight className="size-3" />
        </span>
      )}
    </button>
  );
}

const GOAL_PRESETS = ["Retire at 55", "Buy a house in 5 years", "Beat the S&P 500", "Steady dividend income"];

function BuildTrack({ onFinish }: { onFinish: () => void }) {
  const [goal, setGoal] = useState("");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
        <Wand2 className="size-3.5" /> Build with AI
      </div>
      <h3 className="font-display text-base font-bold">Describe your goal in one sentence.</h3>
      <p className="text-xs text-muted-foreground">Example: &quot;I want to save $50k in 5 years for a house deposit.&quot;</p>
      <div className="rounded-xl border border-border bg-card p-2.5 focus-within:border-primary/50">
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
          placeholder="Type your goal…"
          className="w-full resize-none bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {GOAL_PRESETS.map((s) => (
          <button
            key={s}
            onClick={() => setGoal(s)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-medium transition",
              goal === s
                ? "border-primary bg-primary-soft text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        disabled={!goal.trim()}
        onClick={onFinish}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-40"
      >
        <Sparkles className="size-3.5" /> Generate my portfolio
      </button>
    </div>
  );
}

/* ─────────────────────── SHARED ─────────────────────── */

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={cn("num mt-0.5 text-sm font-bold", accent && "text-primary")}>{value}</div>
    </div>
  );
}

/* ─────────────────────── WELCOME INTERSTITIAL ─────────────────────── */

function WelcomeInterstitial({ onClose }: { onClose: () => void }) {
  const steps = [
    { title: "AI Copilot", desc: "Ask anything, anywhere — always one click away.", icon: Sparkles },
    { title: "Portfolios", desc: "Your holdings + AI-curated ideas, side by side.", icon: Briefcase },
    { title: "Markets & News", desc: "The signals that matter, filtered by your goals.", icon: TrendingUp },
  ];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-primary/30 bg-card p-5 shadow-glow">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-muted">
          <X className="size-4" />
        </button>
        <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-semibold text-primary">
          <Sparkles className="size-3" /> You&apos;re all set
        </div>
        <h2 className="font-display mt-2 text-lg font-bold">Welcome to investwhat</h2>
        <p className="mt-1 text-xs text-muted-foreground">Here&apos;s what you can do from here:</p>
        <div className="mt-4 grid gap-3">
          {steps.map((s) => (
            <div key={s.title} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="size-4" />
              </span>
              <div>
                <div className="text-xs font-bold">{s.title}</div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
        >
          Explore the app
        </button>
      </div>
    </div>
  );
}
