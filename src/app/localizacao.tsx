
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Pressable,
  PanResponder,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

const IMOVEIS = [
  {
    id: 1,
    titulo: "Casa com 3 quartos",
    bairro: "Barra de São Miguel",
    area: "60m²",
    preco: "R$ 1.560/mês",
    detalhe: "3 quartos - piscina - vista para o mar",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    top: "18%",
    left: "22%",
  },
  {
    id: 2,
    titulo: "Apartamento 2 quartos",
    bairro: "Barra de São Miguel",
    area: "48m²",
    preco: "R$ 1.560/mês",
    detalhe: "2 quartos - 1 banheiro - vista para o mar",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    top: "32%",
    left: "48%",
  },
  {
    id: 3,
    titulo: "Casa em Barra",
    bairro: "Barra de São Miguel",
    area: "70m²",
    preco: "R$ 2.100/mês",
    detalhe: "3 quartos - churrasqueira",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    top: "12%",
    left: "68%",
  },
  {
    id: 4,
    titulo: "Kitnet Centro",
    bairro: "Maceió",
    area: "35m²",
    preco: "R$ 900/mês",
    detalhe: "1 quarto - mobiliado",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    top: "55%",
    left: "30%",
  },
];

export default function Localizacao() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();

  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroCidade, setFiltroCidade] = useState(
    "Barra de São Miguel"
  );

  const slideAnim = useRef(new Animated.Value(-300)).current;

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    superficieSecundaria: dark ? "#292929" : "#F5F7FA",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#BDBDBD" : "#666666",
    borda: dark ? "#444444" : "#DDDDDD",
    azul: "#488AFF",
    azulDestaque: "#1A5CFF",
    laranja: "#FF8C00",
    campo: dark ? "#292929" : "#FFFFFF",
    textoCampo: dark ? "#F5F5F5" : "#111111",
    placeholder: dark ? "#AAAAAA" : "#777777",
    mapaFundo: dark ? "#252D38" : "#DDE8FF",
    mapaImagemOpacidade: dark ? 0.35 : 0.6,
    menuSombra: "rgba(0,0,0,0.45)",
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

  const filtrados = IMOVEIS.filter((item) => {
    const termo = busca.trim().toLowerCase();

    const correspondeBusca =
      item.titulo.toLowerCase().includes(termo) ||
      item.bairro.toLowerCase().includes(termo);

    const correspondeCidade =
      !filtroCidade || item.bairro === filtroCidade;

    return correspondeBusca && correspondeCidade;
  });

  function abrirDetalhe(id: number) {
    router.push({
      pathname: "/detalhe",
      params: { id: String(id) },
    } as any);
  }

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      {...panResponder.panHandlers}
    >
      {/* CABEÇALHO */}
      <View style={styles.topoAzul}>
        <View style={styles.topoHeader}>
          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.hamburguer}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>

          <Text style={styles.tituloTopo}>
            Localização de Propriedades
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/perfil-proprietario" as any)}
            accessibilityLabel="Abrir perfil"
          >
            <Ionicons
              name="person-circle-outline"
              size={27}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* PESQUISA */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={17}
            color={cores.textoSecundario}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cidade, bairro ou imóvel..."
            placeholderTextColor={cores.placeholder}
            value={busca}
            onChangeText={setBusca}
            returnKeyType="search"
          />

          {busca.length > 0 && (
            <TouchableOpacity
              onPress={() => setBusca("")}
              accessibilityLabel="Limpar pesquisa"
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={cores.textoSecundario}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* FILTROS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtrosRow}
        >
          {filtroCidade !== "" && (
            <TouchableOpacity
              style={styles.filtroAtivo}
              onPress={() => setFiltroCidade("")}
            >
              <Text style={styles.filtroAtivoTxt}>
                {filtroCidade}
              </Text>
              <Ionicons
                name="close"
                size={14}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTxt}>Preço</Text>
            <Ionicons
              name="chevron-down"
              size={12}
              color={cores.texto}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTxt}>Quartos</Text>
            <Ionicons
              name="chevron-down"
              size={12}
              color={cores.texto}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filtro}>
            <Text style={styles.filtroTxt}>Tipo</Text>
            <Ionicons
              name="chevron-down"
              size={12}
              color={cores.texto}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* MAPA ILUSTRATIVO */}
      <View style={styles.mapaContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800",
          }}
          style={[
            styles.mapaImg,
            { opacity: cores.mapaImagemOpacidade },
          ]}
          blurRadius={1}
        />

        <View style={styles.mapaOverlay} pointerEvents="box-none">
          {filtrados.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.pin,
                {
                  top: item.top as any,
                  left: item.left as any,
                },
              ]}
              onPress={() => abrirDetalhe(item.id)}
              accessibilityLabel={`Ver ${item.titulo}`}
            >
              <Ionicons
                name="location-sharp"
                size={27}
                color={cores.laranja}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTROLES ILUSTRATIVOS DO MAPA */}
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={styles.mapBtn}
            accessibilityLabel="Aumentar zoom"
          >
            <Text style={styles.mapBtnTxt}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mapBtn}
            accessibilityLabel="Diminuir zoom"
          >
            <Text style={styles.mapBtnTxt}>−</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.encontradosBadge}>
          <Text style={styles.encontradosTxt}>
            {filtrados.length}{" "}
            {filtrados.length === 1
              ? "imóvel encontrado"
              : "imóveis encontrados"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.locBtn}
          accessibilityLabel="Minha localização"
        >
          <Ionicons
            name="locate"
            size={18}
            color={cores.texto}
          />
        </TouchableOpacity>
      </View>

      {/* LISTA DE IMÓVEIS */}
      <View style={styles.listaContainer}>
        <View style={styles.listaHeader}>
          <Text style={styles.listaTitulo}>
            Imóveis próximos
          </Text>

          <TouchableOpacity
            onPress={() => setFiltroCidade("")}
          >
            <Text style={styles.verTudo}>Ver tudo {" >"}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listaConteudo}
        >
          {filtrados.length > 0 ? (
            filtrados.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => abrirDetalhe(item.id)}
              >
                <Image
                  source={{ uri: item.img }}
                  style={styles.cardImg}
                  resizeMode="cover"
                />

                <View style={styles.cardConteudo}>
                  <Text style={styles.cardTitulo}>
                    {item.titulo}
                  </Text>

                  <Text style={styles.cardBairro}>
                    {item.bairro} - {item.area}
                  </Text>

                  <Text style={styles.cardPreco}>
                    {item.preco}
                  </Text>

                  <Text style={styles.cardDetalhe}>
                    {item.detalhe}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={17}
                  color={cores.textoSecundario}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.estadoVazio}>
              <Ionicons
                name="search-outline"
                size={34}
                color={cores.textoSecundario}
              />
              <Text style={styles.estadoVazioTitulo}>
                Nenhum imóvel encontrado
              </Text>
              <Text style={styles.estadoVazioTexto}>
                Tente outra pesquisa ou remova o filtro de cidade.
              </Text>

              <TouchableOpacity
                style={styles.limparBtn}
                onPress={() => {
                  setBusca("");
                  setFiltroCidade("");
                }}
              >
                <Text style={styles.limparBtnTxt}>
                  Limpar filtros
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/* MENU LATERAL */}
      <Modal
        visible={menuAberto}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setMenuAberto(false)}
      >
        <View style={styles.menuOverlay}>
          <Animated.View
            style={[
              styles.menu,
              {
                paddingTop: insets.top + 10,
                paddingBottom: insets.bottom + 10,
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
                name="location"
                size={20}
                color={cores.azulDestaque}
              />
              <Text style={styles.menuTxtAtivo}>
                Localização
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuAberto(false);
                router.push("/favoritos" as any);
              }}
            >
              <Ionicons
                name="heart-outline"
                size={20}
                color={cores.texto}
              />
              <Text style={styles.menuTxt}>Favoritos</Text>
            </TouchableOpacity>
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

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  superficieSecundaria: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  azulDestaque: string;
  laranja: string;
  campo: string;
  textoCampo: string;
  placeholder: string;
  mapaFundo: string;
  mapaImagemOpacidade: number;
  menuSombra: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    topoAzul: {
      backgroundColor: cores.azul,
      paddingHorizontal: 12,
      paddingBottom: 10,
    },

    topoHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
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

    tituloTopo: {
      fontSize: 13,
      fontWeight: "700",
      color: "#FFFFFF",
    },

    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.campo,
      borderRadius: 18,
      height: 38,
      paddingHorizontal: 10,
      gap: 6,
    },

    searchInput: {
      flex: 1,
      fontSize: 11,
      color: cores.textoCampo,
      paddingVertical: 0,
    },

    filtrosRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 8,
      paddingRight: 8,
    },

    filtroAtivo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: cores.laranja,
      paddingHorizontal: 10,
      height: 27,
      borderRadius: 14,
    },

    filtroAtivoTxt: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "600",
    },

    filtro: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      backgroundColor: cores.campo,
      paddingHorizontal: 10,
      height: 27,
      borderRadius: 14,
    },

    filtroTxt: {
      fontSize: 10,
      fontWeight: "600",
      color: cores.texto,
    },

    mapaContainer: {
      height: 220,
      backgroundColor: cores.mapaFundo,
      overflow: "hidden",
    },

    mapaImg: {
      width: "100%",
      height: "100%",
    },

   mapaOverlay: {
     position: "absolute",
     top: 0,
     right: 0,
     bottom: 0,
     left: 0,
},

    pin: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },

    mapControls: {
      position: "absolute",
      right: 10,
      top: 10,
      gap: 4,
    },

    mapBtn: {
      width: 30,
      height: 30,
      backgroundColor: cores.superficie,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: cores.borda,
    },

    mapBtnTxt: {
      fontSize: 18,
      fontWeight: "700",
      color: cores.texto,
    },

    encontradosBadge: {
      position: "absolute",
      left: 10,
      bottom: 10,
      backgroundColor: cores.superficie,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: cores.borda,
    },

    encontradosTxt: {
      fontSize: 10,
      fontWeight: "600",
      color: cores.texto,
    },

    locBtn: {
      position: "absolute",
      right: 10,
      bottom: 10,
      width: 30,
      height: 30,
      backgroundColor: cores.superficie,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: cores.borda,
    },

    listaContainer: {
      flex: 1,
      backgroundColor: cores.superficie,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: 12,
      paddingTop: 12,
      marginTop: -10,
    },

    listaHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },

    listaTitulo: {
      fontSize: 13,
      fontWeight: "800",
      color: cores.texto,
    },

    verTudo: {
      fontSize: 11,
      color: cores.azulDestaque,
      fontWeight: "600",
    },

    listaConteudo: {
      paddingBottom: 100,
    },

    card: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: cores.borda,
      backgroundColor: cores.superficieSecundaria,
      borderRadius: 10,
      padding: 7,
      marginBottom: 9,
      alignItems: "center",
      gap: 8,
    },

    cardImg: {
      width: 76,
      height: 65,
      borderRadius: 7,
      backgroundColor: cores.mapaFundo,
    },

    cardConteudo: {
      flex: 1,
      gap: 2,
    },

    cardTitulo: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
    },

    cardBairro: {
      fontSize: 10,
      color: cores.textoSecundario,
    },

    cardPreco: {
      fontSize: 12,
      fontWeight: "800",
      color: cores.laranja,
      marginTop: 2,
    },

    cardDetalhe: {
      fontSize: 9,
      color: cores.textoSecundario,
    },

    estadoVazio: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 35,
      gap: 10,
    },

    estadoVazioTitulo: {
      fontSize: 14,
      fontWeight: "700",
      color: cores.texto,
      textAlign: "center",
    },

    estadoVazioTexto: {
      fontSize: 12,
      color: cores.textoSecundario,
      textAlign: "center",
      lineHeight: 18,
    },

    limparBtn: {
      backgroundColor: cores.azulDestaque,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 5,
    },

    limparBtnTxt: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },

    menuOverlay: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: cores.menuSombra,
    },

    menu: {
      width: 280,
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
      width: 40,
      height: 40,
      borderRadius: 20,
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

    menuTxtAtivo: {
      fontSize: 13,
      color: cores.azulDestaque,
      fontWeight: "700",
    },

    menuFundo: {
      flex: 1,
    },
  });
}
