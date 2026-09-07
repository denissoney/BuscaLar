import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Polygon } from "react-native-svg";
import MenuDrawer from "../componets/MenuDrawer";

const MENSAL = [
  {
    id: "1",
    titulo: "Apartamento 2 quartos",
    preco: "R$ 1.000/mês",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
  },
  {
    id: "2",
    titulo: "Casa com Piscina",
    preco: "R$ 1.300/mês",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    id: "3",
    titulo: "Casa com Piscina",
    preco: "R$ 1.560/mês",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
  },
];

const DIARIAS = [
  {
    id: "1",
    titulo: "Apartamento 2 quartos",
    preco: "R$ 250/Dia",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
  },
  {
    id: "2",
    titulo: "Casa com Piscina",
    preco: "R$ 600/Dia",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    id: "3",
    titulo: "Casa com Piscina",
    preco: "R$ 450/Dia",
    local: "Ponta Verde, Maceió",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
  },
];

export default function Favoritos() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);

  const [aba, setAba] = useState<
    "Mensal" | "Diarias"
  >("Mensal");

  const [mensal, setMensal] =
    useState(MENSAL);

  const [diarias, setDiarias] =
    useState(DIARIAS);

  const lista =
    aba === "Mensal"
      ? mensal
      : diarias;

  function remover(id: string) {
    if (aba === "Mensal") {
      setMensal((prev) =>
        prev.filter((f) => f.id !== id)
      );
    } else {
      setDiarias((prev) =>
        prev.filter((f) => f.id !== id)
      );
    }
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
          paddingTop: insets.top,
        },
      ]}
    >
      {/* TOPO AZUL */}
      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>
          {/* HAMBURGUER */}
          <TouchableOpacity
            style={styles.btnHamburguer}
            onPress={abrirMenu}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.traco,
                {
                  width: 18,
                },
              ]}
            />

            <View
              style={[
                styles.traco,
                {
                  width: 12,
                },
              ]}
            />

            <View
              style={[
                styles.traco,
                {
                  width: 7,
                },
              ]}
            />
          </TouchableOpacity>

          {/* LOGO */}
          <Image
            source={require("../../../assets/images/BuscaLar-preto.png")}
            style={styles.logoImg}
            resizeMode="contain"
          />

          <View
            style={{
              width: 32,
            }}
          />
        </View>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        {/* TÍTULO */}
        <View style={styles.voltarRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.btnVoltar}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color="#000"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.titulo}>
              Favoritos
            </Text>

            <Svg
              height={4}
              width={75}
              style={{
                marginTop: 3,
              }}
            >
              <Polygon
                points="0,0 75,1 75,2 0,4"
                fill="#FF8C00"
              />
            </Svg>
          </View>
        </View>

        {/* ABAS */}
        <View style={styles.abasContainer}>
          <TouchableOpacity
            style={[
              styles.aba,
              aba === "Mensal" &&
                styles.abaAtiva,
            ]}
            onPress={() =>
              setAba("Mensal")
            }
          >
            <Text
              style={[
                styles.abaTexto,
                aba === "Mensal" &&
                  styles.abaTextoAtivo,
              ]}
            >
              Mensal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.aba,
              aba === "Diarias" &&
                styles.abaAtiva,
            ]}
            onPress={() =>
              setAba("Diarias")
            }
          >
            <Text
              style={[
                styles.abaTexto,
                aba === "Diarias" &&
                  styles.abaTextoAtivo,
              ]}
            >
              Diárias
            </Text>
          </TouchableOpacity>
        </View>

        {/* LISTA */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 6,
          }}
        >
          {lista.map((item) => (
            <View
              key={item.id}
              style={[
                styles.card,
                styles.sombra,
              ]}
            >
              <Image
                source={{
                  uri: item.img,
                }}
                style={styles.cardImg}
              />

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitulo}>
                  {item.titulo}
                </Text>

                <Text style={styles.cardPreco}>
                  {item.preco}
                </Text>

                <View
                  style={styles.cardLocalRow}
                >
                  <Ionicons
                    name="location"
                    size={12}
                    color="#000"
                  />

                  <Text
                    style={styles.cardLocal}
                  >
                    {item.local}
                  </Text>
                </View>
              </View>

              {/* CORAÇÃO */}
              <TouchableOpacity
                style={styles.btnHeart}
                onPress={() =>
                  remover(item.id)
                }
              >
                <Ionicons
                  name="heart"
                  size={20}
                  color="#FF8C00"
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* QUANDO NÃO HOUVER FAVORITOS */}
          {lista.length === 0 && (
            <View style={styles.vazio}>
              <Ionicons
                name="heart-outline"
                size={55}
                color="#D0D0D0"
              />

              <Text style={styles.vazioTitulo}>
                Nenhum favorito
              </Text>

              <Text style={styles.vazioTexto}>
                Você ainda não adicionou
                nenhum imóvel aos favoritos.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* MENU LATERAL COMPARTILHADO */}
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
    backgroundColor: "#1A5CFF",
  },

  topoAzul: {
    backgroundColor: "#1A5CFF",
    paddingBottom: 10,
  },

  headerAzul: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  btnHamburguer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    gap: 5,
    alignItems: "flex-start",
  },

  traco: {
    height: 2.8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  logoImg: {
    width: 170,
    height: 38,
  },

  content: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
  },

  voltarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 6,
    marginTop: 6,
  },

  btnVoltar: {
    width: 28,
    height: 28,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
  },

  abasContainer: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 14,
    backgroundColor: "#E9E9E9",
    borderRadius: 12,
    padding: 4,
  },

  aba: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  abaAtiva: {
    backgroundColor: "#1A5CFF",
  },

  abaTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  abaTextoAtivo: {
    color: "#FFF",
    fontWeight: "700",
  },

  sombra: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },

  card: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: 8,
    alignItems: "center",
  },

  cardImg: {
    width: 85,
    height: 75,
    borderRadius: 8,
  },

  cardInfo: {
    flex: 1,
    marginLeft: 10,
    gap: 2,
    paddingRight: 30,
  },

  cardTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },

  cardPreco: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FF8C00",
  },

  cardLocalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },

  cardLocal: {
    fontSize: 10,
    color: "#333",
  },

  btnHeart: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 6,
    right: 6,
  },

  vazio: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 80,
  },

  vazioTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginTop: 12,
  },

  vazioTexto: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 6,
  },
});

