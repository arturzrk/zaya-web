import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { policies } from "@/lib/policies";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies.find((p) => p.slug === slug);
  if (!policy) return {};
  return {
    title: `${policy.title} — Zaya Design`,
    description: `${policy.title} obowiązująca na stronie Zaya Design.`,
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = policies.find((p) => p.slug === slug);
  if (!policy) notFound();

  const paragraphs = policy.content.split("\n\n").filter(Boolean);

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-stone-800 mb-8">{policy.title}</h1>
      <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
        {paragraphs.map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**")) {
            return (
              <h2 key={i} className="text-base font-semibold text-stone-800 mt-6">
                {para.replace(/\*\*/g, "")}
              </h2>
            );
          }
          if (para.startsWith("- ")) {
            const items = para.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={i} className="list-disc list-inside space-y-1">
                {items.map((item, j) => (
                  <li key={j}>{item.slice(2)}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{para}</p>;
        })}
      </div>
    </section>
  );
}
