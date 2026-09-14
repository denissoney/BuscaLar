import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ConfirmacaoPagamento() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
      <View style={styles.topoAzul}>
        <View style={styles.topoLinha}>
          <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.hamburguer}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <View style={styles.iconCasa}>
              <Ionicons name="home" size={22} color="#000" />
              <View style={styles.lupa}><Ionicons name="search" size={9} color="#fff" /></View>
            </View>
            <View>
              <Text style={styles.logoAluguel}>ALUGUEL</Text>
              <Text style={styles.logoBuscalar}>BUSCALAR</Text>
              <Text style={styles.logoSub}>ENCONTRE SEU NOVO LAR</Text>
            </View>
          </View>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.checkBoxTop}>
              <View style={styles.circuloVerde}><Ionicons name="checkmark" size={22} color="#fff" /></View>
              <Text style={styles.confirmadoTxt}>Confirmado</Text>
            </View>

            <Text style={styles.titulo}>Pagamento Confirmado</Text>
            <Text style={styles.valor}>R$ 1.000,00</Text>
            <Text style={styles.pixSub}>Pix payment - Confirmado agora</Text>

            <View style={styles.detalhesBox}>
              <View style={styles.detalhesHeader}>
                <Ionicons name="document-text" size={14} color="#000" />
                <Text style={styles.detalhesTitulo}>Detalhes do pagamento</Text>
              </View>
              <View style={styles.linhaDivisor} />

              <View style={styles.linhaInfo}><Text style={styles.label}>Destinatário</Text><Text style={styles.valueBold}>BuscaLar Imobiliária</Text></View>
              <View style={styles.linhaInfo}>
                <Text style={styles.label}>Método</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={styles.value}>Pix</Text>
                  <View style={styles.pixBadge}><Ionicons name="diamond" size={10} color="#00B8A0" /><Text style={styles.pixBadgeTxt}>pix</Text></View>
                </View>
              </View>
              <View style={styles.linhaInfo}><Text style={styles.label}>ID da transação</Text><Text style={styles.value}>PIX123456789203</Text></View>
              <View style={styles.linhaInfo}><Text style={styles.label}>Data e hora</Text><Text style={styles.value}>14/08/2026 - 15:42</Text></View>
              <View style={styles.linhaInfo}><Text style={styles.label}>Descrição</Text><Text style={styles.valueBold}>Locação - Agosto 2026</Text></View>
            </View>

            <TouchableOpacity style={styles.btnLaranja} activeOpacity={0.8}>
              <Text style={styles.btnLaranjaTxt}>Compartilhar comprovante</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnBranco} onPress={() => router.push("/(tabs)" as any)}>
              <Text style={styles.btnBrancoTxt}>Voltar ao início</Text>
            </TouchableOpacity>

            <Text style={styles.rodape}>Guarde este recibo para seus registros</Text>
          </View>
        </ScrollView>
      </View>

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
            <TouchableOpacity style={styles.menuItem}><Ionicons name="card" size={20} color="#1A5CFF" /><Text style={[styles.menuTxt, { color: "#1A5CFF" }]}>Pagamentos</Text></TouchableOpacity>
          </Animated.View>
          <Pressable style={styles.menuFundo} onPress={() => setMenuAberto(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  topoAzul: { backgroundColor: "#1A5CFF", paddingBottom: 18 },
  topoLinha: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingTop: 6 },
  hamburguer: { width: 30, height: 30, justifyContent: "center", gap: 4 },
  traco: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  iconCasa: { width: 32, height: 32, backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#000", borderRadius: 6, alignItems: "center", justifyContent: "center" },
  lupa: { position: "absolute", bottom: -3, right: -5, backgroundColor: "#FF8C00", width: 14, height: 14, borderRadius: 7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff" },
  logoAluguel: { color: "#000", fontSize: 8, fontWeight: "bold", lineHeight: 8 },
  logoBuscalar: { color: "#000", fontSize: 14, fontWeight: "900", lineHeight: 14 },
  logoSub: { color: "#000", fontSize: 5.5, fontWeight: "600" },

  content: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: 14, paddingTop: 12 },
  card: { alignItems: "center" },
  checkBoxTop: { alignItems: "center", marginTop: -26, backgroundColor: "#fff", paddingHorizontal: 18, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: "#EEE", shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  circuloVerde: { width: 34, height: 34, backgroundColor: "#2E7D32", borderRadius: 17, alignItems: "center", justifyContent: "center" },
  confirmadoTxt: { fontSize: 7, color: "#777", marginTop: 2 },

  titulo: { fontSize: 16, fontWeight: "800", color: "#000", marginTop: 12 },
  valor: { fontSize: 18, fontWeight: "800", color: "#FF8C00", marginTop: 2 },
  pixSub: { fontSize: 10, color: "#777", marginTop: 2 },

  detalhesBox: { width: "100%", backgroundColor: "#EAF0FF", borderRadius: 12, padding: 12, marginTop: 14 },
  detalhesHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  detalhesTitulo: { fontSize: 11, fontWeight: "700", color: "#000" },
  linhaDivisor: { height: 1, backgroundColor: "#FF8C00", marginVertical: 8 },
  linhaInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  label: { fontSize: 10, color: "#555" },
  value: { fontSize: 10, color: "#000" },
  valueBold: { fontSize: 10, fontWeight: "700", color: "#000" },
  pixBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 6, paddingHorizontal: 5, paddingVertical: 1, gap: 2, borderWidth: 0.5, borderColor: "#DDD" },
  pixBadgeTxt: { fontSize: 8, fontWeight: "700", color: "#00B8A0" },

  btnLaranja: { width: "100%", backgroundColor: "#FF8C00", height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 14 },
  btnLaranjaTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },
  btnBranco: { width: "100%", backgroundColor: "#fff", height: 38, borderRadius: 10, borderWidth: 1, borderColor: "#FF8C00", alignItems: "center", justifyContent: "center", marginTop: 8 },
  btnBrancoTxt: { color: "#FF8C00", fontWeight: "700", fontSize: 12 },
  rodape: { fontSize: 9, color: "#999", marginTop: 10, textAlign: "center" },

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