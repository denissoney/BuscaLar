import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MenuDrawer from "./componets/MenuDrawer";

const IMOVEIS = [
  { id: "1", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
  { id: "2", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500" },
  { id: "3", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500" },
  { id: "4", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500" },
  { id: "5", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500" },
  { id: "6", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500" },
];

export default function AlugueisDisponiveis() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const abrirMenu = () => setMenuVisible(true);
  const fecharMenu = () => setMenuVisible(false);
  const irPara = (rota: string) => { fecharMenu(); router.push(rota as any); };

  const renderCard = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => irPara(`/detalhe/${item.id}`)}>
      <Image source={{ uri: item.img }} style={styles.cardImg} resizeMode="cover" />
      <Text style={styles.cardPreco}>{item.preco}</Text>
      <Text style={styles.cardTitulo}>{item.titulo}</Text>
      <View style={styles.cardLocalRow}>
        <Ionicons name="location" size={9} color="#FF8C00" />
        <Text style={styles.cardLocal}>{item.local}</Text>
      </View>
      <View style={styles.cardInfoRow}>
        <View style={styles.cardInfoItem}><Ionicons name="resize-outline" size={10} color="#000" /><Text style={styles.cardInfoText}>15m²</Text></View>
        <View style={styles.cardInfoItem}><Ionicons name="bed-outline" size={10} color="#000" /><Text style={styles.cardInfoText}>2 quartos</Text></View>
        <View style={styles.cardInfoItem}><Ionicons name="water-outline" size={10} color="#000" /><Text style={styles.cardInfoText}>1 Banheiro</Text></View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* TOPO - LOGO CENTRALIZADA + HAMBURGUER 3 LINHAS */}
      <View style={styles.topo}>
        <View style={styles.topoLogoRow}>
          <TouchableOpacity style={styles.hamburgerTopo} onPress={abrirMenu} activeOpacity={0.7}>
            <View style={[styles.hLine, { width: 18 }]} />
            <View style={[styles.hLine, { width: 12 }]} />
            <View style={[styles.hLine, { width: 7 }]} />
          </TouchableOpacity>

          <View style={styles.logoCentroWrap}>
            <Image
              source={require("../../../BuscaLar/assets/images/BuscaLar-preto.png")}
              style={styles.logoTopo}
              resizeMode="contain"
            />
          </View>

          <View style={{ width: 28 }} />
        </View>

        <View style={styles.filtrosRow}>
          <TouchableOpacity style={styles.filtroLocal}>
            <Ionicons name="location" size={14} color="#000" />
            <View style={{ flex: 1 }}>
              <Text style={styles.filtroLabel}>Filtrar por localização</Text>
              <Text style={styles.filtroValor}>Barra de São Miguel</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnFiltros}>
            <Ionicons name="funnel" size={12} color="#fff" />
            <Text style={styles.btnFiltrosText}>Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTEUDO */}
      <View style={styles.conteudoBranco}>
        <View style={styles.tituloRow}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>

          <View>
            <Text style={styles.titulo}>Aluguéis Disponíveis</Text>
            {/* LINHA LARANJA GROSSA -> FINA */}
            <View style={styles.linhaLaranjaWrap}>
              <View style={styles.linhaLaranjaGrossa} />
              <View style={styles.linhaLaranjaFina} />
            </View>
          </View>
        </View>

        <FlatList
          data={IMOVEIS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderCard}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20, gap: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* MENU LATERAL */}
      <MenuDrawer visible={menuVisible} onClose={fecharMenu} onOpen={abrirMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B5FFF" },
  topo: { backgroundColor: "#0B5FFF", paddingHorizontal: 14, paddingBottom: 12 },
  topoLogoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  logoCentroWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoTopo: { width: 175, height: 42 },
  hamburgerTopo: { width: 28, height: 28, justifyContent: "center", gap: 5, alignItems: "flex-start" },
  hLine: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  filtrosRow: { flexDirection: "row", gap: 8, marginTop: 12, alignItems: "center" },
  filtroLocal: { flex: 1, backgroundColor: "#fff", height: 38, borderRadius: 20, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 6 },
  filtroLabel: { fontSize: 7, color: "#888" },
  filtroValor: { fontSize: 10, fontWeight: "700", color: "#000", marginTop: -1 },
  btnFiltros: { backgroundColor: "#0B5FFF", borderWidth: 1, borderColor: "#fff", height: 32, paddingHorizontal: 14, borderRadius: 20, flexDirection: "row", alignItems: "center", gap: 4 },
  btnFiltrosText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  conteudoBranco: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: 4, paddingTop: 12 },
  tituloRow: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, marginBottom: 12 },
  titulo: { fontSize: 15, fontWeight: "800", color: "#000" },
  // LINHA LARANJA GROSSA -> FINA LISA
  linhaLaranjaWrap: { flexDirection: "row", alignItems: "center", marginTop: 5, height: 4 },
  linhaLaranjaGrossa: { width: 44, height: 4, backgroundColor: "#FF8C00", borderRadius: 10 },
  linhaLaranjaFina: { width: 48, height: 2, backgroundColor: "#FF8C00", borderTopRightRadius: 10, borderBottomRightRadius: 10, marginLeft: -3, opacity: 0.85 },
  card: { flex: 1, backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: "#E0E0E0", overflow: "hidden", paddingBottom: 6 },
  cardImg: { width: "100%", height: 90 },
  cardPreco: { color: "#FF8C00", fontWeight: "800", fontSize: 12, marginTop: 5, marginLeft: 6 },
  cardTitulo: { fontSize: 10, fontWeight: "600", color: "#000", marginLeft: 6, marginTop: 1 },
  cardLocalRow: { flexDirection: "row", alignItems: "center", gap: 2, marginLeft: 6, marginTop: 2 },
  cardLocal: { fontSize: 7, color: "#FF8C00", fontWeight: "500" },
  cardInfoRow: { flexDirection: "row", gap: 6, marginLeft: 6, marginTop: 6 },
  cardInfoItem: { flexDirection: "row", alignItems: "center", gap: 2 },
  cardInfoText: { fontSize: 6, color: "#000" },
});