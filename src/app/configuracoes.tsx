import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Configuracoes() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dark, setDark } = useTheme();
  const [pushAtivo, setPushAtivo] = useState(false);
  const bg = dark ? "#121212" : "#FFF";
  const text = dark ? "#FFF" : "#000";
  const border = dark ? "#444" : "#000";
  const headerBg = dark ? "#0F0F0F" : "#2F6BFF";

  useEffect(() => {
    async function carregarPush() {
      const salvo = await AsyncStorage.getItem("pushAtivo");
      if (salvo !== null) {
        setPushAtivo(salvo === "true");
      }
    }
    carregarPush();
  }, []);

  const togglePush = async (valor: boolean) => {
    setPushAtivo(valor);
    await AsyncStorage.setItem("pushAtivo", String(valor));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: headerBg }]}>
      <View style={[styles.headerAzul, { backgroundColor: headerBg }]}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={[styles.logoImg, dark && { tintColor: "#FFF" }]}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={[styles.conteudoBranco, { backgroundColor: bg }]}>
        <View style={styles.tituloRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.botaoVoltar}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={25} color={text} />
          </TouchableOpacity>

          <View style={styles.tituloCentral}>
            <Text style={[styles.titulo, { color: text }]}>Configurações</Text>
            <Svg width={110} height={6} style={{ marginTop: 3 }}>
              <Path d="M0 0.8 L0 4 L90 2.5 L90 0.8 Z" fill="#FF8C00" />
            </Svg>
          </View>

          <Ionicons name="settings-sharp" size={22} color={text} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/editarperfil" as any)}
            style={[styles.item, { backgroundColor: bg, borderColor: border }]}
          >
            <Ionicons name="people" size={20} color={text} style={styles.icone} />
            <Text style={[styles.itemText, { color: text }]}>Editar perfil</Text>
            <Ionicons name="chevron-forward" size={16} color={text} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <View style={[styles.item, { backgroundColor: bg, borderColor: border }]}>
            <Ionicons name="moon" size={20} color={text} style={styles.icone} />
            <Text style={[styles.itemText, { color: text }]}>Tema escuro</Text>
            <Switch
              value={dark}
              onValueChange={setDark}
              trackColor={{ false: "#CCC", true: "#FF8C00" }}
              thumbColor="#FFF"
              style={{ marginLeft: "auto" }}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/privacidade" as any)}
            style={[styles.item, { backgroundColor: bg, borderColor: border }]}
          >
            <Ionicons name="shield" size={20} color={text} style={styles.icone} />
            <Text style={[styles.itemText, { color: text }]}>Privacidade</Text>
            <Ionicons name="chevron-forward" size={16} color={text} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/alterarsenha" as any)}
            style={[styles.item, { backgroundColor: bg, borderColor: border }]}
          >
            <Ionicons name="lock-closed-outline" size={20} color={text} style={styles.icone} />
            <Text style={[styles.itemText, { color: text }]}>Alterar senha</Text>
            <Ionicons name="chevron-forward" size={16} color={text} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          <View style={[styles.item, { backgroundColor: bg, borderColor: border }]}>
            <Ionicons name="notifications" size={20} color={text} style={styles.icone} />
            <Text style={[styles.itemText, { color: text }]}>Notificações push</Text>
            <Switch
              value={pushAtivo}
              onValueChange={togglePush}
              trackColor={{ false: "#CCC", true: "#FF8C00" }}
              thumbColor="#FFF"
              style={{ marginLeft: "auto" }}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/suporte" as any)}
            style={[styles.item, { backgroundColor: bg, borderColor: border }]}
          >
            <View style={[styles.icone, styles.circulo, { borderColor: border }]}>
              <Text style={[styles.q, { color: text }]}>?</Text>
            </View>
            <Text style={[styles.itemText, { color: text }]}>Ajuda e suporte</Text>
            <Ionicons name="chevron-forward" size={16} color={text} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F6BFF",
  },
  headerAzul: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 10,
    height: 110,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImg: {
    width: 220,
    height: 110,
    marginLeft: 50,
  },
  conteudoBranco: {
    flex: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  tituloRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    paddingTop: 4,
  },
  tituloCentral: {
    alignItems: "center",
  },
  titulo: {
    fontSize: 19,
    fontWeight: "800",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  icone: {
    width: 28,
  },
  circulo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  q: {
    fontSize: 12,
    fontWeight: "900",
  },
  itemText: {
    fontSize: 13.5,
    fontWeight: "700",
  },
  botaoVoltar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
});