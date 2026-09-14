import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
export default function SenhaSalva() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* LOGO AZUL */}
      <View style={styles.logoArea}>
        <Image 
          source={require("../../assets/images/logo.png")} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>
      <View style={styles.conteudo}>
        {/* CHECK */}
        <Image 
          source={require("../../assets/images/check_sucesso.png")} 
          style={styles.checkImg}
          resizeMode="contain" />
        <Text style={styles.titulo}>Senha salva com{"\n"}sucesso!</Text>
        <Text style={styles.sub}>
          Sua senha foi salva com sucesso. Agora{"\n"}
          você pode explorar milhares de imóveis{"\n"}
          para alugar!
        </Text>
        {/* CASA */}
        <Image 
          source={require("../../assets/images/casa_chaves.png")} 
          style={styles.casaImg}
          resizeMode="contain"
        />
      </View>
      {/* BOTAO LARANJA LA EM BAIXO */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/" as any)}>
          <Text style={styles.btnTxt}>Explora Imóveis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFF" 
  },
  logoArea: { 
    alignItems: "center", 
    paddingTop: 12, 
    paddingBottom: 8,
  },
  logo: { 
    width: 210, 
    height: 110 
  },
  conteudo: { 
    flex: 1, 
    alignItems: "center", 
    paddingHorizontal: 24, 
    paddingTop: 10 
  },
  checkImg: { 
    width: 180, 
    height: 200, 
    marginBottom: 10,
    marginTop: -40 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: "900", 
    color: "#000", 
    textAlign: "center", 
    lineHeight: 26, 
    marginBottom: 12 
  },
  sub: { 
    fontSize: 12, 
    color: "#555", 
    textAlign: "center", 
    lineHeight: 16, 
    marginBottom: 10 
  },
  casaImg: { 
    width: 220, 
    height: 150, 
    marginTop: 10 
  },
  footer: { 
    paddingHorizontal: 20, 
    paddingBottom: 28, 
    paddingTop: 10 
  },
  btn: { 
    backgroundColor: "#FF8C00", 
    height: 46, 
    borderRadius: 8, 
    alignItems: "center", 
    justifyContent: "center", 
    width: "100%" 
  },
  btnTxt: { 
    color: "#fff", 
    fontWeight: "800", 
    fontSize: 14 
  },
});