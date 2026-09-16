import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import MenuDrawer from "../app/componets/MenuDrawer";

const IMOVEIS = [
  { id: "1", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" },
  { id: "2", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500" },
  { id: "3", preco: "R$ 1.500/mês", titulo: "Apartamento 2 quartos", local: "Ponta Verde, Maceió", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500" },
  { id: "4", preco: "R$ 2.000/mês", titulo: "Apartamento 2 quartos", local: "Jatiúca, Maceió", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500" },
  { id: "5", preco: "R$ 1.200/mês", titulo: "Apartamento 2 quartos", local: "Barra de São Miguel, AL", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500" },
  { id: "6", preco: "R$ 1.000/mês", titulo: "Apartamento 2 quartos", local: "Pajuçara, Maceió", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500" },
];

// LINHA LISA IGUAL DO AGENDAR VISITA - SEM DEGRAU (NÃO MUDEI)
function LinhaLaranja({ width = 95 }: { width?: number }) {
  return (
    <Svg height={4} width={width} viewBox={`0 0 ${width} 4`} style={{ marginTop: 4 }}>
      <Path d={`M0 0 L${width} 0 L${width} 1.2 L0 4 Z`} fill="#FF8C00" />
    </Svg>
  );
}

export default function AlugueisDisponiveis() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [cidadeFiltro, setCidadeFiltro] = useState("Barra de São Miguel");

  const abrirMenu = () => setMenuVisible(true);
  const fecharMenu = () => setMenuVisible(false);
  const irPara = (rota: string) => { fecharMenu(); router.push(rota as any); };

  // FILTRA DE VERDADE PELA CIDADE DIGITADA
  const imoveisFiltrados = useMemo(() => {
    if (!cidadeFiltro.trim()) return IMOVEIS;
    return IMOVEIS.filter((item) =>
      item.local.toLowerCase().includes(cidadeFiltro.toLowerCase())
    );
  }, [cidadeFiltro]);

  const renderCard = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => irPara(`/detalhe/${item.id}`)}>
      <Image source={{ uri: item.img }} style={styles.cardImg} />
      <Text style={styles.cardPreco}>{item.preco}</Text>
      <Text style={styles.cardTitulo}>{item.titulo}</Text>
      <View style={styles.cardLocalRow}>
        <Ionicons name="location" size={9} color="#FF8C00" />
        <Text style={styles.cardLocal}>{item.local}</Text>
      </View>
      <View style={styles.cardInfoRow}>
        <View style={styles.cardInfoItem}><Ionicons name="resize-outline" size={10} color="#fff" /><Text style={styles.cardInfoText}>15m²</Text></View>
        <View style={styles.cardInfoItem}><Ionicons name="bed-outline" size={10} color="#fff" /><Text style={styles.cardInfoText}>2 quartos</Text></View>
        <View style={styles.cardInfoItem}><Ionicons name="water-outline" size={10} color="#fff" /><Text style={styles.cardInfoText}>1 Banheiro</Text></View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topo}>
        <View style={styles.topoLogoRow}>
          <TouchableOpacity style={styles.hamburgerTopo} onPress={abrirMenu} activeOpacity={0.7}>
            <View style={[styles.hLine, { width: 18 }]} />
            <View style={[styles.hLine, { width: 12 }]} />
            <View style={[styles.hLine, { width: 7 }]} />
          </TouchableOpacity>
          <View style={styles.logoCentroWrap}>
            <Image source={require("../../assets/images/BuscaLar-preto.png")} style={styles.logoTopo} resizeMode="contain" />
          </View>
          <View style={{ width: 28 }} />
        </View>

        {/* BARRA DE CIDADE QUE FILTRA DE VERDADE */}
        <View style={styles.filtrosRow}>
          <View style={styles.filtroLocal}>
            <Ionicons name="location" size={14} color="#000" />
            <View style={{ flex: 1 }}>
              <Text style={styles.filtroLabel}>Filtrar por localização</Text>
              <TextInput
                value={cidadeFiltro}
                onChangeText={setCidadeFiltro}
                placeholder="Digite a cidade"
                placeholderTextColor="#999"
                style={styles.filtroInput}
              />
            </View>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </View>
          <TouchableOpacity style={styles.btnFiltros} onPress={() => setCidadeFiltro("")}>
            <Ionicons name="funnel" size={12} color="#fff" />
            <Text style={styles.btnFiltrosText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conteudoBranco}>
        {/* TITULO NO CENTRO + SETA SEM BOLA */}
        <View style={styles.tituloRowCentro}>
          <TouchableOpacity onPress={() => router.back()} style={styles.btnVoltarNovo}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.tituloCentro}>
            <Text style={styles.titulo}>Aluguéis Disponíveis</Text>
            <LinhaLaranja width={115} />
          </View>

          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.resultadoTexto}>
          {imoveisFiltrados.length} encontrados em {cidadeFiltro || "todas as cidades"}
        </Text>

        <FlatList
          data={imoveisFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderCard}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20, gap: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <MenuDrawer visible={menuVisible} onClose={fecharMenu} onOpen={abrirMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B5FFF" },
  topo: { backgroundColor: "#0B5FFF", paddingHorizontal: 14, paddingBottom: 12 },
  topoLogoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  logoCentroWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoTopo: { width: 175, height: 42 },
  hamburgerTopo: { width: 28, height: 28, justifyContent: "center", gap: 5, alignItems: "flex-start" },
  hLine: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },

  filtrosRow: { flexDirection: "row", gap: 8, marginTop: 12, alignItems: "center" },
  filtroLocal: { flex: 1, backgroundColor: "#fff", height: 42, borderRadius: 20, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 6 },
  filtroLabel: { fontSize: 7, color: "#888" },
  filtroInput: { fontSize: 11, fontWeight: "700", color: "#000", paddingVertical: 0, marginTop: -2 },
  btnFiltros: { backgroundColor: "#0B5FFF", borderWidth: 1, borderColor: "#fff", height: 32, paddingHorizontal: 14, borderRadius: 20, flexDirection: "row", alignItems: "center", gap: 4 },
  btnFiltrosText: { color: "#fff", fontSize: 11, fontWeight: "600" },

  conteudoBranco: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: 4, paddingTop: 12 },

  // NOVO - CENTRO
  tituloRowCentro: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, marginBottom: 8 },
  btnVoltarNovo: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  tituloCentro: { flex: 1, alignItems: "center", justifyContent: "center" },
  titulo: { fontSize: 15, fontWeight: "800", color: "#000", textAlign: "center" },
  resultadoTexto: { fontSize: 10, color: "#777", marginLeft: 14, marginBottom: 8 },
  // CARDS CINZA MEIO ESCURO
  card: { flex: 1, backgroundColor: "#969393", borderRadius: 10, borderWidth: 1, borderColor: "#2A2A2A", overflow: "hidden", paddingBottom: 8 },
  cardImg: { width: "100%", height: 90 },
  cardPreco: { color: "#FF8C00", fontWeight: "800", fontSize: 12, marginTop: 5, marginLeft: 6 },
  cardTitulo: { fontSize: 10, fontWeight: "600", color: "#fff", marginLeft: 6, marginTop: 1 },
  cardLocalRow: { flexDirection: "row", alignItems: "center", gap: 2, marginLeft: 6, marginTop: 2 },
  cardLocal: { fontSize: 7, color: "#FF8C00", fontWeight: "500" },
  cardInfoRow: { flexDirection: "row", gap: 6, marginLeft: 6, marginTop: 6 },
  cardInfoItem: { flexDirection: "row", alignItems: "center", gap: 2 },
  cardInfoText: { fontSize: 6, color: "#fff" },
});