import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactForm } from "@/components/site/ContactForm";
import { useLang } from "@/lib/i18n";
import { PURPOSE_META, PURPOSES, formatTenge } from "@/lib/catalog";
import heroPc from "@/assets/hero-pc.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, lang } = useLang();
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-block px-3 py-1 border border-brand-primary/30 text-brand-primary text-[10px] font-mono uppercase tracking-widest mb-6">
              {t("hero.badge")}
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 tracking-tighter">
              {t("hero.title1")} <br />
              <span className="text-brand-primary">{t("hero.title2")}</span>
            </h1>
            <p className="text-brand-muted text-lg max-w-md mb-10 leading-relaxed">
              {t("hero.desc")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/configurator"
                className="px-8 py-4 bg-brand-primary text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                {t("cta.start")}
              </Link>
              <Link
                to="/builds"
                className="px-8 py-4 border border-white/10 font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                {t("cta.presets")}
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroPc}
              alt="Custom PC by ALMATECH"
              width={1024}
              height={1024}
              className="w-full aspect-square object-cover rounded-2xl border border-white/5 relative z-10"
            />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-primary/20 blur-[120px] -z-0"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-accent/20 blur-[120px] -z-0"></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2 tracking-tight">{t("cats.title")}</h2>
              <p className="text-brand-muted max-w-xl">{t("cats.sub")}</p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="block text-3xl font-display font-bold text-brand-primary">04</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-muted">{t("cats.count")}</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PURPOSES.map((p) => {
              const meta = PURPOSE_META[p];
              const isAccent = meta.accent === "accent";
              return (
                <Link
                  key={p}
                  to="/builds/$purpose"
                  params={{ purpose: p }}
                  className={`group bg-brand-surface p-8 border border-white/5 hover:border-brand-primary/50 transition-all ${isAccent ? "bg-gradient-to-b from-brand-surface to-brand-accent/10" : ""}`}
                >
                  <div
                    className={`w-12 h-12 mb-6 border flex items-center justify-center font-mono text-xs ${isAccent ? "border-brand-accent/40 text-brand-accent" : "border-white/10 text-brand-primary"}`}
                  >
                    {meta.code}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(`cats.${p}.title`)}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-6">
                    {t(`cats.${p}.desc`)}
                  </p>
                  <div className="text-xs text-brand-muted mb-2">
                    {t("cats.from")}{" "}
                    <span className="text-white font-bold">{formatTenge(meta.from, lang)}</span>
                  </div>
                  <div
                    className={`text-xs font-bold group-hover:translate-x-2 transition-transform ${isAccent ? "text-brand-accent" : "text-brand-primary"}`}
                  >
                    {t("cats.explore")}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-brand-surface border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-brand-muted mb-12">{t("contact.desc")}</p>
          <ContactForm source="home" />
        </div>
      </section>
    </SiteLayout>
  );
}
