import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Cpu } from "lucide-react";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/builds", key: "nav.builds" },
  { to: "/configurator", key: "nav.configurator" },
  { to: "/prices", key: "nav.prices" },
  { to: "/services", key: "nav.services" },
  { to: "/careers", key: "nav.careers" },
  { to: "/contacts", key: "nav.contacts" },
] as const;

export function Header() {
  const { t, lang, setLang } = useLang();
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-brand-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Cpu className="w-5 h-5 text-brand-primary" />
          <span className="font-display text-2xl font-bold tracking-tighter text-brand-primary">
            ALMA<span className="text-white">TECH</span>
          </span>
        </Link>
        <div className="hidden xl:flex gap-4 text-xs font-medium uppercase tracking-wider text-brand-muted">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-brand-primary" }}
              className="hover:text-brand-primary transition-colors whitespace-nowrap"
            >
              {t(l.key)}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex bg-brand-surface rounded-full p-1 border border-white/5">
            {(["ru", "kz", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === l ? "bg-brand-primary text-black" : "text-brand-muted hover:text-white"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link
            to="/contacts"
            className="hidden sm:block px-4 py-2 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/10 transition-all"
          >
            {t("cta.consult")}
          </Link>
        </div>
      </div>
    </nav>
  );
}