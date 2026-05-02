import { createContext, useContext, useState, type ReactNode } from "react";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  matricule: string;
  role: string;
  registeredAt: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEFAULT_USER: User = {
  firstName: "Amine",
  lastName: "Ben Salah",
  email: "amine.bensalah@laposte.tn",
  matricule: "LP-23847",
  role: "Agent Enquêteur",
  registeredAt: "2023-04-12",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);
  const updateUser = (patch: Partial<User>) =>
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { DEFAULT_USER };
