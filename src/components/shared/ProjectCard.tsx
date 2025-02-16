"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { useState } from "react";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const getPlaceholderImage = (width: number, height: number, text: string) => 
  `https://placehold.co/${width}x${height}/1F2937/ffffff/png?text=${encodeURIComponent(text)}`;

// Projects that should always use placeholder images
const PLACEHOLDER_PROJECTS = ["scrape_free_proxy", "city_api"];

export function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const maxLength = 150;
  const shouldShowButton = project.description.length > maxLength;
  const displayText = isExpanded
    ? project.description
    : project.description.slice(0, maxLength);

  const shouldUsePlaceholder = imageError || PLACEHOLDER_PROJECTS.includes(project.id);
  const imageUrl = shouldUsePlaceholder 
    ? getPlaceholderImage(1920, 1080, project.title) 
    : project.image;

  return (
    <motion.div
      layout
      className="group relative overflow-hidden rounded-lg border bg-card"
    >
      <Link href={`/projects/${project.id}`} className="relative block w-full h-[240px] overflow-hidden">
        {isImageLoading && (
          <div 
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: `url(data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))})`,
              backgroundSize: 'cover'
            }}
          />
        )}
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className={`object-contain object-center transition-all duration-700 ease-in-out group-hover:scale-105 ${
            isImageLoading 
              ? 'scale-110 blur-2xl grayscale opacity-0' 
              : 'scale-100 blur-0 grayscale-0 opacity-100'
          }`}
          onLoad={() => setIsImageLoading(false)}
          onError={() => {
            setImageError(true);
            setIsImageLoading(false);
          }}
          priority={project.featured}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            {displayText}
            {!isExpanded && shouldShowButton && "..."}
          </p>
          {shouldShowButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-secondary px-2 py-1 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <FaGithub className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <FaExternalLinkAlt className="h-4 w-4" />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
} 