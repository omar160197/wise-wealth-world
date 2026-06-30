import { createFileRoute } from "@tanstack/react-router";
import { user } from "@/lib/mock-data";
import { Bell, Moon, Shield, LogOut, ChevronRight } from "lucide-react";

const rows = [
  { icon: Bell, label: "Notifications" },
  { icon: Moon, label: "Appearance" },
  { icon: Shield, label: "Privacy & security" },
  { icon: LogOut, label: "Sign out", danger: true },
];

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · investwhat" }, { name: "description", content: "Manage your account." }] }),
  component: () => (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
          {user.initials}
        </span>
        <div className="min-w-0">
          <h1 className="font-display truncate text-xl font-bold">{user.name}</h1>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
      </header>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {rows.map((r, i) => (
          <button
            key={r.label}
            className={`flex w-full items-center gap-3 px-4 py-3.5 text-sm font-medium hover:bg-muted ${i > 0 ? "border-t border-border" : ""} ${r.danger ? "text-destructive" : ""}`}
          >
            <r.icon className="size-5 text-muted-foreground" />
            <span className="flex-1 text-left">{r.label}</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  ),
});
