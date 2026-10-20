
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function Recuperar() {
  const router = useRouter();
  const { dark } = useTheme();
  const [email, setEmail] = useState("");
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#000000",
    textoSecundario: dark ? "#BDBDBD" : "#666666",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    borda: dark ? "#555555" : "#000000",
    azul: "#0B5FFF",
    laranja: "#FF8C00",
  };
  const styles = criarEstilos(cores);
  function enviarCodigo() {
    const emailLimpo = email.trim();

    if (!emailLimpo) {
      Alert.alert("Campo obrigatório", "Digite seu e-mail para continuar.");
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(emailLimpo)) {
      Alert.alert(
        "E-mail inválido",
        "Confira o endereço de e-mail e tente novamente."
      );
      return;
    }

    Alert.alert(
      "Recuperação de senha",
      "O e-mail foi validado, mas o envio do código ainda não está configurado. É necessário conectar um serviço de recuperação de senha."
    );
  }

  function recuperarPorCelular() {
    Alert.alert(
      "Recuperação por celular",
      "A recuperação por número de celular ainda precisa ser implementada."
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.teclado}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Logo no topo */}
          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logoTopo}
            resizeMode="contain"
          />

          <Text style={styles.titulo}>Recuperar Senha</Text>

          <Text style={styles.subtitulo}>
            Digite seu e-mail para receber o código de recuperação
          </Text>

          {/* Ícone de cadeado */}
          <Image
            source={require("../../assets/images/cadeado.png")}
            style={styles.iconeMeio}
            resizeMode="contain"
          />

          {/* Campo de e-mail */}
          <Text style={styles.label}>E-mail</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={cores.textoSecundario}
              style={styles.inputIcon}
            />

            <TextInput
              placeholder="Digite seu e-mail"
              placeholderTextColor={cores.textoSecundario}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="send"
              onSubmitEditing={enviarCodigo}
            />
          </View>

          {/* Botão para enviar o código */}
          <TouchableOpacity
            style={styles.botao}
            onPress={enviarCodigo}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>Enviar código</Text>
          </TouchableOpacity>

          {/* Recuperação por celular */}
          <TouchableOpacity
            onPress={recuperarPorCelular}
            activeOpacity={0.7}
          >
            <Text style={styles.linkLaranja}>
              Recuperar senha com número de celular
            </Text>
          </TouchableOpacity>

          {/* Voltar para o login */}
          <TouchableOpacity
            onPress={() => router.push("/login" as any)}
            style={styles.voltar}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color={cores.texto}
            />

            <Text style={styles.voltarTexto}> Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function criarEstilos(cores: {
  fundo: string;
  texto: string;
  textoSecundario: string;
  superficie: string;
  borda: string;
  azul: string;
  laranja: string;
}) {
  return StyleSheet.create({
    teclado: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    scroll: {
      flexGrow: 1,
    },

    container: {
      flexGrow: 1,
      backgroundColor: cores.fundo,
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 32,
      alignItems: "center",
    },

    logoTopo: {
      width: 220,
      height: 80,
      marginTop: 20,
      marginBottom: 20,
    },

    titulo: {
      fontSize: 22,
      fontWeight: "bold",
      color: cores.texto,
      marginTop: 10,
      textAlign: "center",
    },

    subtitulo: {
      fontSize: 13,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 8,
      marginBottom: 10,
      lineHeight: 20,
    },

    iconeMeio: {
      width: 140,
      height: 140,
      marginVertical: 20,
    },

    label: {
      alignSelf: "flex-start",
      fontWeight: "600",
      color: cores.texto,
      marginBottom: 6,
      marginTop: 10,
      fontSize: 14,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 10,
      width: "100%",
      paddingHorizontal: 12,
      height: 50,
      backgroundColor: cores.superficie,
    },

    inputIcon: {
      marginRight: 8,
    },

    input: {
      flex: 1,
      fontSize: 14,
      color: cores.texto,
      height: "100%",
    },

    botao: {
      backgroundColor: cores.azul,
      width: "100%",
      minHeight: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },

    botaoTexto: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },

    linkLaranja: {
      color: cores.laranja,
      fontWeight: "600",
      marginTop: 20,
      fontSize: 13,
      textAlign: "center",
    },

    voltar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
      paddingVertical: 8,
    },

    voltarTexto: {
      fontWeight: "600",
      color: cores.texto,
      fontSize: 14,
    },
  });
}
