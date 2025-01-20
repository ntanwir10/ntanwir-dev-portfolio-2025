"use client";

import { usePathname } from "next/navigation";
import { ConnectSection } from "./ConnectSection";

export function ConnectSectionWrapper() {
  const pathname = usePathname();
  
  if (pathname === "/contact") {
    return null;
  }
  
  return <ConnectSection />;
} 