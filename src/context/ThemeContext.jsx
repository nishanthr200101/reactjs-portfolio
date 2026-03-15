import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const VALID_THEMES = ["orange", "blue", "purple", "green"];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "orange";
  });

  // Fetch default theme from API on mount (falls back to localStorage or "orange")
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    if (!apiBase) return;

    const stored = localStorage.getItem("portfolio-theme");
    if (stored) return; // user has a local preference, don't override

    fetch(`${apiBase}/settings/public`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.defaultTheme && VALID_THEMES.includes(data.defaultTheme)) {
          setTheme(data.defaultTheme);
        }
      })
      .catch(() => {}); // silently fail — API may be sleeping
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "orange") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = theme;
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
