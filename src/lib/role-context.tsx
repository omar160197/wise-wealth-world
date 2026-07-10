import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Role = "beginner" | "experienced";

interface RoleContextValue {
  role: Role;
  setRole: (r: Role) => void;
}

const RoleContext = createContext<RoleContextValue>({
  role: "beginner",
  setRole: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    if (typeof window === "undefined") return "beginner";
    return (localStorage.getItem("iw-role") as Role) ?? "beginner";
  });

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem("iw-role", r);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
