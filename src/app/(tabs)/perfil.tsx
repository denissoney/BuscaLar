import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PerfilProprietario() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#1A5CFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PERFIL DO PROPRIETÁRIO</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.card}>
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
            <View style={styles.statBox}><Text style={styles.statNumber}>3</Text><Text style={styles.statLabel}>Imóvel</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}><Text style={[styles.statNumber, { color: "#1A5CFF" }]}>98%</Text><Text style={styles.statLabel}>Resposta</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}><Text style={styles.statNumber}>2h</Text><Text style={styles.statLabel}>Média</Text><Text style={styles.statSubLabel}>Tempo de resposta</Text></View>
          </View>

          <View style={styles.sobreContainer}>
            <Text style={styles.sobreTitle}>Sobre</Text>
            <Text style={styles.sobreText}>Proprietário parceiro desde 2021. Comprometido em oferecer Imóveis bem cuidados e atendimento rápido aos inquilinos. Sempre disponível para dúvidas e suporte.</Text>
          </View>

          <View style={styles.imoveisHeader}>
            <Text style={styles.imoveisTitle}>Meus Imóveis</Text>
            <Text style={styles.verTodos}>Ver todos (3) &gt;</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
            <View style={styles.imovelCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" }} style={styles.imovelImg} />
              <View style={styles.imovelInfo}><Text style={styles.imovelNome}>• Apartamento ponta verde{"\n"}2 quartos - 68m²</Text><Text style={styles.imovelPreco}>R$ 1.200/mês</Text></View>
            </View>
            <View style={styles.imovelCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" }} style={styles.imovelImg} />
              <View style={styles.imovelInfo}><Text style={styles.imovelNome}>• Casa Jatiuca{"\n"}2 quartos - 52m²</Text><Text style={styles.imovelPreco}>R$ 1.000/mês</Text></View>
            </View>
          </ScrollView>

          <View style={{ marginTop: 18 }}>
            <Text style={styles.sobreTitle}>Avaliações</Text>
            <View style={styles.avaliacaoCard}>
              <View style={styles.avaliacaoHeader}>
                <View style={styles.avaliacaoAvatar}><Text style={styles.avaliacaoAvatarText}>R</Text></View>
                <View style={{ flex: 1 }}><Text style={styles.avaliacaoNome}>Rodrigo</Text><Text style={styles.avaliacaoEstrelas}>★★★★★</Text></View>
                <Text style={styles.avaliacaoTempo}>Há 2 semanas</Text>
              </View>
              <Text style={styles.avaliacaoTexto}>Excelente proprietário! Muito atencioso, respondeu rapidamente e o imóvel era exatamente como descrito.</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnContato}>
          <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
          <Text style={styles.btnContatoText}>Entrar em contato</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 14, gap: 10 },
  backBtn: { width: 30, height: 30, justifyContent: "center" },
  headerTitle: { fontWeight: "700", fontSize: 13, letterSpacing: 0.5, color: "#000" },
  card: { backgroundColor: "#fff", margin: 16, borderRadius: 16, padding: 16 },
  avatar: { width: 70, height: 70, borderRadius: 35, alignSelf: "center", marginTop: 8 },
  nome: { fontWeight: "700", fontSize: 18, textAlign: "center", marginTop: 10, color: "#000" },
  badge: { backgroundColor: "#FF8C00", alignSelf: "center", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 6 },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 11 },
  locationRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 8 },
  locationText: { fontSize: 12, color: "#000", fontWeight: "500" },
  ratingRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4 },
  stars: { color: "#FF8C00", fontSize: 10 },
  ratingText: { fontSize: 11, color: "#000", fontWeight: "500" },
  statsRow: { flexDirection: "row", backgroundColor: "#E9E9E9", borderRadius: 12, marginTop: 14, paddingVertical: 12 },
  statBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  statNumber: { fontWeight: "800", fontSize: 16, color: "#000" },
  statLabel: { fontSize: 11, color: "#000", marginTop: 2 },
  statSubLabel: { fontSize: 8, color: "#666" },
  statDivider: { width: 1, backgroundColor: "#1A5CFF", opacity: 0.3 },
  sobreContainer: { marginTop: 16 },
  sobreTitle: { fontWeight: "700", fontSize: 14, color: "#000" },
  sobreText: { fontSize: 11, color: "#555", lineHeight: 16, marginTop: 6 },
  imoveisHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 18 },
  imoveisTitle: { fontWeight: "700", fontSize: 14, color: "#000" },
  verTodos: { color: "#1A5CFF", fontSize: 11, fontWeight: "600" },
  imovelCard: { width: 160, backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: "#EEE", marginRight: 10, overflow: "hidden" },
  imovelImg: { width: "100%", height: 90 },
  imovelInfo: { padding: 8 },
  imovelNome: { fontSize: 9, color: "#000", lineHeight: 12, fontWeight: "500" },
  imovelPreco: { fontSize: 10, fontWeight: "700", color: "#000", marginTop: 6 },
  avaliacaoCard: { marginTop: 8 },
  avaliacaoHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  avaliacaoAvatar: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  avaliacaoAvatarText: { color: "#fff", fontWeight: "700", fontSize: 11 },
  avaliacaoNome: { fontWeight: "700", fontSize: 11, color: "#000" },
  avaliacaoEstrelas: { color: "#FF8C00", fontSize: 8 },
  avaliacaoTempo: { fontSize: 9, color: "#888" },
  avaliacaoTexto: { fontSize: 11, color: "#444", lineHeight: 15, marginTop: 6 },
  btnContato: { backgroundColor: "#FF8C00", marginHorizontal: 16, marginTop: 10, height: 48, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  btnContatoText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});