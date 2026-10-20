
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(width * 0.82, 320);

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
};

const menu: MenuItem[] = [
  {
    icon: "home",
    label: "Início",
    route: "/(tabs)",
  },
  {
    icon: "location-outline",
    label: "Explorar",
    route: "/(tabs)/explorar",
  },
  {
    icon: "heart-outline",
    label: "Favoritos",
    route: "/(tabs)/favoritos",
  },
  {
    icon: "calendar-outline",
    label: "Agendamentos",
    route: "/(tabs)/agendamento",
  },
  {
    icon: "person-outline",
    label: "Perfil",
    route: "/(tabs)/perfil-proprietario",
  },
  {
    icon: "card-outline",
    label: "Pagamentos",
    route: "/pagamentos",
  },
  {
    icon: "document-text-outline",
    label: "Contrato",
    route: "/contrato",
  },
  {
    icon: "home-outline",
    label: "Minhas Casas",
    route: "/casas",
  },
  {
    icon: "settings-outline",
    label: "Configurações",
    route: "/config",
  },
  {
    icon: "exit-outline",
    label: "Sair",
    route: "/login",
  },
];

type MenuDrawerProps = {
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export default function MenuDrawer({
  visible,
  onClose,
  onOpen,
}: MenuDrawerProps) {
  const router = useRouter();
  const { dark } = useTheme();

  const cores = {
    fundo: dark ? "#1E1E1E" : "#FFFFFF",
    superficie: dark ? "#292929" : "#F2F2F2",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#666666",
    borda: dark ? "#444444" : "#EEEEEE",
    laranja: "#FF8C00",
    fundoEscuro: "rgba(0,0,0,0.50)",
  };

  const styles = criarEstilos(cores);

  const slideAnim = useRef(
    new Animated.Value(-DRAWER_WIDTH)
  ).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 22,
          stiffness: 180,
          mass: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  async function handlePress(item: MenuItem) {
    onClose();

    setTimeout(async () => {
      if (item.label === "Sair") {
        try {
          await AsyncStorage.removeItem("logado");
          await AsyncStorage.removeItem("emailUsuario");

          router.replace("/login" as any);
        } catch {
          Alert.alert(
            "BuscaLar",
            "Não foi possível encerrar a sessão. Tente novamente."
          );
        }

        return;
      }

      router.push(item.route as any);
    }, 260);
  }

  return (
    <View
      style={styles.fullScreen}
      pointerEvents={visible ? "auto" : "box-none"}
    >
      {/* ÁREA LATERAL PARA ABRIR O MENU */}
      {!visible && (
        <View
          style={styles.edgeArea}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            style={styles.edgeBtn}
            onPress={onOpen}
            activeOpacity={1}
          />
        </View>
      )}

      {/* FUNDO ESCURO */}
      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={[
          styles.backdrop,
          { opacity: fadeAnim },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropButton}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* MENU LATERAL */}
      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>D</Text>
          </View>

          <View style={styles.dadosUsuario}>
            <View style={styles.nomeLinha}>
              <Text style={styles.nome}>Davi Miguel</Text>

              <Ionicons
                name="chevron-down"
                size={14}
                color={cores.texto}
              />
            </View>

            <Text style={styles.email}>
              davi.miguel@gmail.com
            </Text>
          </View>

          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
            activeOpacity={0.7}
            accessibilityLabel="Fechar menu"
          >
            <Ionicons
              name="close"
              size={22}
              color={cores.texto}
            />
          </TouchableOpacity>
        </View>

        {/* ITENS DO MENU */}
        <ScrollView
          style={styles.menuScroll}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
        >
          {menu.map((item, index) => {
            const sair = item.label === "Sair";

            return (
              <TouchableOpacity
                key={`${item.label}-${index}`}
                style={[
                  styles.item,
                  sair && styles.itemSair,
                ]}
                onPress={() => handlePress(item)}
                activeOpacity={0.65}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={sair ? cores.laranja : cores.texto}
                  style={styles.itemIcon}
                />

                <Text
                  style={[
                    styles.itemTexto,
                    sair && styles.itemTextoSair,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  laranja: string;
  fundoEscuro: string;
}) {
  return StyleSheet.create({
    fullScreen: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      elevation: 1000,
    },

    backdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: cores.fundoEscuro,
    },

    backdropButton: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    drawer: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: DRAWER_WIDTH,
      backgroundColor: cores.fundo,
      paddingTop: 50,
      elevation: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      overflow: "hidden",
    },

    edgeArea: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 80,
      width: 40,
      zIndex: 999,
    },

    edgeBtn: {
      flex: 1,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: cores.laranja,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },

    avatarLetra: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 18,
    },

    dadosUsuario: {
      flex: 1,
    },

    nomeLinha: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    nome: {
      fontSize: 14,
      fontWeight: "bold",
      color: cores.texto,
    },

    email: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 3,
    },

    closeBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: cores.superficie,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 6,
    },

    menuScroll: {
      flex: 1,
      marginTop: 10,
    },

    menuContent: {
      paddingBottom: 30,
    },

    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 20,
    },

    itemIcon: {
      width: 30,
      marginRight: 10,
    },

    itemTexto: {
      fontSize: 14,
      color: cores.texto,
      fontWeight: "500",
    },

    itemSair: {
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: cores.borda,
      paddingTop: 20,
    },

    itemTextoSair: {
      color: cores.laranja,
      fontWeight: "700",
    },
  });
}
