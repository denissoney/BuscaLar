
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

export default function PerfilEditado() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#111111",
    laranja: "#FF8C00",
  };

  const styles = criarEstilos(cores);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={cores.fundo}
      />

      {/* LOGO */}
      <View style={styles.logoArea}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoImg}
          resizeMode="contain"
          accessibilityLabel="Logo do BuscaLar"
        />
      </View>

      {/* CONTEÚDO */}
      <View style={styles.conteudo}>
        <Image
          source={require("../../assets/images/check_sucesso.png")}
          style={styles.checkImg}
          resizeMode="contain"
          accessibilityLabel="Confirmação de sucesso"
        />

        <Text style={styles.titulo}>
          Perfil editado com{"\n"}sucesso!
        </Text>

        <Image
          source={require("../../assets/images/casa_chaves.png")}
          style={styles.casaImg}
          resizeMode="contain"
          accessibilityLabel="Casa com chaves"
        />

        <TouchableOpacity
          style={styles.btnLaranja}
          onPress={() => router.replace("/(tabs)" as any)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Explorar imóveis"
        >
          <Text style={styles.btnTexto}>Explorar imóveis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  texto: string;
  laranja: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    logoArea: {
      alignItems: "center",
      marginBottom: 10,
      paddingHorizontal: 20,
    },

    logoImg: {
      width: 260,
      height: 90,
    },

    conteudo: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 20,
      paddingBottom: 20,
    },

    checkImg: {
      width: 160,
      height: 160,
      marginTop: 0,
      marginBottom: 15,
    },

    titulo: {
      fontSize: 25,
      fontWeight: "700",
      color: cores.texto,
      textAlign: "center",
      lineHeight: 32,
      marginTop: 10,
      marginBottom: 15,
    },

    casaImg: {
      width: 160,
      height: 120,
      marginTop: 25,
      marginBottom: 25,
    },

    btnLaranja: {
      backgroundColor: cores.laranja,
      minHeight: 46,
      borderRadius: 8,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "auto",
      paddingHorizontal: 16,
    },

    btnTexto: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 14,
    },
  });
}
