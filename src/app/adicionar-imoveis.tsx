import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Pressable,} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function AdicionarImovelScreen() {
  const insets = useSafeAreaInsets();
  const [tipo, setTipo] = useState("Apartamento");
  const [destaques, setDestaques] = useState<string[]>([]);
  const toggleDestaque = (item: string) => { setDestaques((prev) => prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]);};
  const tipos = [
    { label: "Apartamento", icon: "home" },
    { label: "Casa", icon: "house" },
    { label: "Kitnet", icon: "bed" },
    { label: "Cobertura", icon: "apartment" },
  ];
  const destaquesLista = [
    "Mobiliado", "Varanda", "Elevador", "Garagem",
    "Piscina", "Portaria 24h", "Academia", "Ar condic."
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </Pressable>
        <Image source={require("../../assets/images/buscalar_logo_transparent.png")} style={styles.logo} resizeMode="contain"/>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.whiteCard} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* TITULO */}
        <View style={styles.titleRow}>
          <View style={styles.homeIcon}>
            <Ionicons name="home" size={28} color="black" />
          </View>
          <View>
            <Text style={styles.title}>Adicionar Imóvel</Text>
            <Text style={styles.subtitle}>Preencha as informações abaixo para anunciar seu imóvel</Text>
          </View>
        </View>

        {/* TIPO DE IMOVEL */}
        <Text style={styles.label}>Tipo de Imóvel</Text>
        <View style={styles.chipRow}>
          {tipos.map((t) => (
            <TouchableOpacity
              key={t.label}
              onPress={() => setTipo(t.label)}
              style={[styles.chip, tipo === t.label && styles.chipActive]}
            >
              <MaterialIcons name={t.icon as any} size={14} color={tipo === t.label ? "black" : "#555"} />
              <Text style={[styles.chipText, tipo === t.label && styles.chipTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FINALIDADE */}
        <Text style={styles.label}>Finalidade</Text>
        <TouchableOpacity style={[styles.chip, styles.chipActive, { width: 100 }]}>
          <Ionicons name="search" size={14} />
          <Text style={styles.chipTextActive}>Aluguel</Text>
        </TouchableOpacity>

        {/* GRID CIDADE/BAIRRO/ENDERECO/TAMANHO */}
        <View style={styles.row2}>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Cidade</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Maceio" style={styles.input} placeholderTextColor="#888" />
              <Ionicons name="chevron-down" size={16} color="#888" />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Bairro</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Selecione o bairro" style={styles.input} placeholderTextColor="#888" />
              <Ionicons name="chevron-down" size={16} color="#888" />
            </View>
          </View>
        </View>

        <View style={styles.row2}>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Endereço</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Ex: Rua dos palmares" style={styles.input} placeholderTextColor="#888" />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Tamanho</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Ex: 62" style={styles.input} placeholderTextColor="#888" />
            </View>
          </View>
        </View>

        <View style={styles.row3}>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Valor do aluguel</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Ex: 2000" style={styles.input} placeholderTextColor="#888" />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Quartos</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Selecione" style={styles.input} placeholderTextColor="#888" />
              <Ionicons name="chevron-down" size={16} color="#888" />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Banheiro</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Selecione" style={styles.input} placeholderTextColor="#888" />
              <Ionicons name="chevron-down" size={16} color="#888" />
            </View>
          </View>
        </View>

        {/* DESTAQUE */}
        <Text style={styles.label}>Destaque do imóvel</Text>
        <View style={styles.destaqueGrid}>
          {destaquesLista.map((item) => {
            const ativo = destaques.includes(item);
            return (
              <TouchableOpacity
                key={item}
                onPress={() => toggleDestaque(item)}
                style={[styles.destaqueChip, ativo && styles.destaqueChipActive]}
              >
                <View style={[styles.checkBox, ativo && styles.checkBoxActive]}>
                  {ativo && <Ionicons name="checkmark" size={12} color="black" />}
                </View>
                <Text style={styles.destaqueText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DESCRICAO */}
        <Text style={styles.label}>Descrição</Text>
        <View style={[styles.inputBox, { height: 90, alignItems: "flex-start", paddingTop: 10 }]}>
          <TextInput
            placeholder="Conte um pouco sobre o imóvel, como características, localização, diferenciais, etc..."
            multiline
            style={[styles.input, { height: "100%" }]}
            placeholderTextColor="#888"
          />
        </View>

        {/* FOTOS */}
        <Text style={styles.label}>Fotos do imóvel</Text>
        <View style={styles.fotosRow}>
          <TouchableOpacity style={styles.fotoAddBox}>
            <Ionicons name="camera" size={28} color="#333" />
            <Text style={styles.fotoAddText}>Adicionar fotos</Text>
            <Text style={styles.fotoAddSub}>Toque para selecionar ou tire uma foto</Text>
          </TouchableOpacity>
          <View style={styles.fotoPreview}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" }}
              style={styles.fotoImg}
            />
            <TouchableOpacity style={styles.fotoClose}>
              <Ionicons name="close" size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dicaBox}>
          <Text style={styles.dicaText}>Dica: Use boas fotos e uma descrição completa para atrair mais interessados!</Text>
        </View>

        <TouchableOpacity style={styles.btnSalvar} activeOpacity={0.8}>
          <Text style={styles.btnSalvarText}>Salvar Imóvel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white" 
},
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
  },
backBtn: { 
    padding: 4 
},
  logo: { 
    width: 200, 
    height: 90 
},
  whiteCard: { flex: 1, backgroundColor: "white", paddingHorizontal: 16 },
  titleRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginTop: 10, marginBottom: 16 },
  homeIcon: { marginTop: 2 },
  title: { fontSize: 20, fontWeight: "800", color: "black" },
  subtitle: { fontSize: 11, color: "#666", marginTop: 2, width: 260 },
  label: { fontSize: 13, fontWeight: "700", color: "black", marginTop: 14, marginBottom: 8 },
  chipRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#E6F0FF",
    borderWidth: 1,
    borderColor: "#E6F0FF",
  },
  chipActive: { backgroundColor: "#E6F0FF", borderColor: "#2196F3" },
  chipText: { fontSize: 12, color: "#555", fontWeight: "500" },
  chipTextActive: { fontSize: 12, color: "black", fontWeight: "700" },

  row2: { flexDirection: "row", gap: 10, marginTop: 10 },
  row3: { flexDirection: "row", gap: 8, marginTop: 10 },
  col: { flex: 1 },
  inputLabel: { fontSize: 11, fontWeight: "600", color: "black", marginBottom: 4 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 36,
    backgroundColor: "white",
  },
  input: { flex: 1, fontSize: 12, color: "black" },

  destaqueGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  destaqueChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "white",
    width: "48%",
  },
  destaqueChipActive: { borderColor: "#2196F3", backgroundColor: "#E6F0FF" },
  checkBox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checkBoxActive: { backgroundColor: "white", borderColor: "black" },
  destaqueText: { fontSize: 11, color: "black", fontWeight: "500" },

  fotosRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  fotoAddBox: {
    width: 140,
    height: 110,
    borderWidth: 1,
    borderColor: "#2196F3",
    borderStyle: "dashed",
    borderRadius: 8,
    backgroundColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  fotoAddText: { fontSize: 11, fontWeight: "700", color: "black", marginTop: 4 },
  fotoAddSub: { fontSize: 8, color: "#666", textAlign: "center", marginTop: 2 },
  fotoPreview: { width: 140, height: 110, borderRadius: 8, overflow: "hidden", position: "relative" },
  fotoImg: { width: "100%", height: "100%" },
  fotoClose: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  dicaBox: {
    backgroundColor: "#E6F0FF",
    borderRadius: 6,
    padding: 10,
    marginTop: 16,
  },
  dicaText: { fontSize: 11, color: "#2A5DB0", textAlign: "center" },

  btnSalvar: {
    backgroundColor: "#FF8C00",
    borderRadius: 20,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btnSalvarText: { color: "white", fontWeight: "800", fontSize: 14 },
});