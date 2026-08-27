import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function isEmailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aceitou, setAceitou] = useState(false);

  function handleLogin() {
    const emailTratado = email.trim().toLowerCase();
    const senhaTratada = senha.trim();

    if (!emailTratado || !senhaTratada) {
      return Alert.alert("Erro", "Digite e-mail e senha");
    }

    if (!isEmailValido(emailTratado)) {
      return Alert.alert("E-mail inválido", "Digite um e-mail válido. Ex: seuemail@gmail.com");
    }
    
    if (!aceitou) {
      return Alert.alert(
        "Termos não aceitos", 
        "Você precisa marcar a opção de Termos de Política e Privacidade para continuar."
      );
    }

    // AQUI: aceita qualquer e-mail válido e qualquer senha com + de 3 letras
    // Se quiser deixar senha totalmente livre, apaga esse if de baixo
    if (senhaTratada.length < 3) {
      return Alert.alert("Senha inválida", "Digite pelo menos 3 caracteres");
    }

    router.replace("/(tabs)" as any);
  }

  function irParaCadastro(){
    router.push("/cadastro" as any)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <Image 
          source={require("../../../BuscaLar/assets/images/logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Login</Text>
        <Text style={styles.subtitulo}>Seja Bem-vindo faça login para continuar</Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={14} color="#FF8C00" style={styles.icon} />
            <TextInput
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={14} color="#FF8C00" style={styles.icon} />
            <TextInput
              placeholder="********"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              style={styles.input}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons name={mostrarSenha ? "eye-off" : "eye"} size={18} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.esqueceuContainer}>
            <Text style={styles.esqueceuTexto}>Esqueceu a senha?</Text>
            <TouchableOpacity onPress={() => Alert.alert("Recuperar senha")}>
              <Text style={styles.esqueceuLink}>clique aqui</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.termos} onPress={() => setAceitou(!aceitou)}>
            <View style={[styles.checkbox, aceitou && styles.checkboxAtivo]}>
              {aceitou && <Ionicons name="checkmark" size={10} color="#fff" />}
            </View>
            <Text style={styles.termosTexto}>
              Ao continuar você concorda com os <Text style={styles.linkLaranja}>Termos de Politica e Privacidade</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoAzul} onPress={handleLogin}>
            <Text style={styles.botaoAzulTexto}>ENTRAR</Text>
          </TouchableOpacity>

          <View style={styles.divisorContainer}>
            <View style={styles.linha} />
            <Text style={styles.divisorTexto}>ou</Text>
            <View style={styles.linha} />
          </View>

          <TouchableOpacity style={styles.botaoBranco} onPress={irParaCadastro}>
            <Text style={styles.botaoBrancoTextoAzul}>Cadastre-se</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoBranco} onPress={() => Alert.alert("Google")}>
            <View style={styles.botaoComIcone}>
              <Text style={styles.iconGoogle}>G</Text>
              <Text style={styles.botaoBrancoTexto}>Entrar com Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoBranco} onPress={() => Alert.alert("Facebook")}>
            <View style={styles.botaoComIcone}>
              <View style={styles.iconFacebook}><Text style={styles.iconFacebookText}>f</Text></View>
              <Text style={styles.botaoBrancoTexto}>Entrar com Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 24, alignItems: "center" },
  logo: { width: 220, height: 80, marginTop: 20, backgroundColor: "transparent" },
  titulo: { fontSize: 28, color: "#FF8C00", fontWeight: "400", marginTop: 15 },
  subtitulo: { fontSize: 12, color: "#000", marginTop: 2, marginBottom: 20, fontWeight: "500" },
  form: { width: "100%" },
  label: { fontSize: 12, fontWeight: "bold", color: "#000", marginBottom: 4, marginTop: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 38,
    backgroundColor: "#fff",
  },
  icon: { marginRight: 6 },
  input: { flex: 1, fontSize: 12, color: "#000", height: "100%" },
  esqueceuContainer: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6, marginBottom: 10 },
  esqueceuTexto: { fontSize: 11, color: "#000" },
  esqueceuLink: { fontSize: 11, color: "#FF8C00", marginLeft: 3, fontWeight: "bold" },
  termos: { flexDirection: "row", alignItems: "flex-start", marginBottom: 15 },
  checkbox: {
    width: 14, height: 14, borderWidth: 1, borderColor: "#000", borderRadius: 2,
    marginRight: 6, marginTop: 1, alignItems: "center", justifyContent: "center",
  },
  checkboxAtivo: { backgroundColor: "#0B5FFF", borderColor: "#0B5FFF" },
  termosTexto: { fontSize: 9, color: "#000", flex: 1, lineHeight: 11 },
  linkLaranja: { color: "#FF8C00" },
  botaoAzul: {
    backgroundColor: "#0B5FFF", height: 40, borderRadius: 8,
    alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  botaoAzulTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  divisorContainer: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  linha: { flex: 1, height: 1, backgroundColor: "#000" },
  divisorTexto: { marginHorizontal: 12, fontSize: 14, fontWeight: "bold", color: "#000" },
  botaoBranco: {
    backgroundColor: "#fff", height: 40, borderRadius: 8, borderWidth: 1,
    borderColor: "#000", alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  botaoBrancoTextoAzul: { color: "#0B5FFF", fontWeight: "bold", fontSize: 14 },
  botaoBrancoTexto: { color: "#000", fontWeight: "500", fontSize: 13 },
  botaoComIcone: { flexDirection: "row", alignItems: "center" },
  iconGoogle: { fontSize: 16, fontWeight: "bold", color: "#DB4437", marginRight: 8 },
  iconFacebook: { width: 18, height: 18, backgroundColor: "#1877F2", borderRadius: 9, alignItems: "center", justifyContent: "center", marginRight: 8 },
  iconFacebookText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});