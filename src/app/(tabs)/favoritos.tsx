
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Polygon } from "react-native-svg";

import MenuDrawer from "../componets/MenuDrawer";
import { useTheme } from "../../contexts/ThemeContext";

type Imovel = {
  id: string;
  titulo: string;
  preco: string;
  local: string;
  img: string;
};

const MENSAL: Imovel[] = [
  {
    id: "1",
    titulo: "Apartamento 2 quartos",
    preco: "R$ 1.000/mês",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
  },
  {
    id: "2",
    titulo: "Casa com Piscina",
    preco: "R$ 1.300/mês",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    id: "3",
    titulo: "Casa com Piscina",
    preco: "R$ 1.560/mês",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
  },
];

const DIARIAS: Imovel[] = [
  {
    id: "1",
    titulo: "Apartamento 2 quartos",
    preco: "R$ 250/dia",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
  },
  {
    id: "2",
    titulo: "Casa com Piscina",
    preco: "R$ 600/dia",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    id: "3",
    titulo: "Casa com Piscina",
    preco: "R$ 450/dia",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
  },
];

export default function Favoritos() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);
  const [aba, setAba] = useState<"Mensal" | "Diarias">("Mensal");
  const [mensal, setMensal] = useState<Imovel[]>(MENSAL);
  const [diarias, setDiarias] = useState<Imovel[]>(DIARIAS);

  // Cores adaptadas ao tema selecionado.
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    card: dark ? "#242426" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#000000",
    textoSecundario: dark ? "#BBBBBB" : "#444444",
    fundoAbas: dark ? "#2C2C2E" : "#E9E9E9",
    borda: dark ? "#444444" : "#D6D6D6",
    botao: dark ? "#333336" : "#FFFFFF",
    iconeLocal: dark ? "#BBBBBB" : "#333333",
    vazioIcone: dark ? "#666666" : "#D0D0D0",
  };

  const lista = aba === "Mensal" ? mensal : diarias;

  function remover(id: string) {
    if (aba === "Mensal") {
      setMensal((prev) => prev.filter((item) => item.id !== id));
    } else {
      setDiarias((prev) => prev.filter((item) => item.id !== id));
    }
  }

  function abrirDetalhe(item: Imovel) {
    router.push({
      pathname: "/detalhe",
      params: {
        id: item.id,
        tipo: aba,
      },
    });
  }

  function abrirMenu() {
    setMenuVisible(true);
  }

  function fecharMenu() {
    setMenuVisible(false);
  }

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (_, gesture) => {
        if (menuVisible) return false;

        return (
          gesture.x0 <= 70 &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2 &&
          gesture.dx > 10
        );
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx >= 70) {
          abrirMenu();
        }
      },
    })
  ).current;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Cabeçalho azul */}
      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>
          <TouchableOpacity
            style={styles.btnHamburguer}
            onPress={abrirMenu}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12, marginTop: 5 }]} />
            <View style={[styles.traco, { width: 7, marginTop: 5 }]} />
          </TouchableOpacity>

          <Image
            source={ dark
                ? require("../../../assets/images/logo.png")
                : require("../../../assets/images/BuscaLar-preto.png") }
            style={styles.logoImg}
            resizeMode="contain"/>

          <View style={{ width: 32 }} />
        </View>
      </View>

      {/* Conteúdo principal */}
      <View style={[ styles.content, { backgroundColor: cores.fundo }, ]}>
        {/* Botão voltar e linha laranja */}
        <View style={styles.voltarRow}>
          <TouchableOpacity onPress={voltar} style={styles.btnVoltarNovo} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Voltar">
            <Ionicons name="arrow-back" size={26} color={cores.texto}/>
          </TouchableOpacity>

          <View style={styles.linhaLaranja}>
            <Svg width={75} height={4}>
              <Polygon points="0,0 75,0 75,4 0,4" fill="#FF8C00"/>
            </Svg>
          </View>
        </View>

        {/* Abas mensal e diária */}
        <View
          style={[
            styles.abasContainer,
            { backgroundColor: cores.fundoAbas },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.aba,
              aba === "Mensal" && styles.abaAtiva,
            ]}
            onPress={() => setAba("Mensal")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.abaTexto,
                { color: cores.texto },
                aba === "Mensal" && styles.abaTextoAtivo,
              ]}
            >
              Mensal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.aba,
              aba === "Diarias" && styles.abaAtiva,
            ]}
            onPress={() => setAba("Diarias")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.abaTexto,
                { color: cores.texto },
                aba === "Diarias" && styles.abaTextoAtivo,
              ]}
            >
              Diárias
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de imóveis favoritos */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 6,
            flexGrow: lista.length === 0 ? 1 : 0,
          }}
        >
          {lista.map((item) => (
            <View
              key={`${aba}-${item.id}`}
              style={[
                styles.card,
                styles.sombra,
                {
                  backgroundColor: cores.card,
                  borderColor: cores.borda,
                },
              ]}
            >
              <Pressable
                style={styles.cardPrincipal}
                onPress={() => abrirDetalhe(item)}
              >
                <Image
                  source={{ uri: item.img }}
                  style={styles.cardImg}
                  resizeMode="cover"
                />

                <View style={styles.cardInfo}>
                  <Text
                    style={[
                      styles.cardTitulo,
                      { color: cores.texto },
                    ]}
                    numberOfLines={2}
                  >
                    {item.titulo}
                  </Text>

                  <Text style={styles.cardPreco}>
                    {item.preco}
                  </Text>

                  <View style={styles.cardLocalRow}>
                    <Ionicons
                      name="location"
                      size={12}
                      color={cores.iconeLocal}
                    />

                    <Text
                      style={[
                        styles.cardLocal,
                        { color: cores.textoSecundario },
                      ]}
                      numberOfLines={2}
                    >
                      {item.local}
                    </Text>
                  </View>
                </View>
              </Pressable>

              {/* Remover dos favoritos */}
              <Pressable
                style={[
                  styles.btnHeart,
                  { backgroundColor: cores.botao },
                ]}
                onPress={() => remover(item.id)}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Remover ${item.titulo} dos favoritos`}
              >
                <Ionicons
                  name="heart"
                  size={20}
                  color="#FF8C00"
                />
              </Pressable>
            </View>
          ))}

          {/* Estado vazio */}
          {lista.length === 0 && (
            <View style={styles.vazio}>
              <Ionicons
                name="heart-outline"
                size={55}
                color={cores.vazioIcone}
              />

              <Text
                style={[
                  styles.vazioTitulo,
                  { color: cores.texto },
                ]}
              >
                Nenhum favorito
              </Text>

              <Text
                style={[
                  styles.vazioTexto,
                  { color: cores.textoSecundario },
                ]}
              >
                Você ainda não adicionou nenhum imóvel aos favoritos.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Menu lateral */}
      <MenuDrawer
        visible={menuVisible}
        onClose={fecharMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#448AFF",
  },

  topoAzul: {
    backgroundColor: "#448AFF",
    justifyContent: "center",
  },

  headerAzul: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  btnHamburguer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  traco: {
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  logoImg: {
    width: 200,
    height: 60,
  },

  content: {
    flex: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
    overflow: "hidden",
  },

  voltarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 6,
  },

  btnVoltarNovo: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  linhaLaranja: {
    marginTop: 4,
  },

  abasContainer: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    padding: 4,
  },

  aba: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  abaAtiva: {
    backgroundColor: "#1A5CFF",
  },

  abaTexto: {
    fontSize: 14,
    fontWeight: "600",
  },

  abaTextoAtivo: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  sombra: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },

  card: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    alignItems: "center",
    minHeight: 91,
  },

  cardPrincipal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 28,
  },

  cardImg: {
    width: 85,
    height: 75,
    borderRadius: 8,
  },

  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },

  cardTitulo: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },

  cardPreco: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FF8C00",
    marginBottom: 2,
  },

  cardLocalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  cardLocal: {
    flex: 1,
    fontSize: 10,
    marginLeft: 3,
  },

  btnHeart: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 1,
  },

  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
  },

  vazioTitulo: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },

  vazioTexto: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
});
