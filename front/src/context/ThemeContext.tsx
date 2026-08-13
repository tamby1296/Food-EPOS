import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "food-epos-theme";

interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

const getStoredTheme = (): Theme => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.mode = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
