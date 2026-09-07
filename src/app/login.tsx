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

// =========================================================
// VALIDAÇÃO DE E-MAIL
// =========================================================

function isEmailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// =========================================================
// LOGIN
// =========================================================

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aceitou, setAceitou] = useState(false);

  const [telaRecuperar, setTelaRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");

  const [modalCelular, setModalCelular] = useState(false);
  const [celularRecuperar, setCelularRecuperar] = useState("");

  // =========================================================
  // ESCONDE A BARRA DE NAVEGAÇÃO DO ANDROID
  // =========================================================

  useEffect(() => {
    async function esconderBotoesDoCelular() {
      try {
        await NavigationBar.setVisibilityAsync("hidden");
      } catch (error) {
        console.log(
          "Não foi possível esconder a barra:",
          error
        );
      }
    }

    esconderBotoesDoCelular();
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================

  async function handleLogin() {
    const emailTratado = email.trim().toLowerCase();
    const senhaTratada = senha.trim();

    // E-MAIL
    if (!emailTratado) {
      Alert.alert(
        "E-mail obrigatório",
        "Digite seu e-mail."
      );
      return;
    }

    // SENHA
    if (!senhaTratada) {
      Alert.alert(
        "Senha obrigatória",
        "Digite sua senha."
      );
      return;
    }

    // VALIDA E-MAIL
    if (!isEmailValido(emailTratado)) {
      Alert.alert(
        "E-mail inválido",
        "Digite um e-mail válido.\nEx: seuemail@gmail.com"
      );
      return;
    }

    // VALIDA SENHA
    if (senhaTratada.length < 3) {
      Alert.alert(
        "Senha inválida",
        "Digite pelo menos 3 caracteres."
      );
      return;
    }

    // VALIDA TERMOS
    if (!aceitou) {
      Alert.alert(
        "Termos não aceitos",
        "Você precisa marcar a opção de Termos de Política e Privacidade."
      );
      return;
    }

    // =======================================================
    // SALVA O LOGIN
    // =======================================================

    try {
      // IMPORTANTE:
      // A tela /(tabs)/index.tsx verifica esse valor.
      await AsyncStorage.setItem("logado", "true");

      // Salva também o e-mail do usuário.
      // Podemos usar isso futuramente no perfil.
      await AsyncStorage.setItem(
        "emailUsuario",
        emailTratado
      );

      console.log("Login salvo com sucesso!");

      // =====================================================
      // ENTRA NO APLICATIVO
      // =====================================================

      router.replace("/(tabs)");
    } catch (error) {
      console.log(
        "Erro ao salvar login:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível entrar no aplicativo. Tente novamente."
      );
    }
  }

  // =========================================================
  // CADASTRO
  // =========================================================

  function irParaCadastro() {
    router.push("/cadastro");
  }

  // =========================================================
  // RECUPERAÇÃO POR E-MAIL
  // =========================================================

  function enviarCodigoEmail() {
    const em = emailRecuperar.trim().toLowerCase();

    if (!em) {
      Alert.alert(
        "E-mail obrigatório",
        "Digite seu e-mail."
      );
      return;
    }

    if (!isEmailValido(em)) {
      Alert.alert(
        "E-mail inválido",
        "Digite um e-mail válido."
      );
      return;
    }

    Alert.alert(
      "Código enviado",
      `Enviamos um código de recuperação para ${em}.`
    );
  }

  // =========================================================
  // RECUPERAÇÃO POR CELULAR
  // =========================================================

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

    if (numeroLimpo.length < 10) {
      Alert.alert(
        "Número inválido",
        "Digite um número de celular válido."
      );
      return;
    }

    setModalCelular(false);

    Alert.alert(
      "Código enviado",
      `Enviamos um código de recuperação para ${numero}.`
    );
  }

  // =========================================================
  // TELA DE RECUPERAÇÃO DE SENHA
  // =========================================================

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
              source={require("../../assets/images/logo.png")}
              style={styles.imagemRecuperar}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formRecuperar}>
            <Text style={styles.label}>
              E-mail
            </Text>

            <View
              style={[
                styles.inputContainer,
                styles.inputEspacado,
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={16}
                color="#FF8C00"
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
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.botaoAzul,
                styles.botaoEspacado,
              ]}
              onPress={enviarCodigoEmail}
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
                size={14}
                color="#000"
              />

              <Text style={styles.voltarTexto}>
                Voltar para o login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* =====================================================
            MODAL DE CELULAR
        ===================================================== */}

        <Modal
          visible={modalCelular}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setModalCelular(false)
          }
        >
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalFechar}
                onPress={() =>
                  setModalCelular(false)
                }
              >
                <Ionicons
                  name="close"
                  size={22}
                  color="#000"
                />
              </TouchableOpacity>

              <Ionicons
                name="phone-portrait-outline"
                size={42}
                color="#FF8C00"
                style={styles.modalIcone}
              />

              <Text style={styles.modalTitulo}>
                Recuperar senha
              </Text>

              <Text style={styles.modalSubtitulo}>
                Digite seu número de celular para receber o código de recuperação.
              </Text>

              <Text style={styles.modalLabel}>
                Número de celular
              </Text>

              <View style={styles.modalInputContainer}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="#FF8C00"
                  style={{ marginRight: 8 }}
                />

                <TextInput
                  placeholder="(00) 00000-0000"
                  value={celularRecuperar}
                  onChangeText={setCelularRecuperar}
                  keyboardType="phone-pad"
                  style={styles.modalInput}
                  placeholderTextColor="#999"
                  maxLength={15}
                />
              </View>

              <TouchableOpacity
                style={styles.modalBotao}
                onPress={enviarCodigoCelular}
              >
                <Text style={styles.modalBotaoTexto}>
                  ENVIAR CÓDIGO
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setModalCelular(false)
                }
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

  // =========================================================
  // TELA DE LOGIN
  // =========================================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

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

        <Text style={styles.titulo}>
          Login
        </Text>

        <Text style={styles.subtitulo}>
          Seja Bem-vindo faça login para continuar
        </Text>

        <View style={styles.form}>
          {/* E-MAIL */}

          <Text style={styles.label}>
            E-mail
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={14}
              color="#FF8C00"
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
              placeholderTextColor="#999"
              returnKeyType="next"
            />
          </View>

          {/* SENHA */}

          <Text style={styles.label}>
            Senha
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={14}
              color="#FF8C00"
              style={styles.icon}
            />

            <TextInput
              placeholder="********"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              style={styles.input}
              placeholderTextColor="#999"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity
              onPress={() =>
                setMostrarSenha(!mostrarSenha)
              }
              style={styles.olho}
            >
              <Ionicons
                name={
                  mostrarSenha
                    ? "eye-off"
                    : "eye"
                }
                size={18}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {/* ESQUECEU A SENHA */}

          <View style={styles.esqueceuContainer}>
            <Text style={styles.esqueceuTexto}>
              Esqueceu a senha?
            </Text>

            <TouchableOpacity
              onPress={() =>
                setTelaRecuperar(true)
              }
            >
              <Text style={styles.esqueceuLink}>
                clique aqui
              </Text>
            </TouchableOpacity>
          </View>

          {/* TERMOS */}

          <TouchableOpacity
            style={styles.termos}
            onPress={() =>
              setAceitou(!aceitou)
            }
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                aceitou &&
                  styles.checkboxAtivo,
              ]}
            >
              {aceitou && (
                <Ionicons
                  name="checkmark"
                  size={10}
                  color="#fff"
                />
              )}
            </View>

            <Text style={styles.termosTexto}>
              Ao continuar você concorda com{" "}
              <Text style={styles.linkLaranja}>
                Termos de Politica e Privacidade
              </Text>
            </Text>
          </TouchableOpacity>

          {/* ENTRAR */}

          <TouchableOpacity
            style={styles.botaoAzul}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoAzulTexto}>
              ENTRAR
            </Text>
          </TouchableOpacity>

          {/* DIVISOR */}

          <View style={styles.divisorContainer}>
            <View style={styles.linha} />

            <Text style={styles.divisorTexto}>
              ou
            </Text>

            <View style={styles.linha} />
          </View>

          {/* CADASTRO */}

          <TouchableOpacity
            style={styles.botaoBranco}
            onPress={irParaCadastro}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoBrancoTextoAzul}>
              Cadastre-se
            </Text>
          </TouchableOpacity>

          {/* GOOGLE */}

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

          {/* FACEBOOK */}

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

// =========================================================
// ESTILOS
// =========================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    padding: 24,
    alignItems: "center",
    paddingBottom: 40,
  },

  scrollRecuperar: {
    padding: 24,
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
    color: "#FF8C00",
    fontWeight: "400",
    marginTop: 15,
  },

  tituloRecuperar: {
    fontSize: 22,
    color: "#000",
    fontWeight: "800",
    marginTop: 18,
  },

  subtitulo: {
    fontSize: 12,
    color: "#000",
    marginTop: 2,
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },

  subtituloRecuperar: {
    fontSize: 12,
    color: "#333",
    marginTop: 6,
    textAlign: "center",
    lineHeight: 16,
  },

  ilustraContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    marginBottom: 32,
  },

  imagemRecuperar: {
    width: 180,
    height: 130,
    marginBottom: -5,
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
    color: "#000",
    marginBottom: 6,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 42,
    backgroundColor: "#fff",
  },

  inputEspacado: {
    height: 48,
    marginTop: 8,
  },

  icon: {
    marginRight: 8,
  },

  olho: {
    padding: 4,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: "#000",
    height: "100%",
  },

  esqueceuContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    marginBottom: 12,
  },

  esqueceuTexto: {
    fontSize: 11,
    color: "#000",
  },

  esqueceuLink: {
    fontSize: 11,
    color: "#FF8C00",
    marginLeft: 3,
    fontWeight: "bold",
  },

  termos: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 2,
    marginRight: 6,
    marginTop: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxAtivo: {
    backgroundColor: "#0B5FFF",
    borderColor: "#0B5FFF",
  },

  termosTexto: {
    fontSize: 9,
    color: "#000",
    flex: 1,
    lineHeight: 11,
  },

  linkLaranja: {
    color: "#FF8C00",
  },

  linkLaranjaCentro: {
    color: "#FF8C00",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  linkCelular: {
    marginTop: 18,
    alignSelf: "center",
  },

  botaoAzul: {
    backgroundColor: "#0B5FFF",
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  botaoEspacado: {
    height: 50,
    marginTop: 22,
  },

  botaoAzulTexto: {
    color: "#fff",
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
    backgroundColor: "#000",
  },

  divisorTexto: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  botaoBranco: {
    backgroundColor: "#fff",
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  botaoBrancoTextoAzul: {
    color: "#0B5FFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  botaoBrancoTexto: {
    color: "#000",
    fontWeight: "500",
    fontSize: 13,
  },

  botaoComIcone: {
    flexDirection: "row",
    alignItems: "center",
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
    gap: 4,
  },

  voltarTexto: {
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },

  // =========================================================
  // MODAL
  // =========================================================

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  modalFechar: {
    position: "absolute",
    right: 15,
    top: 15,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  modalIcone: {
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 10,
  },

  modalTitulo: {
    fontSize: 21,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },

  modalSubtitulo: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    lineHeight: 17,
    marginBottom: 20,
  },

  modalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },

  modalInputContainer: {
    height: 46,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 18,
  },

  modalInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#000",
  },

  modalBotao: {
    height: 46,
    backgroundColor: "#0B5FFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  modalBotaoTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  modalCancelar: {
    alignItems: "center",
    marginTop: 14,
  },

  modalCancelarTexto: {
    color: "#FF8C00",
    fontSize: 13,
    fontWeight: "600",
  },
});