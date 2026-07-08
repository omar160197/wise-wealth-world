import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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

  return (
    <div className="relative -mt-4 flex min-h-[calc(100dvh-8rem)] flex-col lg:-mt-4 lg:h-[calc(100dvh-4.5rem)] lg:min-h-0">
      <AiMeshBackground className="rounded-3xl" />

      <div className="relative z-10 flex flex-1 flex-col gap-4 pb-4 pt-2 lg:grid lg:grid-cols-3 lg:gap-6 lg:pb-0">
        {/* LEFT — hero + guided flow */}
        <section className="flex min-h-0 flex-col lg:col-span-2">
          {track === null ? <Landing onPick={setTrack} /> : <Track track={track} onBack={() => setTrack(null)} />}
        </section>

        {/* RIGHT — Top performer + Savings */}
        <aside className="flex flex-col gap-3 lg:gap-4">
          <TopPerformerCard />
          <SavingsCard />
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------ LANDING ------------------------------ */

function Landing({ onPick }: { onPick: (t: Exclude<Track, null>) => void }) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
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

      {/* Get started tiles */}
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> Get started <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <StartTile
            icon={Compass}
            title="I'm new to investing"
            desc="2 quick questions and we'll show you a starter portfolio."
            onClick={() => onPick("new")}
          />
          <StartTile
            icon={Link2}
            title="I already invest"
            desc="Connect your bank & broker — we'll do the analysis."
            onClick={() => onPick("connect")}
          />
          <StartTile
            icon={Wand2}
            title="Build with AI"
            desc="Describe a goal, get a tailored portfolio in seconds."
            featured
            onClick={() => onPick("build")}
          />
        </div>
      </div>

      {/* AI dock */}
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
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl",
          featured ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-foreground",
        )}
      >
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold leading-tight">{title}</div>
        <div className="mt-1 text-xs leading-snug text-muted-foreground">{desc}</div>
      </div>
      {featured && (
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
          AI
        </span>
      )}
      <ArrowRight className="mt-1 size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  );
}

/* ------------------------------ TRACKS ------------------------------ */

function Track({ track, onBack }: { track: Exclude<Track, null>; onBack: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <button
        onClick={onBack}
        className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back
      </button>
      <div className="flex-1 rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft backdrop-blur-md">
        {track === "new" && <NewInvestorTrack />}
        {track === "connect" && <ConnectTrack />}
        {track === "build" && <BuildTrack />}
      </div>
      <HomeAiDock />
    </div>
  );
}

function NewInvestorTrack() {
  const [step, setStep] = useState(0);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Compass className="size-3.5" /> New here · step {step + 1} of 2
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
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95">
            <Sparkles className="size-4" /> See it in the AI copilot
          </button>
        </div>
      )}
    </div>
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

function ConnectTrack() {
  const [bank, setBank] = useState(false);
  const [broker, setBroker] = useState(false);
  const done = bank && broker;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Link2 className="size-3.5" /> Connect your accounts
      </div>
      <h3 className="font-display text-xl font-bold">Bring your money in — read-only.</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        We only read your balances and positions. Nothing moves unless you say so.
      </p>
      <div className="mt-4 flex flex-col gap-2.5">
        <ConnectRow icon={Landmark} label="Bank or credit card" connected={bank} onClick={() => setBank((v) => !v)} />
        <ConnectRow icon={Briefcase} label="Brokerage account" connected={broker} onClick={() => setBroker((v) => !v)} />
      </div>
      <div className="mt-auto pt-4">
        <button
          disabled={!done}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-40"
        >
          <Sparkles className="size-4" /> Analyze my holdings with AI
        </button>
      </div>
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
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl",
          connected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
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

function BuildTrack() {
  const [goal, setGoal] = useState("");
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Wand2 className="size-3.5" /> Build with AI
      </div>
      <h3 className="font-display text-xl font-bold">Describe your goal in one sentence.</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Example: "I want to save $50k in 5 years for a house deposit."
      </p>
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
        {["Retire at 55", "Buy a house in 5y", "Beat the S&P 500", "Steady dividend income"].map((s) => (
          <button
            key={s}
            onClick={() => setGoal(s)}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <button
          disabled={!goal.trim()}
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
    () => [
      "Explain ETFs like I'm 12",
      "What's a safe first portfolio?",
      "Is investing risky right now?",
      "Show me an AI portfolio",
    ],
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
          <button
            disabled={!text.trim()}
            aria-label="Send"
            className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
          >
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

function TopPerformerCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/85 p-4 shadow-soft backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-warning">
          <Star className="size-3 fill-warning" /> Top performer
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

function SavingsCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary-soft/70 via-card/90 to-card/80 p-4 shadow-soft backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
          <PiggyBank className="size-3" /> Savings goal
        </span>
        <button aria-label="Add" className="grid size-7 place-items-center rounded-lg bg-card/80 text-muted-foreground hover:text-foreground">
          <Plus className="size-4" />
        </button>
      </div>
      <div className="mt-3">
        <div className="font-display text-lg font-bold leading-tight">House deposit</div>
        <div className="text-xs text-muted-foreground">Target · $50,000 by 2029</div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div className="num text-2xl font-bold">$18,240</div>
        <div className="text-xs font-semibold text-success">36% there</div>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/60">
        <div className="h-full w-[36%] rounded-full bg-gradient-to-r from-primary to-primary/60" />
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-card/80 p-2.5">
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <p className="text-[11px] leading-snug text-muted-foreground">
          AI tip: bump monthly saving to <b className="text-foreground">$420</b> and you hit target 7 months early.
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

// Keep TrendingUp used to avoid tree-shake warnings if referenced elsewhere later.
void TrendingUp;
