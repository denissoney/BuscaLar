import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  useWindowDimensions,
  Alert,
  PanResponder,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

// =========================================================
// MENU LATERAL
// =========================================================

import MenuDrawer from "../../app/componets/MenuDrawer";

// =========================================================
// BANNERS
// =========================================================

const BANNERS = [
  {
    id: "1",
    titulo: "Sua casa dos sonhos em Maceió",
    sub: "Mais de 2.000 imóveis com preço justo.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },

  {
    id: "2",
    titulo: "Descubra novos lugares incríveis",
    sub: "Encontre experiências únicas perto de você.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  },

  {
    id: "3",
    titulo: "Alugue fácil e 100% seguro",
    sub: "Contrato digital e pagamento protegido.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  },
];

// =========================================================
// IMÓVEIS
// =========================================================

const TODOS_IMOVEIS = [
  {
    id: "1",
    local: "Maceió-AL",
    valor: 2000,
    quartos: 1,
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400",
    nome: "Pajuçara",
  },

  {
    id: "2",
    local: "Maceió-AL",
    valor: 1500,
    quartos: 2,
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    nome: "Ponta Verde",
  },

  {
    id: "3",
    local: "Maceió-AL",
    valor: 3000,
    quartos: 3,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    nome: "Jatiúca",
  },

  {
    id: "4",
    local: "Aracaju-SE",
    valor: 1800,
    quartos: 1,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    nome: "Atalaia",
  },

  {
    id: "5",
    local: "Maceió-AL",
    valor: 2500,
    quartos: 2,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    nome: "Cruz das Almas",
  },

  {
    id: "6",
    local: "Maceió-AL",
    valor: 1200,
    quartos: 1,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    nome: "Farol",
  },
];

// =========================================================
// HOME
// =========================================================

export default function Home() {
  const router = useRouter();

  const { width } = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const ref = useRef<FlatList<any> | null>(null);

  const isTablet = width >= 768;

  const filtroPadding = isTablet ? 24 : 16;

  const CARD_GAP = 12;

  const CARD_WIDTH =
    width - filtroPadding * 2;

  // =======================================================
  // ESTADOS
  // =======================================================

  const [menuAberto, setMenuAberto] =
    useState(false);

  const [ativo, setAtivo] = useState(0);

  const [localizacao, setLocalizacao] =
    useState("");

  const [valor, setValor] =
    useState("");

  const [quartos, setQuartos] =
    useState("");

  const [imoveis, setImoveis] =
    useState(TODOS_IMOVEIS);

  const [verificandoLogin, setVerificandoLogin] =
    useState(true);

  // =========================================================
  // VERIFICAÇÃO DO LOGIN
  // =========================================================

  useEffect(() => {
    let ativoComponente = true;

    async function verificaLogin() {
      try {
        const logado =
          await AsyncStorage.getItem("logado");

        console.log(
          "Status do login:",
          logado
        );

        if (!ativoComponente) {
          return;
        }

        if (logado !== "true") {
          router.replace("/login");
          return;
        }

        setVerificandoLogin(false);
      } catch (error) {
        console.log(
          "Erro ao verificar login:",
          error
        );

        if (ativoComponente) {
          setVerificandoLogin(false);

          router.replace("/login");
        }
      }
    }

    verificaLogin();

    return () => {
      ativoComponente = false;
    };
  }, [router]);

  // =========================================================
  // GESTO PARA ABRIR O MENU
  // =========================================================

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        evt,
        gestureState
      ) => {
        return (
          evt.nativeEvent.pageX < 35 &&
          gestureState.dx > 60 &&
          Math.abs(gestureState.dy) < 50
        );
      },

      onPanResponderRelease: () => {
        setMenuAberto(true);
      },
    })
  ).current;

  // =========================================================
  // CARROSSEL AUTOMÁTICO
  // =========================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setAtivo((prev) => {
        const prox =
          (prev + 1) % BANNERS.length;

        ref.current?.scrollToOffset({
          offset:
            (CARD_WIDTH + CARD_GAP) *
            prox,

          animated: true,
        });

        return prox;
      });
    }, 4000);

    return () =>
      clearInterval(timer);
  }, [CARD_WIDTH]);

  // =========================================================
  // BUSCA DE IMÓVEIS
  // =========================================================

  function buscar() {
    let filtrados = TODOS_IMOVEIS;

    const localBusca =
      localizacao
        .trim()
        .toLowerCase();

    if (localBusca !== "") {
      filtrados =
        filtrados.filter(
          (item) =>
            item.local
              .toLowerCase()
              .includes(localBusca) ||
            item.nome
              .toLowerCase()
              .includes(localBusca)
        );
    }

    // =====================================================
    // FILTRO DE VALOR
    // =====================================================

    if (valor.trim() !== "") {
      const v = parseInt(
        valor.replace(/\D/g, ""),
        10
      );

      if (!isNaN(v)) {
        filtrados =
          filtrados.filter(
            (item) => item.valor <= v
          );
      }
    }

    // =====================================================
    // FILTRO DE QUARTOS
    // =====================================================

    if (quartos.trim() !== "") {
      const q = parseInt(
        quartos,
        10
      );

      if (!isNaN(q)) {
        filtrados =
          filtrados.filter(
            (item) =>
              item.quartos === q
          );
      }
    }

    setImoveis(filtrados);

    if (filtrados.length === 0) {
      Alert.alert(
        "BuscaLar",
        "Nenhum imóvel encontrado."
      );
    }
  }

  // =========================================================
  // NAVEGAÇÃO
  // =========================================================

  function irPara(rota: string) {
    setMenuAberto(false);

    setTimeout(() => {
      router.push(rota as any);
    }, 260);
  }

  // =========================================================
  // SAIR DO APLICATIVO
  // =========================================================

  async function sair() {
    try {
      await AsyncStorage.removeItem(
        "logado"
      );

      await AsyncStorage.removeItem(
        "emailUsuario"
      );

      setMenuAberto(false);

      router.replace("/login");
    } catch (error) {
      console.log(
        "Erro ao sair:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível sair da conta."
      );
    }
  }

  // =========================================================
  // ENQUANTO VERIFICA LOGIN
  // =========================================================

  if (verificandoLogin) {
    return (
      <View
        style={styles.loadingContainer}
      />
    );
  }

  const bannerHeight =
    isTablet ? 260 : 175;

  // =========================================================
  // TELA
  // =========================================================

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom:
            120 + insets.bottom,
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={[
            styles.headerPrint,
            {
              paddingHorizontal:
                filtroPadding,
            },
          ]}
        >
          {/* HAMBURGUER */}

          <TouchableOpacity
            onPress={() =>
              setMenuAberto(true)
            }
            style={
              styles.btnHamburguerPrint
            }
            hitSlop={10}
          >
            <View
              style={[
                styles.traco,
                {
                  width: 22,
                },
              ]}
            />

            <View
              style={[
                styles.traco,
                {
                  width: 15,
                },
              ]}
            />

            <View
              style={[
                styles.traco,
                {
                  width: 9,
                },
              ]}
            />
          </TouchableOpacity>

          {/* USUÁRIO */}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={styles.avatar}
            >
              <Text
                style={styles.avatarText}
              >
                D
              </Text>
            </View>

            <View>
              <Text
                style={styles.ola}
              >
                Olá, Davi Miguel!
              </Text>

              <Text
                style={styles.sub}
              >
                O que você vai explorar hoje?
              </Text>
            </View>
          </View>

          {/* CONFIGURAÇÕES */}

          <TouchableOpacity
            style={
              styles.btnEngrenagem
            }
            onPress={() =>
              irPara(
                "/configuracoes"
              )
            }
          >
            <Ionicons
              name="settings"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* =================================================
            BUSCA
        ================================================= */}

        <View
          style={[
            styles.searchRow,
            {
              paddingHorizontal:
                filtroPadding,
            },
          ]}
        >
          <View
            style={styles.searchBox}
          >
            <TextInput
              placeholder="Buscar destinos, atividades e"
              placeholderTextColor="#999"
              style={
                styles.searchInput
              }
            />
          </View>

          <TouchableOpacity
            style={styles.btnBuscar}
            onPress={buscar}
          >
            <Text
              style={
                styles.btnBuscarText
              }
            >
              BUSCAR
            </Text>
          </TouchableOpacity>
        </View>

        {/* =================================================
            BANNERS
        ================================================= */}

        <View
          style={{
            marginTop: 12,
          }}
        >
          <FlatList
            ref={ref}
            data={BANNERS}
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            keyExtractor={(item) =>
              item.id
            }
            snapToInterval={
              CARD_WIDTH + CARD_GAP
            }
            snapToAlignment="start"
            decelerationRate="fast"
            getItemLayout={(
              _,
              index
            ) => ({
              length:
                CARD_WIDTH +
                CARD_GAP,

              offset:
                (CARD_WIDTH +
                  CARD_GAP) *
                index,

              index,
            })}
            onMomentumScrollEnd={(
              e
            ) => {
              const newIndex =
                Math.round(
                  e.nativeEvent
                    .contentOffset
                    .x /
                    (CARD_WIDTH +
                      CARD_GAP)
                );

              setAtivo(newIndex);
            }}
            contentContainerStyle={{
              paddingHorizontal:
                filtroPadding,
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: CARD_GAP,
                }}
              />
            )}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bannerSlide,
                  {
                    width:
                      CARD_WIDTH,

                    height:
                      bannerHeight,
                  },
                ]}
              >
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={
                    styles.bannerImgFull
                  }
                  resizeMode="cover"
                />

                <View
                  style={
                    styles.overlay
                  }
                />

                <View
                  style={
                    styles.bannerLeft
                  }
                >
                  <Text
                    style={
                      styles.emAlta
                    }
                  >
                    Em alta
                  </Text>

                  <Text
                    style={
                      styles.bannerTitulo
                    }
                  >
                    {item.titulo}
                  </Text>

                  <Text
                    style={
                      styles.bannerSub
                    }
                  >
                    {item.sub}
                  </Text>

                  <TouchableOpacity
                    style={
                      styles.btnExplorar
                    }
                  >
                    <Text
                      style={
                        styles.btnExplorarTxt
                      }
                    >
                      Explorar agora
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* PONTOS */}

          <View
            style={
              styles.dotsCentro
            }
          >
            {BANNERS.map(
              (_, i) => (
                <View
                  key={i.toString()}
                  style={[
                    styles.dot,

                    i === ativo
                      ? styles.dotAtivo
                      : styles.dotInativo,
                  ]}
                />
              )
            )}
          </View>
        </View>

        {/* =================================================
            FILTROS
        ================================================= */}

        <View
          style={[
            styles.filtroContainer,
            {
              marginHorizontal:
                filtroPadding,
            },
          ]}
        >
          {/* LOCALIZAÇÃO */}

          <View
            style={
              styles.filtroItem
            }
          >
            <View
              style={
                styles.filtroLabelRow
              }
            >
              <Ionicons
                name="location-outline"
                size={11}
                color="#000"
              />

              <Text
                style={
                  styles.filtroLabel
                }
              >
                Localização
              </Text>
            </View>

            <TextInput
              style={
                styles.filtroInputReal
              }
              placeholder="Maceió-AL"
              value={localizacao}
              onChangeText={
                setLocalizacao
              }
              placeholderTextColor="#999"
            />
          </View>

          {/* VALOR */}

          <View
            style={
              styles.filtroItem
            }
          >
            <View
              style={
                styles.filtroLabelRow
              }
            >
              <Ionicons
                name="cash-outline"
                size={11}
                color="#000"
              />

              <Text
                style={
                  styles.filtroLabel
                }
              >
                Valor
              </Text>
            </View>

            <TextInput
              style={
                styles.filtroInputReal
              }
              placeholder="2000"
              keyboardType="numeric"
              value={valor}
              onChangeText={
                setValor
              }
              placeholderTextColor="#999"
            />
          </View>

          {/* QUARTOS */}

          <View
            style={
              styles.filtroItem
            }
          >
            <View
              style={
                styles.filtroLabelRow
              }
            >
              <Ionicons
                name="bed-outline"
                size={11}
                color="#000"
              />

              <Text
                style={
                  styles.filtroLabel
                }
              >
                Quartos
              </Text>
            </View>

            <TextInput
              style={
                styles.filtroInputReal
              }
              placeholder="01"
              keyboardType="numeric"
              value={quartos}
              onChangeText={
                setQuartos
              }
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* =================================================
            TÍTULO
        ================================================= */}

        <Text
          style={[
            styles.tituloSecao,
            {
              marginHorizontal:
                filtroPadding,
            },
          ]}
        >
          Lugares em destaque (
          {imoveis.length})
        </Text>

        {/* =================================================
            IMÓVEIS
        ================================================= */}

        <View
          style={[
            styles.grid,
            {
              paddingHorizontal:
                filtroPadding,
            },
          ]}
        >
          {imoveis.map(
            (item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  {
                    width: isTablet
                      ? (
                          width -
                          filtroPadding *
                            2 -
                          12
                        ) / 2
                      : "100%",
                  },
                ]}
                onPress={() =>
                  router.push(
                    "/perfil-proprietario" as any
                  )
                }
                activeOpacity={0.8}
              >
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={
                    styles.cardImg
                  }
                  resizeMode="cover"
                />

                <View
                  style={
                    styles.cardInfo
                  }
                >
                  <Text
                    style={
                      styles.cardNome
                    }
                  >
                    {item.nome}
                  </Text>

                  <Text
                    style={
                      styles.cardPreco
                    }
                  >
                    R$ {item.valor} -{" "}
                    {item.quartos} quarto(s) •{" "}
                    {item.local}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
      </ScrollView>

      {/* =====================================================
          MENU LATERAL
          
          AGORA O MENU VEM DO COMPONENTE MenuDrawer.tsx
      ===================================================== */}

      <MenuDrawer
        visible={menuAberto}
        onClose={() =>
          setMenuAberto(false)
        }
        onOpen={() =>
          setMenuAberto(true)
        }
      />
    </View>
  );
}

// =========================================================
// ESTILOS
// =========================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // =======================================================
  // HEADER
  // =======================================================

  headerPrint: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    paddingTop: 10,
  },

  btnHamburguerPrint: {
    width: 32,
    height: 32,
    justifyContent: "center",
    gap: 4,
    marginRight: 12,
  },

  traco: {
    height: 2.8,
    backgroundColor: "#000",
    borderRadius: 10,
  },

  avatar: {
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  ola: {
    fontWeight: "700",
    fontSize: 13,
  },

  sub: {
    color: "#777",
    fontSize: 11,
  },

  btnEngrenagem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#A0A0A0",
    alignItems: "center",
    justifyContent: "center",
  },

  // =======================================================
  // BUSCA
  // =======================================================

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  searchBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
    height: 42,
    justifyContent: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#000",
  },

  btnBuscar: {
    backgroundColor: "#1A5CFF",
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  btnBuscarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  // =======================================================
  // BANNER
  // =======================================================

  bannerSlide: {
    borderRadius: 16,
    overflow: "hidden",
  },

  bannerImgFull: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:
      "rgba(0,0,0,0.38)",
  },

  bannerLeft: {
    flex: 1,
    padding: 18,
    justifyContent: "center",
  },

  emAlta: {
    color: "#FF8C00",
    fontWeight: "bold",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
    fontSize: 9,
  },

  bannerTitulo: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    width: 200,
    lineHeight: 20,
  },

  bannerSub: {
    color: "#eee",
    marginTop: 6,
    fontSize: 11,
    width: 180,
  },

  btnExplorar: {
    backgroundColor: "#1A5CFF",
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  btnExplorarTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },

  dotsCentro: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 6,
    gap: 5,
  },

  dot: {
    height: 5,
    borderRadius: 10,
  },

  dotAtivo: {
    backgroundColor: "#FF8C00",
    width: 14,
    height: 5,
  },

  dotInativo: {
    backgroundColor: "#D1D1D1",
    width: 5,
    height: 5,
  },

  // =======================================================
  // FILTROS
  // =======================================================

  filtroContainer: {
    backgroundColor: "#FF8C00",
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
    padding: 10,
  },

  filtroItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },

  filtroLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 2,
  },

  filtroLabel: {
    fontWeight: "700",
    fontSize: 9,
  },

  filtroInputReal: {
    fontSize: 12,
    color: "#000",
    paddingVertical: 4,
  },

  // =======================================================
  // TÍTULO
  // =======================================================

  tituloSecao: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 10,
    fontSize: 13,
  },

  // =======================================================
  // GRID
  // =======================================================

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  card: {
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
    overflow: "hidden",
    height: 180,
  },

  cardImg: {
    width: "100%",
    height: "70%",
  },

  cardInfo: {
    padding: 10,
    backgroundColor: "#fff",
    height: "30%",
    justifyContent: "center",
  },

  cardNome: {
    fontWeight: "bold",
    fontSize: 12,
  },

  cardPreco: {
    color: "#777",
    marginTop: 2,
    fontSize: 10,
  },
});
