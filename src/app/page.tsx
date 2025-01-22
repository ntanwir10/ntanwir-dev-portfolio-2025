"use client";

import { Header } from "@/components/layout/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center">
        <section className="container py-8">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start space-y-4"
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Nauman Tanwir
                </span>
              </h1>
              <h2 className="text-xl font-medium text-muted-foreground md:text-2xl">
                A Full-Stack Developer & Cloud IaC Enthusiast
              </h2>
              <p className="max-w-[600px] text-base text-muted-foreground md:text-lg">
                I build and architect scalable, inclusive products and digital experiences.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  View Projects
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-black px-4 py-2 transition-colors hover:bg-gray-100 dark:border-white dark:hover:bg-white/10"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-auto aspect-square w-full max-w-[400px]"
            >
              <Image
                src="/developer-illustration.svg"
                alt="Developer Illustration"
                fill
                priority
                className="dark:invert"
              />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
