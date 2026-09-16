import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
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
        {/* CHECK */}
        <Image 
          source={require("../../assets/images/check_sucesso.png")} 
          style={styles.imagemCheck} 
          resizeMode="contain" />

        <Text style={styles.titulo}>Cadastro Concluido{"\n"}com sucesso!</Text>
        <Text style={styles.sub}>Sua conta foi criada com sucesso. Agora{"\n"}você pode explorar milhares de imóveis{"\n"}para alugar!</Text>
        {/* CASA COM IMAGEM - TROCA AQUI */}
        <Image 
          source={require("../../assets/images/casa_chaves.png")} 
          style={styles.imagemCasa} 
          resizeMode="contain" 
        />

        <TouchableOpacity style={styles.botao} onPress={() => router.replace("/(tabs)" as any)}>
          <Text style={styles.botaoText}>Explorar Imóveis</Text>
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
  imagemCheck: {
    width: 200,
    height: 200,
    marginTop: 25,
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
  imagemCasa: {
    width: 220,
    height: 150,
    marginTop: 28,
    marginBottom: 28,
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