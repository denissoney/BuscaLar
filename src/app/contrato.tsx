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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";
export default function Contrato() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const [aceito, setAceito] = useState(true);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  // Cores adaptáveis ao tema
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    fundoTela: dark ? "#121212" : "#FFFFFF",
    fundoCard: dark ? "#1E1E1E" : "#FFFFFF",
    fundoMenu: dark ? "#1B1B1B" : "#FFFFFF",
    fundoSecundario: dark ? "#292929" : "#F5F5F5",
    texto: dark ? "#FFFFFF" : "#000000",
    textoSecundario: dark ? "#CCCCCC" : "#555555",
    textoFraco: dark ? "#AAAAAA" : "#777777",
    borda: dark ? "#444444" : "#DDDDDD",
    azul: "#448AFF",
    azulForte: "#1A5CFF",
    laranja: "#FF8C00",
    branco: "#FFFFFF",
    sombra: "#000000",
  };

  const styles = criarEstilos(cores);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, g) =>
        e.nativeEvent.pageX < 30 &&
        g.dx > 50 &&
        Math.abs(g.dy) < 40,
      onPanResponderRelease: () => setMenuAberto(true),
    })
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -300,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [menuAberto, slideAnim]);

  const irPara = (rota: string) => {
    setMenuAberto(false);
    setTimeout(() => {
      router.push(rota as any);
    }, 260);
  };

  const handleAssinar = () => {
    Alert.alert(
      "Assinatura demonstrativa",
      "Esta tela ainda não está conectada a um serviço de assinatura digital. Nenhum contrato foi assinado ou enviado ao proprietário.",
      [
        {
          text: "Entendi",
          onPress: () => router.push("/(tabs)" as any),
        },
      ]
    );
  };

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      {...panResponder.panHandlers}
    >
      {/* Cabeçalho */}
      <View style={styles.topoAzul}>
        <View style={styles.topoLinha}>
          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.hamburguer}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logoImg}
            resizeMode="contain"
          />

          <View style={{ width: 30 }} />
        </View>
      </View>

      {/* Conteúdo */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tituloRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.botaoVoltar}
            accessibilityLabel="Voltar"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={cores.texto}
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>
            Assinar Contrato de Aluguel
          </Text>

          <View style={{ width: 38 }} />
        </View>

        <Text style={styles.subtitulo}>
          Revise e assine o contrato para finalizar o aluguel!
        </Text>

        {/* Imóvel */}
        <View style={styles.cardImovel}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300",
            }}
            style={styles.imgImovel}
          />

          <View style={styles.infoImovel}>
            <Text style={styles.cidade}>
              Ponta Verde, Maceió
            </Text>

            <Text style={styles.desc}>
              Apartamento 2 quartos{"\n"}
              48m² - Maceió, Brasil
            </Text>

            <View style={styles.precoBadge}>
              <Text style={styles.precoTxt}>
                R$ 1.000/mês
              </Text>
            </View>
          </View>
        </View>

        {/* Cláusulas */}
        <View style={styles.tituloSecaoRow}>
          <Ionicons
            name="document-text-outline"
            size={17}
            color={cores.azulForte}
          />
          <Text style={styles.tituloSecao}>
            Cláusulas do contrato
          </Text>
        </View>

        <View style={styles.clausula}>
          <View style={styles.num}>
            <Text style={styles.numTxt}>1</Text>
          </View>
          <Text style={styles.clausulaTxt}>
            <Text style={styles.clausulaDestaque}>Prazo: </Text>
            12 meses, iniciando em 15/08/2026.
          </Text>
        </View>

        <View style={styles.clausula}>
          <View style={styles.num}>
            <Text style={styles.numTxt}>2</Text>
          </View>
          <Text style={styles.clausulaTxt}>
            <Text style={styles.clausulaDestaque}>Aluguel: </Text>
            R$ 1.000,00/mês, vencimento todo dia 05.
          </Text>
        </View>

        <View style={styles.clausula}>
          <View style={styles.num}>
            <Text style={styles.numTxt}>3</Text>
          </View>
          <Text style={styles.clausulaTxt}>
            <Text style={styles.clausulaDestaque}>
              Manutenção:{" "}
            </Text>
            Manutenção preventiva por conta do inquilino.
          </Text>
        </View>

        <View style={styles.clausula}>
          <View style={styles.num}>
            <Text style={styles.numTxt}>4</Text>
          </View>
          <Text style={styles.clausulaTxt}>
            <Text style={styles.clausulaDestaque}>Multa: </Text>
            Multa de 30% em caso de rescisão antecipada.
          </Text>
        </View>

        {/* Partes do contrato */}
        <Text style={styles.tituloSecaoCentral}>
          Partes do contrato
        </Text>

        <View style={styles.cardParte}>
          <View style={styles.iconPessoa}>
            <Ionicons
              name="person-circle-outline"
              size={26}
              color={cores.texto}
            />
          </View>

          <View style={styles.infoParte}>
            <Text style={styles.parteNome}>Inquilino</Text>
            <Text style={styles.parteInfo}>
              CPF: ***.123.456-** - joão.silva@gmail.com
            </Text>
          </View>
        </View>

        <View style={styles.cardParte}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
            }}
            style={styles.avatarProp}
          />

          <View style={styles.infoParte}>
            <Text style={styles.parteNome}>
              Proprietário
            </Text>
            <Text style={styles.parteInfo}>
              CPF: ***.789.012-** - davi.miguel@gmail.com
            </Text>
          </View>
        </View>

        {/* Assinatura */}
        <Text style={styles.tituloSecaoCentral}>
          Assinatura
        </Text>

        <View style={styles.assinaturaBox}>
          <Text style={styles.assinaturaNome}>
            Davi Miguel
          </Text>
          <Text style={styles.assinaturaLegenda}>
            Assinatura do Inquilino
          </Text>
        </View>

        {/* Aceite */}
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAceito((valor) => !valor)}
          activeOpacity={0.8}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: aceito }}
        >
          <View
            style={[
              styles.checkBox,
              aceito && styles.checkBoxAtivo,
            ]}
          >
            {aceito && (
              <Ionicons
                name="checkmark"
                size={12}
                color="#FFFFFF"
              />
            )}
          </View>

          <Text style={styles.checkText}>
            Aceito os termos e concordo com as cláusulas do
            contrato
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnLaranja,
            !aceito && styles.botaoDesativado,
          ]}
          disabled={!aceito}
          onPress={handleAssinar}
          activeOpacity={0.8}
        >
          <Ionicons
            name="shield-checkmark"
            size={17}
            color="#FFFFFF"
          />
          <Text style={styles.btnLaranjaTxt}>
            Assinar com certificado digital
          </Text>
        </TouchableOpacity>

        <View style={styles.seguroRow}>
          <Ionicons
            name="shield-outline"
            size={13}
            color={cores.textoSecundario}
          />
          <Text style={styles.seguroTxt}>
            Assinatura digital ainda não integrada
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoBaixar}
          onPress={() =>
            Alert.alert(
              "PDF indisponível",
              "A geração e o download do contrato em PDF ainda precisam ser implementados."
            )
          }
        >
          <Text style={styles.baixarTxt}>
            Baixar contrato em PDF
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Menu lateral */}
      <Modal
        visible={menuAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuAberto(false)}
        statusBarTranslucent
      >
        <View style={styles.menuOverlay}>
          <Animated.View
            style={[
              styles.menu,
              {
                transform: [{ translateX: slideAnim }],
                paddingTop: insets.top + 10,
                paddingBottom: insets.bottom + 10,
              },
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.menuConteudo}
            >
              <View style={styles.menuTopo}>
                <View style={styles.menuAvatar}>
                  <Text style={styles.menuLetra}>D</Text>
                </View>

                <View style={styles.menuUsuario}>
                  <Text style={styles.menuNome}>
                    Davi Miguel
                  </Text>
                  <Text style={styles.menuEmail}>
                    davi.miguel@gmail.com
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setMenuAberto(false)}
                  style={styles.menuClose}
                  accessibilityLabel="Fechar menu"
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color={cores.texto}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.divisor} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/(tabs)/index")}
              >
                <Ionicons
                  name="home"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>Início</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/filtro")}
              >
                <Ionicons
                  name="location"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>Filtro</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/(tabs)/favoritos")}
              >
                <Ionicons
                  name="heart-outline"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>Favoritos</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/(tabs)/agendamento")}
              >
                <Ionicons
                  name="calendar"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>
                  Agendamentos
                </Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/pagamentos")}
              >
                <Ionicons
                  name="card"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>Pagamentos</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={[styles.menuItem, styles.menuItemAtivo]}
                onPress={() => setMenuAberto(false)}
              >
                <Ionicons
                  name="document-text"
                  size={22}
                  color={cores.azulForte}
                />
                <Text style={styles.menuTxtAtivo}>
                  Contrato
                </Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/perfil-proprietario")}
              >
                <Ionicons
                  name="person"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>Perfil</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/imoveis")}
              >
                <Ionicons
                  name="home-outline"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>Casas</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/configuracoes")}
              >
                <Ionicons
                  name="settings"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuTxt}>
                  Configurações
                </Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/login")}
              >
                <Ionicons
                  name="exit-outline"
                  size={22}
                  color="#E53935"
                />
                <Text style={styles.menuTxtSair}>Sair</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>

          <Pressable
            style={styles.menuFundo}
            onPress={() => setMenuAberto(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const criarEstilos = (cores: {
  fundo: string;
  fundoTela: string;
  fundoCard: string;
  fundoMenu: string;
  fundoSecundario: string;
  texto: string;
  textoSecundario: string;
  textoFraco: string;
  borda: string;
  azul: string;
  azulForte: string;
  laranja: string;
  branco: string;
  sombra: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundoTela,
    },

    topoAzul: {
      backgroundColor: cores.azul,
      paddingBottom: 12,
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
      alignItems: "flex-start",
      gap: 4,
    },

    traco: {
      height: 2.5,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    logoImg: {
      width: 200,
      height: 70,
      marginTop: -2,
    },

    content: {
      flex: 1,
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
    },

    contentContainer: {
      paddingHorizontal: 14,
      paddingTop: 14,
      paddingBottom: 40,
    },

    tituloRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },

    botaoVoltar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
    },

    titulo: {
      flex: 1,
      fontSize: 17,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
    },

    subtitulo: {
      fontSize: 11,
      textAlign: "center",
      color: cores.textoSecundario,
      marginTop: 2,
      marginBottom: 12,
    },

    cardImovel: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 12,
      padding: 8,
      alignItems: "center",
      backgroundColor: cores.fundoCard,
      elevation: 3,
      shadowColor: cores.sombra,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
    },

    imgImovel: {
      width: 68,
      height: 68,
      borderRadius: 8,
    },

    infoImovel: {
      flex: 1,
      paddingLeft: 10,
    },

    cidade: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
    },

    desc: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 2,
      lineHeight: 14,
    },

    precoBadge: {
      backgroundColor: cores.laranja,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 10,
      marginTop: 4,
    },

    precoTxt: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "700",
    },

    tituloSecaoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      justifyContent: "center",
      marginTop: 14,
      marginBottom: 8,
    },

    tituloSecao: {
      fontSize: 13,
      fontWeight: "800",
      color: cores.texto,
    },

    tituloSecaoCentral: {
      fontSize: 13,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
      marginTop: 16,
      marginBottom: 2,
    },

    clausula: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 10,
    },

    num: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: cores.azulForte,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1,
    },

    numTxt: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "700",
    },

    clausulaTxt: {
      fontSize: 11,
      color: cores.textoSecundario,
      flex: 1,
      lineHeight: 17,
    },

    clausulaDestaque: {
      fontWeight: "700",
      color: cores.texto,
    },

    cardParte: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 10,
      padding: 10,
      marginTop: 8,
      backgroundColor: cores.fundoCard,
    },

    infoParte: {
      flex: 1,
    },

    iconPessoa: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: cores.borda,
      alignItems: "center",
      justifyContent: "center",
    },

    avatarProp: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },

    parteNome: {
      fontSize: 11,
      fontWeight: "700",
      color: cores.texto,
    },

    parteInfo: {
      fontSize: 9,
      color: cores.textoSecundario,
      marginTop: 2,
      flexShrink: 1,
    },

    assinaturaBox: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderStyle: "dashed",
      borderRadius: 10,
      minHeight: 70,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      backgroundColor: cores.fundoCard,
    },

    assinaturaNome: {
      fontSize: 22,
      fontFamily: "serif",
      fontStyle: "italic",
      color: cores.texto,
    },

    assinaturaLegenda: {
      fontSize: 9,
      color: cores.textoFraco,
      marginTop: 2,
    },

    checkRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 14,
    },

    checkBox: {
      width: 16,
      height: 16,
      borderWidth: 1,
      borderColor: cores.textoFraco,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
    },

    checkBoxAtivo: {
      backgroundColor: cores.azulForte,
      borderColor: cores.azulForte,
    },

    checkText: {
      fontSize: 10,
      color: cores.texto,
      flex: 1,
      lineHeight: 15,
    },

    btnLaranja: {
      backgroundColor: cores.laranja,
      minHeight: 44,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      marginTop: 12,
      paddingHorizontal: 10,
    },

    btnLaranjaTxt: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 12,
      textAlign: "center",
      flexShrink: 1,
    },

    botaoDesativado: {
      opacity: 0.45,
    },

    seguroRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      marginTop: 10,
    },

    seguroTxt: {
      fontSize: 9,
      color: cores.textoSecundario,
      textAlign: "center",
    },

    botaoBaixar: {
      alignItems: "center",
      marginTop: 10,
      paddingVertical: 5,
    },

    baixarTxt: {
      fontSize: 11,
      color: cores.azulForte,
      textDecorationLine: "underline",
    },

    menuOverlay: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "rgba(0,0,0,0.5)",
    },

    menu: {
      width: 300,
      maxWidth: "85%",
      backgroundColor: cores.fundoMenu,
      height: "100%",
      paddingHorizontal: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      zIndex: 2,
      elevation: 10,
    },

    menuConteudo: {
      paddingBottom: 15,
    },

    menuTopo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 14,
    },

    menuAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: cores.laranja,
      alignItems: "center",
      justifyContent: "center",
    },

    menuLetra: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },

    menuUsuario: {
      flex: 1,
    },

    menuNome: {
      fontSize: 14,
      fontWeight: "700",
      color: cores.texto,
    },

    menuEmail: {
      fontSize: 10,
      color: cores.textoFraco,
      marginTop: 2,
    },

    menuClose: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: cores.fundoSecundario,
      alignItems: "center",
      justifyContent: "center",
    },

    divisor: {
      height: 1,
      backgroundColor: cores.borda,
      marginVertical: 10,
    },

    linha: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: cores.borda,
      marginHorizontal: 4,
    },

    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 13,
      paddingHorizontal: 8,
      borderRadius: 8,
    },

    menuItemAtivo: {
      backgroundColor: cores.fundoSecundario,
    },

    menuTxt: {
      fontSize: 14,
      fontWeight: "500",
      color: cores.texto,
    },

    menuTxtAtivo: {
      fontSize: 14,
      fontWeight: "700",
      color: cores.azulForte,
    },

    menuTxtSair: {
      fontSize: 14,
      fontWeight: "500",
      color: "#E53935",
    },

    menuFundo: {
      flex: 1,
    },
  });