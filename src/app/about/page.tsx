import { Header } from "@/components/layout/Header";
import AboutSVG from "@/components/AboutSVG";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const skills = [
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
    category: "Caching",
    technologies: ["Redis", "Memcached"],
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
                    I&apos;m a Full Stack & DevOps Engineer with 7+ years of
                    experience delivering high-performance web applications and
                    secure cloud infrastructure. I specialize in designing and
                    building scalable systems using modern technologies across
                    the stack—from frontend UIs to backend APIs and cloud-native
                    deployments. On the full-stack side, I develop responsive,
                    performance-driven applications using React, Redux, Node.js,
                    and Python (FastAPI). My backend expertise includes REST API
                    design, asynchronous processing, and optimized database
                    modelling with PostgreSQL and NoSQL (e.g., DynamoDB).
                    I&apos;ve led the development of scalable microservices
                    architectures, reduced API response times by 35%, and
                    streamlined data operations with modular design patterns.
                  </p>
                  <p className="mt-4 text-lg text-muted-foreground">
                    On the DevOps side, I have deep hands-on experience with
                    AWS, Terraform, GitLab CI/CD, Docker, and Kubernetes,
                    managing IaC environments and enforcing compliance through
                    automated pipelines. I&apos;ve implemented secure CI/CD
                    workflows, secrets management with AWS Secrets Manager, and
                    self-healing deployments across production clusters. I bring
                    a holistic engineering mindset—from architecting cloud
                    infrastructure to writing clean, testable code. Whether you
                    need an end-to-end application build, a DevOps
                    transformation, or secure API integrations, I help teams
                    move fast without compromising quality.
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
