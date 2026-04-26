import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt — Zaya Design",
  description: "Skontaktuj się z Zaya Design — projektowanie ogrodów i wnętrz w Jeleniej Górze.",
};

const PHONE = "+48 512 722 365";
const ADDRESS = "ul. Cynamonowa 2, Jelenia Góra";
const FACEBOOK_URL =
  "https://www.facebook.com/Zaya-Projektowanie-Wn%C4%99trz-i-Ogrod%C3%B3w-593941440962918";
const INSTAGRAM_URL = "https://www.instagram.com/zayadesignstudio/";

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-stone-800 mb-2">Kontakt</h1>
      <p className="text-stone-500 text-sm mb-10">
        Napisz do nas — odpiszemy w ciągu 1–2 dni roboczych.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact details */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
              Telefon
            </p>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-stone-800 hover:text-stone-600 transition-colors"
            >
              {PHONE}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
              Adres
            </p>
            <address className="not-italic text-stone-800">{ADDRESS}</address>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Social media
            </p>
            <div className="flex gap-4">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-stone-900 transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-stone-900 transition-colors text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
}
