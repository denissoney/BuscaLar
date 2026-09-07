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

  // =========================================================
  // ANIMAÇÕES
  // =========================================================

  const slideAnim = useRef(
    new Animated.Value(-DRAWER_WIDTH)
  ).current;

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  // =========================================================
  // CONTROLA ABERTURA E FECHAMENTO
  // =========================================================

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

  // =========================================================
  // CLIQUE NOS ITENS
  // =========================================================

  function handlePress(item: MenuItem) {
    // Fecha o menu primeiro
    onClose();

    // Pequeno atraso para terminar a animação
    setTimeout(() => {
      if (item.label === "Sair") {
        router.replace("/login");
        return;
      }

      try {
        router.push(item.route as any);
      } catch (error) {
        Alert.alert(
          "BuscaLar",
          `Página ${item.label} ainda não criada`
        );
      }
    }, 260);
  }

  // =========================================================
  // MENU
  // =========================================================

  return (
    <View
      style={styles.fullScreen}
      pointerEvents={visible ? "auto" : "box-none"}
    >
      {/* =====================================================
          ÁREA LATERAL PARA ABRIR O MENU
      ===================================================== */}

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

      {/* =====================================================
          FUNDO ESCURO
      ===================================================== */}

      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* =====================================================
          MENU LATERAL
      ===================================================== */}

      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={[
          styles.drawer,
          {
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          },
        ]}
      >
        {/* ===================================================
            CABEÇALHO
        =================================================== */}

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>
              D
            </Text>
          </View>

          <View style={styles.dadosUsuario}>
            <View style={styles.nomeLinha}>
              <Text style={styles.nome}>
                Davi Miguel
              </Text>

              <Ionicons
                name="chevron-down"
                size={14}
                color="#000"
              />
            </View>

            <Text style={styles.email}>
              davi.miguel@gmail.com
            </Text>
          </View>

          {/* BOTÃO FECHAR */}

          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close"
              size={22}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* ===================================================
            ITENS
        =================================================== */}

        <ScrollView
          style={styles.menuScroll}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
        >
          {menu.map((item, index) => (
            <TouchableOpacity
              key={`${item.label}-${index}`}
              style={[
                styles.item,

                // Linha separadora antes de sair
                item.label === "Sair" &&
                  styles.itemSair,
              ]}
              onPress={() =>
                handlePress(item)
              }
              activeOpacity={0.6}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color="#000"
                style={styles.itemIcon}
              />

              <Text style={styles.itemTexto}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

// =========================================================
// ESTILOS
// =========================================================

const styles = StyleSheet.create({
  // =========================================================
  // TELA COMPLETA
  // =========================================================

  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 1000,

    elevation: 1000,
  },

  // =========================================================
  // FUNDO ESCURO
  // =========================================================

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(0,0,0,0.50)",
  },

  // =========================================================
  // MENU
  // =========================================================

  drawer: {
    position: "absolute",

    top: 0,
    left: 0,
    bottom: 0,

    width: DRAWER_WIDTH,

    backgroundColor: "#fff",

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

  // =========================================================
  // ÁREA INVISÍVEL PARA ABRIR
  // =========================================================

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

  // =========================================================
  // CABEÇALHO
  // =========================================================

  header: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 20,

    paddingBottom: 20,

    borderBottomWidth: 1,

    borderBottomColor: "#EEEEEE",
  },

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#FF8C00",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 12,
  },

  avatarLetra: {
    color: "#fff",

    fontWeight: "bold",

    fontSize: 18,
  },

  dadosUsuario: {
    flex: 1,
  },

  nomeLinha: {
    flexDirection: "row",

    alignItems: "center",
  },

  nome: {
    fontSize: 15,

    fontWeight: "bold",

    color: "#000",

    marginRight: 4,
  },

  email: {
    fontSize: 11,

    color: "#666",

    marginTop: 2,
  },

  // =========================================================
  // BOTÃO FECHAR
  // =========================================================

  closeBtn: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: "#F2F2F2",

    alignItems: "center",

    justifyContent: "center",

    marginLeft: 8,
  },

  // =========================================================
  // SCROLL
  // =========================================================

  menuScroll: {
    flex: 1,

    marginTop: 10,
  },

  menuContent: {
    paddingBottom: 30,
  },

  // =========================================================
  // ITEM
  // =========================================================

  item: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 16,

    paddingHorizontal: 20,
  },

  itemIcon: {
    width: 30,

    marginRight: 10,
  },

  itemTexto: {
    fontSize: 14,

    color: "#000",

    fontWeight: "500",
  },

  // =========================================================
  // SAIR
  // =========================================================

  itemSair: {
    marginTop: 8,

    borderTopWidth: 1,

    borderTopColor: "#EEEEEE",

    paddingTop: 20,
  },
});
