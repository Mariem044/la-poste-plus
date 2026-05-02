import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, IdCard, Mail, Lock } from "lucide-react";
import { Logo } from "../components/Logo";
import { useAuth, DEFAULT_USER } from "../context/AuthContext";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Créer un compte — La Poste Tunisienne" },
      { name: "description", content: "Créez votre compte agent La Poste Tunisienne." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !matricule || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    const [firstName, ...rest] = fullName.trim().split(" ");
    login({
      ...DEFAULT_USER,
      firstName: firstName || "Agent",
      lastName: rest.join(" ") || "",
      email,
      matricule,
      registeredAt: new Date().toISOString().slice(0, 10),
    });
    navigate({ to: "/home" });
  };

  const Field = ({ label, icon: Icon, type = "text", value, onChange, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary via-white to-secondary px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-border bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground">Créer un compte</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Rejoignez la plateforme des agents.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field
              label="Nom complet"
              icon={User}
              value={fullName}
              onChange={setFullName}
              placeholder="Amine Ben Salah"
            />
            <Field
              label="Matricule"
              icon={IdCard}
              value={matricule}
              onChange={setMatricule}
              placeholder="LP-12345"
            />
            <Field
              label="Email professionnel"
              icon={Mail}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="agent@laposte.tn"
            />
            <Field
              label="Mot de passe"
              icon={Lock}
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />
            <Field
              label="Confirmer mot de passe"
              icon={Lock}
              type="password"
              value={confirm}
              onChange={setConfirm}
              placeholder="••••••••"
            />

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary-hover hover:shadow-lg"
            >
              S'inscrire
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}