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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";

export default function EditarPerfil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark } = useTheme();

  const [menuAberto, setMenuAberto] = useState(false);

  const [nome, setNome] = useState("Davi Miguel");
  const [cpf, setCpf] = useState("000.000.000-00");
  const [telefone, setTelefone] = useState("(82) 9 9999-9999");
  const [email, setEmail] = useState("davi.miguel@gmail.com");
  const [creci, setCreci] = useState("12345-SC");
  const [bio, setBio] = useState(
    "Sou proprietário de imóveis há 5 anos na região de Maceió, focado em oferecer informações claras e suporte aos interessados."
  );
  const [foto, setFoto] = useState<string | null>(null);

  const cores = {
    fundo: dark ? "#121212" : "#FFFFFF",
    card: dark ? "#1E1E1E" : "#FFFFFF",
    texto: dark ? "#FFFFFF" : "#111111",
    textoSecundario: dark ? "#BBBBBB" : "#666666",
    borda: dark ? "#444444" : "#DDDDDD",
    azul: "#488AFF",
    azulBorda: dark ? "#3156A5" : "#2F6BFF",
    laranja: "#FF8C00",
    input: dark ? "#252525" : "#FFFFFF",
    branco: "#FFFFFF",
  };

  const styles = criarEstilos(cores);

  async function escolherFoto() {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à galeria para escolher uma foto de perfil."
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets.length > 0) {
        setFoto(resultado.assets[0].uri);
      }
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível abrir a galeria. Tente novamente."
      );
    }
  }

  function salvarAlteracoes() {
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();

    if (!nomeLimpo || !cpf.trim() || !telefone.trim() || !emailLimpo) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha nome, CPF, telefone e e-mail."
      );
      return;
    }

    if (nomeLimpo.split(/\s+/).length < 2) {
      Alert.alert(
        "Nome incompleto",
        "Informe seu nome e sobrenome."
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      Alert.alert(
        "E-mail inválido",
        "Digite um endereço de e-mail válido."
      );
      return;
    }

    const cpfNumeros = cpf.replace(/\D/g, "");

    if (cpfNumeros.length !== 11) {
      Alert.alert(
        "CPF inválido",
        "Informe um CPF com 11 números."
      );
      return;
    }

    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 13) {
      Alert.alert(
        "Telefone inválido",
        "Informe um telefone válido com DDD."
      );
      return;
    }

    Alert.alert(
      "Dados validados",
      "Os dados foram validados. Para salvar permanentemente o perfil e a foto, é necessário conectá-los ao armazenamento ou à API do aplicativo.",
      [
        {
          text: "OK",
          onPress: () => router.push("/perfileditado" as any),
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
      {/* Cabeçalho azul */}
      <View style={styles.headerAzul}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.botaoHamburguer}
            activeOpacity={0.7}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { width: 20 }]} />
            <View style={[styles.traco, { width: 15 }]} />
            <View style={[styles.traco, { width: 10 }]} />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={{ width: 28 }} />
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.conteudo}>
        {/* Título */}
        <View style={styles.tituloRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.botaoVoltar}
            activeOpacity={0.7}
            accessibilityLabel="Voltar"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={cores.texto}
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>Editar perfil</Text>

          <View style={{ width: 32 }} />
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Foto do perfil */}
            <View style={styles.fotoArea}>
              <TouchableOpacity
                onPress={escolherFoto}
                activeOpacity={0.8}
                accessibilityLabel="Escolher foto de perfil"
              >
                <Image
                  source={
                    foto
                      ? { uri: foto }
                      : require("../../assets/images/perfil.png")
                  }
                  style={styles.avatar}
                />

                <View style={styles.cameraIcon}>
                  <Ionicons
                    name="camera"
                    size={14}
                    color="#FFFFFF"
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.toqueFoto}>
                Toque para alterar a foto
              </Text>
            </View>

            {/* Dados pessoais */}
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholder="Digite seu nome completo"
              placeholderTextColor={cores.textoSecundario}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>CPF</Text>
            <TextInput
              value={cpf}
              onChangeText={setCpf}
              style={styles.input}
              placeholder="000.000.000-00"
              placeholderTextColor={cores.textoSecundario}
              keyboardType="numeric"
              returnKeyType="next"
            />

            <Text style={styles.label}>Telefone / WhatsApp</Text>
            <TextInput
              value={telefone}
              onChangeText={setTelefone}
              style={styles.input}
              placeholder="(82) 9 9999-9999"
              placeholderTextColor={cores.textoSecundario}
              keyboardType="phone-pad"
              returnKeyType="next"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor={cores.textoSecundario}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Text style={styles.label}>CRECI</Text>
            <TextInput
              value={creci}
              onChangeText={setCreci}
              style={styles.input}
              placeholder="Informe seu CRECI"
              placeholderTextColor={cores.textoSecundario}
              autoCapitalize="characters"
              returnKeyType="next"
            />

            <Text style={styles.label}>Bio — Sobre você</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={[styles.input, styles.inputBio]}
              placeholder="Conte um pouco sobre você"
              placeholderTextColor={cores.textoSecundario}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={500}
            />

            <Text style={styles.contadorBio}>
              {bio.length}/500 caracteres
            </Text>

            {/* Salvar */}
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarAlteracoes}
              activeOpacity={0.8}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color="#FFFFFF"
              />
              <Text style={styles.botaoText}>
                Salvar as alterações
              </Text>
            </TouchableOpacity>

            <View style={styles.aviso}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={cores.textoSecundario}
              />
              <Text style={styles.avisoTexto}>
                As alterações ainda precisam ser conectadas ao
                sistema de usuários para serem salvas permanentemente.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Menu lateral */}
      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
      />
    </View>
  );
}

const criarEstilos = (cores: {
  fundo: string;
  card: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  azulBorda: string;
  laranja: string;
  input: string;
  branco: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.azul,
    },

    headerAzul: {
      backgroundColor: cores.azul,
      paddingHorizontal: 14,
      paddingBottom: 8,
      height: 100,
      justifyContent: "center",
    },

    headerTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    botaoHamburguer: {
      width: 28,
      height: 35,
      justifyContent: "center",
      alignItems: "flex-start",
      gap: 5,
    },

    traco: {
      height: 3,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
    },

    logo: {
      width: 200,
      height: 85,
    },

    conteudo: {
      flex: 1,
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 16,
      paddingTop: 12,
      borderWidth: 2,
      borderBottomWidth: 0,
      borderColor: cores.azulBorda,
      overflow: "hidden",
    },

    tituloRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 10,
    },

    botaoVoltar: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },

    titulo: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.texto,
    },

    scrollContent: {
      paddingBottom: 35,
    },

    fotoArea: {
      alignItems: "center",
      marginVertical: 8,
    },

    avatar: {
      width: 78,
      height: 78,
      borderRadius: 39,
      backgroundColor: cores.borda,
    },

    cameraIcon: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: cores.laranja,
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: cores.fundo,
    },

    toqueFoto: {
      fontSize: 11,
      color: cores.textoSecundario,
      marginTop: 7,
    },

    label: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
      marginTop: 13,
      marginBottom: 6,
    },

    input: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 12,
      minHeight: 46,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 13,
      color: cores.texto,
      backgroundColor: cores.input,
    },

    inputBio: {
      minHeight: 100,
      paddingTop: 12,
      textAlignVertical: "top",
    },

    contadorBio: {
      fontSize: 10,
      color: cores.textoSecundario,
      textAlign: "right",
      marginTop: 5,
    },

    botaoSalvar: {
      backgroundColor: cores.laranja,
      minHeight: 48,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 22,
      elevation: 3,
    },

    botaoText: {
      color: "#FFFFFF",
      fontWeight: "800",
      fontSize: 14,
    },

    aviso: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 6,
      marginTop: 14,
      paddingHorizontal: 2,
    },

    avisoTexto: {
      flex: 1,
      fontSize: 10,
      lineHeight: 15,
      color: cores.textoSecundario,
    },
  });
