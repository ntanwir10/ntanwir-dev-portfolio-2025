import { Header } from "@/components/layout/Header";
import AboutSVG from "@/components/AboutSVG";

const skills = [
  {
    category: "Frontend",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5/CSS3",
    ],
  },
  {
    category: "Backend",
    technologies: [
      "Node.js",
      "Express",
      "Python",
      "FastAPI",
      "RESTful APIs",
      "OAuth",
      "Passport.js",
      "JWT",
      "Serverless",
      "Micro-services",
    ],
  },
  {
    category: "Database",
    technologies: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
      "AWS DynamoDB",
    ],
  },
  {
    category: "DevOps & Infrastructure",
    technologies: [
      "Git",
      "GitHub Actions",
      "Gitlab CI",
      "Jenkins",
      "YAML",
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Linux",
      "Shell Scripting",
      "Terraform",
    ],
  },
  {
    category: "Caching",
    technologies: ["Redis", "Memcached"],
  },
  {
    category: "AWS",
    technologies: [
      "AWS EC2",
      "AWS S3",
      "AWS Lambda",
      "Amazon API Gateway",
      "AWS CloudFormation",
      "AWS ElastiCache",
      "AWS ECR",
      "AWS ECS",
      "AWS EKS",
      "AWS Fargate",
      "AWS SNS",
      "AWS SQS",
      "AWS SES",
      "AWS Secrets Manager",
    ],
  },
  {
    category: "Logging and Monitoring",
    technologies: [
      "AWS CloudWatch",
      "AWS CloudTrail",
      "AWS CloudWatch Logs",
      "Sentry.io",
    ],
  },
  {
    category: "Azure",
    technologies: [
      "Azure Functions",
      "Azure App Service",
      "Azure Storage",
      "Azure Active Directory",
      "ARM Templates",
    ],
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
        <div className="container mx-auto py-12">
          <div className="relative flex flex-col items-center">
            <div className="flex flex-col-reverse md:flex-row items-start justify-between w-full gap-8">
              <section className="w-full md:w-1/2 mb-12">
                <h1 className="mb-8 text-4xl font-bold">About Me</h1>
                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-lg text-muted-foreground">
                    I am an experienced and passionate Full Stack Developer with
                    a strong foundation in web technologies and a keen eye for
                    creating elegant solutions to complex problems. My journey
                    in software development has equipped me with a diverse skill
                    set and the ability to work effectively across the entire
                    development stack.
                  </p>
                  <p className="mt-4 text-lg text-muted-foreground">
                    I believe in writing clean, maintainable code and staying
                    up-to-date with the latest industry trends and best
                    practices. When I&apos;m not coding, you can find me
                    exploring new technologies, contributing to open-source
                    projects, or sharing my knowledge with the developer
                    community.
                  </p>
                </div>
              </section>
              <div className="w-full md:w-1/2">
                <AboutSVG />
              </div>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="mb-8 text-3xl font-bold text-center">
              Skills & Technologies
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skillGroup) => (
                <div
                  key={skillGroup.category}
                  className="rounded-lg border bg-card p-6 shadow-sm"
                >
                  <h3 className="mb-4 text-xl font-semibold">
                    {skillGroup.category}
                  </h3>
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
