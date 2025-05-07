"use client";

import React from "react";
import { useEffect, useState } from "react";

const AboutSVG: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform-gpu max-w-[800px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Frontend Section */}
        <g className={isClient ? "animate-pulse" : ""}>
          {/* Browser Icon */}
          <rect
            x="80"
            y="50"
            width="24"
            height="20"
            rx="2"
            className="stroke-muted-foreground fill-none"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1="58"
            x2="104"
            y2="58"
            className="stroke-muted-foreground"
            strokeWidth="1"
          />
          <circle cx="84" cy="54" r="1" className="fill-muted-foreground" />

          <text x="114" y="67" className="fill-primary text-[18px] font-bold">
            Frontend
          </text>
          <text x="80" y="110" className="fill-muted-foreground text-[15px]">
            React • Next.js
          </text>
          <text x="80" y="135" className="fill-muted-foreground text-[15px]">
            TypeScript
          </text>
          <text x="80" y="160" className="fill-muted-foreground text-[15px]">
            Tailwind CSS
          </text>
        </g>

        {/* Backend Section */}
        <g
          className={isClient ? "animate-pulse" : ""}
          style={{ animationDelay: "150ms" }}
        >
          {/* Server Icon */}
          <rect
            x="320"
            y="200"
            width="24"
            height="20"
            rx="2"
            className="stroke-muted-foreground fill-none"
            strokeWidth="1"
          />
          <line
            x1="324"
            y1="205"
            x2="340"
            y2="205"
            className="stroke-muted-foreground"
            strokeWidth="1"
          />
          <line
            x1="324"
            y1="210"
            x2="340"
            y2="210"
            className="stroke-muted-foreground"
            strokeWidth="1"
          />
          <line
            x1="324"
            y1="215"
            x2="340"
            y2="215"
            className="stroke-muted-foreground"
            strokeWidth="1"
          />

          <text x="354" y="215" className="fill-primary text-[18px] font-bold">
            Backend
          </text>
          <text x="320" y="260" className="fill-muted-foreground text-[15px]">
            Node.js • Python
          </text>
          <text x="320" y="285" className="fill-muted-foreground text-[15px]">
            FastAPI • Express
          </text>
          <text x="320" y="310" className="fill-muted-foreground text-[15px]">
            RESTful APIs
          </text>
        </g>

        {/* DevOps Section */}
        <g
          className={isClient ? "animate-pulse" : ""}
          style={{ animationDelay: "300ms" }}
        >
          {/* Cloud Icon */}
          <path
            d="M560 200 q10 -8 20 0 q5 -15 20 -10 q10 -5 20 5 q5 15 -5 20 h-50 q-10 -5 -5 -15"
            className="stroke-muted-foreground fill-none"
            strokeWidth="1"
          />

          <text x="630" y="210" className="fill-primary text-[18px] font-bold">
            DevOps
          </text>
          <text x="560" y="260" className="fill-muted-foreground text-[15px]">
            AWS • Docker
          </text>
          <text x="560" y="285" className="fill-muted-foreground text-[15px]">
            Kubernetes • Terraform
          </text>
          <text x="560" y="310" className="fill-muted-foreground text-[15px]">
            CI/CD • Monitoring
          </text>
        </g>

        {/* Database Section */}
        <g
          className={isClient ? "animate-pulse" : ""}
          style={{ animationDelay: "450ms" }}
        >
          {/* Database Icon */}
          <path
            d="M80 350 C80 340 110 340 110 350 L110 380 C110 390 80 390 80 380 Z"
            className="fill-none stroke-muted-foreground"
            strokeWidth="1"
          />
          <path
            d="M80 350 C80 360 110 360 110 350"
            className="fill-none stroke-muted-foreground"
            strokeWidth="1"
          />
          <path
            d="M80 365 C80 375 110 375 110 365"
            className="fill-none stroke-muted-foreground"
            strokeWidth="1"
          />

          <text x="120" y="365" className="fill-primary text-[18px] font-bold">
            Database
          </text>
          <text x="80" y="410" className="fill-muted-foreground text-[15px]">
            PostgreSQL • MongoDB
          </text>
          <text x="80" y="435" className="fill-muted-foreground text-[15px]">
            Redis • DynamoDB
          </text>
        </g>

        {/* Connecting Lines */}
        <g>
          {/* Frontend to Backend */}
          <line
            x1="220"
            y1="140"
            x2="300"
            y2="260"
            className="stroke-blue-500 opacity-70"
            strokeWidth="0.75"
          />
          <circle
            cx="220"
            cy="140"
            r="1.5"
            className={
              isClient
                ? "fill-blue-500 animate-ping opacity-75"
                : "fill-blue-500 opacity-75"
            }
          />

          {/* Backend to DevOps */}
          <line
            x1="450"
            y1="285"
            x2="550"
            y2="285"
            className="stroke-blue-500 opacity-70"
            strokeWidth="0.75"
          />
          <circle
            cx="450"
            cy="285"
            r="1.5"
            className={
              isClient
                ? "fill-blue-500 animate-ping opacity-75"
                : "fill-blue-500 opacity-75"
            }
          />

          {/* Database to Backend */}
          {/* <line
            x1="220"
            y1="430"
            x2="300"
            y2="310"
            className="stroke-blue-500 opacity-70"
            strokeWidth="0.75"
          /> */}
          <line
            x1="220"
            y1="380"
            x2="300"
            y2="260"
            className="stroke-blue-500 opacity-70"
            strokeWidth="0.75"
          ></line>
          <circle
            cx="220"
            cy="430"
            r="1.5"
            className={
              isClient
                ? "fill-blue-500 animate-ping opacity-75"
                : "fill-blue-500 opacity-75"
            }
          />
        </g>
      </svg>
    </div>
  );
};

export default AboutSVG;
