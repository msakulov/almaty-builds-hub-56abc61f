import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactForm } from "@/components/site/ContactForm";
import { useLang } from "@/lib/i18n";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты · ALMATECH" },
      { name: "description", content: "Адрес мастерской, телефон, email и Telegram ALMATECH в Алматы." },
      { property: "og:title", content: "Контакты · ALMATECH" },
      { property: "og:description", content: "Мастерская и шоурум в Алматы." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const { t } = useLang();
  const items = [
    { i: MapPin, k: "addr" },
    { i: Phone, k: "phone" },
    { i: Mail, k: "email" },
    { i: Clock, k: "hours" },
  ];
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            {t("contacts.title")}
          </h1>
          <p className="text-brand-muted text-lg max-w-md mb-12">{t("contacts.sub")}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map(({ i: Icon, k }) => (
              <div key={k} className="bg-brand-surface p-6 border border-white/5">
                <Icon className="w-5 h-5 text-brand-primary mb-4" />
                <div className="text-[10px] uppercase tracking-widest text-brand-muted mb-1">
                  {t(`contacts.${k}.t`)}
                </div>
                <div className="text-white">{t(`contacts.${k}.v`)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-brand-surface p-8 lg:p-12 border border-white/5 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-accent/10 blur-3xl"></div>
          <div className="relative">
            <h2 className="font-display text-2xl font-bold mb-2">{t("contact.title")}</h2>
            <p className="text-sm text-brand-muted mb-8">{t("contact.desc")}</p>
            <ContactForm source="contacts-page" compact />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}