import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-stone-200 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-stone-800 mb-2">Strona nie została znaleziona</h2>
      <p className="text-stone-500 text-sm mb-8 max-w-sm">
        Przepraszamy — ta strona nie istnieje lub została przeniesiona.
      </p>
      <Link
        href="/"
        className="rounded bg-stone-800 px-6 py-2 text-sm font-medium text-white hover:bg-stone-700 transition-colors"
      >
        Wróć na stronę główną
      </Link>
    </section>
  );
}
