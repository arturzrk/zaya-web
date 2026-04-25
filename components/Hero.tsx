import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
      <Image
        src="/images/slider666.jpeg"
        alt="Zaya Design — garden and interior design"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <p className="text-white/80 text-sm uppercase tracking-widest mb-3">
          Dom i Ogród to Twoja historia
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
          Spotkajmy się<br />u Ciebie w ogrodzie
        </h1>
        <p className="text-white/80 text-lg mb-8 max-w-xl">
          Opowiedz nam o tym...
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/portfolio"
            className="bg-white text-stone-800 px-8 py-3 uppercase text-sm tracking-wider font-semibold hover:bg-stone-100 transition-colors"
          >
            Zobacz nasze projekty
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-8 py-3 uppercase text-sm tracking-wider font-semibold hover:bg-white/10 transition-colors"
          >
            Zostaw wiadomość
          </Link>
        </div>
      </div>
    </section>
  );
}
