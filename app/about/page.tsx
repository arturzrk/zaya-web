import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "O nas — Zaya Design",
  description:
    "Poznaj Zaya Design — studio projektowania ogrodów i wnętrz z Jeleniej Góry. Tworzymy przestrzenie, które łączą harmonię natury z Twoim stylem życia.",
};

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-stone-800 mb-8">O nas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src="/images/main_photo.jpg"
            alt="Zaya Design Studio — projektowanie ogrodów i wnętrz"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-4 text-stone-700 leading-relaxed">
          <p>
            Jesteśmy Zaya Design — studio projektowania ogrodów i wnętrz z siedzibą w Jeleniej Górze.
            Tworzymy przestrzenie, które łączą harmonię natury z Twoim indywidualnym stylem życia.
          </p>
          <p>
            Każdy projekt traktujemy jak osobną historię. Słuchamy, obserwujemy i zadajemy pytania —
            bo najlepsze ogrody i wnętrza zawsze zaczynają się od zrozumienia potrzeb ich właścicieli.
          </p>
          <p>
            Nasze podejście łączy estetykę z funkcjonalnością. Pracujemy z materiałami naturalnymi,
            szanujemy lokalny klimat i roślinność, a każdy detal starannie dopasowujemy do charakteru
            miejsca i jego mieszkańców.
          </p>
          <p>
            Realizujemy projekty ogrodów przydomowych, ogrodów towarzyszących architektom, terenów
            zielonych osiedli oraz wnętrz mieszkalnych i użytkowych — od koncepcji po nadzór nad
            realizacją.
          </p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-stone-200 pt-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Specjalizacja</p>
          <p className="text-stone-700 text-sm">Projektowanie ogrodów przydomowych, wnętrz mieszkalnych i realizacja małej architektury ogrodowej.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Obszar działania</p>
          <p className="text-stone-700 text-sm">Jelenia Góra i okolice, Kotlina Jeleniogórska, Karkonosze — oraz projekty zdalne na terenie całej Polski.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Kontakt</p>
          <p className="text-stone-700 text-sm">ul. Cynamonowa 2, Jelenia Góra<br />+48 512 722 365</p>
        </div>
      </div>
    </section>
  );
}
