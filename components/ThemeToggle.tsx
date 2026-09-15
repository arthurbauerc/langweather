"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("langweather-theme", dark ? "dark" : "light");
  }, [dark]);

  if (dark === null) return <div className="h-7 w-14" />;

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label="Alternar tema claro/escuro"
      aria-pressed={dark}
      className="relative flex h-7 w-14 shrink-0 items-center rounded-full border border-line bg-ink/40 px-1 transition-colors"
    >
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-rain text-[11px] leading-none transition-transform duration-200"
        style={{ transform: dark ? "translateX(0px)" : "translateX(26px)" }}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
