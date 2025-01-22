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

export function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const maxLength = 100;
  const shouldShowButton = project.description.length > maxLength;
  const displayText = isExpanded ? project.description : project.description.slice(0, maxLength);

  const imageSrc = imageError 
    ? getPlaceholderImage(600, 400, project.title)
    : project.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-lg border bg-background p-2"
    >
      <div className="aspect-video overflow-hidden rounded-md bg-muted">
        <Image
          src={imageSrc}
          alt={project.title}
          width={600}
          height={400}
          priority={false}
          onError={() => setImageError(true)}
          onLoadingComplete={() => setIsLoading(false)}
          className={`object-cover transition-all duration-300 group-hover:scale-105 ${
            isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"
          }`}
        />
      </div>
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