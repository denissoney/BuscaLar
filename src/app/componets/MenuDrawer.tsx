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
  Modal,
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

  function irInicio() {
    onClose();

    setTimeout(() => {
      router.replace("/(tabs)" as any);
    }, 260);
  }

  async function sair() {
    try {
      await AsyncStorage.removeItem("logado");
      await AsyncStorage.removeItem("emailUsuario");

      onClose();

      setTimeout(() => {
        router.replace("/login" as any);
      }, 260);
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>

        {/* =========================================
            FUNDO ESCURO
        ========================================== */}

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

        {/* =========================================
            MENU LATERAL
        ========================================== */}

        <Animated.View
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

          {/* =========================================
              CABEÇALHO
          ========================================== */}

          <View style={styles.header}>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                D
              </Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                Davi Miguel
              </Text>

              <Text style={styles.userEmail}>
                davi.miguel@gmail.com
              </Text>
            </View>

            {/* X */}
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={28}
                color="#000"
              />
            </TouchableOpacity>

          </View>

          {/* LINHA */}

          <View style={styles.headerLine} />

          {/* =========================================
              OPÇÕES DO MENU
          ========================================== */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuContent}
          >

            {/* INÍCIO */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={irInicio}
              activeOpacity={0.7}
            >
              <Ionicons
                name="home"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Início
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* FILTRO */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navegar("/filtro")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="location"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Filtro
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* FAVORITOS */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navegar("/(tabs)/favoritos")
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="heart-outline"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Favoritos
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* AGENDAMENTOS */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navegar("/(tabs)/agendamento")
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="calendar"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Agendamentos
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* PAGAMENTOS */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navegar("/pagamentos")
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="card"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Pagamentos
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* CONTRATO */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navegar("/contrato")
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="document-text"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Contrato
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* PERFIL */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navegar(
                  "/(tabs)/perfil-proprietario"
                )
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="person"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Perfil
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* CASAS */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navegar("/imoveis")
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="home-outline"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Casas
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* CONFIGURAÇÕES */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navegar("/configuracoes")
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="settings-outline"
                size={22}
                color="#000"
              />

              <Text style={styles.menuText}>
                Configurações
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* SAIR */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={sair}
              activeOpacity={0.7}
            >
              <Ionicons
                name="exit-outline"
                size={22}
                color="#E53935"
              />

              <Text
                style={[
                  styles.menuText,
                  styles.logoutText,
                ]}
              >
                Sair
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  /*
   * MODAL
   *
   * Essa é a parte mais importante.
   *
   * O Modal cria uma camada nativa acima da tela atual.
   * Dessa forma o menu não fica atrás da caixa azul,
   * FlatList, ScrollView ou qualquer outro componente.
   */
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  /*
   * FUNDO ESCURO
   */
 overlayContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},
overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.42)",
},
  /*
   * DRAWER
   */
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#FFFFFF",
    elevation: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  /*
   * CABEÇALHO
   */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    /*
     * Espaço para a barra de status.
     */
    paddingTop: 55,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },
  userInfo: {
    flex: 1,
    marginLeft: 11,
  },
  userName: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700",
  },
  userEmail: {
    color: "#777777",
    fontSize: 10.5,
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLine: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  menuContent: {
    paddingBottom: 30,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    paddingHorizontal: 18,
    gap: 14,
  },

  menuText: {
    flex: 1,
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
  },

  logoutText: {
    color: "#E53935",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 16,
  },
});
