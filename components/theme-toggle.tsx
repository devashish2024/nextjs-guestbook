"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href="https://github.com/devashish2024/nextjs-guestbook"
        target="_blank"
      >
        <Button variant={"default"}>Source Code</Button>
      </Link>
      <Button variant={"outline"} onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </div>
  );
}
