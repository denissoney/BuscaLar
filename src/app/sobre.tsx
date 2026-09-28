import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Sobre() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER AZUL IGUAL DA PRINT */}
      <View style={styles.headerAzul}>
        <View style={styles.logoRow}>
          <Image source={require("../../assets/images/BuscaLar-preto.png")} style={{ width: 150, height: 45 }} resizeMode="contain"/>
        </View>
      </View>
      {/* CARD BRANCO */}
      <View style={styles.cardBranco}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Sobre o aplicativo</Text>
          {/* LINHA LARANJA */}
          <View style={styles.linhaLaranjaContainer}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </View>
          <Text style={styles.versao}>Versão 1.0.0</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.boxCinza}>
            <Text style={styles.textoDescricao}>
              BuscaLar é a plataforma que conecta você ao seu lar ideal.{"\n"}
              Busque imóveis para alugar de forma rápida, segura e personalizada, tudo em só lugar.
            </Text>

            <View style={styles.missaoRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="globe-outline" size={14} color="#0B5FFF" />
              </View>
              <Text style={styles.missaoTitulo}>Nossa Missão</Text>
            </View>
            <Text style={styles.missaoTexto}>
              Facilitar a jornada de encontrar um lar, oferecendo tecnologia, transparência e confiança para que você tome a melhor decisão da sua vida e sua família.
            </Text>
          </View>

          <View style={styles.boxCinza}>
            <View style={styles.recursosHeader}>
              <Text style={styles.emoji}>📢</Text>
              <Text style={styles.missaoTitulo}>Recursos</Text>
            </View>

            <View style={styles.recursoItem}>
              <Ionicons name="search" size={16} color="#0B5FFF" />
              <View style={{ flex: 1 }}>
                <Text style={styles.recursoTitulo}>Busca Inteligente</Text>
                <Text style={styles.recursoDesc}>Filtro avançados por preço, bairro, tipo e características.</Text>
              </View>
            </View>

            <View style={styles.recursoItem}>
              <Ionicons name="heart" size={16} color="#0B5FFF" />
              <View style={{ flex: 1 }}>
                <Text style={styles.recursoTitulo}>Favoritas em Tempo Real</Text>
                <Text style={styles.recursoDesc}>Salve seus imóveis preferidos e receba atualizações instantâneas.</Text>
              </View>
            </View>

            <View style={styles.recursoItem}>
              <Ionicons name="notifications" size={16} color="#0B5FFF" />
              <View style={{ flex: 1 }}>
                <Text style={styles.recursoTitulo}>Alertas Personalizados</Text>
                <Text style={styles.recursoDesc}>Receba notificações de novos imóveis no seu perfil</Text>
              </View>
            </View>
          </View>

          <Text style={styles.devTitulo}>Desenvolvedores</Text>
          <View style={styles.devRow}>
            <View style={styles.devCard}>
              <Image source={{ uri: "https://i.pravatar.cc/100?img=8" }} style={styles.devAvatar} />
              <Text style={styles.devNome}>Davi Miguel</Text>
              <Text style={styles.devCargo}>Desing e Front-and</Text>
            </View>
            <View style={styles.devCard}>
              <Image source={{ uri: "https://i.pravatar.cc/100?img=12" }} style={styles.devAvatar} />
              <Text style={styles.devNome}>Denisoney</Text>
              <Text style={styles.devCargo}>Desenvolvedor Full Stack</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#448aff" 
  },
  headerAzul: { 
    backgroundColor: "#488aff", 
    paddingHorizontal: 14, 
    paddingBottom: 10, 
    height: 110,
    width: 120,
    marginBottom: -10
  },
  logoRow: { 
    flexDirection: "row", 
    alignItems: "center",
    width: 120,
    height: 100,
    marginBottom: -10
  },
  cardBranco: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    marginTop: -10,
  },
  backBtn: { 
    alignSelf: "flex-start", 
    padding: 4 }
    ,
  tituloContainer: { 
    alignItems: "center", 
    marginTop: 4, 
    marginBottom: 14 
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: "800", 
    color: "#000" 
  },
  versao: { 
    fontSize: 11, 
    color: "#888", 
    marginTop: 6 
  },
  // LINHA LARANJA 
  linhaLaranjaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    height: 4,
    backgroundColor: "#FF8C00"
  },
traco: {
    height: 2.8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  boxCinza: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  textoDescricao: { 
    fontSize: 12, 
    color: "#555", 
    lineHeight: 16 
  },
  missaoRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6, 
    marginTop: 12, 
    marginBottom: 4 
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#0B5FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  missaoTitulo: { 
    fontSize: 14, 
    fontWeight: "800", 
    color: "#000" 
  },
  missaoTexto: { 
    fontSize: 11, 
    color: "#555", 
    lineHeight: 14 
  },
  recursosHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6, 
    marginBottom: 10 
  },
  emoji: { 
    fontSize: 12 
  },
  recursoItem: { 
    flexDirection: "row", 
    gap: 8, 
    marginBottom: 12, 
    alignItems: "flex-start" 
  },
  recursoTitulo: { 
    fontSize: 12, 
    fontWeight: "800", 
    color: "#000" 
  },
  recursoDesc: { 
    fontSize: 10, 
    color: "#666", 
    marginTop: 1 
  },
  devTitulo: { 
    fontSize: 15, 
    fontWeight: "800", 
    color: "#000", 
    marginTop: 4, 
    marginBottom: 12 
  },
  devRow: { 
    flexDirection: "row", 
    justifyContent: "space-around" 
  },
  devCard: { 
    alignItems: "center", 
    width: 120
  },
  devAvatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    marginBottom: 6 
  },
  devNome: { 
    fontSize: 12, 
    fontWeight: "700", 
    color: "#000" 
  },
  devCargo: { 
    fontSize: 10, 
    color: "#555", 
    textAlign: "center" 
  },
});