import { create } from "zustand";
import { useEffect } from "react";

export const useThemeStore = create((set) => ({
  theme: "coffee", // Default theme (fallback)
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    document.documentElement.setAttribute("data-theme", theme); // 🔹 Auto-apply theme
    set({ theme });
  },
}));

// 🔹 Hook to sync theme state with localStorage (prevents hydration issues)
export const useSyncTheme = () => {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("chat-theme") || "coffee";
    setTheme(savedTheme);
  }, [setTheme]);
};
