import { services } from "@/lib/services";

export function Services() {
  return (
    <section className="bg-stone-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-12 uppercase tracking-wider">
          Zakres Usług
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 shadow-sm border border-stone-100"
            >
              <h3 className="text-lg font-semibold text-stone-800 mb-4">
                {service.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
