import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";

const IMOVEIS = [
  { id: "1", preco: "R$ 1.000/mês", desc: "Apartamento 2 quartos", local: "Barra de são miguel, AL", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" },
  { id: "2", preco: "R$ 1.000/mês", desc: "Apartamento 2 quartos", local: "Barra de são miguel, AL", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" },
  { id: "3", preco: "R$ 1.000/mês", desc: "Apartamento 2 quartos", local: "Barra de são miguel, AL", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
  { id: "4", preco: "R$ 1.000/mês", desc: "Apartamento 2 quartos", local: "Barra de são miguel, AL", img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400" },
  { id: "5", preco: "R$ 1.000/mês", desc: "Apartamento 2 quartos", local: "Barra de são miguel, AL", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400" },
  { id: "6", preco: "R$ 1.000/mês", desc: "Apartamento 2 quartos", local: "Barra de são miguel, AL", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" },
];

export default function Explorar() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const irPara = (rota: string) => {
    setMenuVisible(false);
    setTimeout(() => router.push(rota as any), 250);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>
          {/* HAMBURGUER IGUAL AO DO PERFIL */}
          <TouchableOpacity style={styles.btnHamburguer} onPress={() => setMenuVisible(true)} activeOpacity={0.7}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </TouchableOpacity>

          <Image source={require("../../../assets/images/BuscaLar-preto.png")} style={styles.logoImg} resizeMode="contain" />

          <TouchableOpacity style={styles.btnEngrenagem} onPress={() => irPara("/configuracoes")}>
            <Ionicons name="settings" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.filtrosRow}>
          <TouchableOpacity style={styles.filtroLocal}>
            <Ionicons name="location" size={14} color="#000" style={{ marginRight: 4 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.filtroLabel}>Filtrar por localização</Text>
              <Text style={styles.filtroValue}>Barra de São Miguel</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFiltros}>
            <Ionicons name="options" size={14} color="#000" />
            <Text style={styles.btnFiltrosText}>Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentBox}>
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Alugueis Disponíveis</Text>
        </View>

        <FlatList data={IMOVEIS} numColumns={2} keyExtractor={(item) => item.id} columnWrapperStyle={{ gap: 10 }} contentContainerStyle={{ paddingBottom: 130, gap: 10 }} showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => router.push("/perfil-proprietario" as any)}>
              <Image source={{ uri: item.img }} style={styles.cardImg} />
              <View style={styles.cardBody}>
                <Text style={styles.preco}>{item.preco}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <View style={styles.localRow}><Ionicons name="location" size={8} color="#FF8C00" /><Text style={styles.local}>{item.local}</Text></View>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}><Ionicons name="bed-outline" size={10} color="#000" /><Text style={styles.infoText}> 2 quartos</Text></View>
                  <View style={styles.infoItem}><Ionicons name="water-outline" size={10} color="#000" /><Text style={styles.infoText}> 1 banheiro</Text></View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* MENU IGUAL AO PRINT - MESMO DO PERFIL */}
      <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <View style={styles.menuWrapper}>
          <Pressable style={styles.menuBackground} onPress={() => setMenuVisible(false)} />
          <View style={[styles.sideMenu, { paddingTop: insets.top + 10 }]}>
            <View style={styles.menuTopo}>
              <View style={styles.avatarLaranja}><Text style={styles.avatarLaranjaText}>D</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuNome}>Davi Miguel</Text>
                <Text style={styles.menuEmail}>davi.miguel@gmail.com</Text>
              </View>
              <Ionicons name="chevron-down" size={18} color="#000" />
            </View>

            <View style={styles.lista}>
              <TouchableOpacity style={styles.item} onPress={() => irPara("/")}><Ionicons name="home" size={22} color="#000" /><Text style={styles.itemText}>Inicio</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/explorar")}><Ionicons name="location" size={22} color="#000" /><Text style={styles.itemText}>Filtro</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/favoritos")}><Ionicons name="heart-outline" size={22} color="#000" /><Text style={styles.itemText}>Favorito</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/agendamento")}><Ionicons name="calendar" size={22} color="#000" /><Text style={styles.itemText}>Agendamentos</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/pagamentos")}><Ionicons name="card" size={22} color="#000" /><Text style={styles.itemText}>Pagamentos</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/contrato")}><Ionicons name="document-text" size={22} color="#000" /><Text style={styles.itemText}>Contrato</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/perfil-proprietario")}><Ionicons name="person" size={22} color="#000" /><Text style={styles.itemText}>Perfil</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/meus-imoveis")}><Ionicons name="home-outline" size={22} color="#000" /><Text style={styles.itemText}>Casas</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/configuracoes")}><Ionicons name="settings" size={22} color="#000" /><Text style={styles.itemText}>Configurações</Text></TouchableOpacity>
              <View style={styles.linha} />
              <TouchableOpacity style={styles.item} onPress={() => irPara("/login")}><Ionicons name="exit-outline" size={22} color="#E53935" /><Text style={[styles.itemText, { color: "#E53935" }]}>Sair</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  topoAzul: { backgroundColor: "#1A5CFF", paddingBottom: 16 },
  headerAzul: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#1A5CFF" },
  btnHamburguer: { width: 32, height: 32, justifyContent: "center", gap: 5, alignItems: "flex-start" },
  traco: { height: 2.8, backgroundColor: "#fff", borderRadius: 10 },
  logoImg: { width: 160, height: 45 },
  btnEngrenagem: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#D9D9D9", alignItems: "center", justifyContent: "center" },
  filtrosRow: { flexDirection: "row", gap: 8, paddingHorizontal: 16, marginTop: 8 },
  filtroLocal: { flex: 1, backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, flexDirection: "row", alignItems: "center" },
  filtroLabel: { fontSize: 8, color: "#888" },
  filtroValue: { fontSize: 11, fontWeight: "600", color: "#000" },
  btnFiltros: { backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 4 },
  btnFiltrosText: { fontSize: 11, fontWeight: "600", color: "#000" },
  contentBox: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 14, paddingHorizontal: 12 },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 6 },
  backBtn: { width: 24, height: 24, justifyContent: "center" },
  title: { fontWeight: "700", fontSize: 14, color: "#000" },
  card: { flex: 1, backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: "#EEE", overflow: "hidden" },
  cardImg: { width: "100%", height: 90 },
  cardBody: { padding: 8 },
  preco: { color: "#FF8C00", fontWeight: "800", fontSize: 11 },
  desc: { fontSize: 9, color: "#000", marginTop: 2, fontWeight: "500" },
  localRow: { flexDirection: "row", alignItems: "center", gap: 2, marginTop: 3 },
  local: { fontSize: 7, color: "#555" },
  infoRow: { flexDirection: "row", gap: 8, marginTop: 6 },
  infoItem: { flexDirection: "row", alignItems: "center" },
  infoText: { fontSize: 7, color: "#000" },
  // MENU
  menuWrapper: { flex: 1, flexDirection: "row" },
  menuBackground: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.45)" },
  sideMenu: { width: 280, height: "100%", backgroundColor: "#FFF", elevation: 20 },
  menuTopo: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 10 },
  avatarLaranja: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  avatarLaranjaText: { color: "#FFF", fontWeight: "800", fontSize: 16 },
  menuNome: { fontSize: 15, fontWeight: "700", color: "#000" },
  menuEmail: { fontSize: 11, color: "#777", marginTop: 1 },
  lista: { marginTop: 4 },
  item: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingVertical: 14, gap: 14 },
  itemText: { fontSize: 14, color: "#000", fontWeight: "500" },
  linha: { height: 0.8, backgroundColor: "#EEE", marginHorizontal: 16 },
});