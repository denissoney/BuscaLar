import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  PanResponder,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import MenuDrawer from "./componets/MenuDrawer";

// LINHA LARANJA GROSSA-FINA
function LinhaLaranja({ width = 110 }: { width?: number }) {
  return (
    <Svg width={width} height={3} viewBox={`0 0 ${width} 3`}>
      <Path d={`M0 0 L${width} 0.5 L${width} 1.2 L0 3 Z`} fill="#FF8C00" />
    </Svg>
  );
}

export default function AjudaSuporte() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const [faq1Aberto, setFaq1Aberto] = useState(true);
  const [categoria, setCategoria] = useState("aluguel");

  // MESMO GESTO DO INDEX
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          evt.nativeEvent.pageX < 35 &&
          gestureState.dx > 60 &&
          Math.abs(gestureState.dy) < 50
        );
      },
      onPanResponderRelease: () => setMenuAberto(true),
    })
  ).current;

  function irParaDetalhe(tipo: string) {
    setCategoria(tipo);
    router.push({
      pathname: "/suportedetalhe" as any,
      params: { tipo },
    });
  }

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      {...panResponder.panHandlers}
    >
      {/* HEADER SÓ COM HAMBURGUER E LOGO - HAMBURGUER LA EM CIMA */}
      <View style={styles.headerAzul}>
        <TouchableOpacity
          style={styles.hamburguer}
          onPress={() => setMenuAberto(true)}
        >
          <View style={styles.traco} />
          <View style={[styles.traco, { width: 14 }]} />
          <View style={[styles.traco, { width: 10 }]} />
        </TouchableOpacity>

        <View style={styles.logoCentro}>
          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* CAIXA BRANCA */}
      <View style={styles.card}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* AJUDA E SUPORTE DENTRO DA CAIXA BRANCA COM LINHA LARANJA */}
          <View style={{ alignItems: "center", marginBottom: 18 }}>
            <Text style={styles.tituloAjuda}>Ajuda e suporte</Text>
            <View style={{ marginTop: 4 }}>
              <LinhaLaranja width={110} />
            </View>
          </View>

          <Text style={styles.comoPodemos}>Como podemos ajudar</Text>

          <TouchableOpacity style={styles.btnLaranja}>
            <FontAwesome name="whatsapp" size={16} color="#fff" />
            <Text style={styles.btnTxt}>Falar no WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLaranja}>
            <Ionicons
              name="help-circle-outline"
              size={16}
              color="#fff"
            />
            <Text style={styles.btnTxt}>Abrir chamado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLaranja}>
            <Ionicons name="videocam" size={16} color="#fff" />
            <Text style={styles.btnTxt}>Tutoriais em vídeo</Text>
          </TouchableOpacity>

          <Text style={styles.categoriasTitulo}>Categorias</Text>

          {/* 3 CAIXAS CLICAVEIS */}
          <View style={styles.categoriasRow}>
            <TouchableOpacity
              style={[
                styles.pill,
                categoria === "aluguel" && styles.pillAtivo,
              ]}
              onPress={() => irParaDetalhe("aluguel")}
            >
              <Ionicons
                name="home"
                size={14}
                color={
                  categoria === "aluguel" ? "#1A5CFF" : "#666"
                }
              />
              <Text
                style={
                  categoria === "aluguel"
                    ? styles.pillTxtAtivo
                    : styles.pillTxt
                }
              >
                Aluguel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pill,
                categoria === "pagamentos" && styles.pillAtivo,
              ]}
              onPress={() => irParaDetalhe("pagamentos")}
            >
              <Ionicons
                name="card-outline"
                size={14}
                color={
                  categoria === "pagamentos"
                    ? "#1A5CFF"
                    : "#666"
                }
              />
              <Text
                style={
                  categoria === "pagamentos"
                    ? styles.pillTxtAtivo
                    : styles.pillTxt
                }
              >
                Pagamentos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pill,
                categoria === "contratos" && styles.pillAtivo,
              ]}
              onPress={() => irParaDetalhe("contratos")}
            >
              <Ionicons
                name="document-text-outline"
                size={14}
                color={
                  categoria === "contratos"
                    ? "#1A5CFF"
                    : "#666"
                }
              />
              <Text
                style={
                  categoria === "contratos"
                    ? styles.pillTxtAtivo
                    : styles.pillTxt
                }
              >
                Contratos
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.faqTitulo}>FAQ</Text>

          <TouchableOpacity
            style={styles.faqItem}
            onPress={() => setFaq1Aberto(!faq1Aberto)}
          >
            <View style={styles.faqHeader}>
              <View style={styles.linhaPreta} />
              <Text style={styles.faqPergunta}>
                Como renovar meu contrato de aluguel?
              </Text>
            </View>
            {faq1Aberto && (
              <Text style={styles.faqResposta}>
                Você pode renovar seu contrato em até 60 dias
                antes do vencimento diretamente no app. Acesse{" "}
                <Text style={{ fontWeight: "800", color: "#1a5cff" }}>
                  Contratos {">"} Renovar
                </Text>{" "}
                e siga as etapas para enviar os documentos
                necessários.
              </Text>
            )}
          </TouchableOpacity>

          {/* COMO MUDAR A DATA COM SOMBRA E BORDA PRETA FINA */}
          <TouchableOpacity
            style={styles.faqItemFechado}
            onPress={() => irParaDetalhe("pagamentos")}
          >
            <Text style={styles.faqPerguntaFechada}>
              Como mudar a data do pagamento?
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#000" />
          </TouchableOpacity>

          <Text style={styles.rodape}>
            Ainda precisa de ajuda? Nosso atendimento funciona seg-sex,
            9h às 18h
          </Text>
        </ScrollView>
      </View>

      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        onOpen={() => setMenuAberto(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  headerAzul: {
    backgroundColor: "#1A5CFF",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    height: 110,
    paddingTop: 12,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  hamburguer: {
    gap: 4,
    width: 40,
    marginTop: 2,
    marginBottom: 40,
  },
  traco: {
    width: 18,
    height: 2.5,
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
  logoCentro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
  },
  logo: {
    width: 195,
    height: 110,
    resizeMode: "contain",
    marginTop: -10,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: -10,
    overflow: "hidden",
  },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  tituloAjuda: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
  },
  comoPodemos: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
  },
  btnLaranja: {
    backgroundColor: "#FF8C00",
    height: 42,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  },
  btnTxt: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 13 
  },
  categoriasTitulo: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 10,
  },
  categoriasRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginBottom: 20,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  pillAtivo: {
    backgroundColor: "#E8EFFF",
    borderColor: "#1A5CFF",
  },
  pillTxt: { fontSize: 11, color: "#666", fontWeight: "600" },
  pillTxtAtivo: { fontSize: 11, color: "#1A5CFF", fontWeight: "700" },
  faqTitulo: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
    marginBottom: 10,
  },
  faqItem: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  faqHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  linhaPreta: {
    width: 14,
    height: 2,
    backgroundColor: "#000",
    borderRadius: 2,
  },
  faqPergunta: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
    flex: 1,
  },
  faqResposta: {
    fontSize: 11,
    color: "#555555",
    lineHeight: 16,
    marginTop: 8,
    marginLeft: 22,
  },
  faqItemFechado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 0.8,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  faqPerguntaFechada: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  rodape: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});