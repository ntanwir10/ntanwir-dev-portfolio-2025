"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects } from "@/lib/projects";
import { motion } from "framer-motion";

// Get unique technologies from all projects
const allTechnologies = Array.from(
  new Set(projects.flatMap((project) => project.technologies))
).sort();

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesTech = selectedTech
      ? project.technologies.includes(selectedTech)
      : true;
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTech && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold">Projects</h1>
            <p className="text-lg text-muted-foreground">
              A collection of my recent projects, built with modern technologies.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 md:max-w-xs">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full rounded-md border bg-background px-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech("")}
                className={`rounded-full px-4 py-2 text-sm ${
                  selectedTech === ""
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                All
              </button>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    selectedTech === tech
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground">
                No projects found matching your criteria.
              </p>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
} 