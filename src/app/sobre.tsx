import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Pressable, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Sobre() {
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.headerCard}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={20} color="#000" />
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.titulo}>Sobre o aplicativo</Text>
              <Text style={styles.versao}>Versão 1.1.0</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTexto}>
              BuscaLar é a plataforma que conecta você às melhores opções de imóveis para alugar de forma rápida, segura e personalizada, de forma rápida e confiável.
            </Text>
          </View>

          <View style={styles.box}>
            <View style={styles.boxTituloRow}>
              <Ionicons name="globe-outline" size={14} color="#1A5CFF" />
              <Text style={styles.boxTitulo}>Nossa Missão</Text>
            </View>
            <Text style={styles.boxTexto}>Facilitar sua busca por imóveis, com transparência e inovação, e manter a segurança dos seus dados.</Text>
          </View>

          <View style={styles.box}>
            <View style={styles.boxTituloRow}>
              <Ionicons name="megaphone-outline" size={14} color="#1A5CFF" />
              <Text style={styles.boxTitulo}>Recursos</Text>
            </View>

            <View style={styles.recursoItem}>
              <Ionicons name="search-outline" size={14} color="#000" />
              <View>
                <Text style={styles.recursoTitulo}>Busca Inteligente</Text>
                <Text style={styles.recursoSub}>Encontre imóveis próximos a você.</Text>
              </View>
            </View>

            <View style={styles.recursoItem}>
              <Ionicons name="time-outline" size={14} color="#000" />
              <View>
                <Text style={styles.recursoTitulo}>Imóveis em Tempo Real</Text>
                <Text style={styles.recursoSub}>Atualizações instantâneas de novos imóveis.</Text>
              </View>
            </View>

            <View style={styles.recursoItem}>
              <Ionicons name="notifications-outline" size={14} color="#000" />
              <View>
                <Text style={styles.recursoTitulo}>Alertas Personalizados</Text>
                <Text style={styles.recursoSub}>Notificações sobre novos imóveis em áreas desejadas.</Text>
              </View>
            </View>
          </View>

          <Text style={styles.devTitulo}>Desenvolvedores</Text>
          <View style={styles.devRow}>
            <View style={styles.devCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" }} style={styles.devAvatar} />
              <Text style={styles.devNome}>Davi Miguel</Text>
              <Text style={styles.devCargo}>Dev Front-end</Text>
            </View>
            <View style={styles.devCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" }} style={styles.devAvatar} />
              <Text style={styles.devNome}>Denissoney</Text>
              <Text style={styles.devCargo}>Dev Full Stack</Text>
            </View>
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
            <TouchableOpacity style={styles.menuItem}><Ionicons name="information-circle-outline" size={20} color="#1A5CFF" /><Text style={[styles.menuTxt, { color: "#1A5CFF" }]}>Sobre</Text></TouchableOpacity>
          </Animated.View>
          <Pressable style={styles.menuFundo} onPress={() => setMenuAberto(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  topoAzul: { backgroundColor: "#1A5CFF", paddingBottom: 14 },
  topoLinha: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingTop: 6 },
  hamburguer: { width: 30, height: 30, justifyContent: "center", gap: 4 },
  traco: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  iconCasa: { width: 32, height: 32, backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#000", borderRadius: 6, alignItems: "center", justifyContent: "center" },
  lupa: { position: "absolute", bottom: -3, right: -5, backgroundColor: "#FF8C00", width: 14, height: 14, borderRadius: 7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff" },
  logoAluguel: { color: "#000", fontSize: 8, fontWeight: "bold", lineHeight: 8 },
  logoBuscalar: { color: "#000", fontSize: 14, fontWeight: "900", lineHeight: 14 },
  logoSub: { color: "#000", fontSize: 5.5, fontWeight: "600" },

  content: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: 12, paddingTop: 10 },
  headerCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", borderWidth: 1, borderColor: "#EEE", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 },
  backBtn: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  titulo: { fontSize: 13, fontWeight: "800", color: "#000" },
  versao: { fontSize: 9, color: "#777" },

  box: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, padding: 10, marginBottom: 10, backgroundColor: "#fff" },
  boxTituloRow: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 4 },
  boxTitulo: { fontSize: 11, fontWeight: "700", color: "#000" },
  boxTexto: { fontSize: 10, color: "#444", lineHeight: 14 },

  recursoItem: { flexDirection: "row", gap: 8, marginTop: 8, alignItems: "flex-start" },
  recursoTitulo: { fontSize: 10, fontWeight: "700", color: "#000" },
  recursoSub: { fontSize: 9, color: "#666" },

  devTitulo: { fontSize: 12, fontWeight: "800", color: "#000", marginTop: 6, marginBottom: 8 },
  devRow: { flexDirection: "row", gap: 10 },
  devCard: { flex: 1, borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, padding: 10, alignItems: "center" },
  devAvatar: { width: 48, height: 48, borderRadius: 24, marginBottom: 6 },
  devNome: { fontSize: 11, fontWeight: "700", color: "#000" },
  devCargo: { fontSize: 9, color: "#666" },

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