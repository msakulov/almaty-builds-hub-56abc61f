import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactForm } from "@/components/site/ContactForm";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Вакансии · ALMATECH" },
      { name: "description", content: "Открытые вакансии ALMATECH в Алматы: сборщик ПК, менеджер по продажам, инженер по гарантии." },
      { property: "og:title", content: "Вакансии · ALMATECH" },
      { property: "og:description", content: "Работа в команде ALMATECH — Алматы." },
    ],
  }),
  component: CareersPage,
});

const JOBS = [
  { id: "asm", ru: { t: "Сборщик ПК", d: "Аккуратная сборка, кабель-менеджмент, тестирование. Опыт от 1 года." }, en: { t: "PC Builder", d: "Precise assembly, cable management, testing. 1+ yr experience." }, type: "careers.type.full" },
  { id: "sales", ru: { t: "Менеджер по продажам", d: "Работа с клиентами по конфигурациям и заказам. Знание железа обязательно." }, en: { t: "Sales Manager", d: "Guide clients through builds and orders. PC hardware knowledge required." }, type: "careers.type.full" },
  { id: "svc", ru: { t: "Инженер сервисного центра", d: "Диагностика, ремонт, работа с гарантийными случаями." }, en: { t: "Service Engineer", d: "Diagnostics, repair, warranty handling." }, type: "careers.type.full" },
  { id: "content", ru: { t: "Контент-менеджер (part-time)", d: "Съёмка сборок, ведение соцсетей и обзоры." }, en: { t: "Content Manager (part-time)", d: "Shoot builds, run social, publish reviews." }, type: "careers.type.part" },
];

function CareersPage() {
  const { t, lang } = useLang();
  const [applyId, setApplyId] = useState<string | null>(null);
  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          {t("careers.title")}
        </h1>
        <p className="text-brand-muted text-lg max-w-2xl mb-16">{t("careers.sub")}</p>
        <div className="space-y-3">
          {JOBS.map((j) => {
            const c = lang === "ru" ? j.ru : j.en;
            const open = applyId === j.id;
            return (
              <div key={j.id} className="bg-brand-surface border border-white/5">
                <div className="p-6 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-brand-primary mb-1 font-mono">
                      {t(j.type)}
                    </div>
                    <h3 className="text-xl font-bold">{c.t}</h3>
                    <p className="text-sm text-brand-muted mt-2 max-w-2xl">{c.d}</p>
                  </div>
                  <button
                    onClick={() => setApplyId(open ? null : j.id)}
                    className="px-6 py-3 border border-brand-primary/40 text-brand-primary text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/10 transition-colors whitespace-nowrap"
                  >
                    {t("careers.apply")}
                  </button>
                </div>
                {open ? (
                  <div className="p-6 border-t border-white/5">
                    <ContactForm source={`careers-${j.id}`} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}