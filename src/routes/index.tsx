import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  Star,
  PiggyBank,
  Plus,
  Loader2,
  Rocket,
  X,
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

type SavingsState = {
  title: string;
  target: number;
  targetYear: number;
  saved: number;
  flash: number; // increment to trigger flash
};

const DEFAULT_SAVINGS: SavingsState = {
  title: "House deposit",
  target: 50000,
  targetYear: 2029,
  saved: 18240,
  flash: 0,
};

const GOAL_PRESETS: Record<string, Partial<SavingsState>> = {
  "Retire at 55": { title: "Retirement", target: 750000, targetYear: 2049, saved: 82000 },
  "Buy a house in 5y": { title: "House deposit", target: 50000, targetYear: 2031, saved: 18240 },
  "Beat the S&P 500": { title: "Alpha fund", target: 100000, targetYear: 2030, saved: 24500 },
  "Steady dividend income": { title: "Income stream", target: 200000, targetYear: 2035, saved: 46800 },
};

function HomePage() {
  const [track, setTrack] = useState<Track>(null);
  const [savings, setSavings] = useState<SavingsState>(DEFAULT_SAVINGS);
  const [showWelcome, setShowWelcome] = useState(false);

  const updateSavings = (patch: Partial<SavingsState>) =>
    setSavings((s) => ({ ...s, ...patch, flash: s.flash + 1 }));

  return (
    <div className="relative -mt-4 flex min-h-[calc(100dvh-8rem)] flex-col lg:-mt-4 lg:h-[calc(100dvh-4.5rem)] lg:min-h-0">
      <AiMeshBackground className="rounded-3xl" />

      <div className="relative z-10 flex flex-1 flex-col gap-4 pb-4 pt-2 lg:grid lg:grid-cols-3 lg:gap-6 lg:pb-0">
        <section className="flex min-h-0 flex-col lg:col-span-2">
          {track === null ? (
            <Landing onPick={setTrack} />
          ) : (
            <Track
              track={track}
              onBack={() => setTrack(null)}
              updateSavings={updateSavings}
              onFinish={() => setShowWelcome(true)}
            />
          )}
        </section>

        <aside className="flex flex-col gap-3 lg:gap-4">
          <TopPerformerCard track={track} />
          <SavingsCard savings={savings} />
        </aside>
      </div>

      {showWelcome && <WelcomeInterstitial onClose={() => setShowWelcome(false)} />}
    </div>
  );
}

/* ------------------------------ LANDING ------------------------------ */

function Landing({ onPick }: { onPick: (t: Exclude<Track, null>) => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground backdrop-blur-sm">
          <Sparkles className="size-3" /> AI copilot for investors
        </span>
        <h1 className="font-display mt-3 text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-[44px]">
          Investing, <span className="text-primary">explained</span>
          <br className="hidden sm:block" /> by AI.
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
          Not sure where to start? Tell us where you are and we'll take it from there — no jargon, no dashboards to figure out.
        </p>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> Get started <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <StartTile icon={Compass} title="I'm new to investing" desc="2 quick questions and we'll show you a starter portfolio." onClick={() => onPick("new")} />
          <StartTile icon={Link2} title="I already invest" desc="Connect your bank & broker — we'll do the analysis." onClick={() => onPick("connect")} />
          <StartTile icon={Wand2} title="Build with AI" desc="Describe a goal, get a tailored portfolio in seconds." featured onClick={() => onPick("build")} />
        </div>
      </div>

      <HomeAiDock />
    </div>
  );
}

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
        "group relative flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-glow",
        featured
          ? "border-primary/40 bg-gradient-to-br from-primary-soft/90 via-card/90 to-card/70"
          : "border-border/70 bg-card/80 hover:border-primary/40",
      )}
    >
      <span className={cn("grid size-9 place-items-center rounded-xl", featured ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-foreground")}>
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold leading-tight">{title}</div>
        <div className="mt-1 text-xs leading-snug text-muted-foreground">{desc}</div>
      </div>
      {featured && (
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">AI</span>
      )}
      <ArrowRight className="mt-1 size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  );
}

/* ------------------------------ TRACKS ------------------------------ */

function Track({
  track,
  onBack,
  updateSavings,
  onFinish,
}: {
  track: Exclude<Track, null>;
  onBack: () => void;
  updateSavings: (p: Partial<SavingsState>) => void;
  onFinish: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <button onClick={onBack} className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Back
      </button>
      <div className="flex-1 rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft backdrop-blur-md">
        {track === "new" && <NewInvestorTrack onFinish={onFinish} />}
        {track === "connect" && <ConnectTrack onFinish={onFinish} />}
        {track === "build" && <BuildTrack updateSavings={updateSavings} onFinish={onFinish} />}
      </div>
      <HomeAiDock />
    </div>
  );
}

function NewInvestorTrack({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Compass className="size-3.5" /> New here · step {Math.min(step + 1, 3)} of 3
      </div>
      {step === 0 && (
        <QuizStep
          title="When would you like to use this money?"
          hint="No wrong answer — this just shapes the risk level."
          options={["< 2 years", "3–5 years", "5–10 years", "10+ years"]}
          value={timeline}
          onSelect={(v) => {
            setTimeline(v);
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <QuizStep
          title="If your portfolio dropped 20% in a month, you'd…"
          hint="Be honest — this only trains the AI, not the market."
          options={["Sell everything", "Sell some", "Hold and wait", "Buy more"]}
          value={risk}
          onSelect={(v) => {
            setRisk(v);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-accent-foreground">
              <Check className="size-3" /> Match found
            </div>
            <h3 className="font-display text-xl font-bold">A balanced starter portfolio</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on <b>{timeline}</b> horizon and <b>{risk}</b> reaction, we'd start you with a 60/30/10 mix of index ETFs, quality dividend stocks, and a small growth sleeve.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <MiniStat label="Est. return" value="7–9%" />
              <MiniStat label="Volatility" value="Low" />
              <MiniStat label="Holdings" value="12" />
            </div>

            {/* Benchmark comparison */}
            <div className="mt-3 rounded-2xl border border-border/70 bg-background/60 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold">5-year projection vs benchmarks</div>
                <div className="flex items-center gap-2.5 text-[10px] font-medium">
                  <LegendDot className="bg-primary" label="AI portfolio" />
                  <LegendDot className="bg-muted-foreground/60" label="S&P 500" />
                  <LegendDot className="bg-muted-foreground/30" label="NASDAQ" />
                </div>
              </div>
              <BenchmarkChart />
              <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>2025</span>
                <span className="font-semibold text-success">+18% vs S&P 500</span>
                <span>2030</span>
              </div>
            </div>
          </div>
          <button
            onClick={onFinish}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            <Sparkles className="size-4" /> See it in the AI copilot
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
  // three projected growth curves, index 100
  const ai = [100, 108, 118, 131, 146, 164];
  const sp = [100, 106, 112, 119, 128, 138];
  const nq = [100, 107, 114, 121, 130, 141];
  const all = [...ai, ...sp, ...nq];
  const max = Math.max(...all);
  const min = Math.min(...all);
  const toPath = (arr: number[]) =>
    arr
      .map((v, i) => {
        const x = (i / (arr.length - 1)) * 100;
        const y = 32 - ((v - min) / (max - min)) * 30;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  return (
    <svg viewBox="0 0 100 32" className="mt-2 h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ai-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${toPath(ai)} L100,32 L0,32 Z`} fill="url(#ai-fill)" />
      <path d={toPath(nq)} fill="none" stroke="currentColor" className="text-muted-foreground/40" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d={toPath(sp)} fill="none" stroke="currentColor" className="text-muted-foreground/70" strokeWidth="1.4" strokeDasharray="3 2" />
      <path d={toPath(ai)} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuizStep({
  title,
  hint,
  options,
  value,
  onSelect,
}: {
  title: string;
  hint: string;
  options: string[];
  value: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <h3 className="font-display text-lg font-bold leading-snug sm:text-xl">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onSelect(o)}
            className={cn(
              "rounded-xl border px-3 py-3 text-sm font-medium transition",
              value === o ? "border-primary bg-primary-soft text-accent-foreground" : "border-border bg-card hover:border-primary/40",
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
  "Cross-checking against benchmarks…",
  "Optimization complete!",
];

function ConnectTrack({ onFinish }: { onFinish: () => void }) {
  const [bank, setBank] = useState(false);
  const [broker, setBroker] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const done = bank && broker;

  useEffect(() => {
    if (!scanning) return;
    const t = setInterval(() => {
      setPhraseIdx((i) => {
        if (i >= SCAN_PHRASES.length - 1) {
          clearInterval(t);
          setTimeout(() => {
            setScanning(false);
            onFinish();
          }, 600);
          return i;
        }
        return i + 1;
      });
    }, 450);
    return () => clearInterval(t);
  }, [scanning, onFinish]);

  if (scanning) return <ScanningState phrase={SCAN_PHRASES[phraseIdx]} step={phraseIdx} total={SCAN_PHRASES.length} />;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Link2 className="size-3.5" /> Connect your accounts
      </div>
      <h3 className="font-display text-xl font-bold">Bring your money in — read-only.</h3>
      <p className="mt-1 text-sm text-muted-foreground">We only read your balances and positions. Nothing moves unless you say so.</p>
      <div className="mt-4 flex flex-col gap-2.5">
        <ConnectRow icon={Landmark} label="Bank or credit card" connected={bank} onClick={() => setBank((v) => !v)} />
        <ConnectRow icon={Briefcase} label="Brokerage account" connected={broker} onClick={() => setBroker((v) => !v)} />
      </div>
      <div className="mt-auto pt-4">
        <button
          disabled={!done}
          onClick={() => {
            setPhraseIdx(0);
            setScanning(true);
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-40"
        >
          <Sparkles className="size-4" /> Analyze my holdings with AI
        </button>
      </div>
    </div>
  );
}

function ScanningState({ phrase, step, total }: { phrase: string; step: number; total: number }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Loader2 className="size-3.5 animate-spin" /> AI scanning your portfolio
      </div>
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-soft/40 via-card to-card p-5">
        {/* scan bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-[scan_2.4s_ease-in-out_infinite] bg-gradient-to-b from-primary/25 via-primary/5 to-transparent" />
        <div className="relative">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Step {step + 1} of {total}</div>
          <div key={phrase} className="mt-1 animate-fade-in font-display text-xl font-bold text-foreground">{phrase}</div>

          <div className="mt-5 space-y-2">
            {["AAPL · 42 shares", "NVDA · 18 shares", "VTI · 65 shares", "MSFT · 12 shares"].map((t, i) => (
              <div key={t} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 px-3 py-2">
                <div className="num text-xs font-semibold">{t}</div>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min(100, pct + i * 4)}%` }}
                  />
                </div>
                {pct > 80 + i && <Check className="size-3.5 text-success" />}
              </div>
            ))}
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
      <style>{`@keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(1200%); } }`}</style>
    </div>
  );
}

function ConnectRow({
  icon: Icon,
  label,
  connected,
  onClick,
}: {
  icon: typeof Landmark;
  label: string;
  connected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
        connected ? "border-primary/50 bg-primary-soft/60" : "border-border bg-card hover:border-primary/40",
      )}
    >
      <span className={cn("grid size-10 place-items-center rounded-xl", connected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        <Icon className="size-5" />
      </span>
      <div className="flex-1 text-sm font-semibold">{label}</div>
      {connected ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
          <Check className="size-3" /> Connected
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          Connect <ArrowRight className="size-3.5" />
        </span>
      )}
    </button>
  );
}

function BuildTrack({
  updateSavings,
  onFinish,
}: {
  updateSavings: (p: Partial<SavingsState>) => void;
  onFinish: () => void;
}) {
  const [goal, setGoal] = useState("");
  const applyPreset = (s: string) => {
    setGoal(s);
    const preset = GOAL_PRESETS[s];
    if (preset) updateSavings(preset);
  };
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Wand2 className="size-3.5" /> Build with AI
      </div>
      <h3 className="font-display text-xl font-bold">Describe your goal in one sentence.</h3>
      <p className="mt-1 text-sm text-muted-foreground">Example: "I want to save $50k in 5 years for a house deposit."</p>
      <div className="mt-4 rounded-2xl border border-border bg-card p-3 shadow-soft focus-within:border-primary/50">
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
          placeholder="Type your goal…"
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {Object.keys(GOAL_PRESETS).map((s) => (
          <button
            key={s}
            onClick={() => applyPreset(s)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              goal === s
                ? "border-primary bg-primary-soft text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">
        <Sparkles className="mr-1 inline size-2.5 text-primary" />
        Watch the Savings widget on the right update as you pick a goal.
      </p>
      <div className="mt-auto pt-4">
        <button
          disabled={!goal.trim()}
          onClick={onFinish}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-40"
        >
          <Sparkles className="size-4" /> Generate my portfolio
        </button>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="num mt-0.5 text-sm font-bold">{value}</div>
    </div>
  );
}

/* ------------------------------ AI DOCK ------------------------------ */

function HomeAiDock() {
  const [text, setText] = useState("");
  const chips = useMemo(
    () => ["Explain ETFs like I'm 12", "What's a safe first portfolio?", "Is investing risky right now?", "Show me an AI portfolio"],
    [],
  );

  return (
    <div className="mt-4">
      <div className="rounded-2xl border border-border/70 bg-card/85 p-3 shadow-glow backdrop-blur-md">
        <div className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40">
          <Sparkles className="size-4 shrink-0 text-primary" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask the AI anything about investing…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button disabled={!text.trim()} aria-label="Send" className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40">
            <Send className="size-4" />
          </button>
        </div>
        <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setText(c)}
              className="shrink-0 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ RIGHT RAIL ------------------------------ */

function TopPerformerCard({ track }: { track: Track }) {
  const label = track === "new" ? "Matched to you" : track === "connect" ? "Matches your holdings" : track === "build" ? "Fits your goal" : "Top performer";
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/85 p-4 shadow-soft backdrop-blur-md transition">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-warning">
          <Star className="size-3 fill-warning" /> {label}
        </span>
        <span className="text-[10px] font-medium text-muted-foreground">This month</span>
      </div>
      <div className="mt-3">
        <div className="font-display text-lg font-bold leading-tight">AI Growth Blend</div>
        <div className="text-xs text-muted-foreground">by investwhat AI · 14 holdings</div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-[11px] font-medium text-muted-foreground">Return</div>
          <div className="num text-2xl font-bold text-success">+24.8%</div>
        </div>
        <Sparkline positive />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
        <TinyStat label="1D" value="+1.2%" pos />
        <TinyStat label="1M" value="+8.4%" pos />
        <TinyStat label="YTD" value="+24.8%" pos />
      </div>
      <button className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary-soft/60 px-3 py-2 text-xs font-semibold text-accent-foreground transition hover:bg-primary-soft">
        View portfolio <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

function SavingsCard({ savings }: { savings: SavingsState }) {
  const [flashing, setFlashing] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setFlashing(true);
    const t = setTimeout(() => setFlashing(false), 900);
    return () => clearTimeout(t);
  }, [savings.flash]);

  const pct = Math.min(100, Math.round((savings.saved / savings.target) * 100));
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border p-4 shadow-soft backdrop-blur-md transition-all duration-500",
        "bg-gradient-to-br from-primary-soft/70 via-card/90 to-card/80",
        flashing ? "border-primary ring-2 ring-primary/50 shadow-glow" : "border-border/70",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
          <PiggyBank className="size-3" /> Savings goal
        </span>
        <button aria-label="Add" className="grid size-7 place-items-center rounded-lg bg-card/80 text-muted-foreground hover:text-foreground">
          <Plus className="size-4" />
        </button>
      </div>
      <div className="mt-3">
        <div key={savings.title} className="font-display animate-fade-in text-lg font-bold leading-tight">{savings.title}</div>
        <div className="text-xs text-muted-foreground">Target · {fmt(savings.target)} by {savings.targetYear}</div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div key={savings.saved} className="num animate-fade-in text-2xl font-bold">{fmt(savings.saved)}</div>
        <div className="text-xs font-semibold text-success">{pct}% there</div>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/60">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-card/80 p-2.5">
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <p className="text-[11px] leading-snug text-muted-foreground">
          AI tip: bump monthly saving to <b className="text-foreground">${Math.round((savings.target - savings.saved) / 60).toLocaleString()}</b> and you hit target 7 months early.
        </p>
      </div>
    </div>
  );
}

function TinyStat({ label, value, pos }: { label: string; value: string; pos?: boolean }) {
  return (
    <div className="rounded-lg bg-background/60 px-1.5 py-1.5">
      <div className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={cn("num text-[11px] font-bold", pos ? "text-success" : "text-destructive")}>{value}</div>
    </div>
  );
}

function Sparkline({ positive }: { positive?: boolean }) {
  const stroke = positive ? "var(--color-success)" : "var(--color-destructive)";
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-24" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,24 L12,22 L22,18 L34,20 L46,14 L58,16 L70,10 L82,8 L100,4" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0,24 L12,22 L22,18 L34,20 L46,14 L58,16 L70,10 L82,8 L100,4 L100,32 L0,32 Z" fill="url(#sg)" />
    </svg>
  );
}

/* ------------------------------ WELCOME INTERSTITIAL ------------------------------ */

function WelcomeInterstitial({ onClose }: { onClose: () => void }) {
  const steps = [
    { title: "Copilot", desc: "Ask anything, anywhere — always one click away.", icon: Sparkles },
    { title: "Portfolios", desc: "Your holdings + AI-curated ideas, side by side.", icon: Briefcase },
    { title: "Markets & News", desc: "The signals that matter, filtered by your goals.", icon: TrendingUp },
  ];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 shadow-glow">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="size-4" />
        </button>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
          <Rocket className="size-3" /> Welcome
        </div>
        <h2 className="font-display mt-3 text-2xl font-bold leading-tight">Welcome to your Command Center</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here's what lives behind the scenes — you can pull any of it up by just asking the AI.</p>
        <div className="mt-4 grid gap-2.5">
          {steps.map((s) => (
            <div key={s.title} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/60 p-3">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                <s.icon className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95">
          Enter my command center <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

// keep imports used
void TrendingUp;
