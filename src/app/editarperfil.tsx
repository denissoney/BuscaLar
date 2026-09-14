import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function EditarPerfil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [nome, setNome] = useState("Davi Miguel");
  const [cpf, setCpf] = useState("000.000.000 - 00");
  const [telefone, setTelefone] = useState("(82) 9 9999-9999");
  const [email, setEmail] = useState("davi.miguel@gmail.com");
  const [creci, setCreci] = useState("12345-SC");
  const [bio, setBio] = useState("Sou proprietário de imóveis há 5 anos na região de Maceió, focado em oferecer informações claras e suporte aos interessados.");
  const [foto, setFoto] = useState<string | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const escolherFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER AZUL COM LOGO */}
      <View style={styles.headerAzul}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => setMenuAberto(!menuAberto)}>
            <Ionicons name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Image source={require("../../assets/images/BuscaLar-preto.png")} style={styles.logo} resizeMode="contain" />
          <View style={{ width: 28 }} />
        </View>
      </View>

      {/* MENU HAMBURGUER FUNCIONANDO */}
      {menuAberto && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => { setMenuAberto(false); router.push("/configuracoes" as any); }} style={styles.menuItem}>
            <Ionicons name="settings-outline" size={20} color="#000" /><Text style={styles.menuText}> Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setMenuAberto(false); router.push("/imoveis" as any); }} style={styles.menuItem}>
            <Ionicons name="home-outline" size={20} color="#000" /><Text style={styles.menuText}> Imóveis</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setMenuAberto(false); router.push("/suporte" as any); }} style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={20} color="#000" /><Text style={styles.menuText}> Suporte</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CONTEÚDO BRANCO ARREDONDADO */}
      <View style={styles.conteudoBranco}>
        <View style={styles.tituloRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Editar perfil</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

          {/* FOTO */}
          <View style={styles.fotoArea}>
            <TouchableOpacity onPress={escolherFoto}>
              <Image source={foto? { uri: foto } : require("../../assets/images/perfil.png")} style={styles.avatar} />
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={14} color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.toqueFoto}>Toque para alterar a foto</Text>
          </View>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput value={nome} onChangeText={setNome} style={styles.input} />

          <Text style={styles.label}>CPF</Text>
          <TextInput value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />

          <Text style={styles.label}>Telefone whatsApp</Text>
          <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} keyboardType="phone-pad" />

          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.label}>CRECI</Text>
          <TextInput value={creci} onChangeText={setCreci} style={styles.input} />

          <Text style={styles.label}>Bio Sobre você</Text>
          <TextInput value={bio} onChangeText={setBio} style={[styles.input, styles.inputBio]} multiline numberOfLines={4} textAlignVertical="top" />

          <TouchableOpacity style={styles.botaoSalvar} onPress={() => router.push("/perfileditado" as any)}>
            <Text style={styles.botaoText}>Salvar as alterações</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2F6BFF" },
  headerAzul: { backgroundColor: "#2F6BFF", paddingHorizontal: 12, paddingBottom: 12, paddingTop: 6 },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  logo: { width: 180, height: 40 },
  menu: { backgroundColor: "#FFF", marginHorizontal: 14, borderRadius: 10, padding: 10, position: "absolute", top: 70, left: 0, right: 0, zIndex: 10, elevation: 5 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: "#EEE" },
  menuText: { fontSize: 14, fontWeight: "600" },
  conteudoBranco: { flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 16, paddingTop: 12, borderWidth: 2, borderColor: "#2F6BFF" },
  tituloRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10 },
  titulo: { fontSize: 16, fontWeight: "800", color: "#000" },
  fotoArea: { alignItems: "center", marginVertical: 8 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#DDD" },
  cameraIcon: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#FF8C00", width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FFF" },
  toqueFoto: { fontSize: 10, color: "#666", marginTop: 6 },
  label: { fontSize: 11, fontWeight: "700", color: "#000", marginTop: 10, marginBottom: 4 },
  input: { 
    borderWidth: 1, 
    borderColor: "#000", 
    borderRadius: 10, 
    minHeight: 44, 
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    lineHeight: 18,
    color: "#000",
    backgroundColor: "#FFF",
    includeFontPadding: false,
    textAlignVertical: "center"
  },
  inputBio: { 
    minHeight: 80, 
    height: 80, 
    paddingTop: 10, 
    textAlignVertical: "top" 
  },

  botaoSalvar: { backgroundColor: "#FF8C00", height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 18 },
  botaoText: { color: "#FFF", fontWeight: "800", fontSize: 14 },
});