import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О нас · ALMATECH" },
      { name: "description", content: "ALMATECH — команда сборщиков ПК в Алматы с 2016 года. Прозрачность, тестирование, гарантия." },
      { property: "og:title", content: "О нас · ALMATECH" },
      { property: "og:description", content: "Команда сборщиков ПК в Алматы с 2016 года." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();
  const stats = [
    { v: "10+", k: "about.stats.years" },
    { v: "3200+", k: "about.stats.builds" },
    { v: "24", k: "about.stats.warranty" },
    { v: "★★★★★", k: "about.stats.city" },
  ];
  const values = ["v1", "v2", "v3"] as const;
  return (
    <SiteLayout>
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8">
          {t("about.title")}
        </h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-2xl">{t("about.lead")}</p>
      </section>
      <section className="border-y border-white/5 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.k}>
              <div className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {s.v}
              </div>
              <div className="text-xs uppercase tracking-widest text-brand-muted">{t(s.k)}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl font-bold mb-12 tracking-tight">{t("about.values.title")}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div key={v} className="bg-brand-surface p-8 border border-white/5">
              <div className="font-mono text-xs text-brand-primary mb-4">{`0${i + 1}`}</div>
              <h3 className="text-xl font-bold mb-2">{t(`about.${v}.t`)}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{t(`about.${v}.d`)}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}