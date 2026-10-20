
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

export default function Sobre() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    caixa: dark ? "#242424" : "#F8F8F8",
    texto: dark ? "#F5F5F5" : "#000000",
    textoSecundario: dark ? "#BDBDBD" : "#555555",
    borda: dark ? "#383838" : "#E9E9E9",
    azul: "#488AFF",
    azulIcone: "#0B5FFF",
    laranja: "#FF8C00",
  };

  const styles = criarEstilos(cores);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      {/* CABEÇALHO AZUL */}
      <View style={styles.headerAzul}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* CARTÃO PRINCIPAL */}
      <View style={styles.cardBranco}>
        {/* VOLTAR */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={cores.texto}
          />
        </TouchableOpacity>

        {/* TÍTULO */}
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Sobre o aplicativo</Text>

          {/* DETALHE LARANJA */}
          <View style={styles.linhaLaranjaContainer}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </View>

          <Text style={styles.versao}>Versão 1.0.0</Text>
        </View>

        {/* CONTEÚDO */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollConteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* APRESENTAÇÃO E MISSÃO */}
          <View style={styles.boxCinza}>
            <Text style={styles.textoDescricao}>
              BuscaLar é a plataforma que conecta você ao seu lar ideal.
              {"\n\n"}
              Busque imóveis para alugar de forma rápida, segura e
              personalizada, tudo em um só lugar.
            </Text>

            <View style={styles.missaoRow}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="globe-outline"
                  size={14}
                  color={cores.azulIcone}
                />
              </View>

              <Text style={styles.missaoTitulo}>Nossa Missão</Text>
            </View>

            <Text style={styles.missaoTexto}>
              Facilitar a jornada de encontrar um lar, oferecendo
              tecnologia, transparência e confiança para ajudar você
              a tomar uma boa decisão para si e sua família.
            </Text>
          </View>

          {/* RECURSOS */}
          <View style={styles.boxCinza}>
            <View style={styles.recursosHeader}>
              <Ionicons
                name="megaphone-outline"
                size={17}
                color={cores.azulIcone}
              />

              <Text style={styles.missaoTitulo}>Recursos</Text>
            </View>

            {/* BUSCA INTELIGENTE */}
            <View style={styles.recursoItem}>
              <Ionicons
                name="search-outline"
                size={18}
                color={cores.azulIcone}
              />

              <View style={styles.recursoConteudo}>
                <Text style={styles.recursoTitulo}>
                  Busca Inteligente
                </Text>

                <Text style={styles.recursoDesc}>
                  Filtros por preço, bairro, tipo de imóvel e
                  características.
                </Text>
              </View>
            </View>

            {/* FAVORITOS */}
            <View style={styles.recursoItem}>
              <Ionicons
                name="heart-outline"
                size={18}
                color={cores.azulIcone}
              />

              <View style={styles.recursoConteudo}>
                <Text style={styles.recursoTitulo}>
                  Imóveis Favoritos
                </Text>

                <Text style={styles.recursoDesc}>
                  Salve seus imóveis preferidos para encontrá-los
                  com facilidade.
                </Text>
              </View>
            </View>

            {/* NOTIFICAÇÕES */}
            <View style={styles.recursoItem}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color={cores.azulIcone}
              />

              <View style={styles.recursoConteudo}>
                <Text style={styles.recursoTitulo}>
                  Alertas Personalizados
                </Text>

                <Text style={styles.recursoDesc}>
                  Receba notificações sobre novidades e imóveis
                  de seu interesse, quando esse recurso estiver ativo.
                </Text>
              </View>
            </View>
          </View>

          {/* DESENVOLVEDORES */}
          <Text style={styles.devTitulo}>Desenvolvedores</Text>

          <View style={styles.devRow}>
            {/* DESENVOLVEDOR 1 */}
            <View style={styles.devCard}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=8" }}
                style={styles.devAvatar}
                resizeMode="cover"
              />

              <Text style={styles.devNome}>Davi Miguel</Text>

              <Text style={styles.devCargo}>
                Design e Front-end
              </Text>
            </View>

            {/* DESENVOLVEDOR 2 */}
            <View style={styles.devCard}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=12" }}
                style={styles.devAvatar}
                resizeMode="cover"
              />

              <Text style={styles.devNome}>Denisoney</Text>

              <Text style={styles.devCargo}>
                Desenvolvedor Full Stack
              </Text>
            </View>
          </View>

          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>
              BuscaLar — encontre seu próximo lar.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  caixa: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  azulIcone: string;
  laranja: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azul,
    },

    headerAzul: {
      backgroundColor: cores.azul,
      width: "100%",
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },

    logoRow: {
      width: "100%",
      height: 80,
      alignItems: "center",
      justifyContent: "center",
    },

    logo: {
      width: 210,
      height: 70,
    },

    cardBranco: {
      flex: 1,
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      paddingHorizontal: 16,
      paddingTop: 12,
      marginTop: -2,
      overflow: "hidden",
    },

    backBtn: {
      alignSelf: "flex-start",
      padding: 6,
      marginBottom: 2,
    },

    tituloContainer: {
      alignItems: "center",
      marginTop: 4,
      marginBottom: 16,
    },

    titulo: {
      fontSize: 18,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
    },

    versao: {
      fontSize: 11,
      color: cores.textoSecundario,
      marginTop: 7,
    },

    linhaLaranjaContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      marginTop: 7,
      height: 4,
      backgroundColor: cores.laranja,
      borderRadius: 10,
      paddingHorizontal: 2,
    },

    traco: {
      height: 2.8,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
    },

    scroll: {
      flex: 1,
    },

    scrollConteudo: {
      paddingBottom: 30,
    },

    boxCinza: {
      backgroundColor: cores.caixa,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 14,
      padding: 14,
      marginBottom: 14,
    },

    textoDescricao: {
      fontSize: 12,
      color: cores.textoSecundario,
      lineHeight: 19,
    },

    missaoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginTop: 14,
      marginBottom: 6,
    },

    iconCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: cores.azulIcone,
      alignItems: "center",
      justifyContent: "center",
    },

    missaoTitulo: {
      fontSize: 14,
      fontWeight: "800",
      color: cores.texto,
    },

    missaoTexto: {
      fontSize: 12,
      color: cores.textoSecundario,
      lineHeight: 18,
    },

    recursosHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginBottom: 14,
    },

    recursoItem: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 15,
      alignItems: "flex-start",
    },

    recursoConteudo: {
      flex: 1,
    },

    recursoTitulo: {
      fontSize: 12,
      fontWeight: "800",
      color: cores.texto,
    },

    recursoDesc: {
      fontSize: 11,
      color: cores.textoSecundario,
      marginTop: 3,
      lineHeight: 16,
    },

    devTitulo: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.texto,
      marginTop: 4,
      marginBottom: 14,
    },

    devRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 12,
    },

    devCard: {
      alignItems: "center",
      width: "45%",
      backgroundColor: cores.superficie,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 14,
      padding: 12,
    },

    devAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 8,
      backgroundColor: cores.caixa,
    },

    devNome: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
      textAlign: "center",
    },

    devCargo: {
      fontSize: 10,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 4,
      lineHeight: 15,
    },

    rodape: {
      alignItems: "center",
      marginTop: 20,
      paddingVertical: 8,
    },

    rodapeTexto: {
      fontSize: 11,
      color: cores.textoSecundario,
      textAlign: "center",
    },
  });
}
