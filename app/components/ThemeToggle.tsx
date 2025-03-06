"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    try {
      const isCurrentlyDark = document.documentElement.classList.contains("dark");
      
      if (isCurrentlyDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem('theme', 'dark');
      }
      
      setIsDark(!isCurrentlyDark);
    } catch (error) {
      console.error("切换主题错误：", error);
    }
  };

  if (!mounted) {
    return (
      <button aria-label="切换主题" className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 dark:bg-gray-700 text-amber-700 dark:text-amber-300">
        <span>🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="切换主题"
      className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 dark:bg-gray-700 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-gray-600 transition-colors"
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
} 