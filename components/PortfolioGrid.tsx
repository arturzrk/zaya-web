import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/portfolio/${project.slug}`}
          className="group relative aspect-[4/3] overflow-hidden block"
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-end">
            <p className="font-display text-white text-sm font-semibold px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 group-hover:border-b-2 group-hover:border-forest">
              {project.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
