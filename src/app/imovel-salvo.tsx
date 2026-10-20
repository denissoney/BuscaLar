
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
    texto: dark ? "#F5F5F5" : "#111111",
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
          accessibilityLabel="Logo BuscaLar"
        />
      </View>

      {/* CONTEÚDO DE SUCESSO */}
      <View style={styles.conteudo}>
        <Image
          source={require("../../assets/images/check_sucesso.png")}
          style={styles.checkImg}
          resizeMode="contain"
          accessibilityLabel="Operação concluída com sucesso"
        />

        <Text style={styles.titulo}>
          Imóvel salvo com{"\n"}sucesso!
        </Text>

        <Text style={styles.sub}>
          Seu imóvel foi salvo com sucesso. Agora{"\n"}
          você pode explorar milhares de imóveis{"\n"}
          para alugar!
        </Text>

        {/* ILUSTRAÇÃO DA CASA */}
        <Image
          source={require("../../assets/images/casa_chaves.png")}
          style={styles.casaImg}
          resizeMode="contain"
          accessibilityLabel="Ilustração de uma casa com chaves"
        />
      </View>

      {/* BOTÃO INFERIOR */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            router.push("/perfil-proprietario" as any)
          }
          activeOpacity={0.8}
        >
          <Text style={styles.btnTxt}>
            Voltar para o perfil
          </Text>
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
      height: 110,
    },

    conteudo: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingTop: 10,
    },

    checkImg: {
      width: 180,
      height: 180,
      marginBottom: 10,
    },

    titulo: {
      fontSize: 22,
      fontWeight: "900",
      color: cores.texto,
      textAlign: "center",
      lineHeight: 26,
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
      paddingBottom: 12,
      paddingTop: 10,
    },

    btn: {
      backgroundColor: cores.laranja,
      height: 46,
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
