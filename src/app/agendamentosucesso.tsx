
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

export default function AgendamentoSucesso() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#111111",
    textoSecundario: dark ? "#BDBDBD" : "#555555",
    botao: "#FF8C00",
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
      <ScrollView
        contentContainerStyle={styles.scrollConteudo}
        showsVerticalScrollIndicator={false}
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
        <View style={styles.conteudo}>
          {/* IMAGEM DE SUCESSO */}
          <Image
            source={require("../../assets/images/check_sucesso.png")}
            style={styles.checkImg}
            resizeMode="contain"
          />

          <Text style={styles.titulo}>
            Agendamento feito com{"\n"}sucesso!
          </Text>

          <Text style={styles.sub}>
            Seu agendamento foi confirmado com sucesso.
            {"\n"}Agora você pode acompanhar os detalhes
            {"\n"}do seu agendamento!
          </Text>

          {/* ILUSTRAÇÃO DA CASA */}
          <Image
            source={require("../../assets/images/casa_chaves.png")}
            style={styles.casaImg}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* BOTÃO INFERIOR */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.btnTxt}>Explorar Imóveis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const criarEstilos = (cores: {
  fundo: string;
  texto: string;
  textoSecundario: string;
  botao: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    scrollConteudo: {
      flexGrow: 1,
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
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 10,
      paddingBottom: 20,
    },

    checkImg: {
      width: 180,
      height: 180,
      marginBottom: 12,
      marginTop: 0,
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
      backgroundColor: cores.botao,
      minHeight: 48,
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
