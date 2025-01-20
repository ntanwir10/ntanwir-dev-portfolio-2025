"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Header } from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const socialLinks = [
  {
    name: "Email",
    href: "mailto:ntanwir10@gmail.com",
    icon: FaEnvelope,
  },
  {
    name: "GitHub",
    href: "https://github.com/ntanwir10",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/naumantanwir",
    icon: FaLinkedin,
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold">Get in Touch</h1>
              <p className="text-lg text-muted-foreground">
                Have a question or want to work together? Feel free to reach out!
              </p>
            </div>

            <div className="mb-12 flex justify-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                );
              })}
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <Input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your name"
                  className={errors.name ? "border-red-500" : ""}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Your email"
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  placeholder="Your message"
                  className={errors.message ? "border-red-500" : ""}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-red-500"
                >
                  {submitError}
                </motion.p>
              )}

              {submitSuccess && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-green-500"
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.p>
              )}
            </motion.form>
          </div>
        </div>
      </main>
    </div>
  );
} 