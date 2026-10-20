
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  PanResponder,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";

function LinhaLaranja({ width = 90 }: { width?: number }) {
  const d = `M0 0 L${width} 0.5 L${width} 1.2 L0 3 Z`;

  return (
    <Svg width={width} height={3} viewBox={`0 0 ${width} 3`}>
      <Path d={d} fill="#FF8C00" />
    </Svg>
  );
}

export default function AlterarSenha() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarAtual, setMostrarAtual] = useState(false);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarConf, setMostrarConf] = useState(false);
  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#111111",
    textoSecundario: dark ? "#BDBDBD" : "#666666",
    borda: dark ? "#555555" : "#CCCCCC",
    campo: dark ? "#202020" : "#FFFFFF",
    avisoFundo: dark ? "#332719" : "#FFF3E6",
    avisoTexto: dark ? "#F0D7BC" : "#333333",
    azul: "#448AFF",
    laranja: "#FF8C00",
    icone: dark ? "#BBBBBB" : "#666666",
  };

  const styles = criarEstilos(cores);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gestureState) =>
        gestureState.dx > 60 && Math.abs(gestureState.dy) < 50,
      onPanResponderRelease: () => setMenuAberto(true),
    })
  ).current;

  function salvarNovaSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos de senha.");
      return;
    }

    if (novaSenha.length < 8) {
      Alert.alert(
        "Senha muito curta",
        "A nova senha precisa ter pelo menos 8 caracteres."
      );
      return;
    }

    if (!/[A-Za-zÀ-ÿ]/.test(novaSenha) || !/[0-9]/.test(novaSenha)) {
      Alert.alert(
        "Senha inválida",
        "Use pelo menos uma letra e um número na nova senha."
      );
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert(
        "Senhas diferentes",
        "A nova senha e a confirmação precisam ser iguais."
      );
      return;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert(
        "Escolha outra senha",
        "A nova senha precisa ser diferente da senha atual."
      );
      return;
    }

    // Esta tela valida os dados, mas a troca real da senha
    // precisa ser feita no sistema de autenticação do aplicativo.
    router.push("/senhasalva" as any);
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
      {...panResponder.panHandlers}
    >
      {/* CABEÇALHO */}
      <View style={styles.headerAzul}>
        <TouchableOpacity
          style={styles.hamburguer}
          onPress={() => setMenuAberto(true)}
          accessibilityLabel="Abrir menu"
          accessibilityRole="button"
        >
          <View style={styles.traco} />
          <View style={[styles.traco, { width: 14 }]} />
          <View style={[styles.traco, { width: 10 }]} />
        </TouchableOpacity>

        <View style={styles.logoCentro}>
          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* CARTÃO PRINCIPAL */}
      <View style={styles.card}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* VOLTAR E TÍTULO */}
            <View style={styles.topoCard}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.botaoVoltar}
                accessibilityLabel="Voltar"
                accessibilityRole="button"
              >
                <Ionicons
                  name="arrow-back"
                  size={22}
                  color={cores.texto}
                />
              </TouchableOpacity>

              <View style={styles.tituloCentro}>
                <Text style={styles.titulo}>Alterar Senha</Text>
                <View style={{ marginTop: 3 }}>
                  <LinhaLaranja width={90} />
                </View>
              </View>

              <View style={{ width: 38 }} />
            </View>

            <Text style={styles.subtitulo}>
              Defina uma nova senha para sua conta
            </Text>

            {/* SENHA ATUAL */}
            <Text style={styles.label}>Senha atual</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha atual"
                placeholderTextColor={cores.icone}
                secureTextEntry={!mostrarAtual}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                accessibilityLabel="Senha atual"
              />

              <TouchableOpacity
                onPress={() => setMostrarAtual(!mostrarAtual)}
                accessibilityLabel={
                  mostrarAtual ? "Ocultar senha atual" : "Mostrar senha atual"
                }
              >
                <Ionicons
                  name={mostrarAtual ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={cores.icone}
                />
              </TouchableOpacity>
            </View>

            {/* NOVA SENHA */}
            <Text style={styles.label}>Nova senha</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Digite a nova senha"
                placeholderTextColor={cores.icone}
                secureTextEntry={!mostrarNova}
                value={novaSenha}
                onChangeText={setNovaSenha}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                accessibilityLabel="Nova senha"
              />

              <TouchableOpacity
                onPress={() => setMostrarNova(!mostrarNova)}
                accessibilityLabel={
                  mostrarNova ? "Ocultar nova senha" : "Mostrar nova senha"
                }
              >
                <Ionicons
                  name={mostrarNova ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={cores.icone}
                />
              </TouchableOpacity>
            </View>

            {/* CONFIRMAR SENHA */}
            <Text style={styles.label}>Confirmar nova senha</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Confirme a nova senha"
                placeholderTextColor={cores.icone}
                secureTextEntry={!mostrarConf}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                accessibilityLabel="Confirmar nova senha"
              />

              <TouchableOpacity
                onPress={() => setMostrarConf(!mostrarConf)}
                accessibilityLabel={
                  mostrarConf
                    ? "Ocultar confirmação da senha"
                    : "Mostrar confirmação da senha"
                }
              >
                <Ionicons
                  name={mostrarConf ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={cores.icone}
                />
              </TouchableOpacity>
            </View>

            {/* AVISO */}
            <View style={styles.avisoBox}>
              <Ionicons
                name="lock-closed"
                size={16}
                color={cores.laranja}
              />
              <Text style={styles.avisoTxt}>
                Use no mínimo 8 caracteres, com letras e números.
              </Text>
            </View>

            {/* SALVAR */}
            <TouchableOpacity
              style={styles.btnSalvar}
              onPress={salvarNovaSenha}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Text style={styles.btnTxt}>Salvar Nova Senha</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* MENU LATERAL */}
      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        onOpen={() => setMenuAberto(true)}
      />
    </View>
  );
}

const criarEstilos = (cores: {
  fundo: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  campo: string;
  avisoFundo: string;
  avisoTexto: string;
  azul: string;
  laranja: string;
  icone: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azul,
    },

    headerAzul: {
      backgroundColor: cores.azul,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      height: 110,
      paddingTop: 12,
    },

    hamburguer: {
      gap: 4,
      width: 40,
      marginTop: 2,
      paddingVertical: 4,
    },

    traco: {
      width: 18,
      height: 2.5,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    logoCentro: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 2,
    },

    logo: {
      width: 195,
      height: 150,
      marginTop: -8,
    },

    card: {
      flex: 1,
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      overflow: "hidden",
    },

    keyboard: {
      flex: 1,
    },

    scroll: {
      paddingHorizontal: 22,
      paddingTop: 14,
      paddingBottom: 30,
      flexGrow: 1,
    },

    topoCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    botaoVoltar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
    },

    tituloCentro: {
      alignItems: "center",
    },

    titulo: {
      fontSize: 19,
      fontWeight: "900",
      color: cores.texto,
      textAlign: "center",
    },

    subtitulo: {
      fontSize: 12,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 10,
      marginBottom: 20,
    },

    label: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
      marginBottom: 6,
      marginTop: 14,
    },

    inputBox: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.3,
      borderColor: cores.borda,
      borderRadius: 10,
      paddingHorizontal: 12,
      minHeight: 46,
      backgroundColor: cores.campo,
    },

    input: {
      flex: 1,
      fontSize: 14,
      color: cores.texto,
      paddingVertical: 10,
    },

    avisoBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 18,
      backgroundColor: cores.avisoFundo,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 8,
    },

    avisoTxt: {
      fontSize: 11,
      color: cores.avisoTexto,
      flex: 1,
      lineHeight: 16,
    },

    btnSalvar: {
      backgroundColor: cores.laranja,
      minHeight: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
    },

    btnTxt: {
      color: "#FFFFFF",
      fontWeight: "800",
      fontSize: 14,
    },
  });
