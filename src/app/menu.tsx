import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
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
  { icon: "home", label: "Início", route: "/(tabs)" },
  { icon: "location-outline", label: "Filtro", route: "/(tabs)/buscar" },
  { icon: "heart-outline", label: "Favorito", route: "/(tabs)/favoritos" },
  { icon: "calendar-outline", label: "Agendamentos", route: "/agendamentos" },
  { icon: "card-outline", label: "Pagamentos", route: "/pagamentos" },
  { icon: "document-text-outline", label: "Contrato", route: "/contrato" },
  { icon: "person-outline", label: "Perfil", route: "/(tabs)/perfil" },
  { icon: "home-outline", label: "Casas", route: "/casas" },
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

  if (!visible) {
    // QUANDO FECHADO: só deixa uma área de 30px na borda pra puxar
    return (
      <View style={styles.edgeArea}>
        <TouchableOpacity style={styles.edgeBtn} onPress={onOpen} activeOpacity={1} />
      </View>
    );
  }

  return (
    <View style={styles.fullScreen}>
      {/* FUNDO ESCURO - CLICA PRA FECHAR */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
      </Animated.View>

      {/* MENU VINDO DA ESQUERDA PRA DIREITA */}
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
          <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color="#000" /></TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, marginTop: 10 }} showsVerticalScrollIndicator={false}>
          {menu.map((item, i) => (
            <TouchableOpacity key={i} style={styles.item} onPress={() => { onClose(); setTimeout(()=>router.push(item.route as any), 260); }}>
              <Ionicons name={item.icon} size={20} color="#000" style={styles.itemIcon} />
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
  drawer: { position: "absolute", top: 0, left: 0, bottom: 0, width: DRAWER_WIDTH, maxWidth: 320, backgroundColor: "#fff", paddingTop: 50, elevation: 20 },
  edgeArea: { position: "absolute", top: 0, left: 0, bottom: 80, width: 30, zIndex: 999, backgroundColor: "transparent" },
  edgeBtn: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center", marginRight: 10 },
  avatarLetra: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  nomeLinha: { flexDirection: "row", alignItems: "center" },
  nome: { fontSize: 15, fontWeight: "bold", color: "#000", marginRight: 4 },
  email: { fontSize: 11, color: "#666", marginTop: 1 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#F5F5F5" },
  itemIcon: { width: 24, marginRight: 12 },
  itemTexto: { fontSize: 14, color: "#000", fontWeight: "500" },
});