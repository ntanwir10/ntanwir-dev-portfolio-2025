"use client";

import { motion } from "framer-motion";

export function ConnectSection() {
  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Make sure to add your resume PDF to the public folder
    link.download = "nauman-tanwir-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="border-t bg-primary/5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"
      >
        <h2 className="text-3xl font-bold">Let&apos;s get connected and work together.</h2>
        <button
          onClick={handleDownloadResume}
          className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-transparent px-4 py-2 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Download resume
        </button>
      </motion.div>
    </section>
  );
} 