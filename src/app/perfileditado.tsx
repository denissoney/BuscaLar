import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PerfilEditado() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* LOGO */}
      <View style={styles.logoArea}>
        <Image 
          source={require("../../assets/images/logo.png")} 
          style={styles.logoImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.conteudo}>
        <Image source={require("../../assets/images/check_sucesso.png")} style={styles.checkImg} resizeMode="contain" />
        <Text style={styles.titulo}>Perfil editado com{"\n"}sucesso</Text>
        <Image source={require("../../assets/images/casa_chaves.png")} style={styles.casaImg} resizeMode="contain" />
        <TouchableOpacity style={styles.btnLaranja} onPress={() => router.push("/(tabs)" as any)}>
          <Text style={styles.btnTexto}>Explora Imóveis</Text>
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
    marginBottom: 10, 
  },
  logoImg: { 
    width: 260, 
    height: 90, 
  },
  conteudo: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "flex-start", 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  checkImg: { 
    width: 160, 
    height: 160, 
    marginBottom: 15,
    marginTop: 0,
  },
  titulo: { 
    fontSize: 25, 
    fontWeight: "700", 
    color: "#000", 
    textAlign: "center", 
    lineHeight: 22, 
    marginBottom: 25, 
    marginTop: 20,
  },
  casaImg: { 
    width: 160, 
    height: 120, 
    marginBottom: 30,
    marginTop: 50,
  },
  btnLaranja: { 
    backgroundColor: "#FF8C00", 
    height: 42, 
    borderRadius: 8, 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center",
    marginTop: "auto"
  },
  btnTexto: { 
    color: "#FFF", 
    fontWeight: "700", 
    fontSize: 14 
  },
});