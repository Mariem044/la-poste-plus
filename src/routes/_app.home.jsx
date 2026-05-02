import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Clock, Smile, ArrowRight, BarChart3, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/_app/home")({
  head: () => ({
    meta: [{ title: "Accueil — Espace agent" }],
  }),
  component: HomePage,
});

function KPICard({ label, value, icon: Icon, accent }) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md ${
        accent
          ? "border-accent/30 bg-gradient-to-br from-accent/10 to-white"
          : "border-border bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            accent ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-3xl font-extrabold text-foreground">{value}</p>
    </div>
  );
}

const RECENT = [
  { id: 1, title: "Enquête satisfaction Colis", date: "29 avril 2026", status: "Complétée" },
  { id: 2, title: "Enquête services financiers", date: "27 avril 2026", status: "En attente" },
  { id: 3, title: "Enquête courrier express", date: "25 avril 2026", status: "Complétée" },
];

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-hover p-8 text-primary-foreground shadow-lg">
        <p className="text-sm font-medium opacity-80 capitalize">{today}</p>
        <h2 className="mt-2 text-3xl font-extrabold">
          Bienvenue, {user?.firstName} 👋
        </h2>
        <p className="mt-2 max-w-xl text-sm opacity-90">
          Voici un aperçu de votre activité d'enquête et des indicateurs clés.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard label="Enquêtes complétées" value="142" icon={CheckCircle2} />
        <KPICard label="Enquêtes en attente" value="8" icon={Clock} />
        <KPICard label="Taux de satisfaction" value="94%" icon={Smile} accent />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="group flex items-center justify-between rounded-2xl border border-border bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Voir le Dashboard</div>
              <div className="text-xs text-muted-foreground">Analyses PowerBI</div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </button>
        <button
          onClick={() => navigate({ to: "/profile" })}
          className="group flex items-center justify-between rounded-2xl border border-border bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
              <User className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Mon Profil</div>
              <div className="text-xs text-muted-foreground">Informations personnelles</div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Activité récente</h3>
          <span className="text-xs font-medium text-muted-foreground">3 dernières enquêtes</span>
        </div>
        <ul className="divide-y divide-border">
          {RECENT.map((r) => (
            <li key={r.id} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-semibold text-foreground">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  r.status === "Complétée"
                    ? "bg-success/10 text-success"
                    : "bg-accent/15 text-accent-foreground"
                }`}
              >
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}