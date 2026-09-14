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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import MenuDrawer from "./componets/MenuDrawer";

function LinhaLaranja({ width = 90 }: { width?: number }) {
  return (
    <Svg width={width} height={3} viewBox={`0 0 ${width} 3`}>
      <Path d={`M0 0 L${width} 0.5 L${width} 1.2 L0 3 Z`} fill="#FF8C00" />
    </Svg>
  );
}

export default function AlterarSenha() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarAtual, setMostrarAtual] = useState(false);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarConf, setMostrarConf] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return evt.nativeEvent.pageX < 35 && gestureState.dx > 60 && Math.abs(gestureState.dy) < 50;
      },
      onPanResponderRelease: () => setMenuAberto(true),
    })
  ).current;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
      
      <View style={styles.headerAzul}>
        <TouchableOpacity style={styles.hamburguer} onPress={() => setMenuAberto(true)}>
          <View style={styles.traco} />
          <View style={[styles.traco, { width: 14 }]} />
          <View style={[styles.traco, { width: 10 }]} />
        </TouchableOpacity>
        <View style={styles.logoCentro}>
          <Image source={require("../../assets/images/BuscaLar-preto.png")} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titulo}>Alterar Senha</Text>
            <View style={{ marginTop: 4 }}>
              <LinhaLaranja width={90} />
            </View>
            <Text style={styles.subtitulo}>Defina uma nova senha para sua conta</Text>
          </View>

          <Text style={styles.label}>Senha atual</Text>
          <View style={styles.inputBox}>
            <TextInput style={styles.input} placeholder="••••••••" secureTextEntry={!mostrarAtual} value={senhaAtual} onChangeText={setSenhaAtual} />
            <TouchableOpacity onPress={() => setMostrarAtual(!mostrarAtual)}>
              <Ionicons name={mostrarAtual ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nova senha</Text>
          <View style={styles.inputBox}>
            <TextInput style={styles.input} placeholder="••••••••" secureTextEntry={!mostrarNova} value={novaSenha} onChangeText={setNovaSenha} />
            <TouchableOpacity onPress={() => setMostrarNova(!mostrarNova)}>
              <Ionicons name={mostrarNova ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar nova senha</Text>
          <View style={styles.inputBox}>
            <TextInput style={styles.input} placeholder="••••••••" secureTextEntry={!mostrarConf} value={confirmarSenha} onChangeText={setConfirmarSenha} />
            <TouchableOpacity onPress={() => setMostrarConf(!mostrarConf)}>
              <Ionicons name={mostrarConf ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.avisoBox}>
            <Ionicons name="lock-closed" size={16} color="#FF8C00" />
            <Text style={styles.avisoTxt}>Use no mínimo 8 caracteres, com letras e números.</Text>
          </View>

          {/* SÓ VAI PRA SENHA SALVA QUANDO APERTA AQUI */}
          <TouchableOpacity style={styles.btnSalvar} onPress={() => router.push("/senhasalva" as any)}>
            <Text style={styles.btnTxt}>Salvar Nova Senha</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      <MenuDrawer visible={menuAberto} onClose={() => setMenuAberto(false)} onOpen={() => setMenuAberto(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  headerAzul: {
    backgroundColor: "#1A5CFF",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    height: 110,
    paddingTop: 12,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  hamburguer: { gap: 4, width: 40, marginTop: 2, marginBottom: 40 },
  traco: { width: 18, height: 2.5, backgroundColor: "#FFF", borderRadius: 2 },
  logoCentro: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 2 },
  logo: { width: 195, height: 150, resizeMode: "contain", marginTop: -8 },
  card: { flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: "hidden" },
  scroll: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 30 },
  titulo: { fontSize: 20, fontWeight: "900", color: "#000", textAlign: "center" },
  subtitulo: { fontSize: 12, color: "#666", textAlign: "center", marginTop: 8, marginBottom: 20 },
  label: { fontSize: 12, fontWeight: "700", color: "#000", marginBottom: 6, marginTop: 14 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.3,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  input: { flex: 1, fontSize: 14, color: "#000" },
  avisoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 18,
    backgroundColor: "#FFF3E6",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  avisoTxt: { fontSize: 11, color: "#333", flex: 1 },
  btnSalvar: { backgroundColor: "#FF8C00", height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", marginTop: 24 },
  btnTxt: { color: "#fff", fontWeight: "800", fontSize: 14 },
});