
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Animated,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

export default function ConfirmacaoPagamento() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();

  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    superficieSecundaria: dark ? "#292929" : "#EAF0FF",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#666666",
    borda: dark ? "#444444" : "#E0E0E0",
    azul: "#488AFF",
    laranja: "#FF8C00",
    verde: "#2E7D32",
    pix: "#00B8A0",
  };

  const styles = criarEstilos(cores);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -300,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [menuAberto, slideAnim]);

  async function compartilharComprovante() {
    try {
      await Share.share({
        title: "Comprovante de pagamento",
        message:
          "Comprovante de pagamento - BuscaLar\n\n" +
          "Valor: R$ 1.000,00\n" +
          "Método: Pix\n" +
          "Destinatário: BuscaLar Imobiliária\n" +
          "ID da transação: PIX123456789203\n" +
          "Data: 14/08/2026 - 15:42\n" +
          "Descrição: Locação - Agosto 2026\n\n" +
          "Atenção: estes dados são demonstrativos.",
      });
    } catch (error) {
      console.error("Erro ao compartilhar comprovante:", error);
    }
  }

  function voltarInicio() {
    router.replace("/(tabs)" as any);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* CABEÇALHO */}
      <View style={styles.topoAzul}>
        <View style={styles.topoLinha}>
          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.hamburguer}
            activeOpacity={0.7}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>

          <View style={styles.logoRow}>
            <View style={styles.iconCasa}>
              <Ionicons name="home" size={22} color="#000000" />
              <View style={styles.lupa}>
                <Ionicons name="search" size={9} color="#FFFFFF" />
              </View>
            </View>

            <View>
              <Text style={styles.logoAluguel}>ALUGUEL</Text>
              <Text style={styles.logoBuscalar}>BUSCALAR</Text>
              <Text style={styles.logoSub}>
                ENCONTRE SEU NOVO LAR
              </Text>
            </View>
          </View>

          <View style={styles.espacoLateral} />
        </View>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollConteudo}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* STATUS DO PAGAMENTO */}
            <View style={styles.checkBoxTop}>
              <View style={styles.circuloVerde}>
                <Ionicons
                  name="checkmark"
                  size={22}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.confirmadoTxt}>
                Confirmado
              </Text>
            </View>

            <Text style={styles.titulo}>
              Pagamento Confirmado
            </Text>

            <Text style={styles.valor}>
              R$ 1.000,00
            </Text>

            <Text style={styles.pixSub}>
              Pix payment - Confirmado agora
            </Text>

            {/* DETALHES */}
            <View style={styles.detalhesBox}>
              <View style={styles.detalhesHeader}>
                <Ionicons
                  name="document-text"
                  size={16}
                  color={cores.texto}
                />

                <Text style={styles.detalhesTitulo}>
                  Detalhes do pagamento
                </Text>
              </View>

              <View style={styles.linhaDivisor} />

              <View style={styles.linhaInfo}>
                <Text style={styles.label}>Destinatário</Text>
                <Text style={styles.valueBold}>
                  BuscaLar Imobiliária
                </Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.label}>Método</Text>

                <View style={styles.metodoRow}>
                  <Text style={styles.value}>Pix</Text>

                  <View style={styles.pixBadge}>
                    <Ionicons
                      name="diamond"
                      size={10}
                      color={cores.pix}
                    />
                    <Text style={styles.pixBadgeTxt}>pix</Text>
                  </View>
                </View>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.label}>
                  ID da transação
                </Text>

                <Text style={styles.value}>
                  PIX123456789203
                </Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.label}>Data e hora</Text>

                <Text style={styles.value}>
                  14/08/2026 - 15:42
                </Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.label}>Descrição</Text>

                <Text style={styles.valueBold}>
                  Locação - Agosto 2026
                </Text>
              </View>
            </View>

            {/* COMPARTILHAR */}
            <TouchableOpacity
              style={styles.btnLaranja}
              activeOpacity={0.8}
              onPress={compartilharComprovante}
            >
              <Ionicons
                name="share-social-outline"
                size={17}
                color="#FFFFFF"
              />

              <Text style={styles.btnLaranjaTxt}>
                Compartilhar comprovante
              </Text>
            </TouchableOpacity>

            {/* VOLTAR AO INÍCIO */}
            <TouchableOpacity
              style={styles.btnBranco}
              activeOpacity={0.8}
              onPress={voltarInicio}
            >
              <Ionicons
                name="home-outline"
                size={17}
                color={cores.laranja}
              />

              <Text style={styles.btnBrancoTxt}>
                Voltar ao início
              </Text>
            </TouchableOpacity>

            <Text style={styles.rodape}>
              Guarde este recibo para seus registros
            </Text>

            <Text style={styles.aviso}>
              Comprovante demonstrativo. Confirme a transação
              no seu banco antes de considerar o pagamento concluído.
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* MENU LATERAL */}
      <Modal
        visible={menuAberto}
        transparent
        animationType="none"
        statusBarTranslucent={false}
        onRequestClose={() => setMenuAberto(false)}
      >
        <View style={styles.menuOverlay}>
          <Animated.View
            style={[
              styles.menu,
              {
                paddingTop: insets.top + 10,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.menuTopo}>
              <View style={styles.menuAvatar}>
                <Text style={styles.menuLetra}>D</Text>
              </View>

              <View style={styles.menuDados}>
                <Text style={styles.menuNome}>
                  Davi Miguel
                </Text>

                <Text style={styles.menuEmail}>
                  davi.miguel@gmail.com
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setMenuAberto(false)}
                accessibilityLabel="Fechar menu"
              >
                <Ionicons
                  name="close"
                  size={23}
                  color={cores.texto}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuAberto(false);
                router.push("/(tabs)" as any);
              }}
            >
              <Ionicons
                name="home-outline"
                size={20}
                color={cores.texto}
              />

              <Text style={styles.menuTxt}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setMenuAberto(false)}
            >
              <Ionicons
                name="card-outline"
                size={20}
                color={cores.laranja}
              />

              <Text
                style={[
                  styles.menuTxt,
                  { color: cores.laranja },
                ]}
              >
                Pagamentos
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Pressable
            style={styles.menuFundo}
            onPress={() => setMenuAberto(false)}
            accessibilityLabel="Fechar menu"
          />
        </View>
      </Modal>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  superficieSecundaria: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  laranja: string;
  verde: string;
  pix: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azul,
    },

    topoAzul: {
      backgroundColor: cores.azul,
      paddingBottom: 18,
    },

    topoLinha: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingTop: 6,
    },

    hamburguer: {
      width: 30,
      height: 30,
      justifyContent: "center",
      gap: 4,
    },

    traco: {
      height: 2.5,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    logoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 8,
    },

    iconCasa: {
      width: 32,
      height: 32,
      backgroundColor: "#FFFFFF",
      borderWidth: 1.5,
      borderColor: "#000000",
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },

    lupa: {
      position: "absolute",
      bottom: -3,
      right: -5,
      backgroundColor: cores.laranja,
      width: 14,
      height: 14,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#FFFFFF",
    },

    logoAluguel: {
      color: "#000000",
      fontSize: 8,
      fontWeight: "bold",
      lineHeight: 8,
    },

    logoBuscalar: {
      color: "#000000",
      fontSize: 14,
      fontWeight: "900",
      lineHeight: 14,
    },

    logoSub: {
      color: "#000000",
      fontSize: 5.5,
      fontWeight: "600",
    },

    espacoLateral: {
      width: 24,
    },

    content: {
      flex: 1,
      backgroundColor: cores.superficie,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      paddingHorizontal: 14,
      paddingTop: 12,
      overflow: "hidden",
    },

    scrollConteudo: {
      paddingBottom: 30,
    },

    card: {
      alignItems: "center",
    },

    checkBoxTop: {
      alignItems: "center",
      marginTop: -26,
      backgroundColor: cores.superficie,
      paddingHorizontal: 18,
      paddingVertical: 6,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: cores.borda,
      shadowColor: "#000000",
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },

    circuloVerde: {
      width: 34,
      height: 34,
      backgroundColor: cores.verde,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
    },

    confirmadoTxt: {
      fontSize: 9,
      color: cores.textoSecundario,
      marginTop: 3,
    },

    titulo: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.texto,
      marginTop: 12,
      textAlign: "center",
    },

    valor: {
      fontSize: 18,
      fontWeight: "800",
      color: cores.laranja,
      marginTop: 2,
    },

    pixSub: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 2,
      textAlign: "center",
    },

    detalhesBox: {
      width: "100%",
      backgroundColor: cores.superficieSecundaria,
      borderRadius: 12,
      padding: 12,
      marginTop: 14,
    },

    detalhesHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    detalhesTitulo: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
    },

    linhaDivisor: {
      height: 1,
      backgroundColor: cores.laranja,
      marginVertical: 10,
    },

    linhaInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 12,
    },

    label: {
      flex: 1,
      fontSize: 10,
      color: cores.textoSecundario,
    },

    value: {
      flexShrink: 1,
      fontSize: 10,
      color: cores.texto,
      textAlign: "right",
    },

    valueBold: {
      flexShrink: 1,
      fontSize: 10,
      fontWeight: "700",
      color: cores.texto,
      textAlign: "right",
    },

    metodoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    pixBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.superficie,
      borderRadius: 6,
      paddingHorizontal: 5,
      paddingVertical: 2,
      gap: 2,
      borderWidth: 0.5,
      borderColor: cores.borda,
    },

    pixBadgeTxt: {
      fontSize: 8,
      fontWeight: "700",
      color: cores.pix,
    },

    btnLaranja: {
      width: "100%",
      backgroundColor: cores.laranja,
      minHeight: 42,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingHorizontal: 10,
      marginTop: 14,
    },

    btnLaranjaTxt: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 12,
    },

    btnBranco: {
      width: "100%",
      backgroundColor: cores.superficie,
      minHeight: 42,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: cores.laranja,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingHorizontal: 10,
      marginTop: 8,
    },

    btnBrancoTxt: {
      color: cores.laranja,
      fontWeight: "700",
      fontSize: 12,
    },

    rodape: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 12,
      textAlign: "center",
    },

    aviso: {
      fontSize: 9,
      lineHeight: 14,
      color: cores.textoSecundario,
      marginTop: 8,
      textAlign: "center",
    },

    menuOverlay: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "rgba(0,0,0,0.45)",
    },

    menu: {
      width: 280,
      maxWidth: "85%",
      backgroundColor: cores.superficie,
      height: "100%",
      paddingHorizontal: 16,
    },

    menuTopo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
      marginBottom: 8,
    },

    menuAvatar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: cores.laranja,
      alignItems: "center",
      justifyContent: "center",
    },

    menuLetra: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },

    menuDados: {
      flex: 1,
    },

    menuNome: {
      fontSize: 14,
      fontWeight: "700",
      color: cores.texto,
    },

    menuEmail: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 2,
    },

    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
    },

    menuTxt: {
      fontSize: 13,
      color: cores.texto,
    },

    menuFundo: {
      flex: 1,
    },
  });
}
