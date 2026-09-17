import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import MenuDrawer from "./componets/MenuDrawer";
export default function EditarPerfil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const [nome, setNome] = useState("Davi Miguel");
  const [cpf, setCpf] = useState("000.000.000 - 00");
  const [telefone, setTelefone] = useState("(82) 9 9999-9999");
  const [email, setEmail] = useState("davi.miguel@gmail.com");
  const [creci, setCreci] = useState("12345-SC");
  const [bio, setBio] = useState("Sou proprietário de imóveis há 5 anos na região de Maceió, focado em oferecer informações claras e suporte aos interessados.");
  const [foto, setFoto] = useState<string | null>(null);
  const escolherFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerAzul, { paddingTop: insets.top + 6 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.botaoHamburguer}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 13 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>

          <Image source={require("../../assets/images/BuscaLar-preto.png")} style={styles.logo} resizeMode="contain" />
          <View style={{ width: 28 }} />
        </View>
      </View>

      <View style={styles.conteudoBranco}>
        <View style={styles.tituloRow}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.botaoVoltar} activeOpacity={0.7}>
             <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Editar perfil</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
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

      {/* SEU DRAWER - AGORA FUNCIONA */}
      <MenuDrawer visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#2F6BFF" 
  },
  headerAzul: { 
    backgroundColor: "#2F6BFF", 
    paddingHorizontal: 14, 
    paddingBottom: 10, 
    height: 110 
  },
  headerTop: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  botaoHamburguer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    gap: 5,
    marginTop: -70,
  },
  traco: { 
    height: 3, 
    backgroundColor: "#FFF", 
    borderRadius: 10 
  },
  logo: { 
    width: 200, 
    height: 120, 
    marginTop: -12 
  },
  conteudoBranco: { 
    flex: 1, 
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    paddingHorizontal: 16, 
    paddingTop: 12, 
    borderWidth: 2, 
    borderColor: "#2F6BFF" },
  tituloRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingBottom: 10 
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: "800", 
    color: "#000" 
  },
  fotoArea: { 
    alignItems: "center", 
    marginVertical: 8 
  },
  avatar: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: "#DDD" 
  },
  cameraIcon: { 
    position: "absolute", 
    bottom: 0, 
    right: 0,
    backgroundColor: "#FF8C00", 
    width: 22, 
    height: 22, 
    borderRadius: 11, 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 2, 
    borderColor: "#FFF" 
  },
  toqueFoto: { 
    fontSize: 10, 
    color: "#666", 
    marginTop: 6 
  },
  label: { 
    fontSize: 11, 
    fontWeight: "700", 
    color: "#000", 
    marginTop: 12, 
    marginBottom: 6 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#000", 
    borderRadius: 12, 
    minHeight: 48, 
    paddingHorizontal: 14, 
    fontSize: 14, 
    color: "#000", 
    backgroundColor: "#FFF", 
    elevation: 4 
  },
  inputBio: { 
    minHeight: 90, 
    paddingTop: 12, 
    textAlignVertical: "top" 
  },
  botaoSalvar: { 
    backgroundColor: "#FF8C00", 
    height: 48, 
    borderRadius: 12, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 22, 
    elevation: 4 
  },
  botaoText: { 
    color: "#FFF",
    fontWeight: "800", 
    fontSize: 15 
  },
  botaoVoltar: {
  width: 38,
  height: 38,
  borderRadius: 19,
  alignItems: "center",
  justifyContent: "center",
},
});