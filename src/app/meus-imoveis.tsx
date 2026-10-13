import { View, Text, Image, StyleSheet, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import MenuDrawer from "./componets/MenuDrawer";
import React from "react";

const IMOVEIS = [
  {
    id: "1",
    titulo: "Apartamento 2 quartos",
    preco: "R$ 1.000/mês",
    local: "Ponta verde, Maceió",
    imagem: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
  },
  {
    id: "2",
    titulo: "Casa com Piscina",
    preco: "R$ 1.300/mês",
    local: "Ponta verde, Maceió",
    imagem: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
  },
  {
    id: "3",
    titulo: "Casa com Piscina",
    preco: "R$ 1.560/mês",
    local: "Ponta verde, Maceió",
    imagem: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
  },
];

export default function MeusImoveisScreen() {
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const abrirMenu = () => setMenuAberto(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER AZUL */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <TouchableOpacity onPress={abrirMenu} style={styles.menuBtn} activeOpacity={0.7}>
            <View style={styles.hamburgerLineLong} />
            <View style={styles.hamburgerLineMedium} />
            <View style={styles.hamburgerLineShort} />
          </TouchableOpacity>
          <Image source={require("../../assets/images/BuscaLar-preto.png")} style={styles.logoImg} resizeMode="contain" />
          <View style={{ width: 32 }} />
        </View>
      </View>

      <View style={styles.whiteCard}>
        <View style={styles.titleRow}>
          <Pressable><Ionicons name="arrow-back" size={20} color="black" /></Pressable>
          <View>
            <Text style={styles.title}>Meus Imoveis</Text>
              <View style={styles.linhaConicaWrapper}>
              <View style={styles.linhaLaranjaUnica} />
              <View style={styles.corteBranco} />
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 20 }}>
          {IMOVEIS.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.cardImg} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitulo} numberOfLines={1}>{item.titulo}</Text>
                <Text style={styles.cardPreco}>{item.preco}</Text>
                <View style={styles.cardLocalRow}>
                  <Ionicons name="location-sharp" size={14} color="black" />
                  <Text style={styles.cardLocal}>{item.local}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <MenuDrawer visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2196F3" },
  header: {
    backgroundColor: "#2196F3",
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
  menuBtn: {
    width: 32,
    height: 24,
    justifyContent: "flex-start",
    gap: 5,
    paddingLeft: 2,
    marginTop: 6,
  },
  hamburgerLineLong: {
    width: 22,
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
  },
  hamburgerLineMedium: {
    width: 16,
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
  },
  hamburgerLineShort: {
    width: 11,
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
linhaConicaWrapper: {
  width: 55,
  height: 4,
  marginTop: 5,
  backgroundColor: "#FF8C00",
  borderRadius: 10,
  overflow: "hidden",
  position: "relative",
},
linhaLaranjaUnica: {
  width: "100%",
  height: "100%",
  backgroundColor: "#FF8C00",
},
corteBranco: {
  position: "absolute",
  right: -2,
  bottom: -6,
  width: 60,
  height: 8,
  backgroundColor: "white", 
  transform: [{ rotate: "-7deg" }],
},
  parteFina: {
    width: 30,
    height: 1.5,
    backgroundColor: "#FF8C00",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: -1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 8,
    alignItems: "center",
  },
  cardImg: {
    width: 88,
    height: 66,
    borderRadius: 6,
    backgroundColor: "#EEE",
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
    gap: 2,
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
  },
  cardPreco: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FF7A00",
  },
  cardLocalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  cardLocal: {
    fontSize: 12,
    color: "#444",
  },
});