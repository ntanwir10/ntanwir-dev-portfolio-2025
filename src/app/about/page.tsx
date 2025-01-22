import { Header } from "@/components/layout/Header";

const skills = [
  {
    category: "Frontend",
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Express", "Python", "FastAPI", "RESTful APIs", "OAuth", "Passport.js", "JWT", "Serverless", "Micro-services"],
  },
  {
    category: "Database",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS DynamoDB",],
  },
  {
    category: "DevOps & Tools",
    technologies: ["Git", "GitHub Actions", "YAML", "Docker", "Docker Compose", "Kubernetes", "CI/CD", "Linux"]
  },
  {
    category: "AWS",
    technologies: ["AWS Lambda", "Amazon API Gateway", "AWS EC2", "AWS S3", "AWS CloudFormation"],
  },
  {
    category: "Azure",
    technologies: ["Azure Functions", "Azure App Service", "Azure Storage", "Azure Active Directory", "ARM Templates"],
  },
  {
    category: "Payment Gateways",
    technologies: ["Stripe", "PayPal"],
  },
  {
    category: "Data visualization",
    technologies: ["Chart.js", "D3.js"],
  },
  {
    category: "Testing",
    technologies: ["Jest (Unit Testing)", "Cypress (End-to-End Testing)"],
  },
];

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <section className="mb-12">
            <h1 className="mb-8 text-4xl font-bold">About Me</h1>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-lg text-muted-foreground">
                I am an experienced and passionate Full Stack Developer with a strong foundation in web technologies
                and a keen eye for creating elegant solutions to complex problems. My journey in
                software development has equipped me with a diverse skill set and the ability to
                work effectively across the entire development stack.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                I believe in writing clean, maintainable code and staying up-to-date with the
                latest industry trends and best practices. When I&apos;m not coding, you can find me
                exploring new technologies, contributing to open-source projects, or sharing my
                knowledge with the developer community.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-8 text-3xl font-bold">Skills & Technologies</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {skills.map((skillGroup) => (
                <div
                  key={skillGroup.category}
                  className="rounded-lg border bg-card p-6 shadow-sm"
                >
                  <h3 className="mb-4 text-xl font-semibold">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 