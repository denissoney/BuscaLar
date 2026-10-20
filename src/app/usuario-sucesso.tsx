
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
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../contexts/ThemeContext";

export default function SalvoSucesso() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#000000",
    textoSecundario: dark ? "#BDBDBD" : "#333333",
    botao: "#FF8C00",
  };

  const styles = criarEstilos(cores);

  const voltarPerfil = () => {
    router.replace("/usuario" as any);
  };

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
      <StatusBar/>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Logo do BuscaLar */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo BuscaLar"
          />

          {/* Ícone de sucesso */}
          <Image
            source={require("../../assets/images/check_sucesso.png")}
            style={styles.check}
            resizeMode="contain"
            accessibilityLabel="Operação realizada com sucesso"
          />

          {/* Título */}
          <Text style={styles.title}>
            Usuário salvo com sucesso!
          </Text>

          {/* Descrição */}
          <Text style={styles.subTitle}>
            Seu perfil foi atualizado com sucesso. Agora você pode
            explorar milhares de imóveis para alugar!
          </Text>

          {/* Ilustração da casa com chaves */}
          <Image
            source={require("../../assets/images/casa_chaves.png")}
            style={styles.casa}
            resizeMode="contain"
            accessibilityLabel="Casa com chaves"
          />

          {/* Botão para voltar ao perfil */}
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={voltarPerfil}
            accessibilityRole="button"
            accessibilityLabel="Voltar para o perfil"
          >
            <Text style={styles.btnText}>
              Voltar para o perfil
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  texto: string;
  textoSecundario: string;
  botao: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    scrollContent: {
      flexGrow: 1,
    },

    content: {
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 24,
    },

    logo: {
      width: 220,
      height: 70,
      marginBottom: 30,
    },

    check: {
      width: 140,
      height: 140,
      marginBottom: 20,
    },

    title: {
      fontSize: 22,
      fontWeight: "900",
      color: cores.texto,
      textAlign: "center",
      lineHeight: 28,
    },

    subTitle: {
      fontSize: 13,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 12,
      lineHeight: 20,
      paddingHorizontal: 10,
    },

    casa: {
      width: 180,
      height: 140,
      marginTop: 30,
      marginBottom: 24,
    },

    btn: {
      width: "100%",
      minHeight: 50,
      backgroundColor: cores.botao,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      marginTop: "auto",
    },

    btnText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "800",
      textAlign: "center",
    },
  });
}
