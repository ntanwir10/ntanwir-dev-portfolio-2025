import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { ConnectSectionWrapper } from "@/components/shared/ConnectSectionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nauman Tanwir | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </body>
    </html>
  );
}