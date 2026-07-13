"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function useBrowserTheme() {
  const [browserTheme, setBrowserTheme] = React.useState<
    "light" | "dark" | "unknown"
  >(() => {
    if (typeof window === "undefined") return "unknown";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      setBrowserTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return browserTheme;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const browserTheme = useBrowserTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-md relative group"
          />
        }
      >
        <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <SunIcon data-icon="inline-start" />
          <span>Light</span>
          {theme === "light" && (
            <span className="ml-auto size-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <MoonIcon data-icon="inline-start" />
          <span>Dark</span>
          {theme === "dark" && (
            <span className="ml-auto size-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <MonitorIcon data-icon="inline-start" />
          <span>System</span>
          {theme === "system" && (
            <span className="ml-auto size-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <div className="border-t border-border mt-1 pt-1.5 pb-1 px-2 text-[10px] text-muted-foreground flex flex-col gap-0.5 select-none">
          <span className="font-semibold uppercase tracking-wider text-[8px] opacity-75">
            Browser Preference
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${browserTheme === "dark" ? "bg-purple-500 animate-pulse" : "bg-yellow-500 animate-pulse"}`}
            />
            <span>
              Detected:{" "}
              <strong className="capitalize text-foreground font-medium">
                {browserTheme}
              </strong>
            </span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
