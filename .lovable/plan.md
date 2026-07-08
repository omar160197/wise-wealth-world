
## Vision reset

Today's homepage is built for **existing** users — dense with dashboards, P/L, portfolios, tickers, trending. The new brief: the homepage is for a **brand-new guest** who has no context on investing, portfolios, or what this platform even does. Think "your younger brother opens the app cold."

Goals for the new homepage:
- Single viewport, **no vertical scroll** on desktop and mobile (content fits inside the shell, above the AI dock).
- Show the *power* of the platform in the first 3 seconds through motion + one clear question, not stats.
- Guide the user through a short **conversational discovery** ("Do you have accounts? Do you know what a portfolio is? Want us to build one with AI?").
- Compress the rest of the current homepage into other pages / the hamburger menu — nothing is deleted, just moved.

## New homepage layout (fits one screen)

```text
┌──────────────────────────────────────────────────────────────┐
│  AI mesh / particle animation background (subtle, always on) │
│                                                              │
│  ┌──────────── LEFT (2/3) ───────────┐  ┌── RIGHT (1/3) ──┐  │
│  │                                   │  │ Top performer   │  │
│  │  H1: "Investing, explained by AI" │  │  portfolio card │  │
│  │  Sub: one-line value prop         │  │  (mini spark)   │  │
│  │                                   │  ├─────────────────┤  │
│  │  GET STARTED — 3 tiles:           │  │ Savings card    │  │
│  │   • I'm new to investing          │  │ (progress + AI  │  │
│  │   • I have accounts, connect them │  │  suggestion)    │  │
│  │   • Build a portfolio with AI     │  │                 │  │
│  │                                   │  │                 │  │
│  │  AI chat dock (enhanced):         │  │                 │  │
│  │   Prompt input + smart chips that │  │                 │  │
│  │   adapt to whichever tile is hot  │  │                 │  │
│  └───────────────────────────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

Mobile: same three blocks stack — hero + get-started tiles, right rail collapses to a compact horizontal pair (Top performer / Savings) above the AI dock. Still no page scroll; the AI dock stays pinned.

## Guided discovery (the "conversation")

Clicking a Get Started tile does **not** navigate away — it swaps the left column into a small stepper inside the same viewport:

1. **"I'm new"** → 2-question mini quiz (timeline, comfort with risk) → CTA "See a starter AI portfolio" (opens AI chat pre-filled).
2. **"I have accounts"** → connect stubs (Bank / Brokerage) with mocked "Connected ✓" state → CTA "Analyze my holdings" (opens AI chat with context chip).
3. **"Build with AI"** → prompt-first entry: single big input "Describe your goal in one sentence" → opens AI chat with the goal as first message.

Between steps, tiny nudge copy: "Not sure? Ask the AI anything." — keeps the AI as the safety net.

## AI-forward animation

Add a lightweight canvas/CSS background: soft flowing gradient mesh + drifting nodes/edges (evokes a neural graph), tuned green/mint on light, deeper teal on dark. Runs at ~30fps, pauses on `prefers-reduced-motion`. No third-party heavy lib — small custom canvas component (~80 lines) so we don't bloat the bundle.

## What moves off the homepage

| Current homepage block | New home for it |
|---|---|
| Markets snapshot strip | Already lives on `/markets` (hamburger) — remove from home |
| "Your portfolios" list | `/portfolio` (already there) |
| Trending tickers | `/markets` |
| Investing style check-up card | Becomes the "I'm new" flow inside home |
| AI input + prompt chips | Stays, but redesigned as the persistent dock |
| Greeting + daily P/L | Removed for guests; will return later behind auth |

Nothing is deleted from `mock-data.ts`; the other pages already consume it.

## Files touched

- **New:** `src/components/home/AiMeshBackground.tsx` — canvas animation
- **New:** `src/components/home/GetStartedTiles.tsx` — 3 tiles + stepper state
- **New:** `src/components/home/TopPerformerCard.tsx`, `SavingsCard.tsx` — right-rail cards
- **New:** `src/components/home/HomeAiDock.tsx` — enhanced prompt input with context-aware chips
- **Rewrite:** `src/routes/index.tsx` — thin composition of the above, `h-[calc(100dvh-...)]` layout, `overflow-hidden`
- **Minor:** `src/lib/mock-data.ts` — add `topPerformer` + `savingsPreview` mock entries
- **Untouched:** `app-shell`, other routes, portfolio page, styles tokens (reuse existing emerald/mint)

## Out of scope for this pass

- Real auth / real broker connect (mocked "Connected ✓" only)
- Real AI calls (chat still uses the mock sheet you have)
- Redesigning the other tabs — you said homepage first

## Open question before I build

The "no scroll ever" constraint is strict on short laptops (e.g. 13" at 1280×720 with the top bar + bottom dock leaves ~500px of usable height). Two options:

- **A. Strict no-scroll:** shrink type/tile sizes so it always fits — safer but visually tighter.
- **B. Fits-on-standard:** designed to fit 1440×900 and typical phones without scrolling, allows minor scroll on unusually short screens.

I'd recommend **B** — same intent, but doesn't force cramped type on the majority. Want me to go with B, or hold to strict A?
