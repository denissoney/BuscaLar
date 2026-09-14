import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable, PanResponder, Animated, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuDrawer from "./componets/MenuDrawer";
export default function Contrato() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const [aceito, setAceito] = useState(true);
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
              <Ionicons name="home" size={24} color="#000" />
              <View style={styles.lupa}><Ionicons name="search" size={10} color="#fff" /></View>
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

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Assinar Contrato de Aluguel</Text>
        <Text style={styles.subtitulo}>Revise e assine o contrato para finalizar o aluguel!</Text>

        {/* CARD IMÓVEL */}
        <View style={styles.cardImovel}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300" }} style={styles.imgImovel} />
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={styles.cidade}>Ponta verde, Maceió</Text>
            <Text style={styles.desc}>Apartamento 2 quartos{"\n"}48m² - Maceió, Brasil</Text>
            <View style={styles.precoBadge}><Text style={styles.precoTxt}>R$ 1.000/mês</Text></View>
          </View>
        </View>

        {/* CLÁUSULAS */}
        <View style={styles.tituloSecaoRow}>
          <Ionicons name="document-text-outline" size={16} color="#1A5CFF" />
          <Text style={styles.tituloSecao}>Cláusulas do contrato</Text>
        </View>

        <View style={styles.clausula}><View style={styles.num}><Text style={styles.numTxt}>1</Text></View><Text style={styles.clausulaTxt}><Text style={{ fontWeight: "700" }}>Prazo:</Text> 12 meses, iniciando em 15/08/2026.</Text></View>
        <View style={styles.clausula}><View style={styles.num}><Text style={styles.numTxt}>2</Text></View><Text style={styles.clausulaTxt}><Text style={{ fontWeight: "700" }}>Aluguel:</Text> R$ 1.000,00/mês, vencimento todo dia 05</Text></View>
        <View style={styles.clausula}><View style={styles.num}><Text style={styles.numTxt}>3</Text></View><Text style={styles.clausulaTxt}><Text style={{ fontWeight: "700" }}>Manutenção:</Text> Manutenção preventiva por conta do inquilino</Text></View>
        <View style={styles.clausula}><View style={styles.num}><Text style={styles.numTxt}>4</Text></View><Text style={styles.clausulaTxt}><Text style={{ fontWeight: "700" }}>Multa:</Text> Multa de 30% em caso de rescisão antecipada</Text></View>

        <Text style={[styles.tituloSecao, { textAlign: "center", marginTop: 14 }]}>Partes do contrato</Text>

        <View style={styles.cardParte}>
          <View style={styles.iconPessoa}><Ionicons name="person-circle-outline" size={26} color="#000" /></View>
          <View>
            <Text style={styles.parteNome}>Inquilino</Text>
            <Text style={styles.parteInfo}>CPF: ***.123.456-** - joão.silva@gmail.com</Text>
          </View>
        </View>

        <View style={styles.cardParte}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" }} style={styles.avatarProp} />
          <View>
            <Text style={styles.parteNome}>Proprietário</Text>
            <Text style={styles.parteInfo}>CPF: ***.789.012-** - davi.miguel@gmail.com</Text>
          </View>
        </View>

        <Text style={[styles.tituloSecao, { textAlign: "center", marginTop: 16 }]}>Assinatura</Text>

        <View style={styles.assinaturaBox}>
          <Text style={styles.assinaturaNome}>Davi Miguel</Text>
          <Text style={styles.assinaturaLegenda}>Assinatura do Inquilino</Text>
        </View>

        <TouchableOpacity style={styles.checkRow} onPress={() => setAceito(!aceito)}>
          <View style={[styles.checkBox, aceito && styles.checkBoxAtivo]}>
            {aceito && <Ionicons name="checkmark" size={12} color="#fff" />}
          </View>
          <Text style={styles.checkText}>Aceito os termos e concordo com as cláusulas do contrato</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnLaranja,!aceito && { opacity: 0.6 }]} disabled={!aceito}>
          <Ionicons name="shield-checkmark" size={16} color="#fff" />
          <Text style={styles.btnLaranjaTxt}>Assinar com certificado digital</Text>
        </TouchableOpacity>

        <View style={styles.seguroRow}>
          <Ionicons name="shield-outline" size={12} color="#555" />
          <Text style={styles.seguroTxt}>Assinatura segura com certificado digital ICP-Brasil</Text>
        </View>
        <TouchableOpacity style={{ alignItems: "center", marginTop: 4 }}>
          <Text style={styles.baixarTxt}>Baixar contrato em PDF.</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MENU */}
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
            <TouchableOpacity style={styles.menuItem}><Ionicons name="document-text" size={20} color="#1A5CFF" /><Text style={[styles.menuTxt, { color: "#1A5CFF" }]}>Contrato</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}><Ionicons name="exit-outline" size={20} color="#E53935" /><Text style={[styles.menuTxt, { color: "#E53935" }]}>Sair</Text></TouchableOpacity>
          </Animated.View>
          <Pressable style={styles.menuFundo} onPress={() => setMenuAberto(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  topoAzul: { backgroundColor: "#1A5CFF", paddingBottom: 12 },
  topoLinha: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingTop: 6 },
  hamburguer: { width: 30, height: 30, justifyContent: "center", gap: 4 },
  traco: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconCasa: { width: 36, height: 36, backgroundColor: "#fff", borderRadius: 6, alignItems: "center", justifyContent: "center" },
  lupa: { position: "absolute", bottom: -3, right: -5, backgroundColor: "#FF8C00", width: 14, height: 14, borderRadius: 7, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#fff" },
  logoAluguel: { color: "#000", fontSize: 9, fontWeight: "bold", lineHeight: 9 },
  logoBuscalar: { color: "#000", fontSize: 16, fontWeight: "900", lineHeight: 16 },
  logoSub: { color: "#000", fontSize: 6, fontWeight: "600" },

  content: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 18, borderTopRightRadius: 18, paddingHorizontal: 14, paddingTop: 14 },
  titulo: { fontSize: 17, fontWeight: "800", textAlign: "center", color: "#000" },
  subtitulo: { fontSize: 11, textAlign: "center", color: "#555", marginTop: 2, marginBottom: 12 },

  cardImovel: { flexDirection: "row", borderWidth: 1, borderColor: "#DDD", borderRadius: 10, padding: 6, alignItems: "center" },
  imgImovel: { width: 68, height: 68, borderRadius: 8 },
  cidade: { fontSize: 12, fontWeight: "700", color: "#000" },
  desc: { fontSize: 10, color: "#555", marginTop: 2, lineHeight: 12 },
  precoBadge: { backgroundColor: "#FF8C00", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10, marginTop: 4 },
  precoTxt: { color: "#fff", fontSize: 10, fontWeight: "700" },

  tituloSecaoRow: { flexDirection: "row", alignItems: "center", gap: 6, justifyContent: "center", marginTop: 14, marginBottom: 8 },
  tituloSecao: { fontSize: 13, fontWeight: "800", color: "#000" },
  clausula: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  num: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#1A5CFF", alignItems: "center", justifyContent: "center" },
  numTxt: { color: "#fff", fontSize: 10, fontWeight: "700" },
  clausulaTxt: { fontSize: 11, color: "#222", flex: 1 },

  cardParte: { flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 1, borderColor: "#DDD", borderRadius: 10, padding: 10, marginTop: 8 },
  iconPessoa: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: "#000", alignItems: "center", justifyContent: "center" },
  avatarProp: { width: 26, height: 26, borderRadius: 13 },
  parteNome: { fontSize: 11, fontWeight: "700", color: "#000" },
  parteInfo: { fontSize: 9, color: "#555", marginTop: 1 },

  assinaturaBox: { borderWidth: 1, borderColor: "#AAA", borderStyle: "dashed", borderRadius: 10, height: 70, alignItems: "center", justifyContent: "center", marginTop: 10 },
  assinaturaNome: { fontSize: 22, fontFamily: "serif", fontStyle: "italic", color: "#444" },
  assinaturaLegenda: { fontSize: 9, color: "#777", marginTop: 2 },

  checkRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 14 },
  checkBox: { width: 14, height: 14, borderWidth: 1, borderColor: "#999", borderRadius: 2, alignItems: "center", justifyContent: "center" },
  checkBoxAtivo: { backgroundColor: "#1A5CFF", borderColor: "#1A5CFF" },
  checkText: { fontSize: 9, color: "#000", flex: 1 },

  btnLaranja: { backgroundColor: "#FF8C00", height: 40, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 },
  btnLaranjaTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },

  seguroRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 8 },
  seguroTxt: { fontSize: 8, color: "#555" },
  baixarTxt: { fontSize: 10, color: "#1A5CFF", textDecorationLine: "underline" },

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