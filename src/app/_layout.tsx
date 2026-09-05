import { useEffect } from "react";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      (async () => {
        try {
          // @ts-ignore - esconde a barra do celular
          await (NavigationBar as any).setVisibilityAsync("hidden");
          // @ts-ignore - só aparece se arrastar
          await (NavigationBar as any).setBehaviorAsync?.("overlay-swipe");
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}