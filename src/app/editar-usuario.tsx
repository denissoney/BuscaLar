import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

export default function EditarPerfil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();

  const [nome, setNome] = useState("Davi Miguel");
  const [email, setEmail] = useState("davi.miguel@gmail.com");
  const [local, setLocal] = useState("Maceió - AL");
  const [telefone, setTelefone] = useState("(82) 99999-9999");
  const [nascimento, setNascimento] = useState("12/04/2008");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    fundoCard: dark ? "#1E1E1E" : "#FFFFFF",
    fundoInput: dark ? "#222222" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#000000",
    textoSecundario: dark ? "#BBBBBB" : "#777777",
    borda: dark ? "#444444" : "#DDDDDD",
    divisor: dark ? "#333333" : "#EEEEEE",
    laranja: "#FF8C00",
    branco: "#FFFFFF",
    preto: "#000000",
  };

  const styles = criarEstilos(cores);

  function salvar() {
    const nomeCompleto = nome.trim();
    const emailLimpo = email.trim();

    if (!nomeCompleto || !emailLimpo || !local.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha seu nome, e-mail e localização."
      );
      return;
    }

    if (nomeCompleto.split(/\s+/).length < 2) {
      Alert.alert(
        "Nome incompleto",
        "Informe seu nome e sobrenome."
      );
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      emailLimpo
    );

    if (!emailValido) {
      Alert.alert(
        "E-mail inválido",
        "Digite um endereço de e-mail válido."
      );
      return;
    }

    // Só valida a senha se algum dos campos tiver sido preenchido.
    if (senha || confirmaSenha) {
      if (senha.length < 8) {
        Alert.alert(
          "Senha inválida",
          "A nova senha deve ter pelo menos 8 caracteres."
        );
        return;
      }

      if (!/[A-Za-z]/.test(senha) || !/[0-9]/.test(senha)) {
        Alert.alert(
          "Senha inválida",
          "A senha deve conter letras e números."
        );
        return;
      }

      if (senha !== confirmaSenha) {
        Alert.alert(
          "Senhas diferentes",
          "A senha e a confirmação precisam ser iguais."
        );
        return;
      }
    }

    Alert.alert(
      "Perfil validado",
      "Os dados foram validados. A gravação permanente do perfil ainda precisa ser conectada ao sistema de usuários.",
      [
        {
          text: "Continuar",
          onPress: () => router.push("/usuario-sucesso" as any),
        },
      ]
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.btnVoltar}
          activeOpacity={0.7}
          accessibilityLabel="Voltar"
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={cores.texto}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Editar perfil
        </Text>

        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar e informações */}
        <View style={styles.topPerfil}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
              style={styles.avatar}
            />

            <TouchableOpacity
              style={styles.cameraIcon}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  "Foto do perfil",
                  "A seleção e alteração da foto ainda precisam ser implementadas."
                )
              }
              accessibilityLabel="Alterar foto do perfil"
            >
              <Ionicons
                name="camera"
                size={14}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.topInfo}>
            <View style={styles.topInfoRow}>
              <Text style={styles.topLabel}>Nome</Text>
              <Text
                style={styles.topValue}
                numberOfLines={1}
              >
                {nome}
              </Text>
              <Ionicons
                name="pencil"
                size={12}
                color={cores.textoSecundario}
                style={{ marginLeft: 6 }}
              />
            </View>

            <View style={styles.topInfoRow}>
              <Text style={styles.topLabel}>E-mail</Text>
              <Text
                style={styles.topValue}
                numberOfLines={1}
              >
                {email}
              </Text>
              <Ionicons
                name="pencil"
                size={12}
                color={cores.textoSecundario}
                style={{ marginLeft: 6 }}
              />
            </View>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome completo"
            placeholderTextColor={cores.textoSecundario}
            autoCapitalize="words"
            returnKeyType="next"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            placeholderTextColor={cores.textoSecundario}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          <Text style={styles.label}>Localização</Text>
          <TextInput
            style={styles.input}
            value={local}
            onChangeText={setLocal}
            placeholder="Cidade - Estado"
            placeholderTextColor={cores.textoSecundario}
            autoCapitalize="words"
            returnKeyType="next"
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Digite seu telefone"
            placeholderTextColor={cores.textoSecundario}
            keyboardType="phone-pad"
            returnKeyType="next"
          />

          <Text style={styles.label}>
            Data de nascimento
          </Text>
          <TextInput
            style={styles.input}
            value={nascimento}
            onChangeText={setNascimento}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={cores.textoSecundario}
            keyboardType="numeric"
            returnKeyType="next"
          />

          <Text style={styles.secaoSeguranca}>
            Segurança
          </Text>

          <Text style={styles.label}>Nova senha</Text>
          <View style={styles.inputSenhaContainer}>
            <TextInput
              style={styles.inputSenha}
              value={senha}
              onChangeText={setSenha}
              placeholder="Deixe vazio para manter a senha atual"
              placeholderTextColor={cores.textoSecundario}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <TouchableOpacity
              style={styles.olho}
              onPress={() => setMostrarSenha((valor) => !valor)}
              accessibilityLabel={
                mostrarSenha ? "Ocultar senha" : "Mostrar senha"
              }
            >
              <Ionicons
                name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={cores.textoSecundario}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>
            Confirmar nova senha
          </Text>
          <View style={styles.inputSenhaContainer}>
            <TextInput
              style={styles.inputSenha}
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
              placeholder="Digite novamente a nova senha"
              placeholderTextColor={cores.textoSecundario}
              secureTextEntry={!mostrarConfirmacao}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={styles.olho}
              onPress={() =>
                setMostrarConfirmacao((valor) => !valor)
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
                size={20}
                color={cores.textoSecundario}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Salvar */}
        <TouchableOpacity
          style={styles.btnSalvar}
          activeOpacity={0.8}
          onPress={salvar}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={19}
            color="#FFFFFF"
          />
          <Text style={styles.btnSalvarText}>
            Salvar as alterações
          </Text>
        </TouchableOpacity>

        <View style={styles.avisoContainer}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color={cores.textoSecundario}
          />
          <Text style={styles.avisoTexto}>
            As alterações ainda não são salvas permanentemente
            em uma conta. É necessária a integração com o sistema
            de usuários.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const criarEstilos = (cores: {
  fundo: string;
  fundoCard: string;
  fundoInput: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  divisor: string;
  laranja: string;
  branco: string;
  preto: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: cores.fundo,
      borderBottomWidth: 1,
      borderBottomColor: cores.divisor,
    },

    btnVoltar: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },

    headerTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.texto,
    },

    content: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    scrollContent: {
      paddingBottom: 35,
    },

    topPerfil: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      gap: 12,
    },

    avatarContainer: {
      position: "relative",
    },

    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: cores.fundoCard,
    },

    cameraIcon: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: cores.preto,
      width: 22,
      height: 22,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: cores.fundo,
    },

    topInfo: {
      flex: 1,
      marginLeft: 4,
      gap: 8,
    },

    topInfoRow: {
      flexDirection: "row",
      alignItems: "center",
      minWidth: 0,
    },

    topLabel: {
      fontSize: 10,
      color: cores.textoSecundario,
      width: 40,
    },

    topValue: {
      flexShrink: 1,
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
    },

    form: {
      paddingHorizontal: 16,
      paddingTop: 8,
    },

    label: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
      marginTop: 12,
      marginBottom: 5,
    },

    input: {
      minHeight: 44,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 9,
      fontSize: 13,
      color: cores.texto,
      backgroundColor: cores.fundoInput,
    },

    secaoSeguranca: {
      fontSize: 14,
      fontWeight: "800",
      color: cores.texto,
      marginTop: 24,
      marginBottom: 2,
    },

    inputSenhaContainer: {
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 10,
      backgroundColor: cores.fundoInput,
    },

    inputSenha: {
      flex: 1,
      minHeight: 42,
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 12,
      color: cores.texto,
    },

    olho: {
      paddingHorizontal: 12,
      paddingVertical: 10,
    },

    btnSalvar: {
      marginHorizontal: 16,
      marginTop: 28,
      minHeight: 46,
      backgroundColor: cores.laranja,
      borderRadius: 23,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingHorizontal: 12,
    },

    btnSalvarText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
    },

    avisoContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 6,
      marginHorizontal: 18,
      marginTop: 14,
    },

    avisoTexto: {
      flex: 1,
      fontSize: 10,
      lineHeight: 15,
      color: cores.textoSecundario,
    },
  });