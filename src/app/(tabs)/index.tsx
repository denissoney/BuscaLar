
import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, useWindowDimensions, Alert, PanResponder,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuDrawer from "../componets/MenuDrawer";
import { useTheme } from "../../contexts/ThemeContext";

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

const TODOS_IMOVEIS = [
  {
    id: "1",
    local: "Maceió-AL",
    valor: 2000,
    quartos: 1,
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400",
    nome: "Pajuçara",
    tipo: "Apartamento",
  },
  {
    id: "2",
    local: "Maceió-AL",
    valor: 1500,
    quartos: 2,
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    nome: "Ponta Verde",
    tipo: "Apartamento",
  },
  {
    id: "3",
    local: "Maceió-AL",
    valor: 3000,
    quartos: 3,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    nome: "Jatiúca",
    tipo: "Casa",
  },
  {
    id: "4",
    local: "Aracaju-SE",
    valor: 1800,
    quartos: 1,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    nome: "Atalaia",
    tipo: "Kitnet / Studio",
  },
  {
    id: "5",
    local: "Maceió-AL",
    valor: 2500,
    quartos: 2,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    nome: "Cruz das Almas",
    tipo: "Casa",
  },
  {
    id: "6",
    local: "Maceió-AL",
    valor: 1200,
    quartos: 1,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    nome: "Farol",
    tipo: "Apartamento",
  },
];

type Imovel = (typeof TODOS_IMOVEIS)[number];

function valorParametro(valor: string | string[] | undefined) {
  return Array.isArray(valor) ? valor[0] : valor;
}

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { dark } = useTheme();
  const listaRef = useRef<FlatList<(typeof BANNERS)[number]> | null>(null);
  const menuAbertoRef = useRef(false);
  const isTablet = width >= 768;
  const filtroPadding = isTablet ? 24 : 16;
  const CARD_GAP = 10;
  const CARD_WIDTH = width - filtroPadding * 2;
  const [menuAberto, setMenuAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const [buscaGeral, setBuscaGeral] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [valor, setValor] = useState("");
  const [quartos, setQuartos] = useState("");
  const [imoveis, setImoveis] = useState<Imovel[]>(TODOS_IMOVEIS);
  const [verificandoLogin, setVerificandoLogin] = useState(true);
  // Cores dinâmicas do tema.
  const cores = useMemo(
    () => ({
      fundo: dark ? "#121212" : "#FFFFFF",
      card: dark ? "#242424" : "#FFFFFF",
      texto: dark ? "#FFFFFF" : "#111111",
      textoSecundario: dark ? "#BBBBBB" : "#666666",
      borda: dark ? "#444444" : "#D5D5D5",
      campo: dark ? "#2C2C2C" : "#FFFFFF",
      icone: dark ? "#FFFFFF" : "#111111",
      filtroFundo: dark ? "#252525" : "#FF8C00",
      separador: dark ? "#404040" : "#E5E5E5",
    }),
    [dark]
  );

  // Verificar login.
  useEffect(() => {
    let montado = true;

    async function verificarLogin() {
      try {
        const logado = await AsyncStorage.getItem("logado");

        if (!montado) return;

        if (logado !== "true") {
          router.replace("/login");
          return;
        }

        setVerificandoLogin(false);
      } catch (error) {
        if (montado) {
          setVerificandoLogin(false);
          router.replace("/login");
        }
      }
    }

    verificarLogin();

    return () => {
      montado = false;
    };
  }, [router]);

  // Aplicar filtros recebidos da tela de filtros.
  useEffect(() => {
    const tipo = valorParametro(params.tipo);
    const onde = valorParametro(params.onde);
    const de = valorParametro(params.de);
    const ate = valorParametro(params.ate);

    if (!tipo && !onde && !de && !ate) return;

    let resultado = [...TODOS_IMOVEIS];

    if (tipo) {
      resultado = resultado.filter((item) =>
        item.tipo.toLowerCase().includes(tipo.toLowerCase())
      );
    }

    if (onde) {
      resultado = resultado.filter(
        (item) =>
          item.local.toLowerCase().includes(onde.toLowerCase()) ||
          item.nome.toLowerCase().includes(onde.toLowerCase())
      );
    }

    if (de && Number.isFinite(Number(de))) {
      resultado = resultado.filter((item) => item.valor >= Number(de));
    }

    if (ate && Number.isFinite(Number(ate))) {
      resultado = resultado.filter((item) => item.valor <= Number(ate));
    }

    setImoveis(resultado);
  }, [params.tipo, params.onde, params.de, params.ate]);

  // Menu lateral: manter a referência sincronizada para o gesto.
  useEffect(() => {
    menuAbertoRef.current = menuAberto;
  }, [menuAberto]);

  const abrirMenu = () => {
    menuAbertoRef.current = true;
    setMenuAberto(true);
  };

  const fecharMenu = () => {
    menuAbertoRef.current = false;
    setMenuAberto(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gesture) =>
        !menuAbertoRef.current &&
        evt.nativeEvent.pageX < 35 &&
        gesture.dx > 20 &&
        Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 60) {
          abrirMenu();
        }
      },
    })
  ).current;

  // Carrossel automático.
  useEffect(() => {
    const timer = setInterval(() => {
      setAtivo((anterior) => {
        const proximo = (anterior + 1) % BANNERS.length;

        listaRef.current?.scrollToOffset({
          offset: (CARD_WIDTH + CARD_GAP) * proximo,
          animated: true,
        });

        return proximo;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [CARD_WIDTH]);

  // Busca e filtros locais.
  function buscar() {
    let resultado = [...TODOS_IMOVEIS];

    const geral = buscaGeral.trim().toLowerCase();
    const local = localizacao.trim().toLowerCase();

    if (geral) {
      resultado = resultado.filter(
        (item) =>
          item.local.toLowerCase().includes(geral) ||
          item.nome.toLowerCase().includes(geral) ||
          item.tipo.toLowerCase().includes(geral)
      );
    }

    if (local) {
      resultado = resultado.filter(
        (item) =>
          item.local.toLowerCase().includes(local) ||
          item.nome.toLowerCase().includes(local)
      );
    }

    if (valor.trim()) {
      const limite = Number(valor.replace(/\D/g, ""));

      if (Number.isFinite(limite)) {
        resultado = resultado.filter((item) => item.valor <= limite);
      }
    }

    if (quartos.trim()) {
      const quantidade = Number(quartos);

      if (Number.isFinite(quantidade)) {
        resultado = resultado.filter(
          (item) => item.quartos === quantidade
        );
      }
    }

    setImoveis(resultado);

    if (resultado.length === 0) {
      Alert.alert("BuscaLar", "Nenhum imóvel encontrado com esses filtros.");
    }
  }

  function limparBusca() {
    setBuscaGeral("");
    setLocalizacao("");
    setValor("");
    setQuartos("");
    setImoveis([...TODOS_IMOVEIS]);
  }

  function irPara(rota: string) {
    fecharMenu();
    router.push(rota as any);
  }

  function abrirDetalhes(item: Imovel) {
    router.push({
      pathname: "/detalhe",
      params: {
        id: item.id,
        nome: item.nome,
        local: item.local,
        valor: String(item.valor),
        quartos: String(item.quartos),
        tipo: item.tipo,
        img: item.img,
      },
    } as any);
  }

  if (verificandoLogin) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: cores.fundo },
        ]}
      />
    );
  }

  const bannerHeight = isTablet ? 260 : 175;
  const cardWidth = isTablet
    ? (width - filtroPadding * 2 - CARD_GAP) / 2
    : (width - filtroPadding * 2 - CARD_GAP) / 2;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: cores.fundo,
          paddingTop: insets.top,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 30 + insets.bottom,
        }}
      >
        {/* CABEÇALHO */}
        <View
          style={[
            styles.header,
            { paddingHorizontal: filtroPadding },
          ]}
        >
          <TouchableOpacity
            onPress={abrirMenu}
            style={styles.btnHamburguer}
            hitSlop={10}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { backgroundColor: cores.icone, width: 22 }]} />
            <View style={[styles.traco, { backgroundColor: cores.icone, width: 15 }]} />
            <View style={[styles.traco, { backgroundColor: cores.icone, width: 9 }]} />
          </TouchableOpacity>

          <View style={styles.usuario}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>D</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.ola, { color: cores.texto }]}>
                Olá, Davi Miguel!
              </Text>
              <Text style={[styles.sub, { color: cores.textoSecundario }]}>
                O que você vai explorar hoje?
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnEngrenagem}
            onPress={() => irPara("/configuracoes")}
            accessibilityLabel="Configurações"
          >
            <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* PESQUISA */}
        <View
          style={{
            paddingHorizontal: filtroPadding,
            marginTop: 12,
          }}
        >
          <View
            style={[
              styles.pesquisa,
              {
                backgroundColor: cores.campo,
                borderColor: cores.borda,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={18}
              color={cores.textoSecundario}
              style={{ marginLeft: 12 }}
            />
            <TextInput
              placeholder="Buscar bairros ou imóveis"
              placeholderTextColor={cores.textoSecundario}
              style={[styles.pesquisaInput, { color: cores.texto }]}
              value={buscaGeral}
              onChangeText={setBuscaGeral}
              returnKeyType="search"
              onSubmitEditing={buscar}
            />
            <TouchableOpacity
              style={styles.btnBuscar}
              onPress={buscar}
            >
              <Text style={styles.btnBuscarTexto}>BUSCAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CARROSSEL */}
        <View style={{ marginTop: 14 }}>
          <FlatList
            ref={listaRef}
            data={BANNERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            snapToInterval={CARD_WIDTH + CARD_GAP}
            snapToAlignment="start"
            decelerationRate="fast"
            getItemLayout={(_, index) => ({
              length: CARD_WIDTH + CARD_GAP,
              offset: (CARD_WIDTH + CARD_GAP) * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const indice = Math.round(
                event.nativeEvent.contentOffset.x /
                  (CARD_WIDTH + CARD_GAP)
              );
              setAtivo(Math.max(0, Math.min(indice, BANNERS.length - 1)));
            }}
            contentContainerStyle={{
              paddingHorizontal: filtroPadding,
            }}
            ItemSeparatorComponent={() => (
              <View style={{ width: CARD_GAP }} />
            )}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.banner,
                  {
                    width: CARD_WIDTH,
                    height: bannerHeight,
                    borderColor: cores.borda,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.img }}
                  style={styles.bannerImagem}
                  resizeMode="cover"
                />
                <View style={styles.bannerOverlay} />
                <View style={styles.bannerConteudo}>
                  <Text style={styles.emAlta}>EM ALTA</Text>
                  <Text style={styles.bannerTitulo}>{item.titulo}</Text>
                  <Text style={styles.bannerSub}>{item.sub}</Text>
                  <TouchableOpacity
                    style={styles.btnExplorar}
                    onPress={() => {
                      setBuscaGeral("");
                      setLocalizacao("");
                      setValor("");
                      setQuartos("");
                      setImoveis([...TODOS_IMOVEIS]);
                    }}
                  >
                    <Text style={styles.btnExplorarTexto}>
                      Explorar agora
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.dots}>
            {BANNERS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setAtivo(index);
                  listaRef.current?.scrollToOffset({
                    offset: (CARD_WIDTH + CARD_GAP) * index,
                    animated: true,
                  });
                }}
                accessibilityLabel={`Mostrar banner ${index + 1}`}
                style={[
                  styles.dot,
                  index === ativo ? styles.dotAtivo : styles.dotInativo,
                ]}
              />
            ))}
          </View>
        </View>

        {/* FILTROS */}
        <View
          style={[
            styles.filtros,
            {
              marginHorizontal: filtroPadding,
              backgroundColor: cores.filtroFundo,
              borderColor: cores.borda,
            },
          ]}
        >
          <View
            style={[
              styles.filtroCampo,
              { backgroundColor: cores.campo, borderColor: cores.borda },
            ]}
          >
            <View style={styles.filtroLabelRow}>
              <Ionicons name="location-outline" size={12} color={cores.texto} />
              <Text style={[styles.filtroLabel, { color: cores.texto }]}>
                Localização
              </Text>
            </View>
            <TextInput
              style={[styles.filtroInput, { color: cores.texto }]}
              placeholder="Maceió-AL"
              placeholderTextColor={cores.textoSecundario}
              value={localizacao}
              onChangeText={setLocalizacao}
              returnKeyType="done"
              onSubmitEditing={buscar}
            />
          </View>

          <View
            style={[
              styles.filtroCampo,
              { backgroundColor: cores.campo, borderColor: cores.borda },
            ]}
          >
            <View style={styles.filtroLabelRow}>
              <Ionicons name="cash-outline" size={12} color={cores.texto} />
              <Text style={[styles.filtroLabel, { color: cores.texto }]}>
                Valor máximo
              </Text>
            </View>
            <TextInput
              style={[styles.filtroInput, { color: cores.texto }]}
              placeholder="2000"
              placeholderTextColor={cores.textoSecundario}
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
              returnKeyType="done"
              onSubmitEditing={buscar}
            />
          </View>

          <View
            style={[
              styles.filtroCampo,
              { backgroundColor: cores.campo, borderColor: cores.borda },
            ]}
          >
            <View style={styles.filtroLabelRow}>
              <Ionicons name="bed-outline" size={12} color={cores.texto} />
              <Text style={[styles.filtroLabel, { color: cores.texto }]}>
                Quartos
              </Text>
            </View>
            <TextInput
              style={[styles.filtroInput, { color: cores.texto }]}
              placeholder="2"
              placeholderTextColor={cores.textoSecundario}
              keyboardType="numeric"
              value={quartos}
              onChangeText={setQuartos}
              returnKeyType="done"
              onSubmitEditing={buscar}
            />
          </View>

          <TouchableOpacity
            style={styles.btnAplicar}
            onPress={buscar}
          >
            <Text style={styles.btnAplicarTexto}>Aplicar</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.tituloLinha,
            { paddingHorizontal: filtroPadding },
          ]}
        >
          <Text style={[styles.tituloSecao, { color: cores.texto }]}>
            Lugares em destaque ({imoveis.length})
          </Text>
          <TouchableOpacity onPress={limparBusca}>
            <Text style={styles.limparTexto}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* CARDS DE IMÓVEIS */}
        <View
          style={[
            styles.grid,
            { paddingHorizontal: filtroPadding },
          ]}
        >
          {imoveis.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {
                  width: cardWidth,
                  backgroundColor: cores.card,
                  borderColor: cores.borda,
                },
              ]}
              onPress={() => abrirDetalhes(item)}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.img }}
                style={styles.cardImagem}
                resizeMode="cover"
              />
              <View style={styles.cardInfo}>
                <Text
                  style={[styles.cardNome, { color: cores.texto }]}
                  numberOfLines={1}
                >
                  {item.nome}
                </Text>
                <Text
                  style={[styles.cardPreco, { color: cores.textoSecundario }]}
                  numberOfLines={2}
                >
                  R$ {item.valor.toLocaleString("pt-BR")}/mês
                </Text>
                <View style={styles.cardLocal}>
                  <Ionicons
                    name="location-outline"
                    size={12}
                    color="#FF8C00"
                  />
                  <Text
                    style={[
                      styles.cardDetalhe,
                      { color: cores.textoSecundario },
                    ]}
                    numberOfLines={1}
                  >
                    {item.local} • {item.quartos} quarto(s)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {imoveis.length === 0 && (
          <View style={styles.vazio}>
            <Ionicons
              name="search-outline"
              size={38}
              color={cores.textoSecundario}
            />
            <Text style={[styles.vazioTexto, { color: cores.texto }]}>
              Nenhum imóvel encontrado.
            </Text>
            <TouchableOpacity onPress={limparBusca}>
              <Text style={styles.limparTexto}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <MenuDrawer
        visible={menuAberto}
        onClose={fecharMenu}
        onOpen={abrirMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },
  btnHamburguer: {
    width: 30,
    height: 34,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
  },
  traco: {
    height: 2.8,
    borderRadius: 10,
  },
  usuario: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
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
  avatarTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  ola: {
    fontWeight: "700",
    fontSize: 13,
  },
  sub: {
    fontSize: 11,
    marginTop: 2,
  },
  btnEngrenagem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#777777",
    alignItems: "center",
    justifyContent: "center",
  },
  pesquisa: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.2,
    height: 46,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  pesquisaInput: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 10,
    height: "100%",
    minWidth: 0,
  },
  btnBuscar: {
    backgroundColor: "#1A5CFF",
    height: "100%",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnBuscarTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 10,
  },
  banner: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  bannerImagem: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.42)",
},
  bannerConteudo: {
    flex: 1,
    padding: 18,
    justifyContent: "center",
  },
  emAlta: {
    color: "#FF8C00",
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
    fontSize: 9,
  },
  bannerTitulo: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16,
    maxWidth: 230,
    lineHeight: 21,
  },
  bannerSub: {
    color: "#EEEEEE",
    marginTop: 6,
    fontSize: 11,
    maxWidth: 220,
  },
  btnExplorar: {
    backgroundColor: "#1A5CFF",
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  btnExplorarTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 10,
  },
  dots: {
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
  },
  dotInativo: {
    backgroundColor: "#999999",
    width: 5,
  },
  filtros: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
    padding: 7,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  filtroCampo: {
    flex: 1,
    minWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
  },
  filtroLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 3,
  },
  filtroLabel: {
    fontWeight: "700",
    fontSize: 8,
    flexShrink: 1,
  },
  filtroInput: {
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 1,
    minWidth: 0,
  },
  btnAplicar: {
    minWidth: 48,
    height: 34,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "#1A5CFF",
    alignItems: "center",
    justifyContent: "center",
  },
  btnAplicarTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 10,
  },
  tituloLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 10,
  },
  tituloSecao: {
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
  },
  limparTexto: {
    color: "#1A5CFF",
    fontWeight: "700",
    fontSize: 11,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    height: 175,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImagem: {
    width: "100%",
    height: "58%",
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: "center",
  },
  cardNome: {
    fontWeight: "bold",
    fontSize: 12,
  },
  cardPreco: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: "700",
  },
  cardLocal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 3,
  },
  cardDetalhe: {
    flex: 1,
    fontSize: 9,
  },
  vazio: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 35,
    gap: 10,
  },
  vazioTexto: {
    fontWeight: "600",
    fontSize: 14,
  },
});
