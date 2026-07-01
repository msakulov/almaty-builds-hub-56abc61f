import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactForm } from "@/components/site/ContactForm";
import { useLang } from "@/lib/i18n";
import {
  BUILD_SPECS,
  PURPOSE_META,
  PURPOSES,
  formatTenge,
  type Purpose,
} from "@/lib/catalog";

export const Route = createFileRoute("/builds/$purpose")({
  beforeLoad: ({ params }) => {
    if (!PURPOSES.includes(params.purpose as Purpose)) throw notFound();
  },
  head: ({ params }) => ({
    meta: [
      { title: `Сборка ${params.purpose} · ALMATECH` },
      { name: "description", content: `Готовая сборка ПК ${params.purpose} от ALMATECH в Алматы.` },
    ],
  }),
  component: BuildDetail,
});

function BuildDetail() {
  const { purpose } = Route.useParams();
  const p = purpose as Purpose;
  const { t, lang } = useLang();
  const meta = PURPOSE_META[p];
  const specs = BUILD_SPECS[p][lang];
  const isAccent = meta.accent === "accent";

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <Link
            to="/builds"
            className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors"
          >
            ← {t("nav.builds")}
          </Link>
          <div
            className={`inline-flex mt-6 w-14 h-14 border items-center justify-center font-mono text-sm ${isAccent ? "border-brand-accent/40 text-brand-accent" : "border-white/10 text-brand-primary"}`}
          >
            {meta.code}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mt-6 mb-4">
            {t(`cats.${p}.title`)}
          </h1>
          <p className="text-brand-muted text-lg max-w-md mb-8">{t(`cats.${p}.desc`)}</p>
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-muted">{t("cats.from")}</div>
            <div className="font-display text-5xl font-bold text-brand-primary">
              {formatTenge(meta.from, lang)}
            </div>
          </div>
          <Link
            to="/configurator"
            className="inline-block px-8 py-4 bg-brand-primary text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            {t("cta.start")}
          </Link>
        </div>
        <div className="bg-brand-surface border border-white/5 p-8">
          <h2 className="text-xs uppercase tracking-widest text-brand-primary mb-6 font-mono">
            {t("builds.specs")}
          </h2>
          <ul className="divide-y divide-white/5">
            {specs.map((s, i) => (
              <li key={i} className="py-4 flex items-start gap-4">
                <span className="font-mono text-xs text-brand-muted mt-1">0{i + 1}</span>
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-white/5 bg-brand-surface">
        <div className="max-w-2xl mx-auto px-6 py-24">
          <h2 className="font-display text-3xl font-bold mb-4 text-center">
            {t("builds.order")}
          </h2>
          <p className="text-brand-muted text-center mb-10">{t("contact.desc")}</p>
          <ContactForm source={`build-${p}`} />
        </div>
      </section>
    </SiteLayout>
  );
}