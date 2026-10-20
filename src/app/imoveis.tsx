
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";

const IMOVEIS = [
  {
    id: "1",
    preco: "R$ 1.000/mês",
    valor: 1000,
    titulo: "Apartamento 2 quartos",
    tipo: "Apartamento",
    local: "Barra de São Miguel, AL",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
  },
  {
    id: "2",
    preco: "R$ 1.000/mês",
    valor: 1000,
    titulo: "Casa para alugar",
    tipo: "Casa",
    local: "Barra de São Miguel, AL",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
  },
  {
    id: "3",
    preco: "R$ 1.500/mês",
    valor: 1500,
    titulo: "Apartamento 2 quartos",
    tipo: "Apartamento",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500",
  },
  {
    id: "4",
    preco: "R$ 2.000/mês",
    valor: 2000,
    titulo: "Apartamento 2 quartos",
    tipo: "Apartamento",
    local: "Jatiúca, Maceió",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500",
  },
];

function LinhaLaranja({ width = 95 }: { width?: number }) {
  return (
    <View
      style={{
        width,
        height: 3,
        backgroundColor: "#FF8C00",
        borderRadius: 2,
        marginTop: 4,
      }}
    />
  );
}

export default function Imoveis() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{
    tipo?: string;
    de?: string;
    ate?: string;
    onde?: string;
    objetivo?: string;
  }>();

  const { dark } = useTheme();

  const [menuAberto, setMenuAberto] = useState(false);
  const [cidadeFiltro, setCidadeFiltro] = useState(
    params.onde ?? "Barra de São Miguel"
  );

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#B0B0B0" : "#777777",
    borda: dark ? "#3E3E3E" : "#E0E0E0",
    azul: "#488AFF",
    azulBotao: "#0B5FFF",
    laranja: "#FF8C00",
    campo: dark ? "#252525" : "#FFFFFF",
    card: dark ? "#242424" : "#F8F8F8",
  };

  const styles = criarEstilos(cores);

  const normalizar = (texto: string) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const converterNumero = (valor?: string) => {
    if (!valor) return undefined;

    const numero = Number(valor);

    return Number.isFinite(numero) ? numero : undefined;
  };

  const imoveisFiltrados = useMemo(() => {
    const localPesquisa = normalizar(cidadeFiltro);
    const tipoPesquisa = params.tipo
      ? normalizar(params.tipo)
      : "";

    const valorMinimo = converterNumero(params.de);
    const valorMaximo = converterNumero(params.ate);

    return IMOVEIS.filter((item) => {
      const correspondeLocal =
        !localPesquisa || normalizar(item.local).includes(localPesquisa);

      const correspondeTipo =
        !tipoPesquisa ||
        tipoPesquisa === "todos" ||
        normalizar(item.tipo) === tipoPesquisa;

      const correspondeMinimo =
        valorMinimo === undefined || item.valor >= valorMinimo;

      const correspondeMaximo =
        valorMaximo === undefined || item.valor <= valorMaximo;

      return (
        correspondeLocal &&
        correspondeTipo &&
        correspondeMinimo &&
        correspondeMaximo
      );
    });
  }, [cidadeFiltro, params.tipo, params.de, params.ate]);

  const abrirDetalhes = (id: string) => {
    router.push({
      pathname: "/detalhe",
      params: { id },
    } as any);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      <View style={styles.topo}>
        <View style={styles.topoLogoRow}>
          <TouchableOpacity
            style={styles.hamburgerTopo}
            onPress={() => setMenuAberto(true)}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.hLine, { width: 18 }]} />
            <View style={[styles.hLine, { width: 12 }]} />
            <View style={[styles.hLine, { width: 7 }]} />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logoTopo}
            resizeMode="contain"
          />

          <View style={{ width: 28 }} />
        </View>

        <View style={styles.filtrosRow}>
          <View style={styles.filtroLocal}>
            <Ionicons
              name="location"
              size={16}
              color={cores.textoSecundario}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.filtroLabel}>
                Filtrar por localização
              </Text>

              <TextInput
                value={cidadeFiltro}
                onChangeText={setCidadeFiltro}
                placeholder="Digite a cidade ou bairro"
                placeholderTextColor={cores.textoSecundario}
                style={styles.filtroInput}
                returnKeyType="search"
                autoCapitalize="words"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnFiltros}
            onPress={() => setCidadeFiltro("")}
            activeOpacity={0.8}
          >
            <Text style={styles.btnFiltrosText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.tituloRowCentro}>
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(tabs)/index" as any);
              }
            }}
            style={styles.btnVoltarNovo}
            accessibilityLabel="Voltar"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={cores.texto}
            />
          </TouchableOpacity>

          <View style={styles.tituloCentro}>
            <Text style={styles.titulo}>
              Aluguéis Disponíveis
            </Text>
            <LinhaLaranja width={115} />
          </View>

          <View style={{ width: 32 }} />
        </View>

        <Text style={styles.contador}>
          {imoveisFiltrados.length}{" "}
          {imoveisFiltrados.length === 1
            ? "imóvel encontrado"
            : "imóveis encontrados"}
        </Text>

        <FlatList
          data={imoveisFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.colunas}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Ionicons
                name="home-outline"
                size={42}
                color={cores.textoSecundario}
              />

              <Text style={styles.vazioTitulo}>
                Nenhum imóvel encontrado
              </Text>

              <Text style={styles.vazioTexto}>
                Tente pesquisar outra cidade ou bairro, ou limpe os filtros.
              </Text>

              <TouchableOpacity
                style={styles.btnLimparVazio}
                onPress={() => setCidadeFiltro("")}
              >
                <Text style={styles.btnLimparVazioTexto}>
                  Limpar localização
                </Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => abrirDetalhes(item.id)}
            >
              <Image
                source={{ uri: item.img }}
                style={styles.cardImg}
                resizeMode="cover"
              />

              <View style={styles.cardConteudo}>
                <Text style={styles.cardPreco}>
                  {item.preco}
                </Text>

                <Text
                  style={styles.cardTitulo}
                  numberOfLines={2}
                >
                  {item.titulo}
                </Text>

                <View style={styles.cardLocalRow}>
                  <Ionicons
                    name="location"
                    size={12}
                    color={cores.laranja}
                  />

                  <Text
                    style={styles.cardLocal}
                    numberOfLines={2}
                  >
                    {item.local}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
      />
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  azulBotao: string;
  laranja: string;
  campo: string;
  card: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azul,
    },
    topo: {
      backgroundColor: cores.azul,
      paddingHorizontal: 14,
      paddingBottom: 12,
    },
    topoLogoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
    },
    logoTopo: {
      width: 175,
      height: 42,
    },
    hLine: {
      height: 2.5,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },
    hamburgerTopo: {
      width: 28,
      height: 28,
      justifyContent: "center",
      gap: 5,
    },
    filtrosRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 12,
      alignItems: "center",
    },
    filtroLocal: {
      flex: 1,
      backgroundColor: cores.campo,
      height: 44,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      gap: 6,
    },
    filtroLabel: {
      fontSize: 8,
      color: cores.textoSecundario,
    },
    filtroInput: {
      fontSize: 11,
      fontWeight: "700",
      color: cores.texto,
      paddingVertical: 0,
    },
    btnFiltros: {
      backgroundColor: cores.azulBotao,
      borderWidth: 1,
      borderColor: "#FFFFFF",
      height: 32,
      paddingHorizontal: 14,
      borderRadius: 20,
      justifyContent: "center",
    },
    btnFiltrosText: {
      color: "#FFFFFF",
      fontSize: 11,
      fontWeight: "600",
    },
    conteudo: {
      flex: 1,
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      marginTop: 4,
      paddingTop: 12,
    },
    tituloRowCentro: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      marginBottom: 4,
    },
    btnVoltarNovo: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    tituloCentro: {
      flex: 1,
      alignItems: "center",
    },
    titulo: {
      fontSize: 15,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
    },
    contador: {
      fontSize: 10,
      color: cores.textoSecundario,
      textAlign: "center",
      marginBottom: 8,
    },
    lista: {
      paddingHorizontal: 12,
      paddingBottom: 24,
      gap: 10,
      flexGrow: 1,
    },
    colunas: {
      gap: 10,
    },
    card: {
      flex: 1,
      backgroundColor: cores.card,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: cores.borda,
      overflow: "hidden",
      paddingBottom: 8,
    },
    cardImg: {
      width: "100%",
      height: 110,
      backgroundColor: cores.superficie,
    },
    cardConteudo: {
      paddingHorizontal: 6,
      paddingTop: 5,
    },
    cardPreco: {
      color: cores.laranja,
      fontWeight: "800",
      fontSize: 12,
      marginBottom: 3,
    },
    cardTitulo: {
      fontSize: 10,
      fontWeight: "600",
      color: cores.texto,
    },
    cardLocalRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 3,
      marginTop: 5,
    },
    cardLocal: {
      flex: 1,
      fontSize: 9,
      color: cores.textoSecundario,
    },
    vazio: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingVertical: 50,
    },
    vazioTitulo: {
      fontSize: 15,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
      marginTop: 12,
    },
    vazioTexto: {
      fontSize: 12,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 6,
      lineHeight: 18,
    },
    btnLimparVazio: {
      marginTop: 16,
      backgroundColor: cores.laranja,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 10,
    },
    btnLimparVazioTexto: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
  });
}
