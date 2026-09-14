import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Pressable, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const IMOVEIS = [
  { id: 1, titulo: "Casa com 3 quartos", bairro: "Barra de São Miguel", area: "60m²", preco: "R$ 1.560/mês", detalhe: "3 quartos - piscina - vista para o mar", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400", top: "18%", left: "22%" },
  { id: 2, titulo: "Apartamento 2 quartos", bairro: "Barra de São Miguel", area: "48m²", preco: "R$ 1.560/mês", detalhe: "2 quartos - 1 banheiro - vista para o mar", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400", top: "32%", left: "48%" },
  { id: 3, titulo: "Casa em Barra", bairro: "Barra de São Miguel", area: "70m²", preco: "R$ 2.100/mês", detalhe: "3 quartos - churrasqueira", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400", top: "12%", left: "68%" },
  { id: 4, titulo: "Kitnet Centro", bairro: "Maceió", area: "35m²", preco: "R$ 900/mês", detalhe: "1 quarto - mobiliado", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400", top: "55%", left: "30%" },
];

export default function Localizacao() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("Barra de São Miguel");
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, g) => e.nativeEvent.pageX < 30 && g.dx > 50 && Math.abs(g.dy) < 40,
      onPanResponderRelease: () => setMenuAberto(true),
    })
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, { toValue: menuAberto? 0 : -300, duration: 260, useNativeDriver: true }).start();
  }, [menuAberto]);

  const filtrados = IMOVEIS.filter(i => i.titulo.toLowerCase().includes(busca.toLowerCase()) || i.bairro.toLowerCase().includes(busca.toLowerCase()));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
      {/* HEADER AZUL IGUAL PRINT */}
      <View style={styles.topoAzul}>
        <View style={styles.topoHeader}>
          <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.hamburguer}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>
          <Text style={styles.tituloTopo}>Localização de Propriedades</Text>
          <Ionicons name="person-circle-outline" size={24} color="#fff" />
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#555" />
          <TextInput style={styles.searchInput} placeholder="Buscar cidade, bairro ou imóvel..." placeholderTextColor="#777" value={busca} onChangeText={setBusca} />
        </View>

        <View style={styles.filtrosRow}>
          {filtroCidade && (
            <TouchableOpacity style={styles.filtroAtivo} onPress={() => setFiltroCidade("")}>
              <Text style={styles.filtroAtivoTxt}>{filtroCidade}</Text>
              <Ionicons name="close" size={14} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.filtro}><Text style={styles.filtroTxt}>Preço</Text><Ionicons name="chevron-down" size={12} /></TouchableOpacity>
          <TouchableOpacity style={styles.filtro}><Text style={styles.filtroTxt}>Quartos</Text><Ionicons name="chevron-down" size={12} /></TouchableOpacity>
          <TouchableOpacity style={styles.filtro}><Text style={styles.filtroTxt}>Tipo</Text><Ionicons name="chevron-down" size={12} /></TouchableOpacity>
        </View>
      </View>

      {/* MAPA MOCK COM PINS */}
      <View style={styles.mapaContainer}>
        <Image source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800" }} style={styles.mapaImg} blurRadius={1} />
        <View style={styles.mapaOverlay}>
          {filtrados.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.pin, { top: item.top as any, left: item.left as any }]}>
              <Ionicons name="location-sharp" size={24} color="#FF8C00" />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapBtn}><Text style={styles.mapBtnTxt}>+</Text></TouchableOpacity>
          <TouchableOpacity style={styles.mapBtn}><Text style={styles.mapBtnTxt}>−</Text></TouchableOpacity>
        </View>
        <View style={styles.encontradosBadge}>
          <Text style={styles.encontradosTxt}>12 imóveis encontrados</Text>
        </View>
        <TouchableOpacity style={styles.locBtn}>
          <Ionicons name="locate" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* LISTA IMÓVEIS PRÓXIMOS */}
      <View style={styles.listaContainer}>
        <View style={styles.listaHeader}>
          <Text style={styles.listaTitulo}>Imóveis próximos</Text>
          <TouchableOpacity><Text style={styles.verTudo}>Ver tudo {">"}</Text></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {filtrados.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8} onPress={() => router.push("/(tabs)" as any)}>
              <Image source={{ uri: item.img }} style={styles.cardImg} />
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                <Text style={styles.cardBairro}>{item.bairro} - {item.area}</Text>
                <Text style={styles.cardPreco}>{item.preco}</Text>
                <Text style={styles.cardDetalhe}>{item.detalhe}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* MENU LATERAL */}
      <Modal visible={menuAberto} transparent animationType="fade" onRequestClose={() => setMenuAberto(false)}>
        <View style={styles.menuOverlay}>
          <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }], paddingTop: insets.top + 10 }]}>
            <View style={styles.menuTopo}>
              <View style={styles.menuAvatar}><Text style={styles.menuLetra}>D</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuNome}>Davi Miguel</Text>
                <Text style={styles.menuEmail}>davi.miguel@gmail.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuAberto(false); router.push("/(tabs)" as any); }}><Ionicons name="home" size={20} color="#000" /><Text style={styles.menuTxt}>Início</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}><Ionicons name="location" size={20} color="#1A5CFF" /><Text style={[styles.menuTxt, { color: "#1A5CFF" }]}>Localização</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}><Ionicons name="heart-outline" size={20} color="#000" /><Text style={styles.menuTxt}>Favoritos</Text></TouchableOpacity>
          </Animated.View>
          <Pressable style={styles.menuFundo} onPress={() => setMenuAberto(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  topoAzul: { backgroundColor: "#1A5CFF", paddingHorizontal: 12, paddingBottom: 10 },
  topoHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  hamburguer: { width: 30, height: 30, justifyContent: "center", gap: 4 },
  traco: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  tituloTopo: { fontSize: 13, fontWeight: "700", color: "#fff" },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 18, height: 32, paddingHorizontal: 10, gap: 6 },
  searchInput: { flex: 1, fontSize: 11, color: "#000" },
  filtrosRow: { flexDirection: "row", gap: 6, marginTop: 8 },
  filtroAtivo: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#FF8C00", paddingHorizontal: 10, height: 24, borderRadius: 12 },
  filtroAtivoTxt: { color: "#fff", fontSize: 10, fontWeight: "600" },
  filtro: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "#fff", paddingHorizontal: 10, height: 24, borderRadius: 12 },
  filtroTxt: { fontSize: 10, fontWeight: "600", color: "#000" },

  mapaContainer: { height: 220, backgroundColor: "#DDE8FF", overflow: "hidden" },
  mapaImg: { width: "100%", height: "100%", opacity: 0.6 },
  mapaOverlay: {
    
   },
  pin: { position: "absolute" },
  mapControls: { position: "absolute", right: 10, top: 10, gap: 4 },
  mapBtn: { width: 28, height: 28, backgroundColor: "#fff", borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 0.5, borderColor: "#CCC" },
  mapBtnTxt: { fontSize: 16, fontWeight: "700" },
  encontradosBadge: { position: "absolute", left: 10, bottom: 10, backgroundColor: "#fff", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 0.5, borderColor: "#CCC" },
  encontradosTxt: { fontSize: 9, fontWeight: "600" },
  locBtn: { position: "absolute", right: 10, bottom: 10, width: 28, height: 28, backgroundColor: "#fff", borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 0.5, borderColor: "#CCC" },

  listaContainer: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: 12, paddingTop: 10, marginTop: -10 },
  listaHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  listaTitulo: { fontSize: 12, fontWeight: "800", color: "#000" },
  verTudo: { fontSize: 11, color: "#1A5CFF", fontWeight: "600" },

  card: { flexDirection: "row", borderWidth: 1, borderColor: "#DDD", borderRadius: 10, padding: 6, marginBottom: 8, alignItems: "center" },
  cardImg: { width: 66, height: 52, borderRadius: 6 },
  cardTitulo: { fontSize: 11, fontWeight: "700", color: "#000" },
  cardBairro: { fontSize: 9, color: "#555" },
  cardPreco: { fontSize: 11, fontWeight: "800", color: "#FF8C00", marginTop: 1 },
  cardDetalhe: { fontSize: 8, color: "#777" },

  menuOverlay: { flex: 1, flexDirection: "row", backgroundColor: "rgba(0,0,0,0.45)" },
  menu: { width: 280, backgroundColor: "#fff", height: "100%", paddingHorizontal: 16 },
  menuTopo: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#EEE", marginBottom: 8 },
  menuAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  menuLetra: { color: "#fff", fontWeight: "bold" },
  menuNome: { fontSize: 14, fontWeight: "700", color: "#000" },
  menuEmail: { fontSize: 10, color: "#777" },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 13 },
  menuTxt: { fontSize: 13, color: "#000" },
  menuFundo: { flex: 1 },
});