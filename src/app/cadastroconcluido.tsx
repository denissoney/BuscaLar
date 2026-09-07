import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

export default function CadastroConcluido() {
  const router = useRouter();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden").catch(()=>{});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        <View style={styles.checkWrapper}>
          <View style={styles.confettiDot1} />
          <View style={styles.confettiDot2} />
          <View style={styles.confettiDot3} />
          <View style={styles.confettiDot4} />
          <View style={styles.confettiDot5} />
          <View style={styles.confettiDot6} />
          <View style={styles.greenCircle}>
            <Ionicons name="checkmark" size={55} color="#fff" />
          </View>
        </View>
        <Text style={styles.titulo}>Cadastro Concluido{"\n"}com sucesso!</Text>
        <Text style={styles.sub}>Sua conta foi criada com sucesso. Agora{"\n"}você pode explorar milhares de imóveis{"\n"}para alugar!</Text>
        <View style={styles.casaBox}>
          <View style={styles.casa}>
            <View style={styles.telhado} />
            <View style={styles.corpoCasa}>
              <View style={styles.janelas}>
                <View style={styles.janela} />
                <View style={styles.janela} />
              </View>
              <View style={styles.porta} />
            </View>
          </View>
          <View style={styles.chavesBox}>
            <Ionicons name="key" size={38} color="#FFB84D" style={styles.key1} />
            <Ionicons name="key" size={34} color="#FF8C00" style={styles.key2} />
          </View>
        </View>
        <TouchableOpacity style={styles.botao} onPress={() => router.replace("/(tabs)" as any)}>
          <Text style={styles.botaoText}>Explora Imóveis</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  scroll: { 
    alignItems: "center", 
    padding: 24, 
    paddingTop: 10 
  },
  logo: { 
    width: 200, 
    height: 70, 
    marginTop: 5 
  },
  checkWrapper: { 
    marginTop: 25,
    width: 130, 
    height: 130, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  greenCircle: { 
    width: 95, 
    height: 95, 
    borderRadius: 47.5, 
    backgroundColor: "#2EBB4E", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  confettiDot1: { 
    position: "absolute", 
    top: 5, 
    left: 15, 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: "#0B5FFF" 
  },
  confettiDot2: { 
    position: "absolute", 
    top: 0, 
    right: 25, 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: "#FF8C00" 
  },
  confettiDot3: { 
    position: "absolute", 
    top: 40, 
    left: 0, 
    width: 7, 
    height: 7, 
    borderRadius: 3.5, 
    backgroundColor: "#FFD60A" 
  },
  confettiDot4: { 
    position: "absolute", 
    top: 45, 
    right: 0, 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: "#0B5FFF" 
  },
  confettiDot5: { 
    position: "absolute", 
    bottom: 10, 
    left: 10, 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: "#2EBB4E" 
  },
  confettiDot6: { 
    position: "absolute", 
    bottom: 5, 
    right: 15, 
    width: 7, 
    height: 7, 
    borderRadius: 3.5, 
    backgroundColor: "#FF3B30" 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: "800", 
    color: "#000", 
    textAlign: "center", 
    marginTop: 18, 
    lineHeight: 27 
  },
  sub: { 
    fontSize: 13, 
    color: "#444", 
    textAlign: "center", 
    marginTop: 8, 
    lineHeight: 18 
  },
  casaBox: { 
    flexDirection: "row",
    alignItems: "flex-end", 
    marginTop: 28, 
    marginBottom: 28 
  },
  casa: { 
    alignItems: "center" 
  },
  telhado: { 
    width: 0, 
    height: 0, 
    borderLeftWidth: 50, 
    borderRightWidth: 50, 
    borderBottomWidth: 32, 
    borderLeftColor: "transparent", 
    borderRightColor: "transparent", 
    borderBottomColor: "#1E3A8A" 
  },
  corpoCasa: { 
    width: 85, 
    height: 65, 
    backgroundColor: "#FFF7CC", 
    borderWidth: 1.5, 
    borderColor: "#000", 
    alignItems: "center", 
    paddingTop: 8 
  },
  janelas: { 
    flexDirection: "row", 
    gap: 12 
  },
  janela: { 
    width: 20, 
    height: 20, 
    backgroundColor: "#6CB4FF", 
    borderWidth: 1, 
    borderColor: "#000" 
  },
  porta: { 
    width: 22, 
    height: 30, 
    backgroundColor: "#3B82F6", 
    borderWidth: 1, 
    borderColor: "#000", 
    marginTop: 6 
  },
  chavesBox: { 
    flexDirection: "row", 
    marginLeft: 8, 
    marginBottom: 8 
  },
  key1: { 
    transform: [{ rotate: "20deg" }] 
  },
  key2: { 
    transform: [{ rotate: "-15deg" }], 
    marginLeft: -10, 
    marginTop: 10 
  },
  botao: { 
    width: "100%", 
    height: 48, 
    backgroundColor: "#FF8C00", 
    borderRadius: 10, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 10 
  },
  botaoText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});
