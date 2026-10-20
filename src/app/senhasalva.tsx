
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

export default function SenhaSalva() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#000000",
    textoSecundario: dark ? "#BDBDBD" : "#555555",
    laranja: "#FF8C00",
  };

  const styles = criarEstilos(cores);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* LOGO */}
      <View style={styles.logoArea}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGEM DE SUCESSO */}
        <Image
          source={require("../../assets/images/check_sucesso.png")}
          style={styles.checkImg}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>
          Senha salva com{"\n"}sucesso!
        </Text>

        <Text style={styles.sub}>
          Sua senha foi salva com sucesso. Agora{"\n"}
          você pode explorar milhares de imóveis{"\n"}
          para alugar!
        </Text>

        {/* IMAGEM DA CASA COM CHAVES */}
        <Image
          source={require("../../assets/images/casa_chaves.png")}
          style={styles.casaImg}
          resizeMode="contain"
        />
      </ScrollView>

      {/* BOTÃO INFERIOR */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.replace("/(tabs)" as any)}
          activeOpacity={0.8}
        >
          <Text style={styles.btnTxt}>Explorar Imóveis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  texto: string;
  textoSecundario: string;
  laranja: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    logoArea: {
      alignItems: "center",
      paddingTop: 12,
      paddingBottom: 8,
    },

    logo: {
      width: 210,
      height: 100,
    },

    scroll: {
      flex: 1,
    },

    conteudo: {
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 10,
      paddingBottom: 20,
    },

    checkImg: {
      width: 180,
      height: 160,
      marginBottom: 10,
    },

    titulo: {
      fontSize: 22,
      fontWeight: "900",
      color: cores.texto,
      textAlign: "center",
      lineHeight: 28,
      marginBottom: 12,
    },

    sub: {
      fontSize: 12,
      color: cores.textoSecundario,
      textAlign: "center",
      lineHeight: 18,
      marginBottom: 10,
    },

    casaImg: {
      width: 220,
      height: 150,
      marginTop: 10,
    },

    footer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 12,
    },

    btn: {
      backgroundColor: cores.laranja,
      minHeight: 46,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },

    btnTxt: {
      color: "#FFFFFF",
      fontWeight: "800",
      fontSize: 14,
    },
  });
}
