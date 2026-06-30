import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Plus, Upload, TrendingDown, TrendingUp, CreditCard } from "lucide-react";
import { bankAccounts, spendingCategories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bank")({
  head: () => ({
    meta: [
      { title: "Bank · investwhat" },
      { name: "description", content: "Connect your bank and credit cards or upload statements to see your full financial picture." },
    ],
  }),
  component: BankPage,
});

function BankPage() {
  const netWorth = bankAccounts.reduce((s, a) => s + a.balance, 0);
  const totalSpend = spendingCategories.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Personal finance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          See your accounts, cashflow and spending in one place.
        </p>
      </header>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-card p-5 shadow-soft">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Net position</div>
        <div className="num mt-1 text-3xl font-bold">${netWorth.toLocaleString()}</div>
        <div className="num mt-1 text-xs font-semibold text-success">+2.4% this month</div>
        <div className="mt-4 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-foreground px-3 py-2.5 text-xs font-semibold text-background">
            <Plus className="size-4" /> Connect bank
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-semibold">
            <Upload className="size-4" /> Upload statement
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-display mb-3 text-base font-bold">Accounts</h2>
        <div className="space-y-2.5">
          {bankAccounts.map((a) => (
            <div key={a.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <span className="grid size-11 place-items-center rounded-xl bg-muted">
                {a.type === "Credit" ? <CreditCard className="size-5" /> : <Landmark className="size-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{a.name}</div>
                <div className="text-xs text-muted-foreground">{a.type} · ••{a.last4}</div>
              </div>
              <div className={cn("num text-right text-base font-bold", a.balance < 0 && "text-destructive")}>
                {a.balance < 0 ? "-" : ""}${Math.abs(a.balance).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display mb-3 text-base font-bold">This month's spending</h2>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-baseline justify-between">
            <div className="num text-2xl font-bold">${totalSpend.toLocaleString()}</div>
            <div className="num flex items-center gap-1 text-xs font-semibold text-destructive">
              <TrendingUp className="size-3" /> +8% vs last
            </div>
          </div>
          <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-muted">
            {spendingCategories.map((c) => (
              <div key={c.name} style={{ width: `${(c.amount / totalSpend) * 100}%`, backgroundColor: c.color }} />
            ))}
          </div>
          <ul className="mt-4 space-y-2.5">
            {spendingCategories.map((c) => (
              <li key={c.name} className="flex items-center gap-3 text-sm">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="flex-1">{c.name}</span>
                <span className="num font-semibold">${c.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-4 text-center text-xs text-muted-foreground">
        <TrendingDown className="mx-auto mb-2 size-4 text-primary" />
        AI insight: your dining spend is up 22% — want me to draft a budget tweak?
      </section>
    </div>
  );
}
