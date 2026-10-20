
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, PanResponder,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MenuDrawer from "../componets/MenuDrawer";
import { useTheme } from "../../contexts/ThemeContext";

type Imovel = {
  id: string;
  nome: string;
  preco: string;
  valor: string;
  desc: string;
  local: string;
  quartos: string;
  banheiros: string;
  tipo: string;
  img: string;
};

const IMOVEIS: Imovel[] = [
  {
    id: "1",
    nome: "Casa próxima à praia",
    preco: "R$ 1.000/mês",
    valor: "1000",
    desc: "Casa com 2 quartos",
    local: "Barra de São Miguel, AL",
    quartos: "2",
    banheiros: "1",
    tipo: "Casa",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },
  {
    id: "2",
    nome: "Casa moderna",
    preco: "R$ 1.500/mês",
    valor: "1500",
    desc: "Casa com 3 quartos",
    local: "Barra de São Miguel, AL",
    quartos: "3",
    banheiros: "2",
    tipo: "Casa",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  },
  {
    id: "3",
    nome: "Apartamento aconchegante",
    preco: "R$ 1.200/mês",
    valor: "1200",
    desc: "Apartamento com 2 quartos",
    local: "Ponta Verde, Maceió, AL",
    quartos: "2",
    banheiros: "1",
    tipo: "Apartamento",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  },
  {
    id: "4",
    nome: "Apartamento espaçoso",
    preco: "R$ 1.800/mês",
    valor: "1800",
    desc: "Apartamento com 3 quartos",
    local: "Jatiúca, Maceió, AL",
    quartos: "3",
    banheiros: "2",
    tipo: "Apartamento",
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
  },
  {
    id: "5",
    nome: "Casa com jardim",
    preco: "R$ 2.000/mês",
    valor: "2000",
    desc: "Casa com 4 quartos",
    local: "Cruz das Almas, Maceió, AL",
    quartos: "4",
    banheiros: "2",
    tipo: "Casa",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  },
  {
    id: "6",
    nome: "Apartamento compacto",
    preco: "R$ 900/mês",
    valor: "900",
    desc: "Apartamento com 1 quarto",
    local: "Farol, Maceió, AL",
    quartos: "1",
    banheiros: "1",
    tipo: "Apartamento",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },
];

export default function Explorar() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuVisibleRef = useRef(false);
  // Cores que mudam conforme o tema do aplicativo.
  const cores = {
    fundo: dark ? "#121212" : "#F5F6FA",
    card: dark ? "#242426" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#666666",
    icone: dark ? "#FFFFFF" : "#000000",
    fundoFiltro: dark ? "#29292C" : "#FFFFFF",
    borda: dark ? "#414145" : "#E5E5E5",
  };

  function abrirMenu() {
    menuVisibleRef.current = true;
    setMenuVisible(true);
  }

  function fecharMenu() {
    menuVisibleRef.current = false;
    setMenuVisible(false);
  }

  function irPara(rota: string) {
    fecharMenu();
    router.push(rota as any);
  }

  function abrirDetalhes(item: Imovel) {
    fecharMenu();

    router.push({
      pathname: "/detalhe",
      params: {
        id: item.id,
        nome: item.nome,
        local: item.local,
        valor: item.valor,
        quartos: item.quartos,
        banheiros: item.banheiros,
        tipo: item.tipo,
        img: item.img,
        desc: item.desc,
        preco: item.preco,
      },
    } as any);
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (menuVisibleRef.current) return false;

        const { dx, dy, x0 } = gestureState;

        return (
          x0 <= 70 &&
          Math.abs(dx) > Math.abs(dy) * 1.2 &&
          dx > 10
        );
      },

      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        if (menuVisibleRef.current) return false;

        const { dx, dy, x0 } = gestureState;

        return (
          x0 <= 70 &&
          Math.abs(dx) > Math.abs(dy) * 1.2 &&
          dx > 10
        );
      },

      onPanResponderRelease: (_, gestureState) => {
        if (
          !menuVisibleRef.current &&
          gestureState.dx >= 70
        ) {
          abrirMenu();
        }
      },
    })
  ).current;

  return (
    <View style={[ styles.container, { paddingTop: insets.top, backgroundColor: cores.fundo, }, ]} {...panResponder.panHandlers}>
      {/* Cabeçalho azul */}
      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>
          <TouchableOpacity style={styles.btnHamburguer} onPress={abrirMenu} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Abrir menu">
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </TouchableOpacity>

          <Image source={ dark
                     ? require("../../../assets/images/logo.png")
                     : require("../../../assets/images/BuscaLar-preto.png") }
                 style={styles.logoImg}
                 resizeMode="contain"/>

          <TouchableOpacity style={styles.btnEngrenagem} onPress={() => irPara("/configuracoes")} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel="Abrir configurações">
            <Ionicons name="settings" size={20} color="#FFFFFF"/>
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={styles.filtrosRow}>
          <TouchableOpacity style={[ styles.filtroLocal, { backgroundColor: cores.fundoFiltro }, ]} activeOpacity={0.8} onPress={() => irPara("/filtro")}>
            <Ionicons name="location" size={14} color={cores.icone} style={{ marginRight: 4 }}/>

            <View style={{ flex: 1 }}>
              <Text style={[ styles.filtroLabel, { color: cores.textoSecundario }, ]}>
                Filtrar por localização
              </Text>
              <Text style={[ styles.filtroValue, { color: cores.texto }, ]} numberOfLines={1}>
                Barra de São Miguel
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color={cores.icone}/>
          </TouchableOpacity>

          <TouchableOpacity style={[ styles.btnFiltros, { backgroundColor: cores.fundoFiltro }, ]} activeOpacity={0.8} onPress={() => irPara("/filtro")}>
            <Ionicons name="options" size={15} color={cores.icone} />
            <Text style={[ styles.btnFiltrosText, { color: cores.texto }, ]}>
              Filtros
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.contentBox}>
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
            style={styles.backBtn}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={cores.icone}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.title,
              { color: cores.texto },
            ]}
          >
            Aluguéis Disponíveis
          </Text>
        </View>

        {/* Lista de imóveis */}
        <FlatList
          data={IMOVEIS}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.colunas}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: cores.card,
                  borderColor: cores.borda,
                },
              ]}
              activeOpacity={0.85}
              onPress={() => abrirDetalhes(item)}
            >
              <Image
                source={{ uri: item.img }}
                style={styles.cardImg}
                resizeMode="cover"
              />

              <View style={styles.cardBody}>
                <Text
                  style={styles.preco}
                  numberOfLines={1}
                >
                  {item.preco}
                </Text>

                <Text
                  style={[
                    styles.desc,
                    { color: cores.texto },
                  ]}
                  numberOfLines={2}
                >
                  {item.desc}
                </Text>

                <View style={styles.localRow}>
                  <Ionicons
                    name="location"
                    size={11}
                    color="#FF8C00"
                  />

                  <Text
                    style={[
                      styles.local,
                      { color: cores.textoSecundario },
                    ]}
                    numberOfLines={2}
                  >
                    {item.local}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="bed-outline"
                      size={13}
                      color={cores.icone}
                    />

                    <Text
                      style={[
                        styles.infoText,
                        { color: cores.textoSecundario },
                      ]}
                    >
                      {item.quartos} quartos
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Ionicons
                      name="water-outline"
                      size={13}
                      color={cores.icone}
                    />

                    <Text
                      style={[
                        styles.infoText,
                        { color: cores.textoSecundario },
                      ]}
                    >
                      {item.banheiros} banheiro(s)
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Menu lateral */}
      <MenuDrawer
        visible={menuVisible}
        onClose={fecharMenu}
        onNavigate={irPara}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topoAzul: {
    backgroundColor: "#208AEF",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 16,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },

  headerAzul: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  btnHamburguer: {
    width: 36,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },

  traco: {
    height: 3,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },

  logoImg: {
    width: 145,
    height: 42,
  },

  btnEngrenagem: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  filtrosRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },

  filtroLocal: {
    flex: 1,
    minHeight: 52,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  filtroLabel: {
    fontSize: 10,
  },

  filtroValue: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },

  btnFiltros: {
    minHeight: 52,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  btnFiltrosText: {
    fontSize: 11,
    fontWeight: "600",
  },

  contentBox: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  backBtn: {
    width: 32,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
  },

  colunas: {
    justifyContent: "space-between",
    gap: 10,
  },

  lista: {
    paddingBottom: 130,
    gap: 12,
  },

  card: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 2,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  cardImg: {
    width: "100%",
    height: 125,
    backgroundColor: "#DDDDDD",
  },

  cardBody: {
    padding: 9,
  },

  preco: {
    color: "#1A5CFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 5,
  },

  desc: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 6,
  },

  localRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 8,
  },

  local: {
    flex: 1,
    fontSize: 9,
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  infoText: {
    fontSize: 9,
  },
});
