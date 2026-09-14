import { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  dark: boolean;
  setDark: (v: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({ dark: false, setDark: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  return <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}