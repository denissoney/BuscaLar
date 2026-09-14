import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MenuDrawer from "./componets/MenuDrawer";

export default function SuporteDetalhe() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

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
          
          <TouchableOpacity onPress={() => router.back()} style={styles.voltar}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>

          <View style={styles.bloco}>
            <View style={styles.tituloRow}>
              <Ionicons name="home" size={18} color="#000" />
              <Text style={styles.tituloSecao}>Aluguel</Text>
            </View>
            <Text style={styles.comoResolver}>Como resolver?</Text>
            <Text style={styles.texto}>
              Está com dúvidas sobre aluguel, acesse seu contrato e confira as informações. Para renovação, vistoria ou entrega do imóvel, verifique as etapas detalhadas na tela. Se precisar de ajuda, entre em contato com o suporte.
            </Text>
          </View>

          <View style={styles.bloco}>
            <View style={styles.tituloRow}>
              <Ionicons name="card-outline" size={18} color="#000" />
              <Text style={styles.tituloSecao}>Pagamentos</Text>
            </View>
            <Text style={styles.comoResolver}>Como resolver?</Text>
            <Text style={styles.texto}>
              Está com dúvidas sobre boletos ou data de vencimento. Caso tenha problemas com pagamento, entre em contato pelo app. Utilize as opções disponíveis ou abra um chamado para atendimento.
            </Text>
          </View>

          <View style={styles.bloco}>
            <View style={styles.tituloRow}>
              <Ionicons name="document-text-outline" size={18} color="#000" />
              <Text style={styles.tituloSecao}>Contratos</Text>
            </View>
            <Text style={styles.comoResolver}>Como resolver?</Text>
            <Text style={styles.texto}>
              Acesse seus contratos para consultar informações, solicitar renovação ou verificar pendências. Se encontrar alguma inconsistência, abra um chamado para que a equipe possa analisar o caso.
            </Text>
          </View>

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
  logoCentro: { flex: 1, alignItems: "center", justifyContent: "center" },
  logo: { width: 195, height: 110, resizeMode: "contain", marginTop: -10 },
  card: { flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 22, borderTopRightRadius: 22, marginTop: -10, overflow: "hidden" },
  scroll: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 30 },
  voltar: { marginBottom: 8 },
  bloco: { marginBottom: 24, alignItems: "center" },
  tituloRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, marginBottom: 8 },
  tituloSecao: { fontSize: 16, fontWeight: "900", color: "#000", textAlign: "center" },
  comoResolver: { fontSize: 12, fontWeight: "700", color: "#000", textAlign: "center", marginBottom: 6 },
  texto: { fontSize: 11.5, color: "#555", lineHeight: 16, textAlign: "center", paddingHorizontal: 8 },
});