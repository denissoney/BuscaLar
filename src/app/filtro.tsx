
import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

export default function Filtro() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-320)).current;
  const [objetivo, setObjetivo] = useState("alugar");
  const [tipo, setTipo] = useState("Apartamento");
  const [de, setDe] = useState("1000,00");
  const [ate, setAte] = useState("2500,00");
  const [onde, setOnde] = useState("");
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    superficieSecundaria: dark ? "#292929" : "#F7F7F7",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#B0B0B0" : "#777777",
    borda: dark ? "#484848" : "#D8D8D8",
    azul: "#1A5CFF",
    azulHeader: "#488AFF",
    laranja: "#FF8C00",
    textoAtivo: "#FFFFFF",
    menuFechar: dark ? "#383838" : "#F2F2F2",
    linhaMenu: dark ? "#383838" : "#EEEEEE",
  };

  const styles = criarEstilos(cores);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -320,
      duration: menuAberto ? 250 : 200,
      useNativeDriver: true,
    }).start();
  }, [menuAberto, slideAnim]);

  const irPara = (rota: string) => {
    setMenuAberto(false);

    setTimeout(() => {
      router.push(rota as any);
    }, 250);
  };

  const converterPreco = (valor: string) => {
    const numero = Number(
      valor.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "")
    );

    return Number.isFinite(numero) ? String(numero) : "0";
  };

  const continuar = () => {
    router.push({
      pathname: "/imoveis",
      params: {
        tipo,
        de: converterPreco(de),
        ate: converterPreco(ate),
        onde: onde.trim(),
        objetivo,
      },
    } as any);
  };

  const voltar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/index" as any);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topo}>
          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.hamburguer}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Quase Lá! 👋</Text>

        <Text style={styles.subTitulo}>
          Conte-nos um pouco sobre você para{"\n"}
          personalizar sua experiência.
        </Text>

        <View style={styles.linhaLabel}>
          <Text style={styles.label}>Qual é o seu objetivo?</Text>
          <View style={styles.linhaCinza} />
        </View>

        <View style={styles.rowObjetivo}>
          <TouchableOpacity
            style={[
              styles.cardObjetivo,
              objetivo === "alugar" && styles.cardAtivo,
            ]}
            onPress={() => setObjetivo("alugar")}
            activeOpacity={0.8}
          >
            <View style={styles.iconeLaranja}>
              <Ionicons name="search" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitulo}>Quero alugar</Text>
            <Text style={styles.cardSub}>
              Buscar imóveis para alugar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardObjetivo,
              objetivo === "anunciar" && styles.cardAtivo,
            ]}
            onPress={() => setObjetivo("anunciar")}
            activeOpacity={0.8}
          >
            <View style={styles.iconeLaranja}>
              <Ionicons name="home" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitulo}>Quero anunciar</Text>
            <Text style={styles.cardSub}>
              Tenho um imóvel para alugar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardObjetivo,
              objetivo === "ambos" && styles.cardAtivo,
            ]}
            onPress={() => setObjetivo("ambos")}
            activeOpacity={0.8}
          >
            <View style={styles.iconeLaranja}>
              <Ionicons name="heart" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitulo}>Ambos</Text>
            <Text style={styles.cardSub}>
              Quero alugar e anunciar
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linhaLabel}>
          <Text style={styles.label}>
            Que tipo de imóvel você prefere?
          </Text>
          <View style={styles.linhaCinza} />
        </View>

        <View style={styles.gridTipos}>
          {[
            "Apartamento",
            "Casa",
            "Kitnet / Studio",
            "Quarto",
            "Cobertura",
            "Imóvel comercial",
          ].map((item) => {
            const selecionado = tipo === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.btnTipo,
                  selecionado && styles.btnTipoAtivo,
                ]}
                onPress={() => setTipo(item)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.btnTipoText,
                    selecionado && styles.btnTipoTextAtivo,
                  ]}
                  numberOfLines={1}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.linhaLabel}>
          <View>
            <Text style={styles.label}>Faixa de preço</Text>
            <Text style={styles.labelSmall}>
              Selecione sua faixa de preço ideal!
            </Text>
          </View>

          <View style={styles.linhaCinza} />
        </View>

        <View style={styles.rowPreco}>
          <Text style={styles.deAte}>DE:</Text>

          <View style={styles.inputPreco}>
            <Text style={styles.cifrao}>R$</Text>
            <TextInput
              value={de}
              onChangeText={setDe}
              style={styles.inputPrecoText}
              keyboardType="decimal-pad"
              placeholder="0,00"
              placeholderTextColor={cores.textoSecundario}
            />
          </View>

          <Text style={styles.deAte}>ATÉ:</Text>

          <View style={styles.inputPreco}>
            <Text style={styles.cifrao}>R$</Text>
            <TextInput
              value={ate}
              onChangeText={setAte}
              style={styles.inputPrecoText}
              keyboardType="decimal-pad"
              placeholder="0,00"
              placeholderTextColor={cores.textoSecundario}
            />
          </View>
        </View>

        <View style={styles.localizacaoArea}>
          <Text style={styles.label}>Onde você quer morar?</Text>

          <View style={styles.inputOnde}>
            <Ionicons
              name="location"
              size={18}
              color={cores.textoSecundario}
            />

            <TextInput
              placeholder="Digite a cidade ou bairro desejado"
              placeholderTextColor={cores.textoSecundario}
              style={styles.inputOndeTexto}
              value={onde}
              onChangeText={setOnde}
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnContinuar}
          onPress={continuar}
          activeOpacity={0.8}
        >
          <Text style={styles.btnContinuarText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={voltar}
          activeOpacity={0.8}
        >
          <Text style={styles.btnVoltarText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={menuAberto}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => setMenuAberto(false)}
      >
        <View style={styles.overlayMenu}>
          <Animated.View
            style={[
              styles.menuLateral,
              {
                paddingTop: insets.top + 10,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 30 }}
            >
              <View style={styles.menuHeader}>
                <View style={styles.avatarMenu}>
                  <Text style={styles.avatarTextMenu}>D</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.menuNome}>Davi Miguel</Text>
                  <Text style={styles.menuEmail}>
                    davi.miguel@gmail.com
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setMenuAberto(false)}
                  style={styles.menuClose}
                  accessibilityLabel="Fechar menu"
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color={cores.texto}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.divisor} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/")}
              >
                <Ionicons name="home" size={22} color={cores.texto} />
                <Text style={styles.menuItemText}>Início</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/filtro")}
              >
                <Ionicons
                  name="location"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuItemText}>Filtro</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/(tabs)/favoritos")}
              >
                <Ionicons
                  name="heart-outline"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuItemText}>Favoritos</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/(tabs)/agendamento")}
              >
                <Ionicons
                  name="calendar"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuItemText}>Agendamentos</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/pagamentos")}
              >
                <Ionicons name="card" size={22} color={cores.texto} />
                <Text style={styles.menuItemText}>Pagamentos</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/contrato")}
              >
                <Ionicons
                  name="document-text"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuItemText}>Contrato</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/perfil-proprietario")}
              >
                <Ionicons name="person" size={22} color={cores.texto} />
                <Text style={styles.menuItemText}>Perfil</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/imoveis")}
              >
                <Ionicons
                  name="home-outline"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuItemText}>Casas</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/configuracoes")}
              >
                <Ionicons
                  name="settings"
                  size={22}
                  color={cores.texto}
                />
                <Text style={styles.menuItemText}>Configurações</Text>
              </TouchableOpacity>
              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => irPara("/login")}
              >
                <Ionicons
                  name="exit-outline"
                  size={22}
                  color="#E53935"
                />
                <Text
                  style={[
                    styles.menuItemText,
                    { color: "#E53935" },
                  ]}
                >
                  Sair
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>

          <Pressable
            style={{ flex: 1 }}
            onPress={() => setMenuAberto(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  superficieSecundaria: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  azulHeader: string;
  laranja: string;
  textoAtivo: string;
  menuFechar: string;
  linhaMenu: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    topo: {
      paddingHorizontal: 16,
      paddingTop: 6,
    },
    hamburguer: {
      width: 32,
      height: 32,
      justifyContent: "center",
      gap: 5,
      alignItems: "flex-start",
    },
    traco: {
      height: 2.8,
      backgroundColor: cores.texto,
      borderRadius: 10,
    },
    titulo: {
      fontSize: 22,
      fontWeight: "800",
      textAlign: "center",
      marginTop: 4,
      color: cores.texto,
    },
    subTitulo: {
      fontSize: 11,
      textAlign: "center",
      color: cores.textoSecundario,
      marginTop: 6,
    },
    linhaLabel: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      marginTop: 18,
      gap: 8,
    },
    label: {
      fontSize: 11,
      fontWeight: "700",
      color: cores.texto,
    },
    labelSmall: {
      fontSize: 8,
      color: cores.textoSecundario,
      marginTop: 2,
    },
    linhaCinza: {
      flex: 1,
      height: 1,
      backgroundColor: cores.borda,
    },
    rowObjetivo: {
      flexDirection: "row",
      gap: 8,
      marginHorizontal: 16,
      marginTop: 10,
    },
    cardObjetivo: {
      flex: 1,
      borderWidth: 1,
      borderColor: cores.azul,
      borderRadius: 10,
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 4,
      backgroundColor: cores.superficie,
    },
    cardAtivo: {
      backgroundColor: cores.superficieSecundaria,
      borderColor: cores.laranja,
      borderWidth: 1.5,
    },
    iconeLaranja: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: cores.laranja,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 6,
    },
    cardTitulo: {
      fontSize: 9,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
    },
    cardSub: {
      fontSize: 7,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 2,
    },
    gridTipos: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginHorizontal: 16,
      marginTop: 10,
      rowGap: 8,
    },
    btnTipo: {
      width: "31.5%",
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: cores.superficie,
    },
    btnTipoAtivo: {
      backgroundColor: cores.laranja,
      borderColor: cores.laranja,
    },
    btnTipoText: {
      fontSize: 10,
      fontWeight: "700",
      color: cores.texto,
      textAlign: "center",
    },
    btnTipoTextAtivo: {
      color: cores.textoAtivo,
    },
    rowPreco: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      marginTop: 12,
      gap: 8,
    },
    deAte: {
      fontSize: 11,
      fontWeight: "800",
      color: cores.texto,
    },
    inputPreco: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.2,
      borderColor: cores.azul,
      borderRadius: 10,
      paddingHorizontal: 8,
      height: 40,
      backgroundColor: cores.superficie,
      gap: 4,
    },
    cifrao: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
    },
    inputPrecoText: {
      fontSize: 13,
      fontWeight: "700",
      color: cores.texto,
      flex: 1,
      paddingVertical: 0,
      minWidth: 0,
    },
    localizacaoArea: {
      marginHorizontal: 16,
      marginTop: 18,
    },
    inputOnde: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderWidth: 1,
      borderColor: cores.azul,
      borderRadius: 8,
      height: 42,
      paddingHorizontal: 10,
      marginTop: 6,
      backgroundColor: cores.superficie,
    },
    inputOndeTexto: {
      flex: 1,
      fontSize: 13,
      color: cores.texto,
      paddingVertical: 0,
    },
    btnContinuar: {
      backgroundColor: cores.laranja,
      marginHorizontal: 16,
      marginTop: 22,
      height: 44,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    btnContinuarText: {
      color: "#FFFFFF",
      fontWeight: "800",
      fontSize: 14,
    },
    btnVoltar: {
      backgroundColor: cores.superficie,
      marginHorizontal: 16,
      marginTop: 10,
      height: 44,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: cores.borda,
    },
    btnVoltarText: {
      color: cores.texto,
      fontWeight: "800",
      fontSize: 14,
    },
    overlayMenu: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      flexDirection: "row",
    },
    menuLateral: {
      backgroundColor: cores.superficie,
      width: 300,
      maxWidth: "85%",
      height: "100%",
      paddingHorizontal: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    menuHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingBottom: 20,
    },
    avatarMenu: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: cores.laranja,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarTextMenu: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },
    menuNome: {
      fontWeight: "700",
      fontSize: 14,
      color: cores.texto,
    },
    menuEmail: {
      color: cores.textoSecundario,
      fontSize: 11,
      marginTop: 3,
    },
    menuClose: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: cores.menuFechar,
      alignItems: "center",
      justifyContent: "center",
    },
    divisor: {
      height: 1,
      backgroundColor: cores.linhaMenu,
      marginVertical: 10,
    },
    linha: {
      height: 0.8,
      backgroundColor: cores.linhaMenu,
      marginHorizontal: 4,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
    },
    menuItemText: {
      fontSize: 14,
      fontWeight: "500",
      color: cores.texto,
    },
  });
}
