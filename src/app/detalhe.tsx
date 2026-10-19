
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Alert,} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuDrawer from "./componets/MenuDrawer";
// ============================================================
// TELA DE DETALHES DO IMÓVEL
// ============================================================
export default function DetalheImovel() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string | string[];
    nome?: string | string[];
    local?: string | string[];
    valor?: string | string[];
    quartos?: string | string[];
    tipo?: string | string[];
    img?: string | string[];
  }>();

  const [menuVisible, setMenuVisible] = useState(false);
  // Converte os parâmetros da rota para texto.
  // O Expo Router pode receber um parâmetro como string ou array.
  function pegarParametro(
    parametro?: string | string[]
  ): string {
    if (Array.isArray(parametro)) {
      return parametro[0] ?? "";
    }

    return parametro ?? "";
  }

  const id = pegarParametro(params.id);
  const nome = pegarParametro(params.nome);
  const local = pegarParametro(params.local);
  const valor = pegarParametro(params.valor);
  const quartosParam = pegarParametro(params.quartos);
  const tipo = pegarParametro(params.tipo);
  const img = pegarParametro(params.img);
  // ============================================================
  // DADOS RECEBIDOS DA HOME
  // ============================================================
  const numeroValor = Number(valor);
  const numeroQuartos = Number(quartosParam);
  const precoMensal = valor !== "" && Number.isFinite(numeroValor)
      ? numeroValor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        })
      : "Consulte";

  const quantidadeQuartos = quartosParam !== "" && Number.isFinite(numeroQuartos)
      ? numeroQuartos
      : null;
  const titulo = tipo && nome
      ? `${tipo} - ${nome}`
      : nome || tipo || "Detalhes do imóvel";
  const imagemImovel = img ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";
  // ============================================================
  // MENU
  // ============================================================
  function abrirMenu() {
    setMenuVisible(true);
  }

  function fecharMenu() {
    setMenuVisible(false);
  }
  // ============================================================
  // VOLTAR
  // ============================================================
  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)" as any);
    }
  }
  // ============================================================
  // CONTATO
  // ============================================================
  async function abrirWhatsApp() {
    Alert.alert(
      "Contato do proprietário",
      "O telefone do proprietário ainda não foi cadastrado para este imóvel."
    );
  }
  // ============================================================
  // TELA
  // ============================================================
  return (
    <View style={[ styles.container, { paddingTop: insets.top },]}>
      {/* TOPO AZUL */}
      <View style={styles.topo}>
        <View style={styles.topoLogoRow}>
          <TouchableOpacity style={styles.hamburgerTopo} onPress={abrirMenu} activeOpacity={0.7}>
            <View style={[styles.hLine, { width: 22 }]} />
            <View style={[styles.hLine, { width: 16 }]} />
            <View style={[styles.hLine, { width: 10 }]} />
          </TouchableOpacity>
          <Image source={require("/home/usuario/Desktop/BuscaLar/assets/images/BuscaLar-preto.png")} style={styles.logoTopo} resizeMode="contain"/>
          <View style={{ width: 28 }} />
        </View>
      </View>
      {/* CONTEÚDO BRANCO */}
      <View style={styles.conteudoBranco}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnVoltar} onPress={voltar} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#000"/>
          </TouchableOpacity>

          <View style={styles.headerCentro}>
            <Text style={styles.headerTitulo}>
              Detalhes do Imóvel
            </Text>

            <View style={styles.linhaLaranja} />
          </View>

          <View style={{ width: 32 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* IMAGEM DO IMÓVEL */}
          <Image source={{ uri: imagemImovel }} style={styles.imagemPrincipal} resizeMode="cover"/>
          <View style={styles.conteudo}>
            {/* TÍTULO */}
            <Text style={styles.titulo}>
              {titulo}
            </Text>
            {/* LOCALIZAÇÃO */}
            <View style={styles.localRow}>
              <Ionicons name="location" size={17} color="#FF8C00"/>
              <Text style={styles.localText}>
                {local || "Localização não informada"}
              </Text>
            </View>
            {/* IDENTIFICAÇÃO */}
            {id ? (
              <Text style={styles.codigoImovel}>
                Código do imóvel: {id}
              </Text>
            ) : null}
            {/* PREÇOS */}
            <View style={styles.valoresContainer}>
              <View style={styles.valorCard}>
                <Text style={styles.valorLabel}>
                  Aluguel mensal
                </Text>

                <Text style={styles.valorDestaque}>
                  {precoMensal}
                </Text>
              </View>

              <View style={styles.divisorVertical} />
              <View style={styles.valorCard}>
                <Text style={styles.valorLabel}>
                  Aluguel por diária
                </Text>

                <Text style={styles.valorDestaque}>
                  Consulte
                </Text>
              </View>
            </View>
            {/* CARACTERÍSTICAS */}
            <Text style={styles.secaoTitulo}>
              Características
            </Text>

            <View style={styles.caracteristicasRow}>
              <View style={styles.itemBadge}>
                <Ionicons name="bed-outline" size={22} color="#0B5FFF"/>
                <Text style={styles.itemBadgeTexto}>
                  {quantidadeQuartos !== null ? `${quantidadeQuartos} ${ quantidadeQuartos === 1
                          ? "quarto"
                          : "quartos"
                      }`
                    : "Não informado"}
                </Text>
              </View>

              <View style={styles.itemBadge}>
                <Ionicons name="water-outline" size={22} color="#0B5FFF"/>
                <Text style={styles.itemBadgeTexto}>
                  Banheiros não informados
                </Text>
              </View>

              <View style={styles.itemBadge}>
                <Ionicons name="home-outline" size={22} color="#0B5FFF"/>
                <Text style={styles.itemBadgeTexto}>
                  {tipo || "Tipo não informado"}
                </Text>
              </View>
            </View>

            {/* DESCRIÇÃO */}

            <Text style={styles.secaoTitulo}>
              Descrição
            </Text>

            <Text style={styles.descricaoText}>
              {nome ? `${titulo} localizado em ${ local || "localização não informada" }. O imóvel possui ${ quantidadeQuartos !== null ? `${quantidadeQuartos} ${ quantidadeQuartos === 1
                            ? "quarto"
                            : "quartos"
                        }`
                      : "quantidade de quartos não informada"
                  }. Entre em contato com o anunciante para saber mais sobre as condições de aluguel, os ambientes e as comodidades disponíveis.`
                : "As informações deste imóvel ainda não foram cadastradas."}
            </Text>

            {/* PLANTA / LOCALIZAÇÃO */}

            <Text style={styles.secaoTitulo}>
              Planta / localização do imóvel
            </Text>

            <View style={styles.plantaPlaceholder}>
              <Ionicons name="map-outline" size={36} color="#0B5FFF"/>
              <Text style={styles.plantaTexto}>
                A planta ou o mapa detalhado ainda não foi cadastrado.
              </Text>
            </View>

            {/* PROPRIETÁRIO */}

            <Text style={styles.secaoTitulo}>
              Proprietário
            </Text>

            <View style={styles.proprietarioCard}>
              <View style={styles.proprietarioAvatar}>
                <Ionicons name="person-outline" size={25} color="#0B5FFF"/>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.proprietarioNome}>
                  Anunciante
                </Text>

                <Text style={styles.proprietarioSub}>
                  Dados de contato não cadastrados
                </Text>
              </View>

              <TouchableOpacity style={styles.btnWhatsapp} onPress={abrirWhatsApp} activeOpacity={0.8}>
                <Ionicons name="logo-whatsapp" size={18} color="#fff"/>
                <Text style={styles.btnWhatsappText}>
                  Contato
                </Text>
              </TouchableOpacity>
            </View>

            {/* BOTÃO VOLTAR */}

            <TouchableOpacity style={styles.botaoVoltar} onPress={voltar} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={18} color="#fff"/>
              <Text style={styles.botaoVoltarTexto}>
                Voltar aos imóveis
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* MENU LATERAL */}

      <MenuDrawer visible={menuVisible} onClose={fecharMenu} onOpen={abrirMenu}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#448aff",
  },

  topo: {
    backgroundColor: "#448aff",
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
    height: 85,
  },

  hamburgerTopo: {
    width: 28,
    height: 35,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
  },

  hLine: {
    height: 2.5,
    backgroundColor: "#fff",
    borderRadius: 2,
  },

  conteudoBranco: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },

  headerCentro: {
    alignItems: "center",
  },

  btnVoltar: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitulo: {
    fontSize: 15,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
  },

  linhaLaranja: {
    width: 115,
    height: 3,
    backgroundColor: "#FF8C00",
    borderRadius: 2,
    marginTop: 4,
  },

  scrollContent: {
    paddingBottom: 35,
  },

  imagemPrincipal: {
    width: "100%",
    height: 230,
    backgroundColor: "#eee",
  },

  conteudo: {
    padding: 16,
  },

  titulo: {
    fontSize: 21,
    fontWeight: "800",
    color: "#000",
  },

  localRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },

  localText: {
    flex: 1,
    fontSize: 13,
    color: "#666",
  },

  codigoImovel: {
    fontSize: 11,
    color: "#888",
    marginTop: 6,
  },

  valoresContainer: {
    flexDirection: "row",
    backgroundColor: "#F4F6F9",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginTop: 18,
    alignItems: "center",
  },

  valorCard: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },

  divisorVertical: {
    width: 1,
    height: 42,
    backgroundColor: "#DDD",
  },

  valorLabel: {
    fontSize: 11,
    color: "#777",
    fontWeight: "600",
    textAlign: "center",
  },

  valorDestaque: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF8C00",
    marginTop: 5,
    textAlign: "center",
  },

  secaoTitulo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginTop: 22,
    marginBottom: 10,
  },

  caracteristicasRow: {
    flexDirection: "row",
    gap: 8,
  },

  itemBadge: {
    flex: 1,
    minHeight: 85,
    backgroundColor: "#EBF1FF",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  itemBadgeTexto: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0B5FFF",
    textAlign: "center",
  },

  descricaoText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },

  plantaPlaceholder: {
    minHeight: 115,
    backgroundColor: "#F4F6F9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    gap: 8,
  },

  plantaTexto: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },

  proprietarioCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    gap: 10,
  },

  proprietarioAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EBF1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  proprietarioNome: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },

  proprietarioSub: {
    fontSize: 10,
    color: "#777",
    marginTop: 3,
  },

  btnWhatsapp: {
    backgroundColor: "#25D366",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 4,
  },

  btnWhatsappText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  botaoVoltar: {
    backgroundColor: "#0B5FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
    gap: 8,
  },

  botaoVoltarTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
