import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Favoritos() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const cardW = isTablet ? (width - 64) / 2 : "100%";

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 110, paddingTop: isTablet ? 50 : 60, paddingHorizontal: 16 }}>
      <Text style={[styles.titulo, { fontSize: isTablet ? 26 : 20 }]}>Favoritos ({2})</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
        {[
          { nome: "Apto Ponta Verde", valor: "R$ 1.500/mês", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" },
          { nome: "Casa Jatiúca", valor: "R$ 3.000/mês", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" },
        ].map((item, i) => (
          <View key={i} style={[styles.card, { width: cardW as any, height: isTablet ? 260 : 220 }]}>
            <Image source={{ uri: item.img }} style={{ width: "100%", height: "70%" }} />
            <TouchableOpacity style={styles.heart}><Ionicons name="heart" size={18} color="#fff" /></TouchableOpacity>
            <View style={{ padding: 12 }}>
              <Text style={[styles.nome, { fontSize: isTablet ? 15 : 13 }]}>{item.nome}</Text>
              <Text style={styles.valor}>{item.valor}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  titulo: { fontWeight: "bold" },
  card: { backgroundColor: "#fff", borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "#eee" },
  heart: { position: "absolute", top: 10, right: 10, backgroundColor: "#FF3B30", width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  nome: { fontWeight: "bold" },
  valor: { fontSize: 12, color: "#777", marginTop: 2 },
});