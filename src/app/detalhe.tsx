import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";

export default function DetalheImovel() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);

  const params = useLocalSearchParams<{
    id?: string | string[];
    nome?: string | string[];
    local?: string | string[];
    valor?: string | string[];
    quartos?: string | string[];
    tipo?: string | string[];
    img?: string | string[];
  }>();

  function pegarParametro(parametro?: string | string[]): string {
    return Array.isArray(parametro)
      ? parametro[0] ?? ""
      : parametro ?? "";
  }

  const id = pegarParametro(params.id);
  const nome = pegarParametro(params.nome);
  const local = pegarParametro(params.local);
  const valor = pegarParametro(params.valor);
  const quartosParam = pegarParametro(params.quartos);
  const tipo = pegarParametro(params.tipo);
  const img = pegarParametro(params.img);

  // Cores do tema
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    fundoCard: dark ? "#1E1E1E" : "#FFFFFF",
    fundoSecundario: dark ? "#292929" : "#F4F6F9",
    fundoCaracteristica: dark ? "#202D46" : "#EBF1FF",
    texto: dark ? "#FFFFFF" : "#000000",
    textoSecundario: dark ? "#CCCCCC" : "#555555",
    textoFraco: dark ? "#AAAAAA" : "#777777",
    borda: dark ? "#3A3A3A" : "#EAEAEA",
    azul: "#0B5FFF",
    laranja: "#FF8C00",
    azulTopo: "#448AFF",
    verde: "#25D366",
  };

  const styles = criarEstilos(cores);

  // Formatação do preço
  const numeroValor = Number(valor);
  const numeroQuartos = Number(quartosParam);

  const precoMensal =
    valor.trim() !== "" &&
    Number.isFinite(numeroValor) &&
    numeroValor >= 0
      ? numeroValor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        })
      : "Consulte";

  const quantidadeQuartos =
    quartosParam.trim() !== "" &&
    Number.isFinite(numeroQuartos) &&
    numeroQuartos >= 0
      ? numeroQuartos
      : null;

  const titulo =
    tipo && nome
      ? `${tipo} - ${nome}`
      : nome || tipo || "Detalhes do imóvel";

  const imagemImovel =
    img ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";

  function abrirMenu() {
    setMenuVisible(true);
  }

  function fecharMenu() {
    setMenuVisible(false);
  }

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)" as any);
    }
  }

  function abrirWhatsApp() {
    Alert.alert(
      "Contato do proprietário",
      "O telefone do proprietário ainda não foi cadastrado para este imóvel."
    );
  }

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* Cabeçalho azul */}
      <View style={styles.topo}>
        <View style={styles.topoLogoRow}>
          <TouchableOpacity
            style={styles.hamburgerTopo}
            onPress={abrirMenu}
            activeOpacity={0.7}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.hLine, { width: 22 }]} />
            <View style={[styles.hLine, { width: 16 }]} />
            <View style={[styles.hLine, { width: 10 }]} />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logoTopo}
            resizeMode="contain"
          />

          <View style={{ width: 28 }} />
        </View>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.conteudoPrincipal}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={voltar}
            activeOpacity={0.7}
            accessibilityLabel="Voltar"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={cores.texto}
            />
          </TouchableOpacity>

          <View style={styles.headerCentro}>
            <Text style={styles.headerTitulo}>
              Detalhes do Imóvel
            </Text>
            <View style={styles.linhaLaranja} />
          </View>

          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Imagem do imóvel */}
          <Image
            source={{ uri: imagemImovel }}
            style={styles.imagemPrincipal}
            resizeMode="cover"
          />

          <View style={styles.conteudo}>
            <Text style={styles.titulo}>{titulo}</Text>

            {/* Localização */}
            <View style={styles.localRow}>
              <Ionicons
                name="location"
                size={17}
                color={cores.laranja}
              />
              <Text style={styles.localText}>
                {local || "Localização não informada"}
              </Text>
            </View>

            {id ? (
              <Text style={styles.codigoImovel}>
                Código do imóvel: {id}
              </Text>
            ) : null}

            {/* Preços */}
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

            {/* Características */}
            <Text style={styles.secaoTitulo}>
              Características
            </Text>

            <View style={styles.caracteristicasRow}>
              <View style={styles.itemBadge}>
                <Ionicons
                  name="bed-outline"
                  size={22}
                  color={cores.azul}
                />
                <Text style={styles.itemBadgeTexto}>
                  {quantidadeQuartos !== null
                    ? `${quantidadeQuartos} ${
                        quantidadeQuartos === 1
                          ? "quarto"
                          : "quartos"
                      }`
                    : "Não informado"}
                </Text>
              </View>

              <View style={styles.itemBadge}>
                <Ionicons
                  name="water-outline"
                  size={22}
                  color={cores.azul}
                />
                <Text style={styles.itemBadgeTexto}>
                  Banheiros não informados
                </Text>
              </View>

              <View style={styles.itemBadge}>
                <Ionicons
                  name="home-outline"
                  size={22}
                  color={cores.azul}
                />
                <Text style={styles.itemBadgeTexto}>
                  {tipo || "Tipo não informado"}
                </Text>
              </View>
            </View>

            {/* Descrição */}
            <Text style={styles.secaoTitulo}>
              Descrição
            </Text>

            <Text style={styles.descricaoText}>
              {nome
                ? `${titulo} localizado em ${
                    local || "localização não informada"
                  }. O imóvel possui ${
                    quantidadeQuartos !== null
                      ? `${quantidadeQuartos} ${
                          quantidadeQuartos === 1
                            ? "quarto"
                            : "quartos"
                        }`
                      : "quantidade de quartos não informada"
                  }. Entre em contato com o anunciante para saber mais sobre as condições de aluguel, os ambientes e as comodidades disponíveis.`
                : "As informações deste imóvel ainda não foram cadastradas."}
            </Text>

            {/* Planta e localização */}
            <Text style={styles.secaoTitulo}>
              Planta / localização do imóvel
            </Text>

            <View style={styles.plantaPlaceholder}>
              <Ionicons
                name="map-outline"
                size={36}
                color={cores.azul}
              />
              <Text style={styles.plantaTexto}>
                A planta ou o mapa detalhado ainda não foi cadastrado.
              </Text>
            </View>

            {/* Proprietário */}
            <Text style={styles.secaoTitulo}>
              Proprietário
            </Text>

            <View style={styles.proprietarioCard}>
              <View style={styles.proprietarioAvatar}>
                <Ionicons
                  name="person-outline"
                  size={25}
                  color={cores.azul}
                />
              </View>

              <View style={styles.proprietarioInfo}>
                <Text style={styles.proprietarioNome}>
                  Anunciante
                </Text>
                <Text style={styles.proprietarioSub}>
                  Dados de contato não cadastrados
                </Text>
              </View>

              <TouchableOpacity
                style={styles.btnWhatsapp}
                onPress={abrirWhatsApp}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="logo-whatsapp"
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.btnWhatsappText}>
                  Contato
                </Text>
              </TouchableOpacity>
            </View>

            {/* Voltar aos imóveis */}
            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={voltar}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.botaoVoltarTexto}>
                Voltar aos imóveis
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Menu lateral */}
      <MenuDrawer
        visible={menuVisible}
        onClose={fecharMenu}
        onOpen={abrirMenu}
      />
    </View>
  );
}

const criarEstilos = (cores: {
  fundo: string;
  fundoCard: string;
  fundoSecundario: string;
  fundoCaracteristica: string;
  texto: string;
  textoSecundario: string;
  textoFraco: string;
  borda: string;
  azul: string;
  laranja: string;
  azulTopo: string;
  verde: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azulTopo,
    },

    topo: {
      backgroundColor: cores.azulTopo,
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
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    conteudoPrincipal: {
      flex: 1,
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      overflow: "hidden",
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
      flex: 1,
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
      color: cores.texto,
      textAlign: "center",
    },

    linhaLaranja: {
      width: 115,
      height: 3,
      backgroundColor: cores.laranja,
      borderRadius: 2,
      marginTop: 4,
    },

    scrollContent: {
      paddingBottom: 35,
    },

    imagemPrincipal: {
      width: "100%",
      height: 230,
      backgroundColor: cores.fundoSecundario,
    },

    conteudo: {
      padding: 16,
    },

    titulo: {
      fontSize: 21,
      fontWeight: "800",
      color: cores.texto,
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
      color: cores.textoSecundario,
    },

    codigoImovel: {
      fontSize: 11,
      color: cores.textoFraco,
      marginTop: 6,
    },

    valoresContainer: {
      flexDirection: "row",
      backgroundColor: cores.fundoSecundario,
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
      backgroundColor: cores.borda,
    },

    valorLabel: {
      fontSize: 11,
      color: cores.textoSecundario,
      fontWeight: "600",
      textAlign: "center",
    },

    valorDestaque: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.laranja,
      marginTop: 5,
      textAlign: "center",
    },

    secaoTitulo: {
      fontSize: 15,
      fontWeight: "700",
      color: cores.texto,
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
      backgroundColor: cores.fundoCaracteristica,
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
      color: cores.azul,
      textAlign: "center",
    },

    descricaoText: {
      fontSize: 13,
      color: cores.textoSecundario,
      lineHeight: 20,
    },

    plantaPlaceholder: {
      minHeight: 115,
      backgroundColor: cores.fundoSecundario,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      padding: 18,
      gap: 8,
    },

    plantaTexto: {
      fontSize: 12,
      color: cores.textoSecundario,
      textAlign: "center",
      lineHeight: 18,
    },

    proprietarioCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.fundoCard,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: cores.borda,
      gap: 10,
    },

    proprietarioAvatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: cores.fundoCaracteristica,
      alignItems: "center",
      justifyContent: "center",
    },

    proprietarioInfo: {
      flex: 1,
    },

    proprietarioNome: {
      fontSize: 14,
      fontWeight: "700",
      color: cores.texto,
    },

    proprietarioSub: {
      fontSize: 10,
      color: cores.textoFraco,
      marginTop: 3,
    },

    btnWhatsapp: {
      backgroundColor: cores.verde,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 9,
      borderRadius: 20,
      gap: 4,
    },

    btnWhatsappText: {
      color: "#FFFFFF",
      fontSize: 11,
      fontWeight: "700",
    },

    botaoVoltar: {
      backgroundColor: cores.azul,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 14,
      borderRadius: 10,
      marginTop: 25,
      gap: 8,
    },

    botaoVoltarTexto: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
    },
  });
