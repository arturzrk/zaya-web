import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen min-h-[500px] w-full overflow-hidden">
      <Image
        src="/images/slider666.jpeg"
        alt="Zaya Design — garden and interior design"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <p className="text-white/80 text-sm uppercase tracking-widest mb-3">
          Dom i Ogród to Twoja historia
        </p>
        <h1 className="text-white font-display text-5xl md:text-7xl font-bold leading-tight mb-4">
          Spotkajmy się<br />u Ciebie w ogrodzie
        </h1>
        <p className="text-white/80 text-lg mb-8 max-w-xl">
          Opowiedz nam o tym...
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/portfolio"
            className="bg-forest hover:bg-forest-light text-white rounded px-8 py-3 font-semibold transition-colors"
          >
            Zobacz nasze projekty
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white hover:bg-white/10 rounded px-8 py-3 font-semibold transition-colors"
          >
            Zostaw wiadomość
          </Link>
        </div>
      </div>
    </section>
  );
}
