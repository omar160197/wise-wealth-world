import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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
  ChevronDown,
  ChevronUp,
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

function HomePage() {
  const [track, setTrack] = useState<Track>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  return (
    <div className="relative flex flex-col gap-8 pb-10">
      {/* Hero */}
      <HeroSection onPick={setTrack} />

      {/* Track panel — only shown once a track is selected */}
      {track !== null && (
        <TrackPanel track={track} onBack={() => setTrack(null)} onFinish={() => setShowWelcome(true)} />
      )}

      {/* How it works */}
      <HowItWorksSection />

      {/* What you get */}
      <FeaturesSection />

      {/* Education teaser */}
      <LearnSection />

      {/* Trust bar */}
      <TrustBar />

      {/* AI Ask bar */}
      <HomeAiDock />

      {showWelcome && <WelcomeInterstitial onClose={() => setShowWelcome(false)} />}
    </div>
  );
}

/* ─────────────────────── HERO ─────────────────────── */

function HeroSection({ onPick }: { onPick: (t: Exclude<Track, null>) => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 px-6 py-10 shadow-soft backdrop-blur-md sm:px-10 sm:py-14">
      <AiMeshBackground className="rounded-3xl" />
      <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12">
        {/* Copy */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground backdrop-blur-sm">
            <Sparkles className="size-3" /> AI copilot for investors
          </span>
          <h1 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[46px]">
            Your money, finally{" "}
            <span className="text-primary">working for you.</span>
          </h1>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
            Never invested before? Perfect starting point. Already investing? Connect your accounts and let AI find what you&apos;re missing. No jargon, no confusing dashboards.
          </p>

          {/* Social proof stat row */}
          <div className="mt-5 flex flex-wrap gap-4">
            <StatPill value="50,000+" label="people growing wealth" />
            <StatPill value="$2.4B+" label="portfolios analyzed" />
            <StatPill value="AI-first" label="built for beginners" />
          </div>
        </div>

        {/* CTA tiles */}
        <div className="w-full lg:w-[340px] xl:w-[380px]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Where do you want to start?
          </p>
          <div className="flex flex-col gap-2.5">
            <StartTile
              icon={Compass}
              title="I'm brand new to investing"
              desc="Answer 2 quick questions and see a starter portfolio built just for you."
              onClick={() => onPick("new")}
            />
            <StartTile
              icon={Link2}
              title="I already have accounts"
              desc="Connect your bank or broker — we'll analyze everything, read-only."
              onClick={() => onPick("connect")}
            />
            <StartTile
              icon={Wand2}
              title="Build with AI"
              desc="Tell the AI your goal in one sentence. Get a tailored portfolio in seconds."
              featured
              onClick={() => onPick("build")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="num text-base font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
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
        "group relative flex items-center gap-3 rounded-2xl border p-3.5 text-left transition hover:-translate-y-0.5 hover:shadow-glow",
        featured
          ? "border-primary/40 bg-gradient-to-r from-primary-soft/90 to-card/70 shadow-glow"
          : "border-border/70 bg-background/60 hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl",
          featured ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-foreground",
        )}
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold leading-tight">{title}</div>
        <div className="mt-0.5 text-xs leading-snug text-muted-foreground">{desc}</div>
      </div>
      {featured && (
        <span className="absolute right-3 top-2.5 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
          AI
        </span>
      )}
      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  );
}

/* ─────────────────────── TRACK PANEL ─────────────────────── */

function TrackPanel({
  track,
  onBack,
  onFinish,
}: {
  track: Exclude<Track, null>;
  onBack: () => void;
  onFinish: () => void;
}) {
  return (
    <section className="rounded-3xl border border-border/70 bg-card/90 p-6 shadow-soft backdrop-blur-md">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back to overview
      </button>

      {track === "new" && <NewInvestorTrack onFinish={onFinish} />}
      {track === "connect" && <ConnectTrack onFinish={onFinish} />}
      {track === "build" && <BuildTrack onFinish={onFinish} />}
    </section>
  );
}

/* New Investor Track */
function NewInvestorTrack({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Compass className="size-3.5" /> New here · step {Math.min(step + 1, 3)} of 3
      </div>

      {step === 0 && (
        <QuizStep
          title="When would you like to use this money?"
          hint="No wrong answer — this just shapes the risk level for you."
          options={["Less than 2 years", "3–5 years", "5–10 years", "10+ years"]}
          value={timeline}
          onSelect={(v) => { setTimeline(v); setStep(1); }}
        />
      )}

      {step === 1 && (
        <QuizStep
          title="If your portfolio dropped 20% in a month, you'd…"
          hint="Be honest — this only trains the AI, not the market."
          options={["Sell everything", "Sell some", "Hold and wait", "Buy more"]}
          value={risk}
          onSelect={(v) => { setRisk(v); setStep(2); }}
        />
      )}

      {step === 2 && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-accent-foreground">
              <Check className="size-3" /> Your match is ready
            </div>
            <h3 className="font-display text-xl font-bold">A balanced starter portfolio</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Based on a <b className="text-foreground">{timeline}</b> horizon and your{" "}
              <b className="text-foreground">{risk?.toLowerCase()}</b> instinct, we&apos;d start you with a
              60/30/10 mix of index ETFs, quality dividend stocks, and a small growth sleeve.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <MiniStat label="Est. return" value="7–9%" />
              <MiniStat label="Volatility" value="Low" />
              <MiniStat label="Holdings" value="12" />
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
            <div className="mb-2 text-xs font-semibold">5-year projection vs benchmarks</div>
            <BenchmarkChart />
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              <span>2025</span>
              <span className="font-semibold text-success">+18% vs S&P 500</span>
              <span>2030</span>
            </div>
            <div className="mt-3 flex gap-3 text-[10px]">
              <LegendDot className="bg-primary" label="AI portfolio" />
              <LegendDot className="bg-muted-foreground/60" label="S&P 500" />
              <LegendDot className="bg-muted-foreground/30" label="NASDAQ" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <button
              onClick={onFinish}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              <Sparkles className="size-4" /> See it in the AI copilot
            </button>
          </div>
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
  const nq = [100, 107, 114, 121, 130, 141];
  const all = [...ai, ...sp, ...nq];
  const max = Math.max(...all);
  const min = Math.min(...all);
  const toPath = (arr: number[]) =>
    arr.map((v, i) => {
      const x = (i / (arr.length - 1)) * 100;
      const y = 32 - ((v - min) / (max - min)) * 30;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 100 32" className="h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
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

function QuizStep({ title, hint, options, value, onSelect }: {
  title: string; hint: string; options: string[]; value: string | null; onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold leading-snug sm:text-xl">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onSelect(o)}
            className={cn(
              "rounded-xl border px-3 py-3 text-sm font-medium transition",
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

/* Connect Track */
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

  if (scanning) return <ScanningState phrase={SCAN_PHRASES[phraseIdx]} step={phraseIdx} total={SCAN_PHRASES.length} />;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Link2 className="size-3.5" /> Connect your accounts
      </div>
      <h3 className="font-display text-xl font-bold">Bring your money in — read-only.</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        We only read your balances and positions. Nothing moves unless you say so.
      </p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <ConnectRow icon={Landmark} label="Bank or credit card" connected={bank} onClick={() => setBank((v) => !v)} />
        <ConnectRow icon={Briefcase} label="Brokerage account" connected={broker} onClick={() => setBroker((v) => !v)} />
      </div>
      <div className="mt-5">
        <button
          disabled={!done}
          onClick={() => { setPhraseIdx(0); setScanning(true); setTimeout(() => { setScanning(false); onFinish(); }, SCAN_PHRASES.length * 450 + 600); }}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-40"
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
    <div>
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Loader2 className="size-3.5 animate-spin" /> AI scanning your portfolio
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-soft/40 via-card to-card p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-[scan_2.4s_ease-in-out_infinite] bg-gradient-to-b from-primary/25 via-primary/5 to-transparent" />
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Step {step + 1} of {total}</div>
        <div key={phrase} className="mt-1 animate-fade-in font-display text-xl font-bold">{phrase}</div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <style>{`@keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(1200%); } }`}</style>
    </div>
  );
}

function ConnectRow({ icon: Icon, label, connected, onClick }: { icon: typeof Landmark; label: string; connected: boolean; onClick: () => void; }) {
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

/* Build Track */
const GOAL_PRESETS = [
  "Retire at 55",
  "Buy a house in 5 years",
  "Beat the S&P 500",
  "Steady dividend income",
];

function BuildTrack({ onFinish }: { onFinish: () => void }) {
  const [goal, setGoal] = useState("");
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Wand2 className="size-3.5" /> Build with AI
      </div>
      <h3 className="font-display text-xl font-bold">Describe your goal in one sentence.</h3>
      <p className="mt-1 text-sm text-muted-foreground">Example: &quot;I want to save $50k in 5 years for a house deposit.&quot;</p>
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
        {GOAL_PRESETS.map((s) => (
          <button
            key={s}
            onClick={() => setGoal(s)}
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
      <div className="mt-4">
        <button
          disabled={!goal.trim()}
          onClick={onFinish}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-40"
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

/* ─────────────────────── HOW IT WORKS ─────────────────────── */

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
    body: "Our AI reads your situation, goals, and risk comfort to craft a personalised portfolio strategy in seconds.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Track and grow",
    body: "Connect your existing accounts or start fresh. The AI monitors, explains, and suggests — you stay in control.",
  },
];

function HowItWorksSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="How it works"
        title="From zero to invested in minutes"
        subtitle="We turned a complicated process into three simple steps — no experience needed."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {HOW_STEPS.map((s) => (
          <div key={s.num} className="relative flex flex-col gap-3 rounded-3xl border border-border/70 bg-card/80 p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                <s.icon className="size-5" />
              </span>
              <span className="font-display text-4xl font-bold text-muted/40 select-none">{s.num}</span>
            </div>
            <div className="font-display text-base font-bold leading-snug">{s.title}</div>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── FEATURES ─────────────────────── */

const FEATURES = [
  {
    icon: Brain,
    title: "AI that explains, not just shows",
    body: "Ask any question — 'What is an ETF?', 'Is this stock risky?' — and get plain-English answers grounded in your actual data.",
    tag: "Core",
  },
  {
    icon: ShieldCheck,
    title: "Read-only, always secure",
    body: "We connect to your bank and broker in read-only mode. We never see your password and never move your money without you.",
    tag: "Security",
  },
  {
    icon: PiggyBank,
    title: "Goal-based saving",
    body: "Set a savings goal — house, retirement, travel fund — and the AI tells you exactly how much to put aside each month.",
    tag: "Planning",
  },
  {
    icon: TrendingUp,
    title: "Fantasy portfolio mode",
    body: "Test any investment idea risk-free with virtual money. Build confidence before committing a single dollar.",
    tag: "Learning",
  },
  {
    icon: Zap,
    title: "Real-time market intelligence",
    body: "Live prices, news sentiment, and AI-filtered signals — tuned to your portfolio so you only see what matters to you.",
    tag: "Markets",
  },
  {
    icon: BookOpen,
    title: "Bite-sized investing lessons",
    body: "Short, jargon-free articles written by the AI based on what you&apos;re actually looking at. Learn as you go.",
    tag: "Education",
  },
];

function FeaturesSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="What you get"
        title="Everything you need, nothing you don't"
        subtitle="A full investing toolkit that grows with you — whether you're just starting or scaling up."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-soft transition hover:border-primary/30 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="size-4.5" />
              </span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {f.tag}
              </span>
            </div>
            <div className="font-display text-sm font-bold leading-snug">{f.title}</div>
            <p className="text-xs leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── LEARN ─────────────────────── */

const LEARN_ITEMS = [
  {
    q: "What exactly is a stock?",
    a: "A stock is a tiny slice of ownership in a company. When the company grows and makes more profit, your slice becomes more valuable. When you buy 1 share of Apple, you literally own a small piece of Apple Inc.",
  },
  {
    q: "What's an ETF and why does everyone recommend them?",
    a: "An ETF (Exchange-Traded Fund) is a basket of stocks bundled together. Instead of picking one company and hoping it does well, you spread across hundreds. It's the investing world's version of 'don't put all your eggs in one basket.'",
  },
  {
    q: "Is investing the same as gambling?",
    a: "Not at all. Gambling is a zero-sum game where one person wins and another loses. Investing is ownership in real businesses that create products, employ people, and generate profit over time. The global stock market has grown every decade for over 100 years.",
  },
  {
    q: "How much money do I need to start?",
    a: "You can start with as little as $1 thanks to fractional shares. Most experts recommend starting small, staying consistent, and increasing over time rather than waiting until you have a large lump sum.",
  },
];

function LearnSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section>
      <SectionHeader
        eyebrow="Investing 101"
        title="Plain answers to questions you were afraid to ask"
        subtitle="No jargon. No judgment. Just clear explanations from your AI investing copilot."
      />
      <div className="mt-6 flex flex-col gap-2">
        {LEARN_ITEMS.map((item, i) => (
          <div
            key={i}
            className={cn(
              "rounded-2xl border transition",
              open === i ? "border-primary/40 bg-primary-soft/30" : "border-border/70 bg-card/80",
            )}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-sm font-semibold leading-snug">{item.q}</span>
              {open === i ? (
                <ChevronUp className="size-4 shrink-0 text-primary" />
              ) : (
                <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
              )}
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <BookOpen className="size-4 text-primary" />
        <span className="text-xs text-muted-foreground">More lessons in the</span>
        <a href="/blog" className="text-xs font-semibold text-primary hover:underline">Blog</a>
      </div>
    </section>
  );
}

/* ─────────────────────── TRUST BAR ─────────────────────── */

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: "Bank-level 256-bit encryption" },
  { icon: Check, text: "Read-only account connections" },
  { icon: Sparkles, text: "No ads, no selling your data" },
  { icon: TrendingUp, text: "Built by investors, for investors" },
];

function TrustBar() {
  return (
    <section className="rounded-2xl border border-border/60 bg-surface px-6 py-5">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Why people trust investwhat
      </p>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {TRUST_ITEMS.map((t) => (
          <div key={t.text} className="flex items-center gap-2">
            <t.icon className="size-4 shrink-0 text-primary" />
            <span className="text-xs font-medium text-foreground">{t.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── AI DOCK ─────────────────────── */

function HomeAiDock() {
  const [text, setText] = useState("");
  const chips = useMemo(
    () => ["Explain ETFs like I'm 12", "What's a safe first portfolio?", "Is investing risky right now?", "How do I start with $100?"],
    [],
  );

  return (
    <section className="rounded-2xl border border-border/70 bg-card/85 p-4 shadow-glow backdrop-blur-md">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <span className="text-xs font-semibold text-foreground">Ask the AI anything about investing</span>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-2 ring-1 ring-border focus-within:ring-primary/40">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. What is a dividend stock?"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          disabled={!text.trim()}
          aria-label="Send"
          className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </div>
      <div className="no-scrollbar mt-2.5 flex gap-1.5 overflow-x-auto">
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
    </section>
  );
}

/* ─────────────────────── SHARED ─────────────────────── */

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-1">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="font-display mt-1 text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
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
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 shadow-glow">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="size-4" />
        </button>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
          <Rocket className="size-3" /> Welcome aboard
        </div>
        <h2 className="font-display mt-3 text-2xl font-bold leading-tight">
          You&apos;re all set. Here&apos;s what&apos;s waiting for you.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Explore at your own pace — or just ask the AI and it will guide you.</p>
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
          Enter my dashboard <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

// keep imports used
void TrendingUp;
