import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Dados mockados completos
export const IMOVEIS_DATA = [
  {
    id: "1",
    titulo: "Apartamento 2 quartos",
    local: "Barra de São Miguel, AL",
    precoMensal: "R$ 1.000",
    precoDiario: "R$ 150",
    quartos: 2,
    banheiros: 1,
    area: "58m²",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    mapaPlantaImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    descricao: "Excelente apartamento totalmente mobiliado, localizado a poucos metros da praia. Ambientes amplos e bem ventilados.",
    proprietario: {
      nome: "Carlos Silva",
      telefone: "5582999999999",
      foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
    },
  },
  {
    id: "2",
    titulo: "Apartamento 2 quartos",
    local: "Barra de São Miguel, AL",
    precoMensal: "R$ 1.000",
    precoDiario: "R$ 140",
    quartos: 2,
    banheiros: 2,
    area: "62m²",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    mapaPlantaImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    descricao: "Apartamento aconchegante, ideal para temporadas ou contrato anual. Condomínio fechado com segurança.",
    proprietario: {
      nome: "Maria Oliveira",
      telefone: "5582988888888",
      foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
  },
  {
    id: "3",
    titulo: "Apartamento 2 quartos",
    local: "Ponta Verde, Maceió, AL",
    precoMensal: "R$ 1.500",
    precoDiario: "R$ 200",
    quartos: 2,
    banheiros: 1,
    area: "65m²",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    mapaPlantaImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    descricao: "Localização privilegiada no coração da Ponta Verde. Próximo a supermercados, farmácias e a 2 quadras da orla.",
    proprietario: {
      nome: "João Pedro",
      telefone: "5582977777777",
      foto: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200",
    },
  },
  {
    id: "4",
    titulo: "Apartamento 2 quartos",
    local: "Jatiúca, Maceió, AL",
    precoMensal: "R$ 2.000",
    precoDiario: "R$ 250",
    quartos: 2,
    banheiros: 2,
    area: "70m²",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    mapaPlantaImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    descricao: "Apartamento alto padrão na Jatiúca. Varanda com vista ampla, armários embutidos e vaga de garagem inclusa.",
    proprietario: {
      nome: "Ana Souza",
      telefone: "5582966666666",
      foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
    },
  },
];

function LinhaLaranja({ width = 95 }: { width?: number }) {
  return <View style={{ width, height: 3, backgroundColor: "#FF8C00", borderRadius: 2, marginTop: 4 }} />;
}

export default function DetalheImovel() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const imovel = IMOVEIS_DATA.find((item) => item.id === id) || IMOVEIS_DATA[0];

  const abrirWhatsApp = () => {
    const mensagem = `Olá ${imovel.proprietario.nome}, vi o anúncio do "${imovel.titulo}" no BuscaLar e gostaria de mais informações!`;
    Linking.openURL(`https://wa.me/${imovel.proprietario.telefone}?text=${encodeURIComponent(mensagem)}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* CAIXA AZUL COM LOGO - PADRÃO DAS OUTRAS TELAS */}
      <View style={styles.topo}>
        <View style={styles.topoLogoRow}>
          <TouchableOpacity style={styles.hamburgerTopo} onPress={() => router.push("/menu" as any)}>
            <View style={[styles.hLine, { width: 18 }]} />
            <View style={[styles.hLine, { width: 12 }]} />
            <View style={[styles.hLine, { width: 7 }]} />
          </TouchableOpacity>
          <Image source={require("../assets/images/BuscaLar-preto.png")} style={styles.logoTopo} resizeMode="contain" />
          <View style={{ width: 28 }} />
        </View>
      </View>

      <View style={styles.conteudoBranco}>
        {/* Header interno branco com voltar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitulo}>Detalhes do Imóvel</Text>
            <LinhaLaranja width={115} />
          </View>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Imagem Principal */}
          <Image source={{ uri: imovel.img }} style={styles.imagemPrincipal} />

          <View style={styles.conteudo}>
            {/* Título e Localização */}
            <Text style={styles.titulo}>{imovel.titulo}</Text>
            <View style={styles.localRow}>
              <Ionicons name="location" size={16} color="#FF8C00" />
              <Text style={styles.localText}>{imovel.local}</Text>
            </View>

            {/* Valores (Mensal e Diário) */}
            <View style={styles.valoresContainer}>
              <View style={styles.valorCard}>
                <Text style={styles.valorLabel}>Aluguel Mensal</Text>
                <Text style={styles.valorDestaque}>{imovel.precoMensal}<Text style={styles.valorSub}>/mês</Text></Text>
              </View>
              <View style={styles.divisorVertical} />
              <View style={styles.valorCard}>
                <Text style={styles.valorLabel}>Diária</Text>
                <Text style={styles.valorDestaque}>{imovel.precoDiario}<Text style={styles.valorSub}>/dia</Text></Text>
              </View>
            </View>

            {/* Características (Quartos, Banheiros, Área) */}
            <Text style={styles.secaoTitulo}>Características</Text>
            <View style={styles.caracteristicasRow}>
              <View style={styles.itemBadge}>
                <Ionicons name="bed-outline" size={20} color="#0B5FFF" />
                <Text style={styles.itemBadgeTexto}>{imovel.quartos} Quartos</Text>
              </View>
              <View style={styles.itemBadge}>
                <Ionicons name="water-outline" size={20} color="#0B5FFF" />
                <Text style={styles.itemBadgeTexto}>{imovel.banheiros} Banheiros</Text>
              </View>
              <View style={styles.itemBadge}>
                <Ionicons name="square-outline" size={20} color="#0B5FFF" />
                <Text style={styles.itemBadgeTexto}>{imovel.area}</Text>
              </View>
            </View>

            {/* Descrição */}
            <Text style={styles.secaoTitulo}>Descrição</Text>
            <Text style={styles.descricaoText}>{imovel.descricao}</Text>

            {/* Mapa / Planta do Imóvel */}
            <Text style={styles.secaoTitulo}>Planta / Localização do Imóvel</Text>
            <Image source={{ uri: imovel.mapaPlantaImg }} style={styles.mapaImg} resizeMode="cover" />

            {/* Informações do Proprietário */}
            <Text style={styles.secaoTitulo}>Proprietário</Text>
            <View style={styles.proprietarioCard}>
              <Image source={{ uri: imovel.proprietario.foto }} style={styles.proprietarioFoto} />
              <View style={{ flex: 1 }}>
                <Text style={styles.proprietarioNome}>{imovel.proprietario.nome}</Text>
                <Text style={styles.proprietarioSub}>Anunciante verificado</Text>
              </View>
              <TouchableOpacity style={styles.btnWhatsapp} onPress={abrirWhatsApp}>
                <Ionicons name="logo-whatsapp" size={18} color="#fff" />
                <Text style={styles.btnWhatsappText}>Contato</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B5FFF" },
  topo: { backgroundColor: "#0B5FFF", paddingHorizontal: 14, paddingBottom: 12 },
  topoLogoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  logoTopo: { width: 175, height: 42 },
  hLine: { height: 2.5, backgroundColor: "#fff", borderRadius: 2 },
  hamburgerTopo: { width: 28, height: 28, justifyContent: "center", gap: 5 },
  conteudoBranco: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: 4, paddingTop: 12 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 12 },
  btnVoltar: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  headerTitulo: { fontSize: 15, fontWeight: "800", color: "#000", textAlign: "center" },
  scrollContent: { paddingBottom: 30 },
  imagemPrincipal: { width: "100%", height: 220 },
  conteudo: { padding: 16 },
  titulo: { fontSize: 20, fontWeight: "800", color: "#000" },
  localRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  localText: { fontSize: 13, color: "#666" },
  valoresContainer: { flexDirection: "row", backgroundColor: "#F4F6F9", borderRadius: 12, padding: 12, marginTop: 16, alignItems: "center" },
  valorCard: { flex: 1, alignItems: "center" },
  divisorVertical: { width: 1, height: "80%", backgroundColor: "#DDD" },
  valorLabel: { fontSize: 11, color: "#777", fontWeight: "600" },
  valorDestaque: { fontSize: 16, fontWeight: "800", color: "#FF8C00", marginTop: 2 },
  valorSub: { fontSize: 11, fontWeight: "400", color: "#555" },
  secaoTitulo: { fontSize: 14, fontWeight: "700", color: "#000", marginTop: 20, marginBottom: 8 },
  caracteristicasRow: { flexDirection: "row", gap: 10 },
  itemBadge: { flex: 1, backgroundColor: "#EBF1FF", paddingVertical: 10, borderRadius: 8, alignItems: "center", gap: 4 },
  itemBadgeTexto: { fontSize: 11, fontWeight: "700", color: "#0B5FFF" },
  descricaoText: { fontSize: 13, color: "#555", lineHeight: 18 },
  mapaImg: { width: "100%", height: 160, borderRadius: 10, backgroundColor: "#eee" },
  proprietarioCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9F9F9", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#EAEAEA", gap: 10 },
  proprietarioFoto: { width: 46, height: 46, borderRadius: 23 },
  proprietarioNome: { fontSize: 14, fontWeight: "700", color: "#000" },
  proprietarioSub: { fontSize: 10, color: "#777" },
  btnWhatsapp: { backgroundColor: "#25D366", flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 4 },
  btnWhatsappText: { color: "#fff", fontSize: 12, fontWeight: "700" },
});