import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { ConnectSectionWrapper } from "@/components/shared/ConnectSectionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nauman Tanwir | Full Stack Engineer and Cloud Enthusiast",
  description: "An experienced Full Stack engineer with a passion for building web applications and solving complex problems.",
  icons: {
    icon: [
      {
        url: "/icons/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        url: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/icons/site.webmanifest",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nauman Tanwir",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ConnectSectionWrapper />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}