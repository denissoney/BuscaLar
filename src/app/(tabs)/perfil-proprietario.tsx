
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import MenuDrawer from "../componets/MenuDrawer";
export default function PerfilProprietario() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const cores = {
    fundo: dark ? "#121212" : "#F5F5F5",
    card: dark ? "#1E1E1E" : "#FFFFFF",
    cardSecundario: dark ? "#252525" : "#F9F9F9",
    cardImovel: dark ? "#2B2B2B" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#555555",
    textoFraco: dark ? "#999999" : "#777777",
    borda: dark ? "#383838" : "#EEEEEE",
    separador: dark ? "#383838" : "#F0F0F0",
    estatisticas: dark ? "#303030" : "#E5E5E5",
    azul: "#1A5CFF",
    laranja: "#FF8C00",
    branco: "#FFFFFF",
  };

  function irPara(rota: string) {
    setMenuVisible(false);
    setTimeout(() => {
      router.push(rota as any);
    }, 260);
  }

  function abrirMenu() {
    setMenuVisible(true);
  }

  function fecharMenu() {
    setMenuVisible(false);
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: cores.fundo,
          paddingTop: insets.top,
        },
      ]}
    >
      {/* MENU HAMBÚRGUER */}
      <View style={styles.hamburguerFora}>
        <TouchableOpacity
          style={styles.hamburger}
          onPress={abrirMenu}
          activeOpacity={0.7}
          accessibilityLabel="Abrir menu"
        >
          <View
            style={[
              styles.hamburgerLine,
              { width: 18, backgroundColor: cores.texto },
            ]}
          />
          <View
            style={[
              styles.hamburgerLine,
              { width: 12, backgroundColor: cores.texto },
            ]}
          />
          <View
            style={[
              styles.hamburgerLine,
              { width: 7, backgroundColor: cores.texto },
            ]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* CARTÃO DO PERFIL */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: cores.card,
              shadowColor: dark ? "#000000" : "#000000",
              borderColor: cores.borda,
            },
          ]}
        >
          <View
            style={[
              styles.tituloPerfilRow,
              { borderBottomColor: cores.separador },
            ]}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.setaVoltar}
              activeOpacity={0.7}
              accessibilityLabel="Voltar"
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={cores.texto}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.headerTitle,
                { color: cores.texto },
              ]}
            >
              PERFIL DO PROPRIETÁRIO
            </Text>
          </View>

          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            style={styles.avatar}
          />

          <Text style={[styles.nome, { color: cores.texto }]}>
            Davi Miguel
          </Text>

          <View style={[styles.badge, { backgroundColor: cores.laranja }]}>
            <Text style={styles.badgeText}>Proprietário</Text>
          </View>

          <View style={styles.locationRow}>
            <Ionicons
              name="location"
              size={14}
              color={cores.textoSecundario}
            />
            <Text
              style={[
                styles.locationText,
                { color: cores.textoSecundario },
              ]}
            >
              Maceió-AL
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>★★★★★</Text>
            <Text
              style={[
                styles.ratingText,
                { color: cores.textoSecundario },
              ]}
            >
              4.9 - 28 avaliações
            </Text>
          </View>

          {/* ESTATÍSTICAS */}
          <View
            style={[
              styles.statsRow,
              { backgroundColor: cores.estatisticas },
            ]}
          >
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={[styles.statLabel, { color: cores.texto }]}>
                Imóveis
              </Text>
            </View>

            <View
              style={[
                styles.statDivider,
                { backgroundColor: cores.borda },
              ]}
            />

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={[styles.statLabel, { color: cores.texto }]}>
                Resposta
              </Text>
            </View>

            <View
              style={[
                styles.statDivider,
                { backgroundColor: cores.borda },
              ]}
            />

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2h</Text>
              <Text style={[styles.statLabel, { color: cores.texto }]}>
                Média
              </Text>
              <Text
                style={[
                  styles.statSubLabel,
                  { color: cores.textoFraco },
                ]}
              >
                Tempo de resposta
              </Text>
            </View>
          </View>

          {/* ADICIONAR IMÓVEL */}
          <TouchableOpacity
            style={styles.btnAdicionar}
            onPress={() => irPara("/adicionar-imoveis")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={cores.branco}
            />
            <Text style={styles.btnAdicionarText}>
              Adicionar Imóvel
            </Text>
          </TouchableOpacity>
        </View>

        {/* SOBRE */}
        <View style={styles.sobreContainer}>
          <Text style={[styles.sobreTitle, { color: cores.texto }]}>
            Sobre
          </Text>
          <View style={styles.linhaAzul} />

          <Text
            style={[
              styles.sobreText,
              { color: cores.textoSecundario },
            ]}
          >
            Proprietário parceiro desde 2021. Comprometido em oferecer
            imóveis bem cuidados e atendimento rápido aos inquilinos.
            Sempre disponível para dúvidas e suporte.
          </Text>
        </View>

        {/* IMÓVEIS E AVALIAÇÕES */}
        <View
          style={[
            styles.caixaImoveis,
            {
              backgroundColor: cores.cardSecundario,
              borderColor: cores.borda,
            },
          ]}
        >
          <View style={styles.imoveisHeader}>
            <Text
              style={[
                styles.imoveisTitle,
                { color: cores.texto },
              ]}
            >
              Meus Imóveis
            </Text>

            <TouchableOpacity
              onPress={() => irPara("/meus-imoveis")}
              activeOpacity={0.7}
            >
              <Text style={styles.verTodos}>Ver todos (3) &gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 8 }}
          >
            {/* IMÓVEL 1 */}
            <TouchableOpacity
              style={[
                styles.imovelCard,
                {
                  backgroundColor: cores.cardImovel,
                  borderColor: cores.borda,
                },
              ]}
              activeOpacity={0.85}
              onPress={() => irPara("/meus-imoveis")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
                }}
                style={styles.imovelImg}
              />

              <View style={styles.imovelInfo}>
                <Text
                  style={[
                    styles.imovelNome,
                    { color: cores.texto },
                  ]}
                >
                  • Apartamento Ponta Verde{"\n"}
                  2 quartos - 68m²
                </Text>

                <Text style={styles.imovelPreco}>
                  R$ 1.200/mês
                </Text>
              </View>
            </TouchableOpacity>

            {/* IMÓVEL 2 */}
            <TouchableOpacity
              style={[
                styles.imovelCard,
                {
                  backgroundColor: cores.cardImovel,
                  borderColor: cores.borda,
                },
              ]}
              activeOpacity={0.85}
              onPress={() => irPara("/meus-imoveis")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
                }}
                style={styles.imovelImg}
              />

              <View style={styles.imovelInfo}>
                <Text
                  style={[
                    styles.imovelNome,
                    { color: cores.texto },
                  ]}
                >
                  • Casa Jatiúca{"\n"}
                  2 quartos - 52m²
                </Text>

                <Text style={styles.imovelPreco}>
                  R$ 1.000/mês
                </Text>
              </View>
            </TouchableOpacity>

            {/* IMÓVEL 3 */}
            <TouchableOpacity
              style={[
                styles.imovelCard,
                {
                  backgroundColor: cores.cardImovel,
                  borderColor: cores.borda,
                },
              ]}
              activeOpacity={0.85}
              onPress={() => irPara("/meus-imoveis")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
                }}
                style={styles.imovelImg}
              />

              <View style={styles.imovelInfo}>
                <Text
                  style={[
                    styles.imovelNome,
                    { color: cores.texto },
                  ]}
                >
                  • Apartamento Jatiúca{"\n"}
                  3 quartos - 75m²
                </Text>

                <Text style={styles.imovelPreco}>
                  R$ 1.500/mês
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* AVALIAÇÕES */}
          <View style={styles.avaliacoesContainer}>
            <Text style={[styles.sobreTitle, { color: cores.texto }]}>
              Avaliações
            </Text>
            <View style={styles.linhaAzul} />

            {/* AVALIAÇÃO 1 */}
            <View
              style={[
                styles.avaliacaoCard,
                { backgroundColor: cores.card, borderColor: cores.borda },
              ]}
            >
              <View style={styles.avaliacaoHeader}>
                <View
                  style={[
                    styles.avaliacaoAvatar,
                    { backgroundColor: cores.laranja },
                  ]}
                >
                  <Text style={styles.avaliacaoAvatarText}>R</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.avaliacaoNome,
                      { color: cores.texto },
                    ]}
                  >
                    Rodrigo
                  </Text>
                  <Text style={styles.avaliacaoEstrelas}>★★★★★</Text>
                </View>

                <Text
                  style={[
                    styles.avaliacaoTempo,
                    { color: cores.textoFraco },
                  ]}
                >
                  Há 2 semanas
                </Text>
              </View>

              <Text
                style={[
                  styles.avaliacaoTexto,
                  { color: cores.textoSecundario },
                ]}
              >
                Excelente proprietário! Muito atencioso, respondeu
                rapidamente e o imóvel era exatamente como descrito.
              </Text>
            </View>

            {/* AVALIAÇÃO 2 */}
            <View
              style={[
                styles.avaliacaoCard,
                { backgroundColor: cores.card, borderColor: cores.borda },
              ]}
            >
              <View style={styles.avaliacaoHeader}>
                <View
                  style={[
                    styles.avaliacaoAvatar,
                    { backgroundColor: cores.azul },
                  ]}
                >
                  <Text style={styles.avaliacaoAvatarText}>M</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.avaliacaoNome,
                      { color: cores.texto },
                    ]}
                  >
                    Mariana
                  </Text>
                  <Text style={styles.avaliacaoEstrelas}>★★★★★</Text>
                </View>

                <Text
                  style={[
                    styles.avaliacaoTempo,
                    { color: cores.textoFraco },
                  ]}
                >
                  Há 1 mês
                </Text>
              </View>

              <Text
                style={[
                  styles.avaliacaoTexto,
                  { color: cores.textoSecundario },
                ]}
              >
                Ótimo atendimento e muita transparência durante todo
                o processo. Recomendo!
              </Text>
            </View>
          </View>

          {/* CONTATO */}
          <TouchableOpacity
            style={styles.btnContato}
            activeOpacity={0.8}
            onPress={() => {
              // Adicione aqui a ação de contato desejada.
            }}
          >
            <Ionicons
              name="logo-whatsapp"
              size={21}
              color="#00D95F"
            />
            <Text style={styles.btnContatoText}>
              Entrar em contato
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MenuDrawer
        visible={menuVisible}
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

  hamburguerFora: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },

  hamburger: {
    width: 28,
    height: 28,
    justifyContent: "center",
    gap: 5,
    alignItems: "flex-start",
  },

  hamburgerLine: {
    height: 2.5,
    borderRadius: 2,
  },

  tituloPerfilRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },

  setaVoltar: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  card: {
    marginHorizontal: 8,
    marginTop: 4,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: "center",
  },

  nome: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },

  badge: {
    alignSelf: "center",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 3,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    marginTop: 5,
  },

  locationText: {
    fontSize: 10,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 2,
  },

  stars: {
    color: "#FF8C00",
    fontSize: 11,
  },

  ratingText: {
    fontSize: 10,
  },

  statsRow: {
    minHeight: 56,
    flexDirection: "row",
    borderRadius: 7,
    marginTop: 7,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  statNumber: {
    fontSize: 21,
    fontWeight: "800",
    color: "#1A5CFF",
  },

  statLabel: {
    fontSize: 10,
  },

  statSubLabel: {
    fontSize: 7,
    textAlign: "center",
  },

  statDivider: {
    width: 1,
    height: "70%",
    alignSelf: "center",
  },

  btnAdicionar: {
    minHeight: 42,
    backgroundColor: "#FF8C00",
    marginTop: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  btnAdicionarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  sobreContainer: {
    marginTop: 14,
    marginHorizontal: 12,
  },

  sobreTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  linhaAzul: {
    width: 32,
    height: 3,
    backgroundColor: "#1A5CFF",
    borderRadius: 2,
    marginTop: 4,
    marginBottom: 6,
  },

  sobreText: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },

  caixaImoveis: {
    marginTop: 12,
    marginHorizontal: 8,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  imoveisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imoveisTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  verTodos: {
    fontSize: 10,
    color: "#1A5CFF",
    fontWeight: "600",
  },

  imovelCard: {
    width: 150,
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
  },

  imovelImg: {
    width: "100%",
    height: 85,
  },

  imovelInfo: {
    padding: 8,
  },

  imovelNome: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "500",
  },

  imovelPreco: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FF8C00",
    marginTop: 6,
    textAlign: "center",
  },

  avaliacoesContainer: {
    marginTop: 18,
  },

  avaliacaoCard: {
    marginTop: 8,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    elevation: 1,
  },

  avaliacaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  avaliacaoAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  avaliacaoAvatarText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  avaliacaoNome: {
    fontSize: 11,
    fontWeight: "700",
  },

  avaliacaoEstrelas: {
    fontSize: 10,
    color: "#FF8C00",
  },

  avaliacaoTempo: {
    fontSize: 9,
  },

  avaliacaoTexto: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 7,
  },

  btnContato: {
    minHeight: 44,
    backgroundColor: "#FF8C00",
    marginTop: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  btnContatoText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
