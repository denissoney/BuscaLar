import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

export default function MenuDrawer() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER PERFIL */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetra}>D</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nomeLinha}>
            <Text style={styles.nome}>Davi Miguel</Text>
            <Ionicons name="chevron-down" size={14} color="#000" />
          </View>
          <Text style={styles.email}>davi.miguel@gmail.com</Text>
        </View>
      </View>

      <ScrollView style={styles.lista} showsVerticalScrollIndicator={false}>
        {menu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => router.push(item.route as any)}
          >
            <Ionicons name={item.icon} size={20} color="#000" style={styles.itemIcon} />
            <Text style={styles.itemTexto}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    paddingTop: 50, 
},
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarLetra: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18, 
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
    marginTop: 1, 
},
  lista: { 
    flex: 1, 
    marginTop: 10, 
},
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  itemIcon: { 
    width: 24, 
    marginRight: 12, 
},
  itemTexto: { 
    fontSize: 14, 
    color: "#000", 
    fontWeight: "500", 
},
});