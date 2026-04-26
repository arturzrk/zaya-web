import { processSteps } from "@/lib/process";

export function ProcessSteps() {
  return (
    <section className="bg-cream py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-stone-800 mb-2">
          Poprzez nasze osobiste uczestnictwo we wszystkich etapach
        </h2>
        <p className="text-stone-500 mb-10 text-sm">
          Realizujemy Twoje wizje krok po kroku.
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {processSteps.map(({ step, title, description }) => (
            <li key={step} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm">
                {step}
              </span>
              <div>
                <p className="font-semibold text-stone-800">{title}</p>
                <p className="text-stone-500 text-sm mt-1">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
