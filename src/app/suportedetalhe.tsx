
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  PanResponder,
  Alert,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";

// Configure com o número oficial de atendimento, incluindo DDI e DDD.
// Exemplo de formato: 55 + DDD + número, somente dígitos.
const WHATSAPP_SUPORTE = "";

function LinhaLaranja({ width = 110 }: { width?: number }) {
  return (
    <Svg width={width} height={3} viewBox={`0 0 ${width} 3`}>
      <Path
        d={`M0 0 L${width} 0.5 L${width} 1.2 L0 3 Z`}
        fill="#FF8C00"
      />
    </Svg>
  );
}

export default function AjudaSuporte() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();

  const [menuAberto, setMenuAberto] = useState(false);
  const [faq1Aberto, setFaq1Aberto] = useState(true);
  const [faq2Aberto, setFaq2Aberto] = useState(false);
  const [categoria, setCategoria] = useState("aluguel");

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    caixa: dark ? "#242424" : "#F5F5F5",
    texto: dark ? "#F5F5F5" : "#000000",
    textoSecundario: dark ? "#BDBDBD" : "#555555",
    borda: dark ? "#3A3A3A" : "#E5E5E5",
    azul: "#488AFF",
    azulIcone: dark ? "#7FA8FF" : "#1A5CFF",
    laranja: "#FF8C00",
  };

  const styles = criarEstilos(cores);

  // Gesto para abrir o menu ao arrastar a partir da borda esquerda.
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        evt.nativeEvent.pageX < 35 &&
        gestureState.dx > 60 &&
        Math.abs(gestureState.dy) < 50,

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

  async function abrirWhatsApp() {
    const numero = WHATSAPP_SUPORTE.replace(/\D/g, "");

    if (!numero) {
      Alert.alert(
        "WhatsApp de atendimento",
        "Configure o número oficial do WhatsApp na constante WHATSAPP_SUPORTE para ativar esse botão."
      );
      return;
    }

    const url = `https://wa.me/${numero}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Não foi possível abrir",
        "Verifique se você tem um aplicativo compatível instalado e tente novamente."
      );
    }
  }

  function abrirChamado() {
    Alert.alert(
      "Abrir chamado",
      "O sistema de chamados ainda não está conectado. Essa função poderá ser ativada quando o formulário de atendimento estiver implementado."
    );
  }

  function abrirTutoriais() {
    Alert.alert(
      "Tutoriais em vídeo",
      "A área de tutoriais ainda não está configurada. Adicione os links dos vídeos para disponibilizar esse conteúdo."
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
      {...panResponder.panHandlers}
    >
      {/* CABEÇALHO AZUL */}
      <View style={styles.headerAzul}>
        <TouchableOpacity
          style={styles.hamburguer}
          onPress={() => setMenuAberto(true)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
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

        {/* Mantém a logo centralizada */}
        <View style={styles.espacadorHeader} />
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.card}>
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: 30 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* TÍTULO */}
          <View style={styles.tituloContainer}>
            <Text style={styles.tituloAjuda}>
              Ajuda e suporte
            </Text>

            <View style={styles.linhaLaranja}>
              <LinhaLaranja width={110} />
            </View>
          </View>

          <Text style={styles.comoPodemos}>
            Como podemos ajudar?
          </Text>

          {/* WHATSAPP */}
          <TouchableOpacity
            style={styles.btnLaranja}
            onPress={abrirWhatsApp}
            activeOpacity={0.8}
          >
            <FontAwesome
              name="whatsapp"
              size={17}
              color="#FFFFFF"
            />
            <Text style={styles.btnTxt}>
              Falar no WhatsApp
            </Text>
          </TouchableOpacity>

          {/* CHAMADO */}
          <TouchableOpacity
            style={styles.btnLaranja}
            onPress={abrirChamado}
            activeOpacity={0.8}
          >
            <Ionicons
              name="help-circle-outline"
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.btnTxt}>
              Abrir chamado
            </Text>
          </TouchableOpacity>

          {/* TUTORIAIS */}
          <TouchableOpacity
            style={styles.btnLaranja}
            onPress={abrirTutoriais}
            activeOpacity={0.8}
          >
            <Ionicons
              name="videocam-outline"
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.btnTxt}>
              Tutoriais em vídeo
            </Text>
          </TouchableOpacity>

          {/* CATEGORIAS */}
          <Text style={styles.categoriasTitulo}>
            Categorias
          </Text>

          <View style={styles.categoriasRow}>
            <TouchableOpacity
              style={[
                styles.pill,
                categoria === "aluguel" && styles.pillAtivo,
              ]}
              onPress={() => irParaDetalhe("aluguel")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="home-outline"
                size={15}
                color={
                  categoria === "aluguel"
                    ? cores.azulIcone
                    : cores.textoSecundario
                }
              />

              <Text
                style={[
                  styles.pillTxt,
                  categoria === "aluguel" && styles.pillTxtAtivo,
                ]}
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
              activeOpacity={0.7}
            >
              <Ionicons
                name="card-outline"
                size={15}
                color={
                  categoria === "pagamentos"
                    ? cores.azulIcone
                    : cores.textoSecundario
                }
              />

              <Text
                style={[
                  styles.pillTxt,
                  categoria === "pagamentos" && styles.pillTxtAtivo,
                ]}
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
              activeOpacity={0.7}
            >
              <Ionicons
                name="document-text-outline"
                size={15}
                color={
                  categoria === "contratos"
                    ? cores.azulIcone
                    : cores.textoSecundario
                }
              />

              <Text
                style={[
                  styles.pillTxt,
                  categoria === "contratos" && styles.pillTxtAtivo,
                ]}
              >
                Contratos
              </Text>
            </TouchableOpacity>
          </View>

          {/* PERGUNTAS FREQUENTES */}
          <Text style={styles.faqTitulo}>FAQ</Text>

          {/* FAQ 1 */}
          <TouchableOpacity
            style={styles.faqItem}
            onPress={() => setFaq1Aberto(!faq1Aberto)}
            activeOpacity={0.7}
          >
            <View style={styles.faqHeader}>
              <Ionicons
                name={faq1Aberto ? "remove" : "add"}
                size={18}
                color={cores.texto}
              />

              <Text style={styles.faqPergunta}>
                Como renovar meu contrato de aluguel?
              </Text>
            </View>

            {faq1Aberto && (
              <Text style={styles.faqResposta}>
                Consulte a área de Contratos do aplicativo para
                verificar as opções disponíveis. A renovação depende
                das condições do contrato e da disponibilidade dos
                recursos no sistema.
              </Text>
            )}
          </TouchableOpacity>

          {/* FAQ 2 */}
          <TouchableOpacity
            style={styles.faqItemFechado}
            onPress={() => setFaq2Aberto(!faq2Aberto)}
            activeOpacity={0.7}
          >
            <Text style={styles.faqPerguntaFechada}>
              Como mudar a data do pagamento?
            </Text>

            <Ionicons
              name={faq2Aberto ? "chevron-up" : "chevron-down"}
              size={17}
              color={cores.texto}
            />
          </TouchableOpacity>

          {faq2Aberto && (
            <View style={styles.respostaSecundaria}>
              <Text style={styles.faqResposta}>
                Consulte a área de Pagamentos para verificar as
                informações disponíveis. Se precisar alterar uma
                data, confirme as condições com o responsável pelo
                contrato. A alteração pode depender de autorização.
              </Text>

              <TouchableOpacity
                onPress={() => irParaDetalhe("pagamentos")}
                style={styles.linkDetalhe}
                activeOpacity={0.7}
              >
                <Text style={styles.linkDetalheTexto}>
                  Ver ajuda sobre pagamentos
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={15}
                  color={cores.azulIcone}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* RODAPÉ */}
          <Text style={styles.rodape}>
            Ainda precisa de ajuda? Nosso atendimento funciona de
            segunda a sexta, das 9h às 18h.
          </Text>
        </ScrollView>
      </View>

      {/* MENU LATERAL */}
      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        onOpen={() => setMenuAberto(true)}
      />
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  caixa: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  azulIcone: string;
  laranja: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azul,
    },

    headerAzul: {
      backgroundColor: cores.azul,
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
      minHeight: 40,
      justifyContent: "center",
      alignItems: "flex-start",
    },

    traco: {
      width: 18,
      height: 2.5,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    logoCentro: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 80,
    },

    logo: {
      width: 195,
      height: 90,
      marginTop: -8,
    },

    espacadorHeader: {
      width: 40,
    },

    card: {
      flex: 1,
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      marginTop: -10,
      overflow: "hidden",
    },

    scroll: {
      paddingHorizontal: 18,
      paddingTop: 18,
    },

    tituloContainer: {
      alignItems: "center",
      marginBottom: 20,
    },

    tituloAjuda: {
      fontSize: 18,
      fontWeight: "900",
      color: cores.texto,
      textAlign: "center",
    },

    linhaLaranja: {
      marginTop: 5,
    },

    comoPodemos: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
      marginBottom: 16,
    },

    btnLaranja: {
      backgroundColor: cores.laranja,
      minHeight: 44,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 10,
      paddingHorizontal: 12,
    },

    btnTxt: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 13,
    },

    categoriasTitulo: {
      fontSize: 14,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
      marginTop: 18,
      marginBottom: 10,
    },

    categoriasRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
      marginBottom: 20,
    },

    pill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      minHeight: 32,
      borderRadius: 16,
      backgroundColor: cores.caixa,
      borderWidth: 1,
      borderColor: cores.borda,
    },

    pillAtivo: {
      backgroundColor: cores.caixa,
      borderColor: cores.azulIcone,
    },

    pillTxt: {
      fontSize: 11,
      color: cores.textoSecundario,
      fontWeight: "600",
    },

    pillTxtAtivo: {
      color: cores.azulIcone,
      fontWeight: "700",
    },

    faqTitulo: {
      fontSize: 14,
      fontWeight: "800",
      color: cores.texto,
      marginBottom: 10,
    },

    faqItem: {
      backgroundColor: cores.superficie,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    faqHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    faqPergunta: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
      flex: 1,
    },

    faqResposta: {
      fontSize: 11,
      color: cores.textoSecundario,
      lineHeight: 17,
      marginTop: 9,
      marginLeft: 26,
    },

    faqItemFechado: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: cores.caixa,
      paddingHorizontal: 12,
      minHeight: 44,
      borderRadius: 8,
      marginTop: 10,
      borderWidth: 1,
      borderColor: cores.borda,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 3,
    },

    faqPerguntaFechada: {
      fontSize: 12,
      fontWeight: "600",
      color: cores.texto,
      flex: 1,
      marginRight: 8,
    },

    respostaSecundaria: {
      backgroundColor: cores.superficie,
      borderWidth: 1,
      borderColor: cores.borda,
      borderTopWidth: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      padding: 12,
    },

    linkDetalhe: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 10,
      marginLeft: 26,
      alignSelf: "flex-start",
    },

    linkDetalheTexto: {
      color: cores.azulIcone,
      fontSize: 11,
      fontWeight: "700",
    },

    rodape: {
      fontSize: 10,
      color: cores.textoSecundario,
      textAlign: "center",
      lineHeight: 16,
      marginTop: 22,
      paddingHorizontal: 8,
    },
  });
}
