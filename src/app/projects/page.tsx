"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

// Get unique technologies from all projects
const allTechnologies = Array.from(
  new Set(projects.flatMap((project) => project.technologies))
).sort();

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent hydration mismatch

  const INITIAL_TAG_COUNT = 6;

  useEffect(() => {
    // Function to handle resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesTech = selectedTech
      ? project.technologies.includes(selectedTech)
      : true;
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTech && matchesSearch;
  });

  // Function to determine which tags to show
  const tagsToShow = isMobile && !showAllTags 
    ? allTechnologies.slice(0, INITIAL_TAG_COUNT)
    : allTechnologies;

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

          <div className="mb-8 space-y-4">
            {/* Search Projects Input */}
            <div className="flex justify-start">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? "w-[300px]" : "w-[200px]"
              }`}>
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Filter Tags */}
            <div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTech("")}
                  className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                    selectedTech === ""
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  All
                </button>
                {tagsToShow.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                      selectedTech === tech
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
                {isMobile && allTechnologies.length > INITIAL_TAG_COUNT && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="rounded-lg px-4 py-2 text-sm text-primary hover:text-primary/80 md:hidden"
                  >
                    {showAllTags ? "Show Less" : `+${allTechnologies.length - INITIAL_TAG_COUNT} More`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
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