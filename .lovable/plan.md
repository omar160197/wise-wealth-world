
## Goal

Rebuild the InvestWhat app as a **mobile-first** experience that keeps the spirit of Sarah's mockup (clean, calm, generous spacing, AI-forward) while applying the CEO's structural feedback. Desktop will be a graceful scaled-up version, but all design decisions start at mobile width.

## Information architecture

**Bottom tab bar (5 icons, always visible on mobile):**
1. **Home** — dashboard: greeting, daily P/L highlight, market snapshot, "Investing style check-up", quick AI prompt entry, highlights/reports feed
2. **Bank** (Personal Finance) — connect bank/credit cards via open banking or upload statements; cashflow + spending highlights (mock)
3. **Portfolio** — real holdings (broker connect / statement upload); allocation, performance, AI rebalancing suggestions, alerts
4. **Invest** — browse portfolios, stocks, funds; fact sheets and in-house AI analytics; "Build with AI" entry
5. **Fantasy** — user-created custom portfolios, forward-testing results, fantasy leaderboard

**Top bar (mobile):**
- Hamburger (left) → drawer with: Markets, Screeners, Top movers, News, Blog, Notifications, Profile, Settings, Dark mode, Sign out
- Logo (center) + Search/Bell (right)

**Floating AI copilot button:**
- Fixed bottom-right above the tab bar on every page
- Opens a bottom sheet chat that receives the current page as context (e.g. "Portfolio: Retirement Fund"); pre-filled context chip + suggested prompts that vary per page

**Desktop (≥lg):**
- Collapses bottom tabs into a left sidebar (same 5 items + hamburger items grouped under "More")
- Three-column home like the reference: nav | content | markets/portfolio rail

## Home screen (matches reference, enhanced)

- Greeting strip: "Welcome back, Alex — you're up $1,550 today"
- 4 action cards (2×2 on mobile): Browse portfolios, Try a fantasy portfolio, Build your own, **Build with AI** (highlighted/primary, glowing accent — the CEO-emphasized prompt)
- "Your personal AI investment assistant" input + sample prompt chips (horizontal scroll on mobile)
- "Investing style check-up" card (2-min quiz teaser)
- Markets snapshot strip (S&P, NASDAQ, DOW, VIX) — horizontal scroll on mobile, right rail on desktop
- "Your portfolios" preview list with performance pills
- Trending tickers chips

## Visual design enhancements (over the reference)

- **Mobile-first spacing**, large tap targets (min 44px), safe-area aware bottom tab bar
- Refined palette: soft off-white background, deep ink text, **emerald primary** (kept from reference), subtle mint accent surfaces, restrained red for negatives
- Typography: distinctive display font for numbers/headings (e.g. Geist or Space Grotesk) + clean sans body (Inter) — avoid generic look
- Card style: soft rounded-2xl, hair-line borders, layered subtle shadows (not flat)
- Number-forward design: big readable P/L figures, sparkline accents on portfolio cards
- Subtle motion: tab switch fade, AI button pulse on idle, card hover lift on desktop
- Full dark mode

## Technical plan

- Stack stays TanStack Start + Tailwind v4 + shadcn (already configured)
- New routes under `src/routes/`: `index.tsx` (Home, replace placeholder), `bank.tsx`, `portfolio.tsx`, `invest.tsx`, `fantasy.tsx`, plus hamburger pages: `markets.tsx`, `news.tsx`, `screeners.tsx`, `blog.tsx`, `profile.tsx`
- Layout in `__root.tsx` wraps `<Outlet />` with `<AppShell>` providing: top bar, hamburger Sheet, bottom tab bar, floating AI button + chat sheet
- Components: `BottomTabBar`, `TopBar`, `HamburgerMenu` (shadcn Sheet), `AiCopilotButton` + `AiChatSheet` (mock responses for now, wired so we can plug Lovable AI later), `MarketTicker`, `PortfolioCard`, `ActionCard`, `PromptChips`
- All data mocked in `src/lib/mock-data.ts`
- Design tokens added to `src/styles.css` (semantic colors, new font tokens, shadow + gradient tokens); fonts loaded via `<link>` in `__root.tsx` head
- No backend / Lovable Cloud needed for this pass

## Out of scope (this iteration)

- Real broker / open-banking integrations (placeholders + "Connect" CTAs only)
- Real AI calls (mocked responses; structure ready for Lovable AI Gateway later)
- Auth (Alex Morgan shown as static mock profile)

## Open question

Are you happy for me to use **mocked AI responses + mock financial data** for now, with the structure ready to wire real Lovable AI + broker integrations in a later pass? If you'd rather enable Lovable AI Gateway and Cloud in this pass, I'll add that to the plan.
