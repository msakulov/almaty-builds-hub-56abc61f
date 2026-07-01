import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  contact: z.string().trim().min(2).max(120),
  message: z.string().trim().min(1).max(2000),
  source: z.string().trim().max(80).optional(),
});

export const sendTelegramLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      console.warn("Telegram is not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing)");
      return { ok: false, error: "Telegram not configured" as const };
    }

    const text = [
      "🔔 <b>Новая заявка · ALMATECH</b>",
      `<b>Имя:</b> ${escapeHtml(data.name)}`,
      `<b>Контакт:</b> ${escapeHtml(data.contact)}`,
      `<b>Источник:</b> ${escapeHtml(data.source ?? "site")}`,
      "",
      escapeHtml(data.message),
    ].join("\n");

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram sendMessage failed", res.status, body);
      return { ok: false, error: "Telegram API error" as const };
    }
    return { ok: true as const };
  });

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => (c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"));
}