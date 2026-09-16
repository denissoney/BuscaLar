import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuDrawer from "../componets/MenuDrawer";

export default function PerfilProprietario() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  
  function irPara(rota: string) {
    setMenuVisible(false);
    setTimeout(() => { router.push(rota as any); }, 260);
  }
  function abrirMenu() { setMenuVisible(true); }
  function fecharMenu() { setMenuVisible(false); }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* HAMBURGUER FORA DE TUDO - SEM CAIXA */}
      <View style={styles.hamburguerFora}>
        <TouchableOpacity style={styles.hamburger} onPress={abrirMenu} activeOpacity={0.7}>
          <View style={[styles.hamburgerLine, { width: 18 }]} />
          <View style={[styles.hamburgerLine, { width: 12 }]} />
          <View style={[styles.hamburgerLine, { width: 7 }]} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        <View style={styles.card}>
          {/* TITULO COM SETA NA MESMA LINHA DENTRO DA CAIXA BRANCA */}
          <View style={styles.tituloPerfilRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.setaVoltar}>
              <Ionicons name="arrow-back" size={20} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>PERFIL DO PROPRIETÁRIO</Text>
          </View>

          <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.avatar} />
          <Text style={styles.nome}>Davi Miguel</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>Proprietário</Text></View>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#000" />
            <Text style={styles.locationText}>Maceió-AL</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.ratingText}>4.9 - 28 avaliações</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Imóvel</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: "#1A5CFF" }]}>98%</Text>
              <Text style={styles.statLabel}>Resposta</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2h</Text>
              <Text style={styles.statLabel}>Média</Text>
              <Text style={styles.statSubLabel}>Tempo de resposta</Text>
            </View>
          </View>

          <View style={styles.sobreContainer}>
            <Text style={styles.sobreTitle}>Sobre</Text>
            <View style={styles.linhaAzul} />
            <Text style={styles.sobreText}>
              Proprietário parceiro desde 2021. Comprometido em oferecer imóveis bem cuidados e atendimento rápido aos inquilinos. Sempre disponível para dúvidas e suporte.
            </Text>
          </View>

          {/* CAIXA CINZA CLARA COM SOMBRA ENVOLVENDO DE MEUS IMOVEIS PRA BAIXO */}
          <View style={styles.caixaImoveis}>
            <View style={styles.imoveisHeader}>
              <Text style={styles.imoveisTitle}>Meus Imóveis</Text>
              <TouchableOpacity onPress={() => irPara("/meus-imoveis")}>
                <Text style={styles.verTodos}>Ver todos (3) &gt;</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              <TouchableOpacity style={styles.imovelCard} activeOpacity={0.85}>
                <Image source={{ uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }} style={styles.imovelImg} />
                <View style={styles.imovelInfo}>
                  <Text style={styles.imovelNome}>• Apartamento Ponta Verde{"\n"}2 quartos - 68m²</Text>
                  <Text style={styles.imovelPreco}>R$ 1.200/mês</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imovelCard} activeOpacity={0.85}>
                <Image source={{ uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" }} style={styles.imovelImg} />
                <View style={styles.imovelInfo}>
                  <Text style={styles.imovelNome}>• Casa Jatiuca{"\n"}2 quartos - 52m²</Text>
                  <Text style={styles.imovelPreco}>R$ 1.000/mês</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imovelCard} activeOpacity={0.85}>
                <Image source={{ uri: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400" }} style={styles.imovelImg} />
                <View style={styles.imovelInfo}>
                  <Text style={styles.imovelNome}>• Apartamento Jatiuca{"\n"}3 quartos - 75m²</Text>
                  <Text style={styles.imovelPreco}>R$ 1.500/mês</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.avaliacoesContainer}>
              <Text style={styles.sobreTitle}>Avaliações</Text>
              <View style={styles.linhaAzul} />
              
              <View style={styles.avaliacaoCard}>
                <View style={styles.avaliacaoHeader}>
                  <View style={styles.avaliacaoAvatar}><Text style={styles.avaliacaoAvatarText}>R</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.avaliacaoNome}>Rodrigo</Text>
                    <Text style={styles.avaliacaoEstrelas}>★★★★★</Text>
                  </View>
                  <Text style={styles.avaliacaoTempo}>Há 2 semanas</Text>
                </View>
                <Text style={styles.avaliacaoTexto}>Excelente proprietário! Muito atencioso, respondeu rapidamente e o imóvel era exatamente como descrito.</Text>
              </View>

              <View style={styles.avaliacaoCard}>
                <View style={styles.avaliacaoHeader}>
                  <View style={[styles.avaliacaoAvatar, { backgroundColor: "#1A5CFF" }]}><Text style={styles.avaliacaoAvatarText}>M</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.avaliacaoNome}>Mariana</Text>
                    <Text style={styles.avaliacaoEstrelas}>★★★★★</Text>
                  </View>
                  <Text style={styles.avaliacaoTempo}>Há 1 mês</Text>
                </View>
                <Text style={styles.avaliacaoTexto}>Ótimo atendimento e muita transparência durante todo o processo. Recomendo!</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.btnContato} activeOpacity={0.8}>
              <Ionicons name="logo-whatsapp" size={21} color="#00D95F" />
              <Text style={styles.btnContatoText}>Entrar em contato</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <MenuDrawer visible={menuVisible} onClose={fecharMenu} onOpen={abrirMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },

  // HAMBURGUER TOTALMENTE FORA - SEM FUNDO, SEM BORDA
  hamburguerFora: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  hamburger: { 
    width: 28, 
    height: 28, 
    justifyContent: "center", 
    gap: 5, 
    alignItems: "flex-start" 
  },
  hamburgerLine: { 
    height: 2.5, 
    backgroundColor: "#111", 
    borderRadius: 2 
  },
  
  tituloPerfilRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  setaVoltar: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 15, fontWeight: "700", color: "#111" },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 8,
    marginTop: 4,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

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

  sobreContainer: { marginTop: 10 },
  sobreTitle: { fontSize: 14, fontWeight: "700", color: "#111" },
  linhaAzul: { width: 32, height: 3, backgroundColor: "#1A5CFF", borderRadius: 2, marginTop: 4, marginBottom: 6 },
  sobreText: { fontSize: 9, color: "#333", lineHeight: 12, marginTop: 2 },

  caixaImoveis: {
    marginTop: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  imoveisHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  imoveisTitle: { fontSize: 14, fontWeight: "700", color: "#111" },
  verTodos: { fontSize: 10, color: "#1A5CFF", fontWeight: "600" },

  imovelCard: {
    width: 118,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  imovelImg: { width: "100%", height: 68 },
  imovelInfo: { padding: 6 },
  imovelNome: { fontSize: 7, lineHeight: 9, color: "#111", fontWeight: "500" },
  imovelPreco: { fontSize: 8, fontWeight: "700", color: "#FF8C00", marginTop: 4, textAlign: "center" },

  avaliacoesContainer: { marginTop: 14 },
  avaliacaoCard: { marginTop: 8, backgroundColor: "#FFF", borderRadius: 8, padding: 8, elevation: 1 },
  avaliacaoHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  avaliacaoAvatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  avaliacaoAvatarText: { color: "#FFF", fontSize: 9, fontWeight: "700" },
  avaliacaoNome: { fontSize: 9, fontWeight: "700", color: "#111" },
  avaliacaoEstrelas: { fontSize: 7, color: "#FF8C00" },
  avaliacaoTempo: { fontSize: 7, color: "#777" },
  avaliacaoTexto: { fontSize: 8, color: "#333", lineHeight: 10, marginTop: 4 },

  btnContato: {
    height: 42,
    backgroundColor: "#FF8C00",
    marginTop: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  btnContatoText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
});