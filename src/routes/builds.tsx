import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useLang } from "@/lib/i18n";
import { PURPOSES, PURPOSE_META, formatTenge } from "@/lib/catalog";

export const Route = createFileRoute("/builds")({
  head: () => ({
    meta: [
      { title: "Сборки ПК · ALMATECH" },
      { name: "description", content: "Готовые сборки ПК под задачу: офис, учёба, игры, рабочие станции для ресурсоёмких задач." },
      { property: "og:title", content: "Сборки ПК · ALMATECH" },
      { property: "og:description", content: "Готовые сборки под задачу: офис, учёба, игры, workstation." },
    ],
  }),
  component: BuildsLayout,
});

function BuildsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/builds/$purpose");
  if (isChild) return <Outlet />;
  return <BuildsIndex />;
}

function BuildsIndex() {
  const { t, lang } = useLang();
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          {t("builds.title")}
        </h1>
        <p className="text-brand-muted text-lg max-w-2xl mb-16">{t("builds.sub")}</p>
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
                <div className={`w-12 h-12 mb-6 border flex items-center justify-center font-mono text-xs ${isAccent ? "border-brand-accent/40 text-brand-accent" : "border-white/10 text-brand-primary"}`}>
                  {meta.code}
                </div>
                <h3 className="text-xl font-bold mb-3">{t(`cats.${p}.title`)}</h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  {t(`cats.${p}.desc`)}
                </p>
                <div className="text-xs text-brand-muted mb-2">
                  {t("cats.from")} <span className="text-white font-bold">{formatTenge(meta.from, lang)}</span>
                </div>
                <div className={`text-xs font-bold group-hover:translate-x-2 transition-transform ${isAccent ? "text-brand-accent" : "text-brand-primary"}`}>
                  {t("cats.explore")}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}