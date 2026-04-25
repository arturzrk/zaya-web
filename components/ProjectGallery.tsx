"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/types";

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + project.images.length) % project.images.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % project.images.length : null));

  return (
    <>
      <p className="text-stone-500 text-sm mt-2 mb-8">{project.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
        {project.images.map((src, index) => (
          <button
            key={src}
            className="relative aspect-square overflow-hidden focus:outline-none focus:ring-2 focus:ring-stone-700"
            onClick={() => openLightbox(index)}
            aria-label={`View image ${index + 1} of ${project.images.length}`}
          >
            <Image
              src={src}
              alt={`${project.title} — photo ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-stone-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <button
            className="absolute left-4 text-white text-3xl hover:text-stone-300 transition-colors px-4 py-8"
            onClick={prev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="relative w-full max-w-4xl max-h-[85vh] mx-16 aspect-[4/3]">
            <Image
              src={project.images[lightboxIndex]}
              alt={`${project.title} — photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <button
            className="absolute right-4 text-white text-3xl hover:text-stone-300 transition-colors px-4 py-8"
            onClick={next}
            aria-label="Next image"
          >
            ›
          </button>
          <p className="absolute bottom-4 text-stone-400 text-sm">
            {lightboxIndex + 1} / {project.images.length}
          </p>
        </div>
      )}
    </>
  );
}
