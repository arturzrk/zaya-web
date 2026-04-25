import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Services } from "@/components/Services";

export const metadata: Metadata = {
  title: "Zaya Design Studio — Projektowanie Ogrodów i Wnętrz",
  description:
    "Zaya Design Studio oferuje projektowanie ogrodów, wnętrz oraz kompleksową realizację. Jelenia Góra i okolice.",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Company intro */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/main_photo.jpg"
              alt="Zaya Design — nasze projekty"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-6">
              Witamy w <span className="text-green-700">Zaya</span>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Zaya to firma, która z pasją wykorzystuje swoją fachową wiedzę i doświadczenie
              w tworzeniu wymarzonego projektu Twojego ogrodu oraz wnętrza mieszkalnego.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              Każdy nasz projekt w połączeniu z realizacją odpowiada najbardziej wymagającym
              pomysłom inwestora.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Realizując Twoje wizje, spełnimy Twoje marzenia.
            </p>
          </div>
        </div>
      </section>

      <ProcessSteps />
      <Services />
    </>
  );
}
