
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, PanResponder, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";
export default function MeuPerfil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    card: dark ? "#1E1E1E" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#000000",
    textoSecundario: dark ? "#BDBDBD" : "#666666",
    borda: dark ? "#333333" : "#EDEDED",
    azul: "#1A5CFF",
    laranja: "#FF8C00",
    vermelho: "#FF0000",
    iconeFundo: dark ? "#33291F" : "#FFF3E6",
  };

  const styles = criarEstilos(cores);

  function abrirMenu() {
    setMenuVisible(true);
  }

  function fecharMenu() {
    setMenuVisible(false);
  }

  const panResponder = useRef( PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesture) => {
        if (menuVisible) return false;
        return (
          gesture.x0 <= 70 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2 && gesture.dx > 10 );},
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx >= 70) {
          abrirMenu();
        }
      },
    })
  ).current;

  function irPara(rota: string) {
    router.push(rota as any);
  }

  return (
    <View style={[ styles.container, { paddingTop: insets.top, }, ]} {...panResponder.panHandlers}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnMenu} onPress={abrirMenu} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Abrir menu">
          <Ionicons name="menu" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <View style={styles.headerEspaco} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PERFIL DO USUÁRIO */}
        <View style={styles.perfilBox}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg", }} style={styles.avatar} resizeMode="cover" accessibilityLabel="Foto do usuário"/>
            <TouchableOpacity style={styles.cameraIcon} activeOpacity={0.7} onPress={() => { }} accessibilityRole="button" accessibilityLabel="Alterar foto do perfil">
              <Ionicons name="camera" size={13} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.perfilInfo}>
            <Text style={styles.nome}>Davi Miguel</Text>
            <Text style={styles.email}>
              davi.miguel@email.com
            </Text>
            <View style={styles.localRow}>
              <Ionicons name="location-outline" size={14} color={cores.laranja}/>
              <Text style={styles.localText}>Maceió - AL</Text>
            </View>
            <Text style={styles.bio}>
              Apaixonado por viajar e encontrar lugares incríveis
              para morar.
            </Text>
          </View>
        </View>

        {/* ESTATÍSTICAS */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statItem} onPress={() => irPara("/favoritos")} activeOpacity={0.7}>
            <View style={styles.statIconBox}>
              <Ionicons name="home-outline" size={20} color={cores.laranja}/>
            </View>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statItem} activeOpacity={0.7}>
            <View style={styles.statIconBox}>
              <Ionicons name="eye-outline" size={20} color={cores.laranja}/>
            </View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Visualizações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statItem} activeOpacity={0.7}>
            <View style={styles.statIconBox}>
              <Ionicons name="calendar-outline" size={20} color={cores.laranja}/>
            </View>

            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Visitas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statItem} activeOpacity={0.7}>
            <View style={styles.statIconBox}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={cores.laranja}/>
            </View>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Conversas</Text>
          </TouchableOpacity>
        </View>

        {/* OPÇÕES DO PERFIL */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/informacoes")} activeOpacity={0.7}>
            <Ionicons name="person-outline" size={21} color={cores.texto} style={styles.menuIcon}/>
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>
                Informações pessoais
              </Text>
              <Text style={styles.menuSub}>
                Seus dados e preferências
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color={cores.textoSecundario} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/notificacoes")} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={21} color={cores.texto} style={styles.menuIcon}/>
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Notificações</Text>
              <Text style={styles.menuSub}>
                Gerencie suas notificações
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color={cores.textoSecundario}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/seguranca")} activeOpacity={0.7}>
            <Ionicons name="shield-checkmark-outline" size={21} color={cores.texto} style={styles.menuIcon}/>
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Segurança</Text>
              <Text style={styles.menuSub}>
                Senha e privacidade
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color={cores.textoSecundario}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/ajuda")} activeOpacity={0.7}>
            <Ionicons name="help-circle-outline" size={21} color={cores.texto} style={styles.menuIcon}/>

            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Central de ajuda</Text>
              <Text style={styles.menuSub}>
                Tire suas dúvidas
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={19} color={cores.textoSecundario}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/editar-usuario")} activeOpacity={0.7}>
            <Ionicons name="create-outline" size={21} color={cores.texto} style={styles.menuIcon}/>
            <View style={styles.menuTextBox}>
              <Text style={styles.menuTitle}>Editar perfil</Text>
              <Text style={styles.menuSub}>
                Atualize suas informações
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color={cores.textoSecundario}/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.menuItemUltimo]} onPress={() => irPara("/login")} activeOpacity={0.7}>
            <Ionicons name="exit-outline" size={21} color={cores.vermelho} style={styles.menuIcon}/>

            <View style={styles.menuTextBox}>
              <Text style={[ styles.menuTitle, { color: cores.vermelho }, ]}>
                Sair da conta
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={19} color={cores.textoSecundario}/>
          </TouchableOpacity>
        </View>

        {/* MEUS FAVORITOS */}
        <View style={styles.favoritosContainer}>
          <View style={styles.favoritosHeader}>
            <Text style={styles.favoritosTitle}>
              Meus favoritos
            </Text>

            <TouchableOpacity onPress={() => irPara("/favoritos")} activeOpacity={0.7}>
              <Text style={styles.verTodos}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.favoritosRow}>
            <TouchableOpacity style={styles.favCard} activeOpacity={0.8} onPress={() => irPara("/detalhe/1")}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400", }} style={styles.favImg} resizeMode="cover"/>
              <View style={styles.favInfo}>
                <Text style={styles.favNome} numberOfLines={2}>
                  Apartamento Ponta Verde
                </Text>

                <Text style={styles.favDetalhe}>
                  2 quartos
                </Text>

                <Text style={styles.favPreco}>
                  R$ 1.200/mês
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.favCard} activeOpacity={0.8} onPress={() => irPara("/detalhe/2")}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400", }} style={styles.favImg} resizeMode="cover"/>

              <View style={styles.favInfo}>
                <Text style={styles.favNome} numberOfLines={2}>
                  Apartamento Jatiúca
                </Text>

                <Text style={styles.favDetalhe}>
                  3 quartos
                </Text>

                <Text style={styles.favPreco}>
                  R$ 2.000/mês
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* MENU LATERAL */}
      <MenuDrawer visible={menuVisible} onClose={fecharMenu} onOpen={abrirMenu}/>
    </View>
  );
}

function criarEstilos(cores: {
  fundo: string;
  card: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  laranja: string;
  vermelho: string;
  iconeFundo: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    header: {
      minHeight: 54,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      backgroundColor: cores.azul,
    },

    btnMenu: {
      width: 40,
      height: 44,
      justifyContent: "center",
      alignItems: "flex-start",
    },

    headerTitle: {
      flex: 1,
      fontSize: 18,
      fontWeight: "800",
      color: "#FFFFFF",
      textAlign: "center",
    },

    headerEspaco: {
      width: 40,
    },

    content: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    scrollContent: {
      paddingBottom: 30,
    },

    perfilBox: {
      flexDirection: "row",
      alignItems: "center",
      padding: 18,
      backgroundColor: cores.card,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
      gap: 14,
    },

    avatarContainer: {
      width: 66,
      height: 66,
      position: "relative",
    },

    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: cores.borda,
    },

    cameraIcon: {
      position: "absolute",
      right: 0,
      bottom: 0,
      backgroundColor: "#000000",
      width: 21,
      height: 21,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "#FFFFFF",
    },

    perfilInfo: {
      flex: 1,
    },

    nome: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.texto,
    },

    email: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 3,
    },

    localRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
    },

    localText: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginLeft: 4,
      fontWeight: "600",
    },

    bio: {
      fontSize: 11,
      color: cores.textoSecundario,
      marginTop: 6,
      lineHeight: 16,
    },

    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      paddingVertical: 16,
      backgroundColor: cores.card,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    statItem: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 2,
    },

    statIconBox: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: cores.iconeFundo,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 5,
    },

    statNumber: {
      fontSize: 14,
      fontWeight: "800",
      color: cores.texto,
    },

    statLabel: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 2,
      textAlign: "center",
    },

    menuContainer: {
      marginTop: 8,
      backgroundColor: cores.card,
      borderTopWidth: 1,
      borderTopColor: cores.borda,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    menuItem: {
      minHeight: 64,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    menuItemUltimo: {
      borderBottomWidth: 0,
    },

    menuIcon: {
      width: 28,
    },

    menuTextBox: {
      flex: 1,
      marginLeft: 8,
    },

    menuTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: cores.texto,
    },

    menuSub: {
      fontSize: 11,
      color: cores.textoSecundario,
      marginTop: 3,
    },

    favoritosContainer: {
      padding: 16,
    },

    favoritosHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },

    favoritosTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.texto,
    },

    verTodos: {
      color: cores.laranja,
      fontSize: 12,
      fontWeight: "700",
    },

    favoritosRow: {
      flexDirection: "row",
      gap: 12,
    },

    favCard: {
      flex: 1,
      minWidth: 0,
      backgroundColor: cores.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: cores.borda,
      overflow: "hidden",
    },

    favImg: {
      width: "100%",
      height: 100,
      backgroundColor: cores.borda,
    },

    favInfo: {
      paddingHorizontal: 8,
      paddingTop: 8,
      paddingBottom: 10,
    },

    favNome: {
      fontSize: 11,
      color: cores.texto,
      fontWeight: "700",
      lineHeight: 15,
    },

    favDetalhe: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 4,
    },

    favPreco: {
      fontSize: 11,
      color: cores.azul,
      fontWeight: "800",
      marginTop: 6,
    },
  });
}
