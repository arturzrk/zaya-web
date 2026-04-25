import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio — Zaya Design",
  description: "Realizacje projektów ogrodowych i wnętrzarskich Zaya Design.",
  openGraph: {
    title: "Portfolio — Zaya Design",
    description: "Realizacje projektów ogrodowych i wnętrzarskich Zaya Design.",
    url: "https://zaya-web-bay.vercel.app/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-stone-800 mb-2">Nasze realizacje</h1>
      <p className="text-stone-500 text-sm mb-8">
        Wybrane projekty ogrodów i wnętrz wykonanych przez Zaya Design.
      </p>
      <PortfolioGrid projects={projects} />
    </section>
  );
}
