import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Home,
  Landmark,
  Briefcase,
  Zap,
  Sparkles,
  Menu,
  Search,
  Bell,
  TrendingUp,
  X,
  Send,
  Newspaper,
  Filter,
  BookOpen,
  User,
  Settings,
  Moon,
  LogOut,
  ChartCandlestick,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { user } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useRole, type Role } from "@/lib/role-context";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bank", label: "Bank", icon: Landmark },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/invest", label: "Invest", icon: Zap },
  { to: "/fantasy", label: "Fantasy", icon: Sparkles },
] as const;

const menuItems = [
  { to: "/markets", label: "Markets", icon: ChartCandlestick },
  { to: "/news", label: "News", icon: Newspaper },
  { to: "/screeners", label: "Screeners", icon: Filter },
  { to: "/blog", label: "Blog", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [aiOpen, setAiOpen] = useState(false);

  const pageLabel =
    tabs.find((t) => t.to === pathname)?.label ??
    menuItems.find((m) => m.to === pathname)?.label ??
    "InvestWhat";

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 pb-28 pt-4 lg:pb-10 lg:pl-72">
        {children}
      </main>
      <DesktopSidebar pathname={pathname} />
      <BottomTabs pathname={pathname} />
      <AiFloatingButton onClick={() => setAiOpen(true)} />
      <AiChatSheet open={aiOpen} onOpenChange={setAiOpen} context={pageLabel} />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 lg:pl-72">
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="grid size-10 shrink-0 place-items-center rounded-xl hover:bg-muted lg:hidden"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <HamburgerMenu />
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight">investwhat</span>
        </Link>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            aria-label="Search"
            className="grid size-10 place-items-center rounded-xl hover:bg-muted"
          >
            <Search className="size-5" />
          </button>
          <button
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-xl hover:bg-muted"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-destructive" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
      <TrendingUp className="size-4.5" strokeWidth={2.5} />
    </span>
  );
}

/* ── Role Toggle ── */
function RoleToggle({ compact = false }: { compact?: boolean }) {
  const { role, setRole } = useRole();
  const options: { value: Role; label: string; short: string }[] = [
    { value: "beginner", label: "I'm a Beginner", short: "Beginner" },
    { value: "experienced", label: "I'm Experienced", short: "Experienced" },
  ];

  return (
    <div
      className={cn(
        "flex rounded-xl border border-border/60 bg-muted/50 p-0.5",
        compact ? "gap-0" : "gap-0",
      )}
      role="group"
      aria-label="Select your experience level"
    >
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setRole(o.value)}
          aria-pressed={role === o.value}
          className={cn(
            "flex-1 rounded-[10px] px-2.5 py-1.5 text-[11px] font-semibold transition-all",
            role === o.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {compact ? o.short : o.label}
        </button>
      ))}
    </div>
  );
}

function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border/60 bg-surface px-4 py-5 lg:flex">
      <Link to="/" className="mb-6 flex items-center gap-2 px-2">
        <Logo />
        <span className="font-display text-xl font-bold tracking-tight">investwhat</span>
      </Link>

      {/* Role toggle */}
      <div className="mb-4 px-0">
        <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Your experience
        </p>
        <RoleToggle />
      </div>

      <nav className="flex flex-col gap-1">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary-soft text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <t.icon className="size-5" />
              {t.label}
            </Link>
          );
        })}
        <div className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          More
        </div>
        {menuItems.map((m) => {
          const active = pathname === m.to;
          return (
            <Link
              key={m.to}
              to={m.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary-soft text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <m.icon className="size-5" />
              {m.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex items-center gap-3 rounded-xl border border-border/60 p-3">
        <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {user.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{user.name}</div>
          <div className="truncate text-xs text-muted-foreground">{user.email}</div>
        </div>
      </div>
    </aside>
  );
}

function BottomTabs({ pathname }: { pathname: string }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-xl transition",
                    active && "bg-primary-soft",
                  )}
                >
                  <t.icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HamburgerMenu() {
  return (
    <div className="flex h-full flex-col">
      <SheetHeader className="border-b border-border/60 p-5">
        <SheetTitle className="flex items-center gap-2 text-left">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight">investwhat</span>
        </SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto p-3">
        {/* Role toggle in hamburger */}
        <div className="px-2 pb-3 pt-3">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Your experience
          </p>
          <RoleToggle />
        </div>
        <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Discover
        </div>
        <nav className="flex flex-col">
          {menuItems.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              <m.icon className="size-5 text-muted-foreground" />
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 px-2 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Settings
        </div>
        <nav className="flex flex-col">
          <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted">
            <Moon className="size-5 text-muted-foreground" /> Dark mode
          </button>
          <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted">
            <Settings className="size-5 text-muted-foreground" /> Preferences
          </button>
          <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-destructive hover:bg-muted">
            <LogOut className="size-5" /> Sign out
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-3 border-t border-border/60 p-4">
        <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {user.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{user.name}</div>
          <div className="truncate text-xs text-muted-foreground">{user.email}</div>
        </div>
      </div>
    </div>
  );
}

function AiFloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open AI copilot"
      className="fixed bottom-20 right-4 z-40 grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow transition hover:scale-105 active:scale-95 lg:bottom-6 lg:right-6"
    >
      <Sparkles className="size-6" />
      <span className="absolute -right-1 -top-1 size-3 animate-ping rounded-full bg-primary/60" />
    </button>
  );
}

function AiChatSheet({
  open,
  onOpenChange,
  context,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  context: string;
}) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    {
      role: "assistant",
      text: `Hi Alex — I can see you're on the ${context} page. Ask me anything about what you're looking at.`,
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      {
        role: "assistant",
        text: `Here's a quick take based on your ${context} view: this is a mock response — once we wire Lovable AI it'll stream a real answer grounded in your live data.`,
      },
    ]);
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm lg:items-center">
      <div className="flex h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-border bg-background shadow-glow lg:h-[640px] lg:rounded-3xl">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft">
              <Sparkles className="size-5 text-primary" />
            </span>
            <div>
              <div className="font-display text-sm font-bold">AI Copilot</div>
              <div className="text-xs text-muted-foreground">Context · {context}</div>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-xl hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground"
                  : "text-foreground",
              )}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="border-t border-border/60 p-3">
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface px-3 py-2 focus-within:border-primary/50">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder={`Ask about ${context.toLowerCase()}...`}
              className="flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={send}
              aria-label="Send"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
