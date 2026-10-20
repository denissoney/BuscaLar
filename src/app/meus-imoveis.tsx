
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";

const IMOVEIS = [
  {
    id: "1",
    titulo: "Apartamento 2 quartos",
    preco: "R$ 1.000/mês",
    local: "Ponta Verde, Maceió",
    imagem:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
  },
  {
    id: "2",
    titulo: "Casa com Piscina",
    preco: "R$ 1.300/mês",
    local: "Ponta Verde, Maceió",
    imagem:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
  },
  {
    id: "3",
    titulo: "Casa com Piscina",
    preco: "R$ 1.560/mês",
    local: "Ponta Verde, Maceió",
    imagem:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
  },
];

export default function MeusImoveisScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const { dark } = useTheme();

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#555555",
    borda: dark ? "#444444" : "#D9D9D9",
    laranja: "#FF8C00",
    azul: "#2196F3",
    imagemFundo: dark ? "#292929" : "#EEEEEE",
  };

  const styles = criarEstilos(cores);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.menuBtn}
            activeOpacity={0.7}
            accessibilityLabel="Abrir menu"
          >
            <View style={styles.hamburgerLineLong} />
            <View style={styles.hamburgerLineMedium} />
            <View style={styles.hamburgerLineShort} />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logoImg}
            resizeMode="contain"
          />

          <View style={styles.espacoLateral} />
        </View>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.whiteCard}>
        <View style={styles.titleRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.botaoVoltar}
            accessibilityLabel="Voltar"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={cores.texto}
            />
          </Pressable>

          <View>
            <Text style={styles.title}>Meus Imóveis</Text>

            <View style={styles.linhaConicaWrapper}>
              <View style={styles.linhaLaranjaUnica} />
              <View style={styles.corteFundo} />
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
        >
          {IMOVEIS.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: item.imagem }}
                style={styles.cardImg}
                resizeMode="cover"
              />

              <View style={styles.cardInfo}>
                <Text
                  style={styles.cardTitulo}
                  numberOfLines={1}
                >
                  {item.titulo}
                </Text>

                <Text style={styles.cardPreco}>
                  {item.preco}
                </Text>

                <View style={styles.cardLocalRow}>
                  <Ionicons
                    name="location-sharp"
                    size={14}
                    color={cores.textoSecundario}
                  />

                  <Text
                    style={styles.cardLocal}
                    numberOfLines={2}
                  >
                    {item.local}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* MENU LATERAL */}
      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
      />
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  laranja: string;
  azul: string;
  imagemFundo: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azul,
    },

    header: {
      backgroundColor: cores.azul,
      paddingHorizontal: 16,
      paddingTop: 4,
      paddingBottom: 12,
    },

    logoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginTop: -4,
    },

    logoImg: {
      width: 200,
      height: 90,
      marginTop: 2,
    },

    espacoLateral: {
      width: 32,
    },

    menuBtn: {
      width: 32,
      height: 30,
      justifyContent: "flex-start",
      gap: 5,
      paddingLeft: 2,
      marginTop: 6,
    },

    hamburgerLineLong: {
      width: 22,
      height: 3,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    hamburgerLineMedium: {
      width: 16,
      height: 3,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    hamburgerLineShort: {
      width: 11,
      height: 3,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    whiteCard: {
      flex: 1,
      backgroundColor: cores.superficie,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 16,
      paddingTop: 16,
      borderWidth: 2,
      borderBottomWidth: 0,
      borderColor: cores.azul,
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 20,
    },

    botaoVoltar: {
      width: 32,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
    },

    title: {
      fontSize: 20,
      fontWeight: "700",
      color: cores.texto,
    },

    linhaConicaWrapper: {
      width: 55,
      height: 4,
      marginTop: 5,
      backgroundColor: cores.laranja,
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
    },

    linhaLaranjaUnica: {
      width: "100%",
      height: "100%",
      backgroundColor: cores.laranja,
    },

    corteFundo: {
      position: "absolute",
      right: -2,
      bottom: -6,
      width: 60,
      height: 8,
      backgroundColor: cores.superficie,
      transform: [{ rotate: "-7deg" }],
    },

    lista: {
      gap: 12,
      paddingBottom: 24,
    },

    card: {
      flexDirection: "row",
      backgroundColor: cores.superficie,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 8,
      alignItems: "center",
    },

    cardImg: {
      width: 88,
      height: 66,
      borderRadius: 6,
      backgroundColor: cores.imagemFundo,
    },

    cardInfo: {
      flex: 1,
      marginLeft: 12,
      gap: 3,
    },

    cardTitulo: {
      fontSize: 14,
      fontWeight: "700",
      color: cores.texto,
    },

    cardPreco: {
      fontSize: 14,
      fontWeight: "800",
      color: cores.laranja,
    },

    cardLocalRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      marginTop: 2,
    },

    cardLocal: {
      flex: 1,
      fontSize: 12,
      color: cores.textoSecundario,
    },
  });
}
