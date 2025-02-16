"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/projects";

const getPlaceholderImage = (width: number, height: number, text: string) => 
  `https://placehold.co/${width}x${height}/1F2937/ffffff/png?text=${encodeURIComponent(text)}`;

// Projects that should always use placeholder images
const PLACEHOLDER_PROJECTS = ["scrape_free_proxy", "city_api"];

export function ProjectImage({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const shouldUsePlaceholder = imageError || PLACEHOLDER_PROJECTS.includes(project.id);
  const imageUrl = shouldUsePlaceholder 
    ? getPlaceholderImage(1920, 1080, project.title) 
    : project.image;

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
      <Image
        src={imageUrl}
        alt={project.title}
        fill
        className={`object-cover duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-2xl grayscale' 
          : 'scale-100 blur-0 grayscale-0'
        }`}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        onError={() => setImageError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
} 