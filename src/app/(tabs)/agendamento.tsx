import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Agendamento() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 110, paddingTop: isTablet ? 50 : 60, paddingHorizontal: 16 }}>
      <Text style={[styles.titulo, { fontSize: isTablet ? 26 : 20 }]}>Meus agendamentos</Text>

      {[1,2,3].map((i) => (
        <View key={i} style={[styles.card, { padding: isTablet ? 20 : 14 }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={[styles.cardTitulo, { fontSize: isTablet ? 16 : 14 }]}>Visita - Apto Pajuçara</Text>
              <Text style={[styles.cardSub, { fontSize: isTablet ? 13 : 11 }]}>Hoje • 15:00 • Com João</Text>
            </View>
            <View style={styles.status}><Text style={styles.statusText}>Confirmado</Text></View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnOutline}><Text style={styles.btnOutlineText}>Reagendar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnBlue}><Text style={styles.btnBlueText}>Ver no mapa</Text></TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  titulo: { fontWeight: "bold", marginBottom: 16 },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#EAEAEA", borderRadius: 14, marginBottom: 12 },
  cardTitulo: { fontWeight: "bold" },
  cardSub: { color: "#777", marginTop: 4 },
  status: { backgroundColor: "#E8F5E9", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, height: 24 },
  statusText: { fontSize: 10, color: "#2E7D32", fontWeight: "bold" },
  actions: { flexDirection: "row", gap: 10, marginTop: 14 },
  btnOutline: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 10, alignItems: "center" },
  btnOutlineText: { fontWeight: "bold", fontSize: 12 },
  btnBlue: { flex: 1, backgroundColor: "#1A5CFF", borderRadius: 10, padding: 10, alignItems: "center" },
  btnBlueText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});