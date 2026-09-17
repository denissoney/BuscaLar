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
import { useRouter } from "expo-router";

const IMOVEIS = [
  {
    id: "1",
    preco: "R$ 1.000/mês",
    titulo: "Apartamento 2 quartos",
    local: "Barra de São Miguel, AL",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
  },
  {
    id: "2",
    preco: "R$ 1.000/mês",
    titulo: "Apartamento 2 quartos",
    local: "Barra de São Miguel, AL",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
  },
  {
    id: "3",
    preco: "R$ 1.500/mês",
    titulo: "Apartamento 2 quartos",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500",
  },
  {
    id: "4",
    preco: "R$ 2.000/mês",
    titulo: "Apartamento 2 quartos",
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
  const [cidadeFiltro, setCidadeFiltro] = useState("Barra de São Miguel");

  const imoveisFiltrados = useMemo(() => {
    if (!cidadeFiltro.trim()) return IMOVEIS;
    return IMOVEIS.filter((item) =>
      item.local.toLowerCase().includes(cidadeFiltro.toLowerCase())
    );
  }, [cidadeFiltro]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Topo / Header */}
      <View style={styles.topo}>
        <View style={styles.topoLogoRow}>
          <TouchableOpacity
            style={styles.hamburgerTopo}
            onPress={() => router.push("/menu" as any)}
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

        {/* Filtros */}
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
          </View>
          <TouchableOpacity
            style={styles.btnFiltros}
            onPress={() => setCidadeFiltro("")}
          >
            <Text style={styles.btnFiltrosText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.conteudoBranco}>
        <View style={styles.tituloRowCentro}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.btnVoltarNovo}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.tituloCentro}>
            <Text style={styles.titulo}>Aluguéis Disponíveis</Text>
            <LinhaLaranja width={115} />
          </View>
          <View style={{ width: 28 }} />
        </View>

        {/* Lista de Imóveis */}
        <FlatList
          data={imoveisFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingBottom: 20,
            gap: 10,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => {
                router.push({
                  pathname: "/detalhe",
                  params: { id: item.id },
                } as any);
              }}
            >
              <Image source={{ uri: item.img }} style={styles.cardImg} />
              <Text style={styles.cardPreco}>{item.preco}</Text>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <View style={styles.cardLocalRow}>
                <Ionicons name="location" size={9} color="#FF8C00" />
                <Text style={styles.cardLocal}>{item.local}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B5FFF" },
  topo: { backgroundColor: "#0B5FFF", paddingHorizontal: 14, paddingBottom: 12 },
  topoLogoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  logoTopo: { width: 175, height: 42 },
  hLine: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  hamburgerTopo: { width: 28, height: 28, justifyContent: "center", gap: 5 },
  filtrosRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    alignItems: "center",
  },
  filtroLocal: {
    flex: 1,
    backgroundColor: "#fff",
    height: 42,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 6,
  },
  filtroLabel: { fontSize: 7, color: "#888" },
  filtroInput: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000",
    paddingVertical: 0,
  },
  btnFiltros: {
    backgroundColor: "#0B5FFF",
    borderWidth: 1,
    borderColor: "#fff",
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: "center",
  },
  btnFiltrosText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  conteudoBranco: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 8,
  },
  btnVoltarNovo: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  tituloCentro: { flex: 1, alignItems: "center" },
  titulo: { fontSize: 15, fontWeight: "800", color: "#000", textAlign: "center" },
  card: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    overflow: "hidden",
    paddingBottom: 8,
  },
  cardImg: { width: "100%", height: 90 },
  cardPreco: {
    color: "#FF8C00",
    fontWeight: "800",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 6,
  },
  cardTitulo: { fontSize: 10, fontWeight: "600", color: "#fff", marginLeft: 6 },
  cardLocalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginLeft: 6,
    marginTop: 2,
  },
  cardLocal: { fontSize: 7, color: "#FF8C00" },
});