import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  PanResponder,
  Animated,
  Image,
  Alert,
  Clipboard,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Pagamentos() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const [tempo, setTempo] = useState(900);
  const [pago, setPago] = useState(false);
  const [expirado, setExpirado] = useState(false);
  const chavePix =
    "00020126580014BR.GOV.BCB.PIX0136a7c9e123-4b5a-9c8d-1e2f3a4b5c6d5204000053039865405120.005802BR5913BUSCALARLTDA6009MACEIO62070503***6304A1F2";

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, g) =>
        e.nativeEvent.pageX < 30 && g.dx > 50 && Math.abs(g.dy) < 40,
      onPanResponderRelease: () => setMenuAberto(true),
    })
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto? 0 : -300,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [menuAberto]);

  useEffect(() => {
    let interval: any;
    if (tempo > 0 &&!pago &&!expirado) {
      interval = setInterval(() => setTempo((p) => p - 1), 1000);
    }
    if (tempo === 0) setExpirado(true);
    return () => clearInterval(interval);
  }, [tempo, pago, expirado]);

  const irPara = (rota: string) => {
    setMenuAberto(false);
    setTimeout(() => router.push(rota as any), 260);
  };

  const copiarChave = () => {
    Clipboard.setString(chavePix);
    Alert.alert("Copiado!", "Chave PIX copiada");
    setTimeout(() => setPago(true), 1000);
  };

  const compartilhar = async () => {
    await Share.share({
      message: `Pagamento Confirmado - BuscaLar Imobiliária\nValor: R$ 1.000,00\nID: PIX123456789203\nData: 14/08/2026 - 15:42\nDescrição: Locação - Agosto 2026`,
    });
  };

  const formatarTempo = () => {
    const m = Math.floor(tempo / 60);
    const s = tempo % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  };

  // TELA DE COMPROVANTE IDÊNTICA A FOTO
  if (pago) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
        <View style={styles.topoAzulComprovante}>
          <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.hamburguer}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={{ width: 180, height: 60 }}
            resizeMode="contain"
          />
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.contentComprovante}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}>
            <View style={styles.checkCard}>
              <View style={styles.checkCirculo}>
                <Ionicons name="checkmark" size={40} color="#fff" />
              </View>
              <Text style={styles.confirmedText}>Confirmed</Text>
            </View>

            <Text style={styles.pagamentoConfirmadoTitle}>Pagamento Confirmado</Text>
            <Text style={styles.valorGrande}>R$ 1.000,00</Text>
            <Text style={styles.subPix}>Pix payment - Confirmado agora</Text>

            <View style={styles.detalhesBox}>
              <View style={styles.detalhesHeader}>
                <Ionicons name="receipt" size={18} color="#000" />
                <Text style={styles.detalhesTitle}>Detalhes do pagamento</Text>
              </View>

              <View style={styles.detalhesRow}>
                <Text style={styles.detalhesLabel}>Destinatário</Text>
                <Text style={styles.detalhesValorBold}>BuscaLar Imobiliária</Text>
              </View>

              <View style={styles.detalhesRow}>
                <Text style={styles.detalhesLabel}>Método</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text style={styles.detalhesValorBold}>Pix</Text>
                  <Text style={{ fontSize: 10, color: "#00BFBF" }}>◆ pix</Text>
                </View>
              </View>

              <View style={styles.detalhesRow}>
                <Text style={styles.detalhesLabel}>ID da transação</Text>
                <Text style={styles.detalhesValorBold}>PIX123456789203</Text>
              </View>

              <View style={styles.detalhesRow}>
                <Text style={styles.detalhesLabel}>Data e hora</Text>
                <Text style={styles.detalhesValorBold}>14/08/2026 - 15:42</Text>
              </View>
            </View>

            <View style={styles.descricaoBox}>
              <Text style={styles.detalhesLabel}>Descrição</Text>
              <Text style={styles.detalhesValorBold}>Locação - Agosto 2026</Text>
            </View>

            <TouchableOpacity style={styles.btnCompartilhar} onPress={compartilhar}>
              <Text style={styles.btnCompartilharTxt}>Compartilhar comprovante</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnVoltarBranco} onPress={() => router.push("/(tabs)" as any)}>
              <Text style={styles.btnVoltarBrancoTxt}>Voltar ao inicio</Text>
            </TouchableOpacity>

            <Text style={styles.rodape}>Guarde este recibo para seus registros</Text>
          </ScrollView>
        </View>

        <Modal visible={menuAberto} transparent animationType="fade" onRequestClose={() => setMenuAberto(false)}>
          <View style={styles.menuOverlay}>
            <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }], paddingTop: insets.top + 10 }]}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.menuTopo}>
                  <View style={styles.menuAvatar}><Text style={styles.menuLetra}>D</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuNome}>Davi Miguel</Text>
                    <Text style={styles.menuEmail}>davi.miguel@gmail.com</Text>
                  </View>
                  <TouchableOpacity onPress={() => setMenuAberto(false)} style={styles.menuClose}>
                    <Ionicons name="close" size={22} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.divisor} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/index")}><Ionicons name="home" size={22} color="#000" /><Text style={styles.menuTxt}>Inicio</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/filtro")}><Ionicons name="location" size={22} color="#000" /><Text style={styles.menuTxt}>Filtro</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/favoritos")}><Ionicons name="heart-outline" size={22} color="#000" /><Text style={styles.menuTxt}>Favorito</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/agendamento")}><Ionicons name="calendar" size={22} color="#000" /><Text style={styles.menuTxt}>Agendamentos</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/pagamentos")}><Ionicons name="card" size={22} color="#1A5CFF" /><Text style={[styles.menuTxt, { color: "#1A5CFF" }]}>Pagamentos</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/contrato")}><Ionicons name="document-text" size={22} color="#000" /><Text style={styles.menuTxt}>Contrato</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/perfil-proprietario")}><Ionicons name="person" size={22} color="#000" /><Text style={styles.menuTxt}>Perfil</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/imoveis")}><Ionicons name="home-outline" size={22} color="#000" /><Text style={styles.menuTxt}>Casas</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/configuracoes")}><Ionicons name="settings" size={22} color="#000" /><Text style={styles.menuTxt}>Configurações</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/login")}><Ionicons name="exit-outline" size={22} color="#E53935" /><Text style={[styles.menuTxt, { color: "#E53935" }]}>Sair</Text></TouchableOpacity>
              </ScrollView>
            </Animated.View>
            <Pressable style={styles.menuFundo} onPress={() => setMenuAberto(false)} />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
      <View style={styles.topoAzul}>
        <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.hamburguer}>
          <View style={[styles.traco, { width: 18 }]} />
          <View style={[styles.traco, { width: 12 }]} />
          <View style={[styles.traco, { width: 8 }]} />
        </TouchableOpacity>
        <View style={styles.tituloAzul}>
          <Ionicons name="card-outline" size={22} color="#000" />
          <Text style={styles.tituloAzulTxt}>Pagamento</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnBackSemBola}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", paddingBottom: 20, width: "100%" }}>
          <View style={styles.tabsContainer}>
            <View style={[styles.tab, styles.tabAtiva]}><Text style={[styles.tabText, styles.tabTextAtiva]}>Pix</Text></View>
            <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Cartão</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnQrTopo}><Text style={styles.btnQrTopoText}>Pagar com QR CODE</Text></TouchableOpacity>
          <View style={styles.qrWrapper}>
            <Image source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${chavePix}` }} style={styles.qrImage} />
          </View>
          <Text style={styles.ouCopie}>Ou copie o codigo pix:</Text>
          <View style={styles.codigoBox}>
            <Text style={styles.codigoTexto} numberOfLines={3}>{chavePix}</Text>
            <TouchableOpacity onPress={copiarChave}><Ionicons name="copy-outline" size={18} color="#000" /></TouchableOpacity>
          </View>
          <Text style={styles.instrucao}>Aponte a câmera do seu banco para o QR Code</Text>
          <Text style={styles.validade}>O código é válido por {expirado? "00:00 expirado" : formatarTempo() + " minutos"}</Text>
          <TouchableOpacity style={styles.btnCopiarLaranja} onPress={copiarChave}>
            <Ionicons name="copy-outline" size={18} color="#fff" />
            <Text style={styles.btnCopiarLaranjaText}>Copiar chave pix</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Modal visible={menuAberto} transparent animationType="fade" onRequestClose={() => setMenuAberto(false)}>
        <View style={styles.menuOverlay}>
          <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }], paddingTop: insets.top + 10 }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.menuTopo}>
                <View style={styles.menuAvatar}><Text style={styles.menuLetra}>D</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuNome}>Davi Miguel</Text>
                  <Text style={styles.menuEmail}>davi.miguel@gmail.com</Text>
                </View>
                <TouchableOpacity onPress={() => setMenuAberto(false)} style={styles.menuClose}>
                  <Ionicons name="close" size={22} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.divisor} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/index")}><Ionicons name="home" size={22} color="#000" /><Text style={styles.menuTxt}>Inicio</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/filtro")}><Ionicons name="location" size={22} color="#000" /><Text style={styles.menuTxt}>Filtro</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/favoritos")}><Ionicons name="heart-outline" size={22} color="#000" /><Text style={styles.menuTxt}>Favorito</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/agendamento")}><Ionicons name="calendar" size={22} color="#000" /><Text style={styles.menuTxt}>Agendamentos</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/pagamentos")}><Ionicons name="card" size={22} color="#1A5CFF" /><Text style={[styles.menuTxt, { color: "#1A5CFF" }]}>Pagamentos</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/contrato")}><Ionicons name="document-text" size={22} color="#000" /><Text style={styles.menuTxt}>Contrato</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/perfil-proprietario")}><Ionicons name="person" size={22} color="#000" /><Text style={styles.menuTxt}>Perfil</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/imoveis")}><Ionicons name="home-outline" size={22} color="#000" /><Text style={styles.menuTxt}>Casas</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/configuracoes")}><Ionicons name="settings" size={22} color="#000" /><Text style={styles.menuTxt}>Configurações</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/login")}><Ionicons name="exit-outline" size={22} color="#E53935" /><Text style={[styles.menuTxt, { color: "#E53935" }]}>Sair</Text></TouchableOpacity>
            </ScrollView>
          </Animated.View>
          <Pressable style={styles.menuFundo} onPress={() => setMenuAberto(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#448aff" },
  topoAzul: { backgroundColor: "#448aff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingBottom: 14, paddingTop: 6 },
  topoAzulComprovante: { backgroundColor: "#4A8AF4", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingBottom: 14, paddingTop: 6 },
  hamburguer: { 
    width: 30, 
    height: 30, 
    justifyContent: "center", 
    gap: 4,
    marginBottom: 60, 
  },
  traco: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  tituloAzul: { flexDirection: "row", alignItems: "center", gap: 6 },
  tituloAzulTxt: { fontSize: 18, fontWeight: "800", color: "#000" },
  content: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 16 },
  contentComprovante: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 20 },
  btnBackSemBola: { alignSelf: "flex-start", padding: 4, marginBottom: 12 },
  tabsContainer: { flexDirection: "row", backgroundColor: "#F1F1F1", borderRadius: 20, padding: 4, width: "100%", marginBottom: 12 },
  tab: { flex: 1, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  tabAtiva: { backgroundColor: "#6CA6FF" },
  tabText: { fontWeight: "600", color: "#000" },
  tabTextAtiva: { color: "#fff", fontWeight: "800" },
  btnQrTopo: { borderWidth: 1, borderColor: "#6CA6FF", borderRadius: 18, paddingVertical: 8, paddingHorizontal: 18, marginBottom: 14 },
  btnQrTopoText: { fontSize: 12, fontWeight: "700", color: "#000" },
  qrWrapper: { borderWidth: 4, borderColor: "#FF8C00", borderRadius: 18, padding: 8, marginBottom: 14 },
  qrImage: { width: 200, height: 200, borderRadius: 8 },
  ouCopie: { fontSize: 12, fontWeight: "700", color: "#000", alignSelf: "flex-start", marginBottom: 6 },
  codigoBox: { flexDirection: "row", backgroundColor: "#F5F5F5", borderRadius: 8, padding: 10, width: "100%", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#000" },
  codigoTexto: { fontSize: 10, color: "#333", flex: 1, marginRight: 8 },
  instrucao: { fontSize: 12, fontWeight: "600", color: "#000", marginTop: 14 },
  validade: { fontSize: 11, color: "#555", marginTop: 2, marginBottom: 18 },
  btnCopiarLaranja: { backgroundColor: "#FF8C00", width: "100%", height: 48, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  btnCopiarLaranjaText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  checkCard: { backgroundColor: "#fff", borderRadius: 12, padding: 16, alignItems: "center", elevation: 2, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, marginTop: 10, width: 110 },
  checkCirculo: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#4CAF50", alignItems: "center", justifyContent: "center" },
  confirmedText: { fontSize: 10, color: "#888", marginTop: 6 },
  pagamentoConfirmadoTitle: { fontSize: 20, fontWeight: "900", color: "#000", marginTop: 14 },
  valorGrande: { fontSize: 28, fontWeight: "900", color: "#FF8C00", marginTop: 4 },
  subPix: { fontSize: 12, color: "#777", marginTop: 2, marginBottom: 18 },
  detalhesBox: { backgroundColor: "#EAF1FF", borderRadius: 12, padding: 14, width: "100%" },
  detalhesHeader: { flexDirection: "row", alignItems: "center", gap: 6, borderBottomWidth: 1, borderBottomColor: "#FF8C00", paddingBottom: 6, marginBottom: 10 },
  detalhesTitle: { fontSize: 14, fontWeight: "800", color: "#000" },
  detalhesRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  detalhesLabel: { fontSize: 12, color: "#555" },
  detalhesValorBold: { fontSize: 13, fontWeight: "700", color: "#000" },
  descricaoBox: { backgroundColor: "#EAF1FF", borderRadius: 12, padding: 12, width: "100%", marginTop: 12, flexDirection: "row", justifyContent: "space-between" },
  btnCompartilhar: { backgroundColor: "#FF8C00", width: "100%", height: 48, borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 18 },
  btnCompartilharTxt: { color: "#fff", fontWeight: "800", fontSize: 14 },
  btnVoltarBranco: { backgroundColor: "#fff", width: "100%", height: 48, borderRadius: 10, borderWidth: 1.5, borderColor: "#000", alignItems: "center", justifyContent: "center", marginTop: 10 },
  btnVoltarBrancoTxt: { color: "#FF8C00", fontWeight: "800", fontSize: 14 },
  rodape: { fontSize: 10, color: "#888", marginTop: 10 },
  comprovante: { backgroundColor: "#fff", borderRadius: 16, padding: 20, alignItems: "center" },
  tituloPago: { fontSize: 20, fontWeight: "900", color: "#2E7D32", marginTop: 10 },
  subPago: { fontSize: 12, color: "#555", marginTop: 4, marginBottom: 12 },
  linhaDiv: { width: "100%", height: 1, backgroundColor: "#EEE", marginVertical: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 8 },
  label: { fontSize: 12, color: "#777" },
  valor: { fontSize: 12, fontWeight: "700", color: "#000" },
  btnVoltar: { backgroundColor: "#000", height: 44, borderRadius: 10, width: "100%", alignItems: "center", justifyContent: "center", marginTop: 18 },
  btnVoltarTxt: { color: "#FFF", fontWeight: "700" },
  menuOverlay: { flex: 1, flexDirection: "row", backgroundColor: "rgba(0,0,0,0.45)" },
  menu: { width: 300, backgroundColor: "#fff", height: "100%", paddingHorizontal: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  menuTopo: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 14 },
  menuAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  menuLetra: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  menuNome: { fontSize: 14, fontWeight: "700", color: "#000" },
  menuEmail: { fontSize: 10, color: "#777" },
  menuClose: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F2F2F2", alignItems: "center", justifyContent: "center" },
  divisor: { height: 1, backgroundColor: "#EEE", marginVertical: 10 },
  linha: { height: 0.8, backgroundColor: "#EEE", marginHorizontal: 4 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 13 },
  menuTxt: { fontSize: 14, fontWeight: "500", color: "#000" },
  menuFundo: { flex: 1 },
});