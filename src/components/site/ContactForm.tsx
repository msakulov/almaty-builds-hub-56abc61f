import { useState, useEffect, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { sendTelegramLead } from "@/lib/telegram.functions";

export function ContactForm({ source, compact = false }: { source?: string; compact?: boolean }) {
  const { t } = useLang();
  const send = useServerFn(sendTelegramLead);
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [captcha, setCaptcha] = useState<{ a: number; b: number; answer: number } | null>(null);
  const regenCaptcha = useCallback(() => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    setCaptcha({ a, b, answer: a + b });
  }, []);
  useEffect(() => { regenCaptcha(); }, [regenCaptcha]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const captchaValue = String(fd.get("captcha") ?? "").trim();
    if (!captcha || Number(captchaValue) !== captcha.answer) {
      toast.error(t("form.captchaError"));
      regenCaptcha();
      return;
    }
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      contact: String(fd.get("contact") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      source: source ?? "contact-form",
    };
    if (!payload.name || !payload.contact || !payload.message) {
      toast.error(t("form.error"));
      return;
    }
    setState("sending");
    try {
      const res = await send({ data: payload });
      if (res.ok) {
        toast.success(t("form.success"));
        form.reset();
        regenCaptcha();
      } else {
        toast.error(t("form.error"));
      }
    } catch (err) {
      console.error(err);
      toast.error(t("form.error"));
    } finally {
      setState("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 text-left">
      <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-brand-muted mb-2 block">{t("form.name")}</label>
          <input
            name="name"
            required
            maxLength={100}
            placeholder="Алишер / Alisher"
            className="w-full bg-brand-bg border border-white/10 px-4 py-3 focus:border-brand-primary outline-none text-white transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-brand-muted mb-2 block">{t("form.contact")}</label>
          <input
            name="contact"
            required
            maxLength={120}
            placeholder={t("form.contactPh")}
            className="w-full bg-brand-bg border border-white/10 px-4 py-3 focus:border-brand-primary outline-none text-white transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest text-brand-muted mb-2 block">{t("form.message")}</label>
        <textarea
          name="message"
          rows={4}
          required
          maxLength={2000}
          placeholder={t("form.messagePh")}
          className="w-full bg-brand-bg border border-white/10 px-4 py-3 focus:border-brand-primary outline-none text-white resize-none transition-colors"
        />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest text-brand-muted mb-2 block">
          {captcha
            ? t("form.captcha").replace("{a}", String(captcha.a)).replace("{b}", String(captcha.b))
            : t("form.captcha").replace("{a}", "…").replace("{b}", "…")}
        </label>
        <input
          name="captcha"
          required
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          placeholder={t("form.captchaPh")}
          className="w-full bg-brand-bg border border-white/10 px-4 py-3 focus:border-brand-primary outline-none text-white transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full py-5 bg-brand-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "sending" ? t("form.sending") : t("form.submit")}
      </button>
    </form>
  );
}