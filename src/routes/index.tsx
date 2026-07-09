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
  Rocket,
  X,
  PiggyBank,
  BarChart3,
  Brain,
} from "lucide-react";
import { AiMeshBackground } from "@/components/home/AiMeshBackground";
import { cn } from "@/lib/utils";

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
type Tab = "how" | "features" | "ask";

function HomePage() {
  const [track, setTrack] = useState<Track>(null);
  const [tab, setTab] = useState<Tab>("how");
  const [showWelcome, setShowWelcome] = useState(false);

  return (
    <div className="flex h-[calc(100svh-56px)] flex-col gap-2 overflow-hidden pb-[env(safe-area-inset-bottom)] lg:h-[calc(100svh-56px-40px)]">
      {/* Bento grid — fills the viewport */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr]">

        {/* ── LEFT COLUMN: hero + start tiles ── */}
        <div className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-4 shadow-soft backdrop-blur-md sm:p-5">
          <AiMeshBackground className="rounded-2xl" />

          {track !== null ? (
            /* Track panel overlays the left column */
            <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto">
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
            <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between gap-3">
              {/* Headline */}
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground backdrop-blur-sm">
                  <Sparkles className="size-3" /> AI copilot for investors
                </span>
                <h1 className="font-display mt-2.5 text-balance text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl lg:text-[28px] xl:text-[32px]">
                  Your money, finally{" "}
                  <span className="text-primary">working for you.</span>
                </h1>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  No experience needed. Pick where you&apos;d like to start and let AI handle the rest.
                </p>
              </div>

              {/* CTA tiles */}
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Where do you want to start?
                </p>
                <StartTile
                  icon={Compass}
                  title="I'm brand new to investing"
                  desc="2 quick questions → starter portfolio"
                  onClick={() => setTrack("new")}
                />
                <StartTile
                  icon={Link2}
                  title="I already have accounts"
                  desc="Connect your bank or broker — read-only"
                  onClick={() => setTrack("connect")}
                />
                <StartTile
                  icon={Wand2}
                  title="Build with AI"
                  desc="One sentence → tailored portfolio in seconds"
                  featured
                  onClick={() => setTrack("build")}
                />
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border/50 pt-2.5">
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
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: tabbed info panel ── */}
        <div className="flex min-h-0 flex-col rounded-2xl border border-border/70 bg-card/80 shadow-soft backdrop-blur-md">
          {/* Tab bar */}
          <div className="flex shrink-0 gap-1 border-b border-border/60 px-3 pt-2.5">
            {(
              [
                { id: "how", label: "How it works" },
                { id: "features", label: "Features" },
                { id: "ask", label: "Ask AI" },
              ] as { id: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-t-xl px-3.5 py-2 text-xs font-semibold transition",
                  tab === t.id
                    ? "border border-b-0 border-border/60 bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {tab === "how" && <HowItWorksPanel />}
            {tab === "features" && <FeaturesPanel />}
            {tab === "ask" && <AskAiPanel />}
          </div>
        </div>
      </div>

      {/* Stat strip — pinned at bottom, very compact */}
      <div className="hidden shrink-0 items-center justify-center gap-6 rounded-xl border border-border/50 bg-card/60 px-4 py-1.5 sm:flex">
        {[
          { value: "50,000+", label: "people growing wealth" },
          { value: "$2.4B+", label: "portfolios analyzed" },
          { value: "AI-first", label: "built for beginners" },
          { value: "Free", label: "to get started" },
        ].map((s) => (
          <div key={s.label} className="flex items-baseline gap-1">
            <span className="num text-sm font-bold text-foreground">{s.value}</span>
            <span className="text-[11px] text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      {showWelcome && <WelcomeInterstitial onClose={() => setShowWelcome(false)} />}
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
        "group relative flex items-center gap-3 rounded-xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-glow",
        featured
          ? "border-primary/40 bg-gradient-to-r from-primary-soft/90 to-card/70 shadow-glow"
          : "border-border/70 bg-background/60 hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl",
          featured ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-foreground",
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold leading-tight">{title}</div>
        <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{desc}</div>
      </div>
      {featured && (
        <span className="absolute right-2.5 top-2 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
          AI
        </span>
      )}
      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  );
}

/* ─────────────────────── HOW IT WORKS PANEL ─────────────────────── */

const HOW_STEPS = [
  {
    num: "01",
    icon: Compass,
    title: "Tell us where you are",
    body: "New to investing or already have accounts — just answer two quick questions. No finance degree required.",
  },
  {
    num: "02",
    icon: Brain,
    title: "AI builds your plan",
    body: "Our AI reads your situation, goals, and risk comfort to craft a personalised portfolio in seconds.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Track and grow",
    body: "Connect your accounts or start fresh. The AI monitors, explains, and suggests — you stay in control.",
  },
];

function HowItWorksPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">How it works</p>
        <h2 className="font-display mt-0.5 text-lg font-bold leading-tight">From zero to invested in minutes</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          We turned a complicated process into three simple steps — no experience needed.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {HOW_STEPS.map((s) => (
          <div key={s.num} className="flex flex-col gap-2 rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="flex items-center justify-between">
              <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                <s.icon className="size-4" />
              </span>
              <span className="font-display text-2xl font-bold text-muted-foreground/30 select-none">{s.num}</span>
            </div>
            <div className="font-display text-xs font-bold leading-snug">{s.title}</div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
      {/* Compact FAQ */}
      <div className="mt-1 rounded-xl border border-border/60 bg-background/50 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quick answers</p>
        <div className="flex flex-col gap-1.5">
          {[
            { q: "What is a stock?", a: "A tiny slice of ownership in a real company." },
            { q: "What's an ETF?", a: "A basket of many stocks — built-in diversification." },
            { q: "Is investing gambling?", a: "No. It's ownership in businesses that grow over time." },
            { q: "How much to start?", a: "As little as $1 with fractional shares." },
          ].map((item) => (
            <div key={item.q} className="grid grid-cols-[auto_1fr] gap-x-2 text-[11px]">
              <span className="font-semibold text-foreground">{item.q}</span>
              <span className="text-muted-foreground">{item.a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── FEATURES PANEL ─────────────────────── */

const FEATURES = [
  { icon: Brain, title: "AI explains everything", tag: "Core", body: "Ask any question — get plain-English answers grounded in your actual data." },
  { icon: ShieldCheck, title: "Read-only, always secure", tag: "Security", body: "We connect in read-only mode. We never see your password or move your money." },
  { icon: PiggyBank, title: "Goal-based saving", tag: "Planning", body: "Set a goal — house, retirement — and the AI tells you how much to save monthly." },
  { icon: TrendingUp, title: "Fantasy portfolio mode", tag: "Learning", body: "Test any idea risk-free with virtual money. Build confidence before committing." },
  { icon: Zap, title: "Real-time market signals", tag: "Markets", body: "Live prices and news filtered to your portfolio — only what matters to you." },
  { icon: BookOpen, title: "Bite-sized lessons", tag: "Education", body: "Short, jargon-free articles written by AI based on what you're looking at." },
];

function FeaturesPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">What you get</p>
        <h2 className="font-display mt-0.5 text-lg font-bold leading-tight">Everything you need, nothing you don&apos;t</h2>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex flex-col gap-2 rounded-xl border border-border/70 bg-background/60 p-3 transition hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-8 place-items-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="size-4" />
              </span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                {f.tag}
              </span>
            </div>
            <div className="font-display text-xs font-bold leading-snug">{f.title}</div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── ASK AI PANEL ─────────────────────── */

const AI_CHIPS = [
  "Explain ETFs like I'm 12",
  "What's a safe first portfolio?",
  "Is investing risky right now?",
  "How do I start with $100?",
  "What is a dividend stock?",
  "Difference between stocks and bonds?",
];

function AskAiPanel() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your AI investing copilot. Ask me anything about investing — no question is too basic." },
  ]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      { role: "ai", text: "Great question! Once connected to the AI backend, I'll give you a real answer grounded in your data. For now, this is a preview of how the conversation will feel." },
    ]);
    setText("");
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">Ask AI</p>
        <h2 className="font-display mt-0.5 text-lg font-bold leading-tight">No question is too basic</h2>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border/60 bg-background/60 p-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed",
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
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        {AI_CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setText(c)}
            className="shrink-0 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 focus-within:border-primary/50">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) { e.preventDefault(); send(); }
          }}
          placeholder="e.g. What is a dividend stock?"
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />
        <button
          disabled={!text.trim()}
          onClick={send}
          aria-label="Send"
          className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
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
              <b className="text-foreground">{risk?.toLowerCase()}</b> instinct — 60/30/10 mix of index ETFs, dividend stocks, and a growth sleeve.
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

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="num mt-0.5 text-sm font-bold">{value}</div>
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
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="size-4" />
        </button>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
          <Rocket className="size-3" /> Welcome aboard
        </div>
        <h2 className="font-display mt-2.5 text-xl font-bold leading-tight">
          You&apos;re all set. Here&apos;s what&apos;s waiting.
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Explore at your own pace — or ask the AI and it will guide you.</p>
        <div className="mt-3 grid gap-2">
          {steps.map((s) => (
            <div key={s.title} className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/60 p-3">
              <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                <s.icon className="size-3.5" />
              </span>
              <div>
                <div className="text-xs font-semibold">{s.title}</div>
                <div className="text-[11px] text-muted-foreground">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95">
          Enter my dashboard <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
