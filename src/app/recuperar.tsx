import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Recuperar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* LOGO SÓ UMA VEZ NO TOPO */}
      <Image 
        source={require("../../assets/images/BuscaLar-preto.png")} 
        style={styles.logoTopo} 
        resizeMode="contain" 
      />

      <Text style={styles.titulo}>Recuperar Senha</Text>
      <Text style={styles.subtitulo}>Digite seu e-mail para receber o código de recuperação</Text>

      {/* AQUI VAI O ÍCONE DO MEIO - NÃO A LOGO */}
      <Image 
        source={require("../../assets/images/cadeado.png")} 
        style={styles.iconeMeio} 
        resizeMode="contain" 
      />

      <Text style={styles.label}>E-mail</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>✉️</Text>
        <TextInput 
          placeholder="Digite seu e-mail" 
          style={styles.input} 
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Enviar código</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.linkLaranja}>Recuperar senha com número de celular</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login" as any)} style={styles.voltar}>
        <Ionicons name="arrow-back" size={18} color="#000" />
        <Text style={styles.voltarTexto}> Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, alignItems: "center" },
  logoTopo: { width: 220, height: 80, marginTop: 40, marginBottom: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#000", marginTop: 10 },
  subtitulo: { fontSize: 13, color: "#666", textAlign: "center", marginTop: 8, marginBottom: 10 },
  iconeMeio: { width: 140, height: 140, marginVertical: 20 },
  label: { alignSelf: "flex-start", fontWeight: "600", marginBottom: 6, marginTop: 10 },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#000", borderRadius: 10, width: "100%", paddingHorizontal: 12, height: 50 },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontSize: 14 },
  botao: { backgroundColor: "#0B5FFF", width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 20 },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkLaranja: { color: "#FF8C00", fontWeight: "600", marginTop: 20, fontSize: 13 },
  voltar: { flexDirection: "row", alignItems: "center", marginTop: 24 },
  voltarTexto: { fontWeight: "600", color: "#000" },
});