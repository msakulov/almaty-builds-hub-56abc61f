import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useLang } from "@/lib/i18n";
import { CFG_STEPS, formatTenge } from "@/lib/catalog";
import { sendTelegramLead } from "@/lib/telegram.functions";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Конструктор сборки · ALMATECH" },
      { name: "description", content: "Соберите компьютер онлайн: процессор, видеокарта, память, накопитель, корпус — цена обновляется в реальном времени." },
      { property: "og:title", content: "Конструктор ПК · ALMATECH" },
      { property: "og:description", content: "Соберите ПК онлайн — цена в реальном времени." },
    ],
  }),
  component: Configurator,
});

function Configurator() {
  const { t, lang } = useLang();
  const send = useServerFn(sendTelegramLead);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(CFG_STEPS.map((s) => [s.id, s.options[1]?.id ?? s.options[0].id])),
  );
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);

  const total = useMemo(() => {
    return CFG_STEPS.reduce((acc, step) => {
      const opt = step.options.find((o) => o.id === selected[step.id]);
      return acc + (opt?.price ?? 0);
    }, 0);
  }, [selected]);

  async function submit() {
    if (!contact.trim()) {
      toast.error(t("form.error"));
      return;
    }
    setSending(true);
    try {
      const lines = CFG_STEPS.map((step) => {
        const opt = step.options.find((o) => o.id === selected[step.id]);
        return `• ${t(`cfg.step.${step.id}`)}: ${opt?.label} — ${formatTenge(opt?.price ?? 0, lang)}`;
      });
      lines.push("", `ИТОГО: ${formatTenge(total, lang)}`);
      const res = await send({
        data: {
          name: "Configurator",
          contact,
          message: lines.join("\n"),
          source: "configurator",
        },
      });
      if (res.ok) {
        toast.success(t("form.success"));
        setContact("");
      } else toast.error(t("form.error"));
    } catch (err) {
      console.error(err);
      toast.error(t("form.error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          {t("cfg.title")}
        </h1>
        <p className="text-brand-muted text-lg max-w-2xl mb-16">{t("cfg.sub")}</p>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 bg-brand-surface border border-white/5">
          <div className="p-8 lg:p-12 space-y-10">
            {CFG_STEPS.map((step) => (
              <div key={step.id} className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-brand-muted">
                  {t(`cfg.step.${step.id}`)}
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {step.options.map((opt) => {
                    const active = selected[step.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [step.id]: opt.id }))}
                        className={`flex items-center justify-between p-4 border text-sm text-left transition-all ${active ? "border-brand-primary bg-brand-primary/5" : "border-white/10 hover:border-white/30"}`}
                      >
                        <span>{opt.label}</span>
                        <span className="text-xs font-mono text-brand-muted whitespace-nowrap ml-2">
                          {formatTenge(opt.price, lang)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-brand-bg p-8 lg:p-12 border-l border-white/5">
            <div className="sticky top-24 space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">
                  {t("cfg.total")}
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold tracking-tighter tabular-nums text-brand-primary">
                  {formatTenge(total, lang)}
                </div>
                <div className="text-xs text-brand-muted mt-2">{t("cfg.included")}</div>
              </div>
              <div className="pt-6 border-t border-white/5 space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-brand-muted block">
                  {t("form.contact")}
                </label>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t("form.contactPh")}
                  className="w-full bg-brand-surface border border-white/10 px-4 py-3 focus:border-brand-primary outline-none text-white transition-colors"
                />
                <button
                  onClick={submit}
                  disabled={sending}
                  className="w-full py-4 bg-brand-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-60"
                >
                  {sending ? t("form.sending") : t("cfg.order")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}