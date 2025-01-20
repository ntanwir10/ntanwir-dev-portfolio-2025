import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { Header } from "@/components/layout/Header";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <FaArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
              <p className="mb-6 text-lg text-muted-foreground">
                {project.description}
              </p>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-secondary px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>View on GitHub</span>
                </Link>
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90"
                  >
                    <FaExternalLinkAlt className="h-4 w-4" />
                    <span>Live Demo</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 