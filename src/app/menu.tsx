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
const DRAWER_WIDTH = width * 0.82;

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
};

const menu: MenuItem[] = [
  { icon: "home", label: "Início", route: "/" },
  { icon: "location-outline", label: "Explorar", route: "/explorar" },
  { icon: "heart-outline", label: "Favoritos", route: "/favoritos" },
  { icon: "calendar-outline", label: "Agendamentos", route: "/agendamento" },
  { icon: "person-outline", label: "Perfil", route: "/perfil" },
  { icon: "card-outline", label: "Pagamentos", route: "/pagamentos" },
  { icon: "document-text-outline", label: "Contrato", route: "/contrato" },
  { icon: "home-outline", label: "Minhas Casas", route: "/casas" },
  { icon: "settings-outline", label: "Configurações", route: "/config" },
  { icon: "exit-outline", label: "Sair", route: "/" },
];

export default function MenuDrawer({ visible, onClose, onOpen }: { visible: boolean; onClose: () => void; onOpen: () => void }) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: -DRAWER_WIDTH, duration: 250, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  function handlePress(item: MenuItem) {
    onClose();
    setTimeout(() => {
      if (item.label === "Sair") {
        router.replace("/");
        return;
      }
      try {
        router.push(item.route as any);
      } catch {
        Alert.alert("BuscaLar", `Página ${item.label} ainda não criada`);
      }
    }, 280);
  }

  if (!visible) {
    return (
      <View style={styles.edgeArea} pointerEvents="box-none">
        <TouchableOpacity style={styles.edgeBtn} onPress={onOpen} activeOpacity={1} />
      </View>
    );
  }

  return (
    <View style={styles.fullScreen}>
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
      </Animated.View>
      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarLetra}>D</Text></View>
          <View style={{ flex: 1 }}>
            <View style={styles.nomeLinha}>
              <Text style={styles.nome}>Davi Miguel</Text>
              <Ionicons name="chevron-down" size={14} color="#000" />
            </View>
            <Text style={styles.email}>davi.miguel@gmail.com</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#000" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, marginTop: 10 }} showsVerticalScrollIndicator={false}>
          {menu.map((item, i) => (
            <TouchableOpacity key={i} style={styles.item} onPress={() => handlePress(item)} activeOpacity={0.6}>
              <Ionicons name={item.icon} size={22} color="#000" style={styles.itemIcon} />
              <Text style={styles.itemTexto}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 },
  backdrop: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)" },
  drawer: { position: "absolute", top: 0, left: 0, bottom: 0, width: DRAWER_WIDTH, maxWidth: 320, backgroundColor: "#fff", paddingTop: 50, elevation: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  edgeArea: { position: "absolute", top: 0, left: 0, bottom: 80, width: 35, zIndex: 999 },
  edgeBtn: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarLetra: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  nomeLinha: { flexDirection: "row", alignItems: "center" },
  nome: { fontSize: 15, fontWeight: "bold", color: "#000", marginRight: 4 },
  email: { fontSize: 11, color: "#666", marginTop: 2 },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F2F2F2", alignItems: "center", justifyContent: "center" },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 16, paddingHorizontal: 20 },
  itemIcon: { width: 30, marginRight: 10 },
  itemTexto: { fontSize: 14, color: "#000", fontWeight: "500" },
});