import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, PanResponder } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MenuDrawer from "../app/componets/MenuDrawer";
export default function MeuPerfil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  function abrirMenu() { setMenuVisible(true); }
  function fecharMenu() { setMenuVisible(false); }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) => {
        if (menuVisible) return false;
        return g.x0 <= 70 && Math.abs(g.dx) > Math.abs(g.dy) * 1.2 && g.dx > 10;
      }, onPanResponderRelease: (_, g) => {
        if (g.dx >= 70) abrirMenu();
      },
    })
  ).current;

  function irPara(rota: string) {
    router.push(rota as any);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
      {/* HEADER */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} style={styles.content}>
        {/* PERFIL */}
        <View style={styles.perfilBox}>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
          <View>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.avatar} />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={12} color="#fff" />
            </View>
          </View>

          <View style={styles.perfilInfo}>
            <Text style={styles.nome}>Davi Miguel</Text>
            <Text style={styles.email}>davi.miguel@email.com</Text>
            <View style={styles.localRow}>
              <Ionicons name="location" size={12} color="#000" />
              <Text style={styles.localText}>Maceió - AL</Text>
            </View>
            <Text style={styles.bio}>Apaixonado por viajar e encontrar lugares incríveis para morar.</Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statItem} onPress={() => irPara("/favoritos")}>
            <View style={styles.statIconBox}><Ionicons name="home-outline" size={20} color="#FF8C00" /></View>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statItem}>
            <View style={styles.statIconBox}><Ionicons name="heart-outline" size={20} color="#FF8C00" /></View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Visualizações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statItem}>
            <View style={styles.statIconBox}><Ionicons name="calendar-outline" size={20} color="#FF8C00" /></View>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Visitas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statItem}>
            <View style={styles.statIconBox}><Ionicons name="chatbubble-ellipses-outline" size={20} color="#FF8C00" /></View>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Conversas</Text>
          </TouchableOpacity>
        </View>

        {/* MENU OPÇÕES */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/informacoes")}>
            <Ionicons name="person-outline" size={20} color="#000" style={styles.menuIcon} />
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Informações pessoais</Text>
              <Text style={styles.menuSub}>Seus dados e preferências</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/notificacoes")}>
            <Ionicons name="notifications-outline" size={20} color="#000" style={styles.menuIcon} />
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Notificações</Text>
              <Text style={styles.menuSub}>Gerencie suas notificações</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/seguranca")}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#000" style={styles.menuIcon} />
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Segurança</Text>
              <Text style={styles.menuSub}>Senha e privacidade</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/ajuda")}>
            <Ionicons name="help-circle-outline" size={20} color="#000" style={styles.menuIcon} />
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Central de ajuda</Text>
              <Text style={styles.menuSub}>Tire suas dúvidas</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/editar-usuario")}>
            <Ionicons name="create-outline" size={20} color="#000" style={styles.menuIcon} />
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Editar perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => irPara("/login")} activeOpacity={0.7}>
            <Ionicons name="exit-outline" size={20} color="#FF0000" style={styles.menuIcon} />
            <View style={styles.menuTextBox}>
              <Text style={[styles.menuTitle, { color: "#FF0000" }]}>Sair da conta</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* MEUS FAVORITOS */}
        <View style={styles.favoritosContainer}>
          <Text style={styles.favoritosTitle}>Meus favoritos</Text>
          <View style={styles.favoritosRow}>
            <TouchableOpacity style={styles.favCard} activeOpacity={0.8} onPress={() => irPara("/detalhe/1")}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" }} style={styles.favImg} />
              <Text style={styles.favNome} numberOfLines={2}>Apartamento ponta verde{"\n"}2 Quartos</Text>
              <Text style={styles.favPreco}>R$ 1.200/mes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.favCard} activeOpacity={0.8} onPress={() => irPara("/detalhe/2")}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400" }} style={styles.favImg} />
              <Text style={styles.favNome} numberOfLines={2}>Apartamento jatiuca{"\n"}3 Quartos</Text>
              <Text style={styles.favPreco}>R$ 2.000/mes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <MenuDrawer visible={menuVisible} onClose={fecharMenu} onOpen={abrirMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1A5CFF" 
},
  content: { 
    flex: 1, 
    backgroundColor: "#fff", 
},
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: "#1A5CFF" 
},
  btnMenu: { 
    width: 32, 
    height: 32, 
    justifyContent: "center", 
    gap: 4 
},
  traco: { 
    height: 2, 
    width: 20, 
    backgroundColor: "#fff", 
    borderRadius: 2 
},
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "800", 
    color: "#000",
    marginLeft: 100 
},
  perfilBox: { 
    flexDirection: "row", 
    padding: 16, 
    alignItems: "flex-start", 
    borderBottomWidth: 1, 
    borderBottomColor: "#EDEDED" 
},
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30,
    marginTop: 60,
    marginLeft: -190
},
  cameraIcon: { 
    bottom: 10, 
    right: 0, 
    backgroundColor: "#000", 
    width: 18, 
    height: 18, 
    borderRadius: 9, 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1.5, 
    borderColor: "#fff",
    marginLeft: -150,
},
  perfilInfo: { 
    flex: 1,
    marginTop: 60,
    marginLeft: -120, 
},
  nome: { 
    fontSize: 15, 
    fontWeight: "800", 
    color: "#000" 
},
  email: { 
    fontSize: 11, 
    color: "#000", 
    textDecorationLine: "underline", 
    marginTop: 1 
},
  localRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 4 
},
  localText: { 
    fontSize: 11, 
    color: "#000", 
    marginLeft: 3, 
    fontWeight: "600" 
},
  bio: { 
    fontSize: 10, 
    color: "#555", 
    marginTop: 3, 
    lineHeight: 13 
},
  statsRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingHorizontal: 10, 
    paddingVertical: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: "#EDEDED" 
},
  statItem: { 
    flex: 1, 
    alignItems: "center" 
},
  statIconBox: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    backgroundColor: "#FFF3E6", 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 4 
},
  statNumber: { 
    fontSize: 13, 
    fontWeight: "800", 
    color: "#000" 
},
  statLabel: { 
    fontSize: 10, 
    color: "#555",
    marginTop: 1
},
  menuContainer: { 
    borderBottomWidth: 1, 
    borderBottomColor: "#EDEDED" 
},
  menuItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: "#EDEDED" 
},
  menuIcon: { 
    width: 24 
},
  menuTextBox: { 
    flex: 1, 
    marginLeft: 8 
},
  menuTitle: { 
    fontSize: 13, 
    fontWeight: "700", 
    color: "#000" 
},
  menuSub: { 
    fontSize: 10, 
    color: "#777", 
    marginTop: 1 
},
  favoritosContainer: { 
    padding: 16 
},
  favoritosTitle: { 
    fontSize: 15, 
    fontWeight: "800", 
    color: "#000", 
    marginBottom: 10 
},
  favoritosRow: { 
    flexDirection: "row", 
    gap: 12 
},
  favCard: { 
    width: 140, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: "#EDEDED", 
    overflow: "hidden" 
},
  favImg: { 
    width: "100%", 
    height: 80, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10 
},
  favNome: { 
    fontSize: 10, 
    color: "#000", 
    paddingHorizontal: 6, 
    marginTop: 6, 
    lineHeight: 12 
},
  favPreco: { 
    fontSize: 10, 
    color: "#1A5CFF", 
    fontWeight: "700", 
    paddingHorizontal: 6, 
    paddingBottom: 8, 
    marginTop: 4 
},
});