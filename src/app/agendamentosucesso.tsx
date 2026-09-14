import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AgendamentoSucesso() {
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
      <View style={styles.topoBranco}>
        <View style={styles.logoRow}>
          <View style={styles.iconCasa}>
            <Ionicons name="home" size={24} color="#1A5CFF" />
            <View style={styles.lupa}><Ionicons name="search" size={10} color="#fff" /></View>
          </View>
          <View>
            <Text style={styles.logoAluguel}>ALUGUEL</Text>
            <Text style={styles.logoBuscalar}>BUSCALAR</Text>
            <Text style={styles.logoSub}>ENCONTRE SEU NOVO LAR</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.hamburguer}>
          <View style={[styles.traco, { width: 18 }]} />
          <View style={[styles.traco, { width: 12 }]} />
          <View style={[styles.traco, { width: 8 }]} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.checkWrap}>
          <View style={[styles.confete, { backgroundColor: "#1A5CFF", top: 10, left: 5, transform: [{ rotate: "20deg" }] }]} />
          <View style={[styles.confete, { backgroundColor: "#FF8C00", top: 5, right: 15 }]} />
          <View style={[styles.confete, { backgroundColor: "#000", top: 25, right: 0, width: 5, height: 8 }]} />
          <View style={[styles.confete, { backgroundColor: "#FF8C00", bottom: 15, left: 10 }]} />
          <View style={[styles.confete, { backgroundColor: "#1A5CFF", bottom: 5, right: 20 }]} />
          <View style={[styles.confete, { backgroundColor: "#000", bottom: 20, left: -5, width: 4, height: 6 }]} />
          <View style={styles.circuloVerde}>
            <Ionicons name="checkmark" size={42} color="#fff" />
          </View>
        </View>

        <Text style={styles.titulo}>Agendamento feito com{"\n"}sucesso!</Text>
        <Text style={styles.subtitulo}>Seu agendamento foi confirmado com sucesso. Agora você pode acompanhar os detalhes e receber lembretes no app.</Text>

        <View style={styles.ilustracao}>
          <View style={styles.casa}>
            <View style={styles.telhado} />
            <View style={styles.corpoCasa}>
              <View style={styles.janela} />
              <View style={styles.janela} />
              <View style={styles.janela} />
              <View style={styles.porta} />
            </View>
          </View>
          <View style={styles.pessoa}>
            <View style={styles.pessoaCabeca} />
            <View style={styles.pessoaCorpo}>
              <Ionicons name="calendar" size={16} color="#fff" />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnLaranja} onPress={() => router.push("/(tabs)" as any)}>
          <Text style={styles.btnTxt}>Explora Imóveis</Text>
        </TouchableOpacity>
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
            <TouchableOpacity style={styles.menuItem}><Ionicons name="calendar" size={20} color="#2E7D32" /><Text style={[styles.menuTxt, { color: "#2E7D32" }]}>Agendamento feito</Text></TouchableOpacity>
          </Animated.View>
          <Pressable style={styles.menuFundo} onPress={() => setMenuAberto(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topoBranco: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EEE" },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconCasa: { width: 36, height: 36, borderWidth: 1.5, borderColor: "#000", borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  lupa: { position: "absolute", bottom: -4, right: -6, backgroundColor: "#FF8C00", width: 16, height: 16, borderRadius: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff" },
  logoAluguel: { color: "#000", fontSize: 9, fontWeight: "bold", lineHeight: 9 },
  logoBuscalar: { color: "#000", fontSize: 16, fontWeight: "900", lineHeight: 16 },
  logoSub: { color: "#000", fontSize: 6, fontWeight: "600" },
  hamburguer: { width: 30, height: 30, justifyContent: "center", alignItems: "flex-end", gap: 4 },
  traco: { height: 2.5, backgroundColor: "#000", borderRadius: 2 },

  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  checkWrap: { width: 110, height: 110, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  circuloVerde: { width: 74, height: 74, backgroundColor: "#2E7D32", borderRadius: 37, alignItems: "center", justifyContent: "center", borderWidth: 6, borderColor: "#E8F5E9" },
  confete: { position: "absolute", width: 6, height: 10, borderRadius: 2 },

  titulo: { fontSize: 17, fontWeight: "800", color: "#000", textAlign: "center", lineHeight: 20 },
  subtitulo: { fontSize: 10, color: "#666", textAlign: "center", marginTop: 8, lineHeight: 13, paddingHorizontal: 10 },

  ilustracao: { flexDirection: "row", alignItems: "flex-end", marginTop: 22, marginBottom: 24, gap: 12 },
  casa: { alignItems: "center" },
  telhado: { width: 0, height: 0, borderLeftWidth: 38, borderRightWidth: 38, borderBottomWidth: 22, borderLeftColor: "transparent", borderRightColor: "transparent", borderBottomColor: "#1A5CFF" },
  corpoCasa: { width: 76, height: 42, backgroundColor: "#FFEC99", borderWidth: 1.5, borderColor: "#000", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", paddingTop: 4 },
  janela: { width: 14, height: 14, backgroundColor: "#1A5CFF", borderWidth: 1, borderColor: "#000", margin: 2 },
  porta: { width: 16, height: 18, backgroundColor: "#1A5CFF", borderWidth: 1, borderColor: "#000", marginTop: 2 },
  pessoa: { alignItems: "center", marginLeft: -8 },
  pessoaCabeca: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#FFDBAC", borderWidth: 1, borderColor: "#000" },
  pessoaCorpo: { width: 26, height: 32, backgroundColor: "#FF8C00", borderRadius: 6, borderWidth: 1, borderColor: "#000", alignItems: "center", justifyContent: "center", marginTop: 2 },

  btnLaranja: { backgroundColor: "#FF8C00", height: 40, borderRadius: 8, paddingHorizontal: 40, alignItems: "center", justifyContent: "center" },
  btnTxt: { color: "#fff", fontWeight: "700", fontSize: 13 },

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