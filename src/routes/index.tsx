import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Logo } from "../components/Logo";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Accueil — La Poste Tunisienne" },
      { name: "description", content: "Plateforme d'enquête de satisfaction de La Poste Tunisienne." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Logo />
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Plateforme officielle des agents
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Bienvenue à notre{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">plateforme d'enquête</span>
              <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-accent/40" />
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Participez à nos enquêtes de satisfaction et aidez-nous à améliorer nos services.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate({ to: "/login" })}
              className="w-full rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary-hover hover:shadow-lg sm:w-auto"
            >
              Connexion
            </button>
            <button
              onClick={() => navigate({ to: "/register" })}
              className="w-full rounded-lg border-2 border-primary bg-white px-8 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground sm:w-auto"
            >
              Inscription
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-5 text-center text-xs text-muted-foreground">
        © 2025 La Poste Tunisienne. Tous droits réservés. ·{" "}
        <Link to="/login" className="text-primary hover:underline">
          Espace agent
        </Link>
      </footer>
    </div>
  );
}
