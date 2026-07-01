import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useLang } from "@/lib/i18n";
import { Wrench, Cpu, ShieldCheck, Zap, MonitorSmartphone, Recycle } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги · ALMATECH" },
      { name: "description", content: "Сборка ПК, апгрейд, диагностика, чистка, установка ОС и корпоративное обслуживание в Алматы." },
      { property: "og:title", content: "Услуги · ALMATECH" },
      { property: "og:description", content: "Сборка, апгрейд, диагностика и сервис в Алматы." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Cpu, ru: { t: "Сборка под ключ", d: "Индивидуальная сборка ПК из ваших или наших комплектующих." }, en: { t: "Turn-key assembly", d: "Custom PC builds from your components or ours." } },
  { icon: Zap, ru: { t: "Апгрейд", d: "Замена процессора, GPU, памяти и накопителей с тестированием." }, en: { t: "Upgrades", d: "CPU, GPU, RAM and storage upgrades with validation." } },
  { icon: Wrench, ru: { t: "Диагностика и ремонт", d: "Поиск причины неисправности, замена компонентов, восстановление." }, en: { t: "Diagnostics & repair", d: "Fault-finding, component replacement, recovery." } },
  { icon: ShieldCheck, ru: { t: "Гарантия и сервис", d: "24 месяца на сборку, приоритетный сервис в Алматы." }, en: { t: "Warranty & service", d: "24 months on assembly, priority service in Almaty." } },
  { icon: MonitorSmartphone, ru: { t: "Корпоративное обслуживание", d: "Обслуживание парка ПК для офисов и студий." }, en: { t: "Corporate service", d: "Ongoing support for office and studio PC fleets." } },
  { icon: Recycle, ru: { t: "Trade-in", d: "Обмен старого ПК с зачётом стоимости при покупке нового." }, en: { t: "Trade-in", d: "Trade your old PC toward a new build." } },
];

function ServicesPage() {
  const { t, lang } = useLang();
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          {t("services.title")}
        </h1>
        <p className="text-brand-muted text-lg max-w-2xl mb-16">{t("services.sub")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const c = lang === "ru" ? s.ru : s.en;
            return (
              <div key={i} className="bg-brand-surface p-8 border border-white/5 hover:border-brand-primary/40 transition-colors">
                <Icon className="w-8 h-8 text-brand-primary mb-6" />
                <h3 className="text-lg font-bold mb-3">{c.t}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{c.d}</p>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}