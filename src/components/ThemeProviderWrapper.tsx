
"use client"; // Ensure this directive is present

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
