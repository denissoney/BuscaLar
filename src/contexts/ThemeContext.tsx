
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  dark: boolean;
  setDark: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dark, setDarkState] = useState(false);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarTema() {
      try {
        const temaSalvo = await AsyncStorage.getItem("temaEscuro");
        setDarkState(temaSalvo === "true");
      } catch (error) {
        console.error("Erro ao carregar o tema:", error);
      } finally {
        setCarregado(true);
      }
    }

    carregarTema();
  }, []);

  function setDark(value: boolean) {
    setDarkState(value);

    AsyncStorage.setItem("temaEscuro", String(value)).catch(
      (error) => {
        console.error("Erro ao salvar o tema:", error);
      }
    );
  }

  if (!carregado) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme deve ser usado dentro de ThemeProvider"
    );
  }

  return context;
}
