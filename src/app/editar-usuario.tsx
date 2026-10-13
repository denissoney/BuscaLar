import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
export default function EditarPerfil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [nome, setNome] = useState("Davi Miguel");
  const [email, setEmail] = useState("davi.miguel@gmail.com");
  const [local, setLocal] = useState("Maceió - AL");
  const [telefone, setTelefone] = useState("(82) 99999-9999");
  const [nascimento, setNascimento] = useState("12/04/2008");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  function salvar() {
    // aqui você chama sua API
    console.log({ nome, email, local, telefone, nascimento, senha });
    router.back();
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnVoltar}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar perfil</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} style={styles.content}>
        {/* AVATAR + NOME/EMAIL NO TOPO */}
        <View style={styles.topPerfil}>
          <View>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.avatar} />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </View>
          <View style={styles.topInfo}>
            <View style={styles.topInfoRow}>
              <Text style={styles.topLabel}>Nome</Text>
              <Text style={styles.topValue}>{nome}</Text>
              <Ionicons name="pencil" size={12} color="#999" style={{ marginLeft: 6 }} />
            </View>
            <View style={styles.topInfoRow}>
              <Text style={styles.topLabel}>E-mail</Text>
              <Text style={styles.topValue}>{email}</Text>
              <Ionicons name="pencil" size={12} color="#999" style={{ marginLeft: 6 }} />
            </View>
          </View>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Davi Miguel" />

          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.label}>Localização</Text>
          <TextInput style={styles.input} value={local} onChangeText={setLocal} placeholder="Maceió - AL" />

          <Text style={styles.label}>Telefone</Text>
          <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

          <Text style={styles.label}>Data de nascimento</Text>
          <TextInput style={styles.input} value={nascimento} onChangeText={setNascimento} placeholder="12/04/2008" />

          <Text style={styles.label}>Segurança</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} placeholder="Alterar senha" secureTextEntry />

          <Text style={styles.label}>Segurança</Text>
          <TextInput style={styles.input} value={confirmaSenha} onChangeText={setConfirmaSenha} placeholder="Confirmar senha" secureTextEntry />
        </View>

        {/* BOTÃO */}
        <TouchableOpacity style={styles.btnSalvar} activeOpacity={0.8} onPress={() => router.push("/usuario-sucesso")}>
          <Text style={styles.btnSalvarText}>Salvar as alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  content: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: "#fff", 
    borderBottomWidth: 1, 
    borderBottomColor: "#eee" 
  },
  btnVoltar: { 
    width: 32, 
    height: 32, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  headerTitle: { 
    fontSize: 16, 
    fontWeight: "800", 
    color: "#000" 
  },
  topPerfil: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 16, 
    gap: 12 
  },
  avatar: { 
    width: 64, 
    height: 64, 
    borderRadius: 32 
  },
  cameraIcon: { 
    position: "absolute", 
    bottom: 0, 
    right: 0, 
    backgroundColor: "#000", 
    width: 22, 
    height: 22, 
    borderRadius: 11, 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 2, 
    borderColor: "#fff" 
  },
  topInfo: { 
    flex: 1, 
    marginLeft: 12, 
    gap: 6 
  },
  topInfoRow: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  topLabel: { 
    fontSize: 10, 
    color: "#777", 
    width: 40 
  },
  topValue: { 
    fontSize: 12, 
    fontWeight: "700", 
    color: "#000" 
  },
  form: { 
    paddingHorizontal: 16, 
    paddingTop: 8 
  },
  label: { 
    fontSize: 12, 
    fontWeight: "700", 
    color: "#000", 
    marginTop: 12, 
    marginBottom: 4 
  },
  input: {
    height: 40, 
    borderWidth: 1, 
    borderColor: "#000", 
    borderRadius: 10, 
    paddingHorizontal: 12, 
    fontSize: 12, 
    color: "#000", 
    backgroundColor: "#fff" 
  },
  btnSalvar: { 
    marginHorizontal: 16, 
    marginTop: 28, 
    height: 44,
    backgroundColor: "#FF8C00", 
    borderRadius: 22, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  btnSalvarText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "700" 
  },
});