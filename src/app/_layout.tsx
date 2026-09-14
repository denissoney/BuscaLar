import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="perfil-proprietario" />
        <Stack.Screen name="configuracoes" />
        <Stack.Screen name="editarperfil" />
        <Stack.Screen name="privacidade" />
        <Stack.Screen name="alterarsenha" />
        <Stack.Screen name="suporte" />
        <Stack.Screen name="perfileditado" />
      </Stack>
    </ThemeProvider>
  );
}
