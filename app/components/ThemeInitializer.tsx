"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    try {
      // 检查本地存储的主题偏好
      const savedTheme = localStorage.getItem('theme');
      
      // 检查用户系统偏好的配色方案
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // 根据本地存储或用户偏好设置初始主题
      if (savedTheme === 'dark' || (savedTheme === null && isDarkMode)) {
        document.documentElement.classList.add('dark');
        console.log("主题初始化器：应用暗色主题");
      } else {
        document.documentElement.classList.remove('dark');
        console.log("主题初始化器：应用亮色主题");
      }
      
      // 监听系统主题变化
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        // 只有在用户没有手动设置主题的情况下跟随系统
        if (!localStorage.getItem('theme')) {
          document.documentElement.classList.toggle('dark', e.matches);
          console.log("系统主题变化：", e.matches ? "暗色" : "亮色");
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      // 如果访问localStorage失败，可能是在服务器端
      console.error("主题初始化错误：", error);
    }
  }, []);
  
  return null;
} 