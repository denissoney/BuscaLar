import React, { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../contexts/ThemeContext";

export default function CadastroConcluido() {
  const router = useRouter();
  const { dark } = useTheme();
  const { width } = useWindowDimensions();
  // Cores adaptadas ao tema
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#000000",
    textoSecundario: dark ? "#CCCCCC" : "#444444",
    botao: "#FF8C00",
    textoBotao: "#FFFFFF",
  };
  const styles = criarEstilos(cores, width);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden").catch(() => {});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Ícone de cadastro concluído */}
        <Image
          source={require("../../assets/images/check_sucesso.png")}
          style={styles.imagemCheck}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>
          Cadastro Concluído{"\n"}com sucesso!
        </Text>

        <Text style={styles.sub}>
          Sua conta foi criada com sucesso. Agora{"\n"}
          você pode explorar milhares de imóveis{"\n"}
          para alugar!
        </Text>

        {/* Ilustração da casa */}
        <Image
          source={require("../../assets/images/casa_chaves.png")}
          style={styles.imagemCasa}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.8}
          onPress={() => router.replace("/(tabs)" as any)}
        >
          <Text style={styles.botaoText}>Explorar Imóveis</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const criarEstilos = (
  cores: {
    fundo: string;
    texto: string;
    textoSecundario: string;
    botao: string;
    textoBotao: string;
  },
  larguraTela: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    scroll: {
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 10,
      paddingBottom: 30,
    },

    logo: {
      width: Math.min(larguraTela * 0.55, 200),
      height: 70,
      marginTop: 5,
    },

    imagemCheck: {
      width: 200,
      height: 200,
      marginTop: 25,
    },

    titulo: {
      fontSize: 22,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
      marginTop: 18,
      lineHeight: 27,
    },

    sub: {
      fontSize: 13,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 8,
      lineHeight: 18,
    },

    imagemCasa: {
      width: Math.min(larguraTela * 0.65, 220),
      height: 150,
      marginTop: 28,
      marginBottom: 28,
    },

    botao: {
      width: "100%",
      minHeight: 48,
      backgroundColor: cores.botao,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      paddingHorizontal: 12,
    },

    botaoText: {
      color: cores.textoBotao,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
