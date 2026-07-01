import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useLang } from "@/lib/i18n";
import { PRICE_ROWS, formatTenge } from "@/lib/catalog";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Цены на комплектующие · ALMATECH" },
      { name: "description", content: "Актуальный прайс на процессоры, видеокарты, память, накопители и корпуса в Алматы." },
      { property: "og:title", content: "Цены на комплектующие · ALMATECH" },
      { property: "og:description", content: "Актуальный прайс на комплектующие в Алматы." },
    ],
  }),
  component: PricesPage,
});

function PricesPage() {
  const { t, lang } = useLang();
  return (
    <SiteLayout>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          {t("prices.title")}
        </h1>
        <p className="text-brand-muted text-lg max-w-2xl mb-16">{t("prices.sub")}</p>

        <div className="font-mono text-xs md:text-sm border border-white/10 overflow-x-auto">
          <div className="grid grid-cols-[80px_1fr_120px_140px] gap-4 p-4 border-b border-white/10 bg-brand-surface text-brand-muted uppercase text-[10px] tracking-widest min-w-[600px]">
            <div>{t("prices.col.cat")}</div>
            <div>{t("prices.col.name")}</div>
            <div>{t("prices.col.stock")}</div>
            <div className="text-right">{t("prices.col.price")}</div>
          </div>
          {PRICE_ROWS.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-[80px_1fr_120px_140px] gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors last:border-b-0 min-w-[600px]"
            >
              <div className="text-brand-primary">{r.cat}</div>
              <div className="text-white">{r.name}</div>
              <div className={r.stock === "in" ? "text-emerald-400" : "text-amber-400"}>
                {r.stock === "in" ? t("prices.instock") : t("prices.low")}
              </div>
              <div className="text-right tabular-nums">{formatTenge(r.price, lang)}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}