
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
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext";

function isEmailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Login() {
  const router = useRouter();
  const { dark } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aceitou, setAceitou] = useState(false);
  const [telaRecuperar, setTelaRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [modalCelular, setModalCelular] = useState(false);
  const [celularRecuperar, setCelularRecuperar] = useState("");
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    superficieSecundaria: dark ? "#292929" : "#F7F7F7",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#555555",
    borda: dark ? "#555555" : "#CCCCCC",
    placeholder: dark ? "#999999" : "#888888",
    laranja: "#FF8C00",
    azul: "#0B5FFF",
    branco: "#FFFFFF",
    modalFundo: "rgba(0,0,0,0.55)",
  };

  const styles = criarEstilos(cores);

  useEffect(() => {
    async function esconderBotoesDoCelular() {
      try {
        await NavigationBar.setVisibilityAsync("hidden");
      } catch (error) {
        console.log("Não foi possível esconder a barra:", error);
      }
    }

    esconderBotoesDoCelular();
  }, []);

  async function handleLogin() {
    const emailTratado = email.trim().toLowerCase();
    const senhaTratada = senha.trim();

    if (!emailTratado) {
      Alert.alert("E-mail obrigatório", "Digite seu e-mail.");
      return;
    }

    if (!senhaTratada) {
      Alert.alert("Senha obrigatória", "Digite sua senha.");
      return;
    }

    if (!isEmailValido(emailTratado)) {
      Alert.alert(
        "E-mail inválido",
        "Digite um e-mail válido.\nEx: seuemail@gmail.com"
      );
      return;
    }

    if (senhaTratada.length < 3) {
      Alert.alert(
        "Senha inválida",
        "Digite pelo menos 3 caracteres."
      );
      return;
    }

    if (!aceitou) {
      Alert.alert(
        "Termos não aceitos",
        "Você precisa marcar a opção de Termos de Política e Privacidade."
      );
      return;
    }

    try {
      await AsyncStorage.setItem("logado", "true");
      await AsyncStorage.setItem("emailUsuario", emailTratado);
      router.replace("/(tabs)");
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível entrar no aplicativo. Tente novamente."
      );
    }
  }

  function irParaCadastro() {
    router.push("/cadastro");
  }

  function enviarCodigoEmail() {
    const em = emailRecuperar.trim().toLowerCase();

    if (!em) {
      Alert.alert("E-mail obrigatório", "Digite seu e-mail.");
      return;
    }

    if (!isEmailValido(em)) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido.");
      return;
    }

    Alert.alert(
      "Solicitação registrada",
      `A recuperação para ${em} ainda precisa ser conectada a um serviço de envio de códigos.`
    );
  }

  function enviarCodigoCelular() {
    const numero = celularRecuperar.trim();
    const numeroLimpo = numero.replace(/\D/g, "");

    if (!numero) {
      Alert.alert(
        "Número obrigatório",
        "Digite seu número de celular."
      );
      return;
    }

    if (numeroLimpo.length < 10 || numeroLimpo.length > 13) {
      Alert.alert(
        "Número inválido",
        "Digite um número de celular válido, incluindo o DDD."
      );
      return;
    }

    setModalCelular(false);

    Alert.alert(
      "Solicitação registrada",
      "A recuperação por celular ainda precisa ser conectada a um serviço de envio de códigos."
    );
  }

  function abrirCadastro() {
    setTelaRecuperar(false);
    router.push("/cadastro");
  }

  if (telaRecuperar) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />

        <ScrollView
          contentContainerStyle={styles.scrollRecuperar}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.tituloRecuperar}>
            Recuperar Senha
          </Text>

          <Text style={styles.subtituloRecuperar}>
            Digite seu e-mail para receber o código de recuperação
          </Text>

          <View style={styles.ilustraContainer}>
            <Image
              source={require("../../assets/images/cadeado.png")}
              style={styles.imagemRecuperar}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formRecuperar}>
            <Text style={styles.label}>E-mail</Text>

            <View
              style={[
                styles.inputContainer,
                styles.inputEspacado,
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={16}
                color={cores.laranja}
                style={styles.icon}
              />

              <TextInput
                placeholder="Digite seu e-mail"
                value={emailRecuperar}
                onChangeText={setEmailRecuperar}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor={cores.placeholder}
                returnKeyType="send"
                onSubmitEditing={enviarCodigoEmail}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.botaoAzul,
                styles.botaoEspacado,
              ]}
              onPress={enviarCodigoEmail}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoAzulTexto}>
                Enviar código
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalCelular(true)}
              style={styles.linkCelular}
            >
              <Text style={styles.linkLaranjaCentro}>
                Recuperar senha com número de celular
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTelaRecuperar(false)}
              style={styles.voltarLink}
            >
              <Ionicons
                name="arrow-back"
                size={15}
                color={cores.texto}
              />
              <Text style={styles.voltarTexto}>
                Voltar para o login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* MODAL DE RECUPERAÇÃO POR CELULAR */}
        <Modal
          visible={modalCelular}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setModalCelular(false)}
        >
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalFechar}
                onPress={() => setModalCelular(false)}
                accessibilityLabel="Fechar modal"
              >
                <Ionicons
                  name="close"
                  size={22}
                  color={cores.texto}
                />
              </TouchableOpacity>

              <Ionicons
                name="phone-portrait-outline"
                size={42}
                color={cores.laranja}
                style={styles.modalIcone}
              />

              <Text style={styles.modalTitulo}>
                Recuperar senha
              </Text>

              <Text style={styles.modalSubtitulo}>
                Digite seu número de celular para receber o código
                de recuperação.
              </Text>

              <Text style={styles.modalLabel}>
                Número de celular
              </Text>

              <View style={styles.modalInputContainer}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={cores.laranja}
                  style={styles.icon}
                />

                <TextInput
                  placeholder="(00) 00000-0000"
                  value={celularRecuperar}
                  onChangeText={setCelularRecuperar}
                  keyboardType="phone-pad"
                  style={styles.modalInput}
                  placeholderTextColor={cores.placeholder}
                  maxLength={15}
                  returnKeyType="done"
                  onSubmitEditing={enviarCodigoCelular}
                />
              </View>

              <TouchableOpacity
                style={styles.modalBotao}
                onPress={enviarCodigoCelular}
                activeOpacity={0.8}
              >
                <Text style={styles.modalBotaoTexto}>
                  ENVIAR CÓDIGO
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalCelular(false)}
                style={styles.modalCancelar}
              >
                <Text style={styles.modalCancelarTexto}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Login</Text>

        <Text style={styles.subtitulo}>
          Seja bem-vindo! Faça login para continuar.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={16}
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
            />
          </View>

          <Text style={styles.label}>Senha</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={16}
              color={cores.laranja}
              style={styles.icon}
            />

            <TextInput
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              style={styles.input}
              placeholderTextColor={cores.placeholder}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
              style={styles.olho}
              accessibilityLabel={
                mostrarSenha
                  ? "Ocultar senha"
                  : "Mostrar senha"
              }
            >
              <Ionicons
                name={mostrarSenha ? "eye-off" : "eye"}
                size={19}
                color={cores.textoSecundario}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.esqueceuContainer}>
            <Text style={styles.esqueceuTexto}>
              Esqueceu a senha?
            </Text>

            <TouchableOpacity
              onPress={() => setTelaRecuperar(true)}
            >
              <Text style={styles.esqueceuLink}>
                Clique aqui
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.termos}
            onPress={() => setAceitou(!aceitou)}
            activeOpacity={0.7}
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
              Ao continuar, você concorda com{" "}
              <Text style={styles.linkLaranja}>
                Termos de Política e Privacidade
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoAzul}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoAzulTexto}>
              ENTRAR
            </Text>
          </TouchableOpacity>

          <View style={styles.divisorContainer}>
            <View style={styles.linha} />
            <Text style={styles.divisorTexto}>ou</Text>
            <View style={styles.linha} />
          </View>

          <TouchableOpacity
            style={styles.botaoBranco}
            onPress={abrirCadastro}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoBrancoTextoAzul}>
              Cadastre-se
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoBranco}
            onPress={() =>
              Alert.alert(
                "Google",
                "Login com Google será configurado posteriormente."
              )
            }
            activeOpacity={0.8}
          >
            <View style={styles.botaoComIcone}>
              <Image
                source={require("../../assets/images/google.png")}
                style={styles.logoGoogle}
                resizeMode="contain"
              />
              <Text style={styles.botaoBrancoTexto}>
                Entrar com Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoBranco}
            onPress={() =>
              Alert.alert(
                "Facebook",
                "Login com Facebook será configurado posteriormente."
              )
            }
            activeOpacity={0.8}
          >
            <View style={styles.botaoComIcone}>
              <Image
                source={require("../../assets/images/facebook.png")}
                style={styles.logoGoogle}
                resizeMode="contain"
              />
              <Text style={styles.botaoBrancoTexto}>
                Entrar com Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function criarEstilos(cores: {
  fundo: string;
  superficie: string;
  superficieSecundaria: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  placeholder: string;
  laranja: string;
  azul: string;
  branco: string;
  modalFundo: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    scroll: {
      paddingHorizontal: 24,
      paddingTop: 10,
      alignItems: "center",
      paddingBottom: 40,
    },

    scrollRecuperar: {
      paddingHorizontal: 24,
      paddingTop: 10,
      alignItems: "center",
      paddingBottom: 40,
    },

    logo: {
      width: 220,
      height: 80,
      marginTop: 20,
      backgroundColor: "transparent",
    },

    titulo: {
      fontSize: 28,
      color: cores.laranja,
      fontWeight: "600",
      marginTop: 15,
    },

    tituloRecuperar: {
      fontSize: 22,
      color: cores.texto,
      fontWeight: "800",
      marginTop: 18,
    },

    subtitulo: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 4,
      marginBottom: 20,
      fontWeight: "500",
      textAlign: "center",
    },

    subtituloRecuperar: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 6,
      textAlign: "center",
      lineHeight: 18,
    },

    ilustraContainer: {
      width: "100%",
      height: 220,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10,
    },

    imagemRecuperar: {
      width: 280,
      height: 220,
    },

    form: {
      width: "100%",
    },

    formRecuperar: {
      width: "100%",
      marginTop: 10,
    },

    label: {
      fontSize: 12,
      fontWeight: "bold",
      color: cores.texto,
      marginBottom: 6,
      marginTop: 10,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 7,
      paddingHorizontal: 10,
      height: 44,
      backgroundColor: cores.superficieSecundaria,
    },

    inputEspacado: {
      height: 48,
      marginTop: 8,
    },

    icon: {
      marginRight: 8,
    },

    olho: {
      padding: 6,
    },

    input: {
      flex: 1,
      fontSize: 13,
      color: cores.texto,
      height: "100%",
    },

    esqueceuContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 9,
      marginBottom: 14,
    },

    esqueceuTexto: {
      fontSize: 11,
      color: cores.textoSecundario,
    },

    esqueceuLink: {
      fontSize: 11,
      color: cores.laranja,
      marginLeft: 4,
      fontWeight: "bold",
    },

    termos: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16,
    },

    checkbox: {
      width: 16,
      height: 16,
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

    linkLaranjaCentro: {
      color: cores.laranja,
      fontSize: 12,
      fontWeight: "600",
      textAlign: "center",
    },

    linkCelular: {
      marginTop: 18,
      alignSelf: "center",
      paddingVertical: 5,
    },

    botaoAzul: {
      backgroundColor: cores.azul,
      minHeight: 44,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
      paddingHorizontal: 12,
    },

    botaoEspacado: {
      height: 50,
      marginTop: 22,
    },

    botaoAzulTexto: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 15,
    },

    divisorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },

    linha: {
      flex: 1,
      height: 1,
      backgroundColor: cores.borda,
    },

    divisorTexto: {
      marginHorizontal: 12,
      fontSize: 14,
      fontWeight: "bold",
      color: cores.textoSecundario,
    },

    botaoBranco: {
      backgroundColor: cores.superficie,
      minHeight: 46,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: cores.borda,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
      paddingHorizontal: 12,
    },

    botaoBrancoTextoAzul: {
      color: cores.azul,
      fontWeight: "bold",
      fontSize: 14,
    },

    botaoBrancoTexto: {
      color: cores.texto,
      fontWeight: "500",
      fontSize: 13,
    },

    botaoComIcone: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    logoGoogle: {
      width: 20,
      height: 20,
      marginRight: 8,
    },

    voltarLink: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
      gap: 6,
      paddingVertical: 6,
    },

    voltarTexto: {
      fontSize: 12,
      color: cores.texto,
      fontWeight: "600",
    },

    modalFundo: {
      flex: 1,
      backgroundColor: cores.modalFundo,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    },

    modalContainer: {
      width: "100%",
      backgroundColor: cores.superficie,
      borderRadius: 16,
      padding: 24,
      elevation: 8,
      borderWidth: 1,
      borderColor: cores.borda,
    },

    modalFechar: {
      position: "absolute",
      right: 15,
      top: 15,
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },

    modalIcone: {
      alignSelf: "center",
      marginTop: 8,
      marginBottom: 10,
    },

    modalTitulo: {
      fontSize: 21,
      fontWeight: "800",
      color: cores.texto,
      textAlign: "center",
      marginBottom: 8,
    },

    modalSubtitulo: {
      fontSize: 12,
      color: cores.textoSecundario,
      textAlign: "center",
      lineHeight: 18,
      marginBottom: 20,
    },

    modalLabel: {
      fontSize: 12,
      fontWeight: "bold",
      color: cores.texto,
      marginBottom: 6,
    },

    modalInputContainer: {
      height: 46,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 7,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      marginBottom: 18,
      backgroundColor: cores.superficieSecundaria,
    },

    modalInput: {
      flex: 1,
      height: "100%",
      fontSize: 14,
      color: cores.texto,
    },

    modalBotao: {
      height: 46,
      backgroundColor: cores.azul,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },

    modalBotaoTexto: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "bold",
    },

    modalCancelar: {
      alignItems: "center",
      marginTop: 14,
      paddingVertical: 4,
    },

    modalCancelarTexto: {
      color: cores.laranja,
      fontSize: 13,
      fontWeight: "600",
    },
  });
}
