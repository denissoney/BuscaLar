import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
export default function SalvoSucesso() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* 1 - LOGO AQUI */}
        <Image  source={require("/home/usuario/Desktop/BuscaLar/assets/images/logo.png")}  style={styles.logo} resizeMode="contain"/>
        {/* 2 - CHECK AQUI */}
        <Image  source={require("/home/usuario/Desktop/BuscaLar/assets/images/check_sucesso.png")}  style={styles.check} resizeMode="contain"/>
        <Text style={styles.title}>Usuario salvo com sucesso!</Text>
        <Text style={styles.subTitle}>
          Seu perfil foi atualizado com sucesso. Agora você pode explorar milhares de imóveis para alugar!
        </Text>
        {/* 3 -  CASA COM CHAVES AQUI */}
        <Image  source={require("/home/usuario/Desktop/BuscaLar/assets/images/casa_chaves.png")}  style={styles.casa} resizeMode="contain"/>

        <TouchableOpacity  style={styles.btn}  activeOpacity={0.8}  onPress={() => router.replace("/usuario" as any)}>
          <Text style={styles.btnText}>Voltar para o perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
},
  content: { 
    flex: 1, 
    alignItems: "center", 
    paddingHorizontal: 24, 
    paddingTop: 20 
},
  logo: {
    width: 220,
    height: 70,
    marginBottom: 30,
},
  check: {
    width: 140,
    height: 140,
    marginBottom: 20,
},
  title: { 
    fontSize: 22, 
    fontWeight: "900", 
    color: "#000", 
    textAlign: "center",
    lineHeight: 26 
},
  subTitle: { 
    fontSize: 12, 
    color: "#333", 
    textAlign: "center", 
    marginTop: 12, 
    lineHeight: 16, 
    paddingHorizontal: 10 
},
  casa: {
    width: 180,
    height: 140,
    marginTop: 30,
},
  btn: { 
    position: "absolute", 
    bottom: 30, 
    width: "100%", 
    height: 50, 
    backgroundColor: "#FF8C00", 
    borderRadius: 12, 
    alignItems: "center", 
    justifyContent: "center" 
},
  btnText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "800" 
},
});