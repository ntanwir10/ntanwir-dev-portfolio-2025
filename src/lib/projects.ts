export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Developer Portfolio",
    description: "A modern portfolio website built with Next.js 14, Tailwind CSS, and TypeScript. Features dark mode, responsive design, and dynamic project filtering.",
    image: "/placeholder.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://portfolio.yourdomain.com",
    featured: true,
  },
  {
    id: "task-manager",
    title: "Task Manager App",
    description: "A full-stack task management application with real-time updates, user authentication, and collaborative features.",
    image: "/projects/task-manager.png",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://task-manager.yourdomain.com",
    featured: true,
  },
  {
    id: "e-commerce",
    title: "E-Commerce Platform",
    description: "A scalable e-commerce platform with features like product management, cart functionality, and secure payment integration.",
    image: "/projects/ecommerce.png",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Docker"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    featured: false,
  },
]; 