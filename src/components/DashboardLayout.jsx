import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SurveyFloatingButton } from "./SurveyFloatingButton";
import { useAuth } from "../context/AuthContext";

const TITLES = {
  "/home": "Accueil",
  "/dashboard": "Dashboard PowerBI",
  "/profile": "Mon Profil",
};

export function DashboardLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const title = TITLES[location.pathname] ?? "La Poste Tunisienne";

  return (
    <div className="min-h-screen bg-secondary/40">
      <Sidebar />
      <div className="ml-64 flex min-h-screen flex-col">
        <Header title={title} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      <SurveyFloatingButton />
    </div>
  );
}