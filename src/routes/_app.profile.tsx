import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [{ title: "Mon Profil — Espace agent" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [matricule, setMatricule] = useState(user?.matricule ?? "");
  const [toast, setToast] = useState<string | null>(null);

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ firstName, lastName, email, matricule });
    setToast("Profil mis à jour avec succès !");
    setTimeout(() => setToast(null), 3000);
  };

  const handlePwdSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    if (!currentPwd || !newPwd) {
      setPwdError("Veuillez remplir tous les champs.");
      return;
    }
    if (newPwd.length < 6) {
      setPwdError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError("Les mots de passe ne correspondent pas.");
      return;
    }
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setToast("Mot de passe modifié avec succès !");
    setTimeout(() => setToast(null), 3000);
  };

  const inputCls =
    "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-primary to-primary-hover" />
        <div className="px-8 pb-6">
          <div className="-mt-12 flex items-end gap-5">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-accent text-2xl font-extrabold text-accent-foreground shadow-md">
              {initials || "AG"}
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-foreground">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editable form */}
      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-border bg-white p-8 shadow-sm"
      >
        <h3 className="text-lg font-bold text-foreground">Informations personnelles</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Mettez à jour vos coordonnées professionnelles.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Prénom</label>
            <input className={`mt-1.5 ${inputCls}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Nom</label>
            <input className={`mt-1.5 ${inputCls}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Email</label>
            <input type="email" className={`mt-1.5 ${inputCls}`} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Matricule</label>
            <input className={`mt-1.5 ${inputCls}`} value={matricule} onChange={(e) => setMatricule(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Rôle</label>
            <input readOnly className={`mt-1.5 ${inputCls} cursor-not-allowed bg-secondary`} value={user?.role ?? ""} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Date d'inscription</label>
            <input readOnly className={`mt-1.5 ${inputCls} cursor-not-allowed bg-secondary`} value={user?.registeredAt ?? ""} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary-hover hover:shadow-lg"
          >
            Enregistrer
          </button>
        </div>
      </form>

      {/* Password */}
      <form
        onSubmit={handlePwdSave}
        className="rounded-2xl border border-border bg-white p-8 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Changer le mot de passe</h3>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-foreground">Actuel</label>
            <input type="password" className={`mt-1.5 ${inputCls}`} value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Nouveau</label>
            <input type="password" className={`mt-1.5 ${inputCls}`} value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Confirmer</label>
            <input type="password" className={`mt-1.5 ${inputCls}`} value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
          </div>
        </div>
        {pwdError && (
          <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{pwdError}</p>
        )}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-lg border-2 border-primary bg-white px-6 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Modifier le mot de passe
          </button>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-success px-5 py-3 text-sm font-semibold text-success-foreground shadow-lg">
          <CheckCircle2 className="h-5 w-5" />
          {toast}
        </div>
      )}
    </div>
  );
}
