import React, { useState, useRef, useEffect,} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, useWindowDimensions, Alert, PanResponder,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuDrawer from "../../app/componets/MenuDrawer";
const BANNERS = [
  { id: "1", titulo: "Sua casa dos sonhos em Maceió", sub: "Mais de 2.000 imóveis com preço justo.", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" },
  { id: "2", titulo: "Descubra novos lugares incríveis", sub: "Encontre experiências únicas perto de você.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" },
  { id: "3", titulo: "Alugue fácil e 100% seguro", sub: "Contrato digital e pagamento protegido.", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" },
];
const TODOS_IMOVEIS = [
  { id: "1", local: "Maceió-AL", valor: 2000, quartos: 1, img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400", nome: "Pajuçara", tipo: "Apartamento" },
  { id: "2", local: "Maceió-AL", valor: 1500, quartos: 2, img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400", nome: "Ponta Verde", tipo: "Apartamento" },
  { id: "3", local: "Maceió-AL", valor: 3000, quartos: 3, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", nome: "Jatiúca", tipo: "Casa" },
  { id: "4", local: "Aracaju-SE", valor: 1800, quartos: 1, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400", nome: "Atalaia", tipo: "Kitnet / Studio" },
  { id: "5", local: "Maceió-AL", valor: 2500, quartos: 2, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400", nome: "Cruz das Almas", tipo: "Casa" },
  { id: "6", local: "Maceió-AL", valor: 1200, quartos: 1, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400", nome: "Farol", tipo: "Apartamento" },
];
export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const ref = useRef<FlatList<any> | null>(null);
  const isTablet = width >= 768;
  const filtroPadding = isTablet? 24 : 16;
  const CARD_GAP = 10;
  const CARD_WIDTH = width - filtroPadding * 2;
  const params = useLocalSearchParams();
  const [menuAberto, setMenuAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const [buscaGeral, setBuscaGeral] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [valor, setValor] = useState("");
  const [quartos, setQuartos] = useState("");
  const [imoveis, setImoveis] = useState(TODOS_IMOVEIS);
  const [verificandoLogin, setVerificandoLogin] = useState(true);

  useEffect(() => {
    let ativoComponente = true;
    async function verificaLogin() {
      try {
        const logado = await AsyncStorage.getItem("logado");
        if (!ativoComponente) return;
        if (logado!== "true") { router.replace("/login"); return; }
        setVerificandoLogin(false);
      } catch (error) {
        if (ativoComponente) { setVerificandoLogin(false); router.replace("/login"); }
      }
    }
    verificaLogin();
    return () => { ativoComponente = false; };
  }, [router]);

  useEffect(() => {
    if (params.tipo || params.de || params.ate || params.onde) {
      let filtrados = TODOS_IMOVEIS;
      if (params.tipo) {
        const t = String(params.tipo).toLowerCase();
        filtrados = filtrados.filter(i => i.tipo.toLowerCase().includes(t));
      }
      if (params.onde) {
        const local = String(params.onde).toLowerCase();
        filtrados = filtrados.filter(i => i.local.toLowerCase().includes(local) || i.nome.toLowerCase().includes(local));
      }
      if (params.de) {
        const deNum = Number(params.de);
        if (!isNaN(deNum)) filtrados = filtrados.filter(i => i.valor >= deNum);
      }
      if (params.ate) {
        const ateNum = Number(params.ate);
        if (!isNaN(ateNum)) filtrados = filtrados.filter(i => i.valor <= ateNum);
      }
      setImoveis(filtrados);
    }
  }, [params.tipo, params.de, params.ate, params.onde]);
  const panResponder = useRef( PanResponder.create({ onMoveShouldSetPanResponder: (evt, gestureState) => {
        return evt.nativeEvent.pageX < 35 && gestureState.dx > 60 && Math.abs(gestureState.dy) < 50;},
      onPanResponderRelease: () => { setMenuAberto(true); }, })).current;
  useEffect(() => {
    const timer = setInterval(() => { setAtivo((prev) => {
        const prox = (prev + 1) % BANNERS.length;
        ref.current?.scrollToOffset({ offset: (CARD_WIDTH + CARD_GAP) * prox, animated: true });
        return prox;});}, 4000);
    return () => clearInterval(timer);
  }, [CARD_WIDTH]);

  function buscar() {
    let filtrados = TODOS_IMOVEIS;
    const geral = buscaGeral.trim().toLowerCase();
    if (geral!== "") { filtrados = filtrados.filter(item => item.local.toLowerCase().includes(geral) || item.nome.toLowerCase().includes(geral) || item.tipo.toLowerCase().includes(geral));
    }
    const localBusca = localizacao.trim().toLowerCase();
    if (localBusca!== "") { filtrados = filtrados.filter(item => item.local.toLowerCase().includes(localBusca) || item.nome.toLowerCase().includes(localBusca));
    }
    if (valor.trim()!== "") {
      const v = parseInt(valor.replace(/\D/g, ""), 10);
      if (!isNaN(v)) filtrados = filtrados.filter(item => item.valor <= v);
    }
    if (quartos.trim()!== "") {
      const q = parseInt(quartos, 10);
      if (!isNaN(q)) filtrados = filtrados.filter(item => item.quartos === q);
    }
    setImoveis(filtrados);
    if (filtrados.length === 0) Alert.alert("BuscaLar", "Nenhum imóvel encontrado.");
  }
  function irPara(rota: string) { setMenuAberto(false);
    setTimeout(() => { router.push(rota as any); }, 260);
  }
  if (verificandoLogin) return <View style={styles.loadingContainer} />;
  const bannerHeight = isTablet? 260 : 175;
  // CARD LADO A LADO
  const cardWidthCalc = isTablet? (width - filtroPadding * 2 - 12) / 2 : (width - filtroPadding * 2 - CARD_GAP) / 2;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}>
        {/* HEADER COM HAMBURGUER MAIS PRA CIMA */}
        <View style={[styles.headerPrint, { paddingHorizontal: filtroPadding }]}>
          <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.btnHamburguerPrint} hitSlop={10}>
            <View style={[styles.traco, { width: 22 }]} />
            <View style={[styles.traco, { width: 15 }]} />
            <View style={[styles.traco, { width: 9 }]} />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={styles.avatar}><Text style={styles.avatarText}>D</Text></View>
            <View><Text style={styles.ola}>Olá, Davi Miguel!</Text><Text style={styles.sub}>O que você vai explorar hoje?</Text></View>
          </View>
          <TouchableOpacity style={styles.btnEngrenagem} onPress={() => irPara("/configuracoes")}><Ionicons name="settings" size={20} color="#fff" /></TouchableOpacity>
        </View>
        {/* BARRA DE PESQUISA COM SOMBRA + BOTAO DENTRO + BORDA PRETA */}
        <View style={{ paddingHorizontal: filtroPadding, marginTop: 12 }}>
          <View style={styles.searchUnificada}>
            <TextInput placeholder="Buscar destinos, atividades e" placeholderTextColor="#999" style={styles.searchInputUnificada} value={buscaGeral} onChangeText={setBuscaGeral}/>
            <TouchableOpacity style={styles.btnBuscarDentro} onPress={buscar}>
              <Text style={styles.btnBuscarText}>BUSCAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <FlatList ref={ref} data={BANNERS} horizontal showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id} snapToInterval={CARD_WIDTH + CARD_GAP} snapToAlignment="start" decelerationRate="fast"
            getItemLayout={(_, index) => ({ length: CARD_WIDTH + CARD_GAP, offset: (CARD_WIDTH + CARD_GAP) * index, index })}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP));
              setAtivo(newIndex);}}
            contentContainerStyle={{ paddingHorizontal: filtroPadding }}
            ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
            renderItem={({ item }) => (
              <View style={[styles.bannerSlide, { width: CARD_WIDTH, height: bannerHeight }]}>
                <Image source={{ uri: item.img }} style={styles.bannerImgFull} resizeMode="cover" />
                <View style={styles.overlay} />
                <View style={styles.bannerLeft}>
                  <Text style={styles.emAlta}>Em alta</Text>
                  <Text style={styles.bannerTitulo}>{item.titulo}</Text>
                  <Text style={styles.bannerSub}>{item.sub}</Text>
                  <TouchableOpacity style={styles.btnExplorar}><Text style={styles.btnExplorarTxt}>Explorar agora</Text></TouchableOpacity>
                </View>
              </View>)}/>
          <View style={styles.dotsCentro}>
            {BANNERS.map((_, i) => <View key={i.toString()} style={[styles.dot, i === ativo? styles.dotAtivo : styles.dotInativo]} />)}
          </View>
        </View>
        {/* FILTROS COM BOTAO APLICAR */}
        <View style={[styles.filtroContainer, { marginHorizontal: filtroPadding }]}>
          <View style={styles.filtroItem}>
            <View style={styles.filtroLabelRow}><Ionicons name="location-outline" size={11} color="#000" /><Text style={styles.filtroLabel}>Localização</Text></View>
            <TextInput style={styles.filtroInputReal} placeholder="Maceió-AL" value={localizacao} onChangeText={setLocalizacao} placeholderTextColor="#999" />
          </View>
          <View style={styles.filtroItem}>
            <View style={styles.filtroLabelRow}><Ionicons name="cash-outline" size={11} color="#000" /><Text style={styles.filtroLabel}>Valor</Text></View>
            <TextInput style={styles.filtroInputReal} placeholder="2000" keyboardType="numeric" value={valor} onChangeText={setValor} placeholderTextColor="#999" />
          </View>
          <View style={styles.filtroItem}>
            <View style={styles.filtroLabelRow}><Ionicons name="bed-outline" size={11} color="#000" /><Text style={styles.filtroLabel}>Quartos</Text></View>
            <TextInput style={styles.filtroInputReal} placeholder="01" keyboardType="numeric" value={quartos} onChangeText={setQuartos} placeholderTextColor="#999" />
          </View>
          <TouchableOpacity style={styles.btnAplicar} onPress={buscar}>
            <Text style={styles.btnAplicarText}>Aplicar</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.tituloSecao, { marginHorizontal: filtroPadding }]}>Lugares em destaque ({imoveis.length})</Text>

        {/* CARDS LADO A LADO COM SOMBRA */}
        <View style={[styles.grid, { paddingHorizontal: filtroPadding }]}>
          {imoveis.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.cardNovo, { width: cardWidthCalc }]} onPress={() => router.push("/perfil-proprietario" as any)} activeOpacity={0.85}>
              <Image source={{ uri: item.img }} style={styles.cardImgNovo} resizeMode="cover" />
              <View style={styles.cardInfoNovo}>
                <Text style={styles.cardNome} numberOfLines={1}>{item.nome}</Text>
                <Text style={styles.cardPreco} numberOfLines={2}>R$ {item.valor} - {item.quartos}q • {item.local}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <MenuDrawer visible={menuAberto} onClose={() => setMenuAberto(false)} onOpen={() => setMenuAberto(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff"
  },
  loadingContainer: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  headerPrint: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingBottom: 8, 
    paddingTop: 4 
  },
  btnHamburguerPrint: { 
    width: 32, 
    height: 32, 
    justifyContent: "center", 
    gap: 4, 
    marginRight: 12, 
    marginTop: -6 
  },
  traco: { 
    height: 2.8, 
    backgroundColor: "#000", 
    borderRadius: 10 
  },
  avatar: { 
    backgroundColor: "#FF8C00", 
    alignItems: "center", 
    justifyContent: "center", 
    marginRight: 10, 
    width: 36, 
    height: 36, 
    borderRadius: 18 
  },
  avatarText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 14 
  },
  ola: { 
    fontWeight: "700", 
    fontSize: 13 
  },
  sub: { 
    color: "#777", 
    fontSize: 11 
  },
  btnEngrenagem: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    backgroundColor: "#A0A0A0", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  searchUnificada: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#000",
    height: 46,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  searchInputUnificada: {
    flex: 1, 
    fontSize: 13, 
    color: "#000", 
    paddingHorizontal: 14, 
    height: "100%" 
  },
  btnBuscarDentro: {
    backgroundColor: "#1A5CFF",
    height: "100%",
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1.5,
    borderLeftColor: "#000",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  btnBuscarText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 12 
  },
  bannerSlide: { 
    borderRadius: 16, 
    overflow: "hidden", 
    borderWidth: 1.2, 
    borderColor: "#000" 
  },
  bannerImgFull: { 
    position: "absolute", 
    width: "100%", 
    height: "100%" 
  },
  overlay: { 
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: "rgba(0,0,0,0.38)" 
  },
  bannerLeft: { 
    flex: 1, 
    padding: 18, 
    justifyContent: "center" 
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
    fontSize: 9 
  },
  bannerTitulo: { 
    fontWeight: "bold", 
    color: "#fff", 
    fontSize: 16, 
    width: 200, 
    lineHeight: 20 
  },
  bannerSub: { 
    color: "#eee", 
    marginTop: 6, 
    fontSize: 11, 
    width: 180 
  },
  btnExplorar: { 
    backgroundColor: "#1A5CFF", 
    borderRadius: 20, 
    alignSelf: "flex-start", 
    marginTop: 12, 
    paddingHorizontal: 14, 
    paddingVertical: 7 
  },
  btnExplorarTxt: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 10 
  },
  dotsCentro: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 8, 
    marginBottom: 6, 
    gap: 5 
  },
  dot: { 
    height: 5, 
    borderRadius: 10 
  },
  dotAtivo: {
    backgroundColor: "#FF8C00",
    width: 14, 
    height: 5 
  },
  dotInativo: { 
    backgroundColor: "#D1D1D1", 
    width: 5, 
    height: 5 
  },
  filtroContainer: {
    backgroundColor: "#FF8C00",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    padding: 8,
    borderWidth: 1.2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  filtroItem: { 
    flex: 1, 
    backgroundColor: "#fff", 
    borderRadius: 8, 
    padding: 7, 
    borderWidth: 1, 
    borderColor: "#000", 
    elevation: 2 
  },
  filtroLabelRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 3, 
    marginBottom: 2 
  },
  filtroLabel: { 
    fontWeight: "700", 
    fontSize: 8 
  },
  filtroInputReal: { 
    fontSize: 11, 
    color: "#000", 
    paddingVertical: 3 
  },
btnAplicar: {
  width: 62,
  height: 36,
  borderRadius: 8,
  backgroundColor: "#1A5CFF",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1.2,
  borderColor: "#000",
},
btnAplicarText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 11,
},
  tituloSecao: { 
    fontWeight: "bold", 
    marginTop: 16, 
    marginBottom: 10, 
    fontSize: 13 
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 10 
  },
  cardNovo: {
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    height: 155,
    borderWidth: 1.2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 6,
  },
  cardImgNovo: { 
    width: "100%", 
    height: "65%" 
  },
  cardInfoNovo: { 
    padding: 8, 
    backgroundColor: "#fff", 
    height: "35%", 
    justifyContent: "center" 
  },
  cardNome: { 
    fontWeight: "bold", 
    fontSize: 11 
  },
  cardPreco: { 
    color: "#555", 
    marginTop: 2, 
    fontSize: 9, 
    fontWeight: "600" 
  },
});