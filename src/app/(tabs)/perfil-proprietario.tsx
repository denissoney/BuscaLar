import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PerfilProprietario() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  const irPara = (rota: string) => {
    setMenuVisible(false);
    router.push(rota as any);
  };
  const abrirMenu = () => setMenuVisible(true);
  const fecharMenu = () => setMenuVisible(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER COM HAMBURGUER MENOR A CADA LINHA */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburger} onPress={abrirMenu} activeOpacity={0.7}>
          <View style={[styles.hamburgerLine, { width: 18 }]} />
          <View style={[styles.hamburgerLine, { width: 12 }]} />
          <View style={[styles.hamburgerLine, { width: 7 }]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PERFIL DO PROPRIETÁRIO</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        <View style={styles.card}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.avatar} />
          <Text style={styles.nome}>Davi Miguel</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>Proprietário</Text></View>
          <View style={styles.locationRow}><Ionicons name="location" size={14} color="#000" /><Text style={styles.locationText}>Maceió-AL</Text></View>
          <View style={styles.ratingRow}><Text style={styles.stars}>★★★★★</Text><Text style={styles.ratingText}>4.9 - 28 avaliações</Text></View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}><Text style={styles.statNumber}>3</Text><Text style={styles.statLabel}>Imóvel</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}><Text style={[styles.statNumber, { color: "#1A5CFF" }]}>98%</Text><Text style={styles.statLabel}>Resposta</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}><Text style={styles.statNumber}>2h</Text><Text style={styles.statLabel}>Média</Text><Text style={styles.statSubLabel}>Tempo de resposta</Text></View>
          </View>

          <View style={styles.sobreContainer}>
            <Text style={styles.sobreTitle}>Sobre</Text>
            <Text style={styles.sobreText}>Proprietário parceiro desde 2021. Comprometido em oferecer imóveis bem cuidados e atendimento rápido aos inquilinos. Sempre disponível para dúvidas e suporte.</Text>
          </View>

          <View style={styles.imoveisHeader}>
            <Text style={styles.imoveisTitle}>Meus Imóveis</Text>
            <TouchableOpacity onPress={() => irPara("/meus-imoveis")}><Text style={styles.verTodos}>Ver todos (3) {'>'}</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
            <TouchableOpacity style={styles.imovelCard} activeOpacity={0.85}><Image source={{ uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }} style={styles.imovelImg} /><View style={styles.imovelInfo}><Text style={styles.imovelNome}>• Apartamento ponta verde{"\n"}2 quartos - 68m²</Text><Text style={styles.imovelPreco}>R$ 1.200/mês</Text></View></TouchableOpacity>
            <TouchableOpacity style={styles.imovelCard} activeOpacity={0.85}><Image source={{ uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" }} style={styles.imovelImg} /><View style={styles.imovelInfo}><Text style={styles.imovelNome}>• Casa Jatiuca{"\n"}2 quartos - 52m²</Text><Text style={styles.imovelPreco}>R$ 1.000/mês</Text></View></TouchableOpacity>
            <TouchableOpacity style={styles.imovelCard} activeOpacity={0.85}><Image source={{ uri: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400" }} style={styles.imovelImg} /><View style={styles.imovelInfo}><Text style={styles.imovelNome}>• Apartamento Jatiuca{"\n"}3 quartos - 75m²</Text><Text style={styles.imovelPreco}>R$ 1.500/mês</Text></View></TouchableOpacity>
          </ScrollView>

          <View style={styles.avaliacoesContainer}>
            <Text style={styles.sobreTitle}>Avaliações</Text>
            <View style={styles.avaliacaoCard}><View style={styles.avaliacaoHeader}><View style={styles.avaliacaoAvatar}><Text style={styles.avaliacaoAvatarText}>R</Text></View><View style={{ flex: 1 }}><Text style={styles.avaliacaoNome}>Rodrigo</Text><Text style={styles.avaliacaoEstrelas}>★★★★★</Text></View><Text style={styles.avaliacaoTempo}>Há 2 semanas</Text></View><Text style={styles.avaliacaoTexto}>Excelente proprietário! Muito atencioso, respondeu rapidamente e o imóvel era exatamente como descrito.</Text></View>
            <View style={styles.avaliacaoCard}><View style={styles.avaliacaoHeader}><View style={[styles.avaliacaoAvatar, { backgroundColor: "#1A5CFF" }]}><Text style={styles.avaliacaoAvatarText}>M</Text></View><View style={{ flex: 1 }}><Text style={styles.avaliacaoNome}>Mariana</Text><Text style={styles.avaliacaoEstrelas}>★★★★★</Text></View><Text style={styles.avaliacaoTempo}>Há 1 mês</Text></View><Text style={styles.avaliacaoTexto}>Ótimo atendimento e muita transparência durante todo o processo. Recomendo!</Text></View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnContato} activeOpacity={0.8}><Ionicons name="logo-whatsapp" size={21} color="#00D95F" /><Text style={styles.btnContatoText}>Entrar em contato</Text></TouchableOpacity>
      </ScrollView>

      {/* MENU IGUAL AO PRINT */}
      <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={fecharMenu}>
        <View style={styles.menuWrapper}>
          <Pressable style={styles.menuBackground} onPress={fecharMenu} />
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
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: { height: 40, backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 12, gap: 20, borderBottomWidth: 1, borderBottomColor: "#EEEEEE" },
  hamburger: { width: 28, height: 28, justifyContent: "center", gap: 5, alignItems: "flex-start" },
  hamburgerLine: { height: 2.5, backgroundColor: "#111", borderRadius: 2 },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#111" },
  card: { backgroundColor: "#FFFFFF", marginHorizontal: 4, marginTop: 4, borderRadius: 5, paddingHorizontal: 8, paddingTop: 5 },
  avatar: { width: 70, height: 70, borderRadius: 35, alignSelf: "center" },
  nome: { fontSize: 17, fontWeight: "700", textAlign: "center", color: "#000", marginTop: 5 },
  badge: { backgroundColor: "#FF8C00", alignSelf: "center", paddingHorizontal: 9, paddingVertical: 3, borderRadius: 12, marginTop: 3 },
  badgeText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  locationRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 3, marginTop: 5 },
  locationText: { fontSize: 10, color: "#666" },
  ratingRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 2 },
  stars: { color: "#FF8C00", fontSize: 9 },
  ratingText: { fontSize: 10, color: "#333" },
  statsRow: { height: 56, flexDirection: "row", backgroundColor: "#E5E5E5", borderRadius: 7, marginTop: 7 },
  statBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  statNumber: { fontSize: 21, fontWeight: "800", color: "#1A5CFF" },
  statLabel: { fontSize: 10, color: "#222" },
  statSubLabel: { fontSize: 6, color: "#777" },
  statDivider: { width: 1, height: "70%", backgroundColor: "#888", alignSelf: "center" },
  sobreContainer: { marginTop: 5 },
  sobreTitle: { fontSize: 14, fontWeight: "700", color: "#111" },
  sobreText: { fontSize: 8, color: "#333", lineHeight: 11, marginTop: 3 },
  imoveisHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 7 },
  imoveisTitle: { fontSize: 14, fontWeight: "700", color: "#111" },
  verTodos: { fontSize: 10, color: "#1A5CFF", fontWeight: "600" },
  imovelCard: { width: 118, backgroundColor: "#FFF", borderRadius: 8, marginRight: 8, marginTop: 1, overflow: "hidden", elevation: 2 },
  imovelImg: { width: "100%", height: 68 },
  imovelInfo: { padding: 5 },
  imovelNome: { fontSize: 7, lineHeight: 9, color: "#111", fontWeight: "500" },
  imovelPreco: { fontSize: 8, fontWeight: "700", color: "#FF8C00", marginTop: 4, textAlign: "center" },
  avaliacoesContainer: { marginTop: 5 },
  avaliacaoCard: { marginTop: 3 },
  avaliacaoHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  avaliacaoAvatar: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  avaliacaoAvatarText: { color: "#FFF", fontSize: 9, fontWeight: "700" },
  avaliacaoNome: { fontSize: 9, fontWeight: "700", color: "#111" },
  avaliacaoEstrelas: { fontSize: 7, color: "#FF8C00" },
  avaliacaoTempo: { fontSize: 7, color: "#777" },
  avaliacaoTexto: { fontSize: 8, color: "#333", lineHeight: 10, marginTop: 3 },
  btnContato: { height: 38, backgroundColor: "#FF8C00", marginHorizontal: 27, marginTop: 5, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  btnContatoText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
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