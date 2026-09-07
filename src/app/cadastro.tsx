import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitou, setAceitou] = useState(false);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden").catch(()=>{});
  }, []);

  function criarConta() {
    if (!nome.trim() || !email.trim() || !telefone.trim() || !senha.trim() || !confirmarSenha.trim()) {
      return Alert.alert("Atenção", "Preencha todos os campos");
    }
    if (senha !== confirmarSenha) {
      return Alert.alert("Erro", "As senhas não conferem");
    }
    if (!aceitou) {
      return Alert.alert("Atenção", "Marque o checkbox de termos");
    }
    // ARQUIVO AGORA É TUDO MINUSCULO: cadastroconcluido.tsx
    router.push("/cadastroconcluido" as any);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.titulo}>criar conta</Text>
        <Text style={styles.subtitulo}>Preencha os dados abaixo para{"\n"}criar sua conta.</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Nome completo*</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={16} color="#FF8C00" style={styles.icon} />
            <TextInput placeholder="Digite seu nome completo" value={nome} onChangeText={setNome} style={styles.input} placeholderTextColor="#999" />
          </View>
          <Text style={styles.label}>E-mail*</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={16} color="#FF8C00" style={styles.icon} />
            <TextInput placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} placeholderTextColor="#999" />
          </View>
          <Text style={styles.label}>Telefone*</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={16} color="#FF8C00" style={styles.icon} />
            <TextInput placeholder="Digite seu telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" style={styles.input} placeholderTextColor="#999" />
          </View>
          <Text style={styles.label}>Senha*</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={16} color="#FF8C00" style={styles.icon} />
            <TextInput placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} placeholderTextColor="#999" />
          </View>
          <Text style={styles.label}>Confirmar senha*</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={16} color="#FF8C00" style={styles.icon} />
            <TextInput placeholder="confirme sua senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry style={styles.input} placeholderTextColor="#999" />
          </View>
          <TouchableOpacity style={styles.termos} onPress={() => setAceitou(!aceitou)}>
            <View style={[styles.checkbox, aceitou && styles.checkboxAtivo]}>{aceitou && <Ionicons name="checkmark" size={12} color="#fff" />}</View>
            <Text style={styles.termosTexto}>Ao continuar você concorda com os <Text style={styles.linkLaranja}>Termos de Politica e Privacidade.</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAzul} onPress={() => router.push("/cadastroconcluido" as any)}>
            <Text style={styles.botaoAzulTexto}>Criar conta nova</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoBranco} onPress={() => router.push("/login" as any)}>
            <Text style={styles.botaoBrancoTexto}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 24, alignItems: "center" },
  logo: { width: 220, height: 70, marginTop: 10 },
  titulo: { fontSize: 26, color: "#FF8C00", fontWeight: "400", marginTop: 10, textTransform: "lowercase" },
  subtitulo: { fontSize: 13, color: "#000", textAlign: "center", marginTop: 4, marginBottom: 20, lineHeight: 18, fontWeight: "500" },
  form: { width: "100%" },
  label: { fontSize: 12, fontWeight: "bold", color: "#000", marginBottom: 4, marginTop: 10 },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#000", borderRadius: 8, paddingHorizontal: 10, height: 44, backgroundColor: "#fff" },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 13, color: "#000", height: "100%" },
  termos: { flexDirection: "row", alignItems: "flex-start", marginTop: 14, marginBottom: 20 },
  checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: "#000", borderRadius: 3, marginRight: 6, marginTop: 1, alignItems: "center", justifyContent: "center" },
  checkboxAtivo: { backgroundColor: "#0866FF", borderColor: "#0866FF" },
  termosTexto: { fontSize: 10, color: "#000", flex: 1, lineHeight: 13 },
  linkLaranja: { color: "#FF8C00", fontWeight: "500" },
  botaoAzul: { backgroundColor: "#0B5FFF", height: 46, borderRadius: 8, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  botaoAzulTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  botaoBranco: { backgroundColor: "#fff", height: 46, borderRadius: 8, borderWidth: 1, borderColor: "#000", alignItems: "center", justifyContent: "center" },
  botaoBrancoTexto: { color: "#0B5FFF", fontWeight: "bold", fontSize: 15 },
});
