"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-lg border bg-background p-2"
    >
      <div className="aspect-video overflow-hidden rounded-md">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
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