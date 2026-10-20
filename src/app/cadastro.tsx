
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../contexts/ThemeContext";

export default function Cadastro() {
  const router = useRouter();
  const { dark } = useTheme();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitou, setAceitou] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#444444",
    campo: dark ? "#202020" : "#FFFFFF",
    borda: dark ? "#555555" : "#222222",
    placeholder: dark ? "#999999" : "#888888",
    azul: "#0B5FFF",
    laranja: "#FF8C00",
    botaoSecundario: dark ? "#202020" : "#FFFFFF",
  };

  const styles = criarEstilos(cores);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden").catch(() => {});
  }, []);

  function criarConta() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (nome.trim().split(/\s+/).length < 2) {
      Alert.alert(
        "Nome incompleto",
        "Digite seu nome e sobrenome."
      );
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      Alert.alert("E-mail inválido", "Digite um endereço de e-mail válido.");
      return;
    }

    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 13) {
      Alert.alert(
        "Telefone inválido",
        "Digite um telefone válido com DDD."
      );
      return;
    }

    if (senha.length < 8) {
      Alert.alert(
        "Senha muito curta",
        "Sua senha precisa ter pelo menos 8 caracteres."
      );
      return;
    }

    if (!/[A-Za-zÀ-ÿ]/.test(senha) || !/[0-9]/.test(senha)) {
      Alert.alert(
        "Senha inválida",
        "Use pelo menos uma letra e um número na senha."
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }

    if (!aceitou) {
      Alert.alert(
        "Atenção",
        "Você precisa aceitar os termos de uso e a política de privacidade."
      );
      return;
    }

    // Continua para a tela de conclusão.
    // O cadastro real precisa ser integrado ao sistema de autenticação.
    router.push("/cadastroconcluido" as any);
  }

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar hidden />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* LOGO */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* TÍTULO */}
          <Text style={styles.titulo}>criar conta</Text>

          <Text style={styles.subtitulo}>
            Preencha os dados abaixo para{"\n"}criar sua conta.
          </Text>

          <View style={styles.form}>
            {/* NOME */}
            <Text style={styles.label}>
              Nome completo<Text style={styles.asterisco}> *</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={17}
                color={cores.laranja}
                style={styles.icon}
              />

              <TextInput
                placeholder="Digite seu nome completo"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
                placeholderTextColor={cores.placeholder}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                accessibilityLabel="Nome completo"
              />
            </View>

            {/* E-MAIL */}
            <Text style={styles.label}>
              E-mail<Text style={styles.asterisco}> *</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={17}
                color={cores.laranja}
                style={styles.icon}
              />

              <TextInput
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor={cores.placeholder}
                returnKeyType="next"
                accessibilityLabel="E-mail"
              />
            </View>

            {/* TELEFONE */}
            <Text style={styles.label}>
              Telefone<Text style={styles.asterisco}> *</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={17}
                color={cores.laranja}
                style={styles.icon}
              />

              <TextInput
                placeholder="Digite seu telefone com DDD"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor={cores.placeholder}
                returnKeyType="next"
                accessibilityLabel="Telefone"
              />
            </View>

            {/* SENHA */}
            <Text style={styles.label}>
              Senha<Text style={styles.asterisco}> *</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={17}
                color={cores.laranja}
                style={styles.icon}
              />

              <TextInput
                placeholder="Crie uma senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor={cores.placeholder}
                returnKeyType="next"
                accessibilityLabel="Senha"
              />

              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                accessibilityLabel={
                  mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                }
              >
                <Ionicons
                  name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
                  size={19}
                  color={cores.placeholder}
                />
              </TouchableOpacity>
            </View>

            {/* CONFIRMAR SENHA */}
            <Text style={styles.label}>
              Confirmar senha<Text style={styles.asterisco}> *</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={17}
                color={cores.laranja}
                style={styles.icon}
              />

              <TextInput
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!mostrarConfirmacao}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor={cores.placeholder}
                returnKeyType="done"
                onSubmitEditing={criarConta}
                accessibilityLabel="Confirmar senha"
              />

              <TouchableOpacity
                onPress={() =>
                  setMostrarConfirmacao(!mostrarConfirmacao)
                }
                accessibilityLabel={
                  mostrarConfirmacao
                    ? "Ocultar confirmação"
                    : "Mostrar confirmação"
                }
              >
                <Ionicons
                  name={
                    mostrarConfirmacao
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={19}
                  color={cores.placeholder}
                />
              </TouchableOpacity>
            </View>

            {/* ACEITE DOS TERMOS */}
            <TouchableOpacity
              style={styles.termos}
              onPress={() => setAceitou(!aceitou)}
              activeOpacity={0.8}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: aceitou }}
            >
              <View
                style={[
                  styles.checkbox,
                  aceitou && styles.checkboxAtivo,
                ]}
              >
                {aceitou && (
                  <Ionicons
                    name="checkmark"
                    size={12}
                    color="#FFFFFF"
                  />
                )}
              </View>

              <Text style={styles.termosTexto}>
                Ao continuar, você concorda com os{" "}
                <Text style={styles.linkLaranja}>
                  Termos de Uso e Política de Privacidade.
                </Text>
              </Text>
            </TouchableOpacity>

            {/* CRIAR CONTA */}
            <TouchableOpacity
              style={styles.botaoAzul}
              onPress={criarConta}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Text style={styles.botaoAzulTexto}>
                Criar conta nova
              </Text>
            </TouchableOpacity>

            {/* IR PARA LOGIN */}
            <TouchableOpacity
              style={styles.botaoBranco}
              onPress={() => router.push("/login" as any)}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Text style={styles.botaoBrancoTexto}>
                Já tenho uma conta
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const criarEstilos = (cores: {
  fundo: string;
  texto: string;
  textoSecundario: string;
  campo: string;
  borda: string;
  placeholder: string;
  azul: string;
  laranja: string;
  botaoSecundario: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    keyboard: {
      flex: 1,
    },

    scroll: {
      paddingHorizontal: 24,
      paddingTop: 10,
      paddingBottom: 30,
      alignItems: "center",
      flexGrow: 1,
    },

    logo: {
      width: 220,
      height: 70,
      marginTop: 10,
    },

    titulo: {
      fontSize: 26,
      color: cores.laranja,
      fontWeight: "500",
      marginTop: 10,
      textTransform: "lowercase",
    },

    subtitulo: {
      fontSize: 13,
      color: cores.texto,
      textAlign: "center",
      marginTop: 4,
      marginBottom: 20,
      lineHeight: 18,
      fontWeight: "500",
    },

    form: {
      width: "100%",
    },

    label: {
      fontSize: 12,
      fontWeight: "bold",
      color: cores.texto,
      marginBottom: 4,
      marginTop: 10,
    },

    asterisco: {
      color: "#FF3333",
      fontWeight: "bold",
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 8,
      paddingHorizontal: 10,
      minHeight: 44,
      backgroundColor: cores.campo,
    },

    icon: {
      marginRight: 8,
    },

    input: {
      flex: 1,
      fontSize: 13,
      color: cores.texto,
      minHeight: 44,
      paddingVertical: 8,
    },

    termos: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 14,
      marginBottom: 20,
    },

    checkbox: {
      width: 17,
      height: 17,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 3,
      marginRight: 7,
      marginTop: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    checkboxAtivo: {
      backgroundColor: cores.azul,
      borderColor: cores.azul,
    },

    termosTexto: {
      fontSize: 10,
      color: cores.texto,
      flex: 1,
      lineHeight: 15,
    },

    linkLaranja: {
      color: cores.laranja,
      fontWeight: "600",
    },

    botaoAzul: {
      backgroundColor: cores.azul,
      minHeight: 46,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
      paddingHorizontal: 12,
    },

    botaoAzulTexto: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 15,
    },

    botaoBranco: {
      backgroundColor: cores.botaoSecundario,
      minHeight: 46,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: cores.borda,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 12,
    },

    botaoBrancoTexto: {
      color: cores.azul,
      fontWeight: "bold",
      fontSize: 15,
    },
  });
