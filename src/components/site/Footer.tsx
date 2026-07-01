import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="py-12 border-t border-white/5 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="font-display text-xl font-bold">
          <span className="text-brand-primary">ALMA</span>
          <span className="text-white/60">TECH</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-widest text-brand-muted">
          <Link to="/about" className="hover:text-white transition-colors">{t("nav.about")}</Link>
          <Link to="/prices" className="hover:text-white transition-colors">{t("nav.prices")}</Link>
          <Link to="/services" className="hover:text-white transition-colors">{t("nav.services")}</Link>
          <Link to="/careers" className="hover:text-white transition-colors">{t("nav.careers")}</Link>
          <Link to="/contacts" className="hover:text-white transition-colors">{t("nav.contacts")}</Link>
        </div>
        <div className="text-[10px] text-brand-muted/60 uppercase tracking-widest">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}