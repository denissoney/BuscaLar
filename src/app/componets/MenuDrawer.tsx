import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MenuDrawerProps {
  visible: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

const { width } = Dimensions.get("window");

const DRAWER_WIDTH = Math.min(width * 0.82, 320);

export default function MenuDrawer({
  visible,
  onClose,
  onOpen,
}: MenuDrawerProps) {
  const router = useRouter();

  const slideAnim = useRef(
    new Animated.Value(-DRAWER_WIDTH)
  ).current;

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    if (visible) {
      onOpen?.();

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
  }, [visible]);

  function navegar(rota: string) {
    onClose();

    setTimeout(() => {
      router.push(rota as any);
    }, 260);
  }

  async function sair() {
    try {
      await AsyncStorage.removeItem("logado");
      await AsyncStorage.removeItem("emailUsuario");

      onClose();

      setTimeout(() => {
        router.replace("/login");
      }, 260);
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  return (
    <View
      pointerEvents={visible ? "auto" : "none"}
      style={StyleSheet.absoluteFill}
    >
      {/* FUNDO ESCURO */}
      <Animated.View
        style={[
          styles.overlayContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Pressable
          style={styles.overlay}
          onPress={onClose}
        />
      </Animated.View>

      {/* MENU */}
      <Animated.View
        style={[
          styles.menuLateral,
          {
            width: DRAWER_WIDTH,
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          },
        ]}
      >
        {/* CABEÇALHO */}
        <View style={styles.headerMenu}>
          <View style={styles.usuarioArea}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>D</Text>
            </View>

            <View style={styles.usuarioInfo}>
              <Text style={styles.nomeUsuario}>
                Davi Miguel
              </Text>

              <Text
                style={styles.emailUsuario}
                numberOfLines={1}
              >
                Usuário do BuscaLar
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={onClose}
            hitSlop={10}
          >
            <Ionicons
              name="close"
              size={25}
              color="#222"
            />
          </TouchableOpacity>
        </View>

        {/* LINHA */}
        <View style={styles.linha} />

        {/* MENU */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuScroll}
        >
          {/* INÍCIO */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/(tabs)")}
          >
            <Ionicons
              name="home-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Início
            </Text>
          </TouchableOpacity>

          {/* EXPLORAR */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/(tabs)/explorar")}
          >
            <Ionicons
              name="location-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Explorar
            </Text>
          </TouchableOpacity>

          {/* FILTRO */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/filtro")}
          >
            <Ionicons
              name="options-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Filtro
            </Text>
          </TouchableOpacity>

          {/* FAVORITOS */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/(tabs)/favoritos")}
          >
            <Ionicons
              name="heart-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Favoritos
            </Text>
          </TouchableOpacity>

          {/* AGENDAMENTOS */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/(tabs)/agendamento")}
          >
            <Ionicons
              name="calendar-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Agendamentos
            </Text>
          </TouchableOpacity>

          {/* PAGAMENTOS */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/pagamentos")}
          >
            <Ionicons
              name="card-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Pagamentos
            </Text>
          </TouchableOpacity>

          {/* CONTRATO */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/contrato")}
          >
            <Ionicons
              name="document-text-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Contrato
            </Text>
          </TouchableOpacity>

          {/* PERFIL */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navegar("/perfil-proprietario")
            }
          >
            <Ionicons
              name="person-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Perfil
            </Text>
          </TouchableOpacity>

          {/* MEUS IMÓVEIS */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/imoveis")}
          >
            <Ionicons
              name="business-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Meus imóveis
            </Text>
          </TouchableOpacity>

          {/* CONFIGURAÇÕES */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navegar("/configuracoes")}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color="#222"
            />

            <Text style={styles.menuTexto}>
              Configurações
            </Text>
          </TouchableOpacity>

          {/* SEPARADOR */}
          <View style={styles.separador} />

          {/* SAIR */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={sair}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#D32F2F"
            />

            <Text
              style={[
                styles.menuTexto,
                styles.textoSair,
              ]}
            >
              Sair
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* RODAPÉ */}
        <View style={styles.footer}>
          <Text style={styles.footerTexto}>
            BuscaLar
          </Text>

          <Text style={styles.footerVersao}>
            Versão 1.0.0
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
 overlayContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.42)",
},

  overlay: {
    flex: 1,
  },

  menuLateral: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,

    backgroundColor: "#FFFFFF",

    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,

    elevation: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  headerMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 18,
  },

  usuarioArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#FF8C00",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  usuarioInfo: {
    flex: 1,
  },

  nomeUsuario: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  emailUsuario: {
    marginTop: 3,
    fontSize: 11,
    color: "#777",
  },

  botaoFechar: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: "#F1F1F1",

    alignItems: "center",
    justifyContent: "center",
  },

  linha: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginHorizontal: 20,
  },

  menuScroll: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",

    minHeight: 52,

    paddingHorizontal: 22,

    marginHorizontal: 8,

    borderRadius: 12,
  },

  menuTexto: {
    marginLeft: 16,

    fontSize: 14,
    fontWeight: "600",

    color: "#222",
  },

  separador: {
    height: 1,
    backgroundColor: "#EAEAEA",

    marginHorizontal: 20,
    marginVertical: 12,
  },

  textoSair: {
    color: "#D32F2F",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    paddingHorizontal: 22,
    paddingVertical: 16,
  },

  footerTexto: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF8C00",
  },

  footerVersao: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemText: {
    marginLeft: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
});
