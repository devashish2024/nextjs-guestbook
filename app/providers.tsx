"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute={"class"}
    >
      <ClerkProvider>{children}</ClerkProvider>
    </ThemeProvider>
  );
}
