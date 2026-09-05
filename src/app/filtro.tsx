import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Filtro() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-320)).current;

  const [objetivo, setObjetivo] = useState("alugar");
  const [tipo, setTipo] = useState("Apartamento");
  const [de, setDe] = useState("1000,00");
  const [ate, setAte] = useState("2500,00");
  const [onde, setOnde] = useState("");

  useEffect(() => {
    if (menuAberto) Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start();
    else Animated.timing(slideAnim, { toValue: -320, duration: 200, useNativeDriver: true }).start();
  }, [menuAberto]);

  const irPara = (rota: string) => {
    setMenuAberto(false);
    setTimeout(() => router.push(rota as any), 250);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.topo}>
          <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.hamburguer}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Quase Lá! 👋</Text>
        <Text style={styles.subTitulo}>Conte-nos um pouco sobre você para{"\n"}personalizar sua experiência.</Text>

        <View style={styles.linhaLabel}><Text style={styles.label}>Qual é o seu objetivo?</Text><View style={styles.linhaCinza} /></View>

        <View style={styles.rowObjetivo}>
          <TouchableOpacity style={[styles.cardObjetivo, objetivo === "alugar" && styles.cardAtivo]} onPress={() => setObjetivo("alugar")}>
            <View style={styles.iconeLaranja}><Ionicons name="search" size={18} color="#FFF" /></View>
            <Text style={styles.cardTitulo}>Quero alugar</Text><Text style={styles.cardSub}>Buscar imóveis para alugar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardObjetivo, objetivo === "anunciar" && styles.cardAtivo]} onPress={() => setObjetivo("anunciar")}>
            <View style={styles.iconeLaranja}><Ionicons name="home" size={18} color="#FFF" /></View>
            <Text style={styles.cardTitulo}>Quero anunciar</Text><Text style={styles.cardSub}>Tenho um imóvel para alugar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardObjetivo, objetivo === "ambos" && styles.cardAtivo]} onPress={() => setObjetivo("ambos")}>
            <View style={styles.iconeLaranja}><Ionicons name="heart" size={18} color="#FFF" /></View>
            <Text style={styles.cardTitulo}>Ambos</Text><Text style={styles.cardSub}>Quero alugar e anunciar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linhaLabel}><Text style={styles.label}>Que tipo de imóvel você prefere?</Text><View style={styles.linhaCinza} /></View>

        <View style={styles.gridTipos}>
          {["Apartamento", "Casa", "Kitnet / Studio", "Quarto", "Cobertura", "Imóvel comercial"].map((t) => (
            <TouchableOpacity key={t} style={[styles.btnTipo, tipo === t && styles.btnTipoAtivo]} onPress={() => setTipo(t)}>
              <Text style={[styles.btnTipoText, tipo === t && styles.btnTipoTextAtivo]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.linhaLabel}><View><Text style={styles.label}>Faixa de preço mensal</Text><Text style={styles.labelSmall}>Selecione sua faixa de preço ideal!</Text></View><View style={styles.linhaCinza} /></View>

        <View style={styles.rowPreco}>
          <Text style={styles.deAte}>DE:</Text>
          <View style={styles.inputPreco}><TextInput value={de} onChangeText={setDe} style={styles.inputPrecoText} /><Ionicons name="swap-vertical" size={14} color="#000" /></View>
          <Text style={styles.deAte}>ATÉ:</Text>
          <View style={styles.inputPreco}><TextInput value={ate} onChangeText={setAte} style={styles.inputPrecoText} /><Ionicons name="swap-vertical" size={14} color="#000" /></View>
        </View>

        <View style={{ marginHorizontal: 16, marginTop: 18 }}>
          <Text style={styles.label}>Onde você quer morar?</Text>
          <View style={styles.inputOnde}><Ionicons name="location" size={18} color="#000" /><TextInput placeholder="Digite a cidade ou bairro desejado" placeholderTextColor="#999" style={{ flex: 1, fontSize: 13 }} value={onde} onChangeText={setOnde} /></View>
        </View>

        <TouchableOpacity style={styles.btnContinuar} onPress={() => router.back()}><Text style={styles.btnContinuarText}>Continuar</Text></TouchableOpacity>
      </ScrollView>

      {/* MENU LATERAL COM HAMBURGUER FUNCIONANDO */}
      <Modal visible={menuAberto} transparent onRequestClose={() => setMenuAberto(false)}>
        <View style={styles.overlayMenu}>
          <Animated.View style={[styles.menuLateral, { paddingTop: insets.top + 10, transform: [{ translateX: slideAnim }] }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.menuHeader}>
                <View style={styles.avatarMenu}><Text style={styles.avatarTextMenu}>D</Text></View>
                <View style={{ flex: 1 }}><Text style={styles.menuNome}>Davi Miguel</Text><Text style={styles.menuEmail}>davi.miguel@gmail.com</Text></View>
                <TouchableOpacity onPress={() => setMenuAberto(false)} style={styles.menuClose}><Ionicons name="close" size={22} color="#000" /></TouchableOpacity>
              </View>
              <View style={styles.divisor} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/index")}><Ionicons name="home" size={22} color="#000" /><Text style={styles.menuItemText}>Inicio</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/filtro")}><Ionicons name="location" size={22} color="#000" /><Text style={styles.menuItemText}>Filtro</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/favoritos")}><Ionicons name="heart-outline" size={22} color="#000" /><Text style={styles.menuItemText}>Favorito</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/agendamento")}><Ionicons name="calendar" size={22} color="#000" /><Text style={styles.menuItemText}>Agendamentos</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/pagamentos")}><Ionicons name="card" size={22} color="#000" /><Text style={styles.menuItemText}>Pagamentos</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/contrato")}><Ionicons name="document-text" size={22} color="#000" /><Text style={styles.menuItemText}>Contrato</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/perfil")}><Ionicons name="person" size={22} color="#000" /><Text style={styles.menuItemText}>Perfil</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/meus-imoveis")}><Ionicons name="home-outline" size={22} color="#000" /><Text style={styles.menuItemText}>Casas</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/(tabs)/configuracoes")}><Ionicons name="settings" size={22} color="#000" /><Text style={styles.menuItemText}>Configurações</Text></TouchableOpacity><View style={styles.linha} />
              <TouchableOpacity style={styles.menuItem} onPress={() => irPara("/login")}><Ionicons name="exit-outline" size={22} color="#E53935" /><Text style={[styles.menuItemText, { color: "#E53935" }]}>Sair</Text></TouchableOpacity>
            </ScrollView>
          </Animated.View>
          <Pressable style={{ flex: 1 }} onPress={() => setMenuAberto(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  topo: { paddingHorizontal: 16, paddingTop: 6 },
  hamburguer: { width: 32, height: 32, justifyContent: "center", gap: 5, alignItems: "flex-start" },
  traco: { height: 2.8, backgroundColor: "#000", borderRadius: 10 },
  titulo: { fontSize: 22, fontWeight: "800", textAlign: "center", marginTop: 4, color: "#000" },
  subTitulo: { fontSize: 11, textAlign: "center", color: "#777", marginTop: 6 },
  linhaLabel: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 18, gap: 8 },
  label: { fontSize: 11, fontWeight: "700", color: "#000" },
  labelSmall: { fontSize: 8, color: "#777" },
  linhaCinza: { flex: 1, height: 1, backgroundColor: "#DDD" },
  rowObjetivo: { flexDirection: "row", gap: 8, marginHorizontal: 16, marginTop: 10 },
  cardObjetivo: { flex: 1, borderWidth: 1, borderColor: "#1A5CFF", borderRadius: 10, alignItems: "center", paddingVertical: 12, paddingHorizontal: 4, backgroundColor: "#FFF" },
  cardAtivo: { backgroundColor: "#FFF8EE", borderColor: "#FF8C00", borderWidth: 1.5 },
  iconeLaranja: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center", marginBottom: 6 },
  cardTitulo: { fontSize: 9, fontWeight: "800", color: "#000", textAlign: "center" },
  cardSub: { fontSize: 7, color: "#555", textAlign: "center", marginTop: 2 },
  gridTipos: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginHorizontal: 16, marginTop: 10 },
  btnTipo: { borderWidth: 1, borderColor: "#000", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  btnTipoAtivo: { backgroundColor: "#FF8C00", borderColor: "#FF8C00" },
  btnTipoText: { fontSize: 10, fontWeight: "700", color: "#000" },
  btnTipoTextAtivo: { color: "#FFF" },
  rowPreco: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 12, gap: 8 },
  deAte: { fontSize: 11, fontWeight: "800", color: "#000" },
  inputPreco: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#1A5CFF", borderRadius: 8, paddingHorizontal: 10, height: 32 },
  inputPrecoText: { fontSize: 12, fontWeight: "700", color: "#000", flex: 1 },
  inputOnde: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: "#1A5CFF", borderRadius: 8, height: 38, paddingHorizontal: 10, marginTop: 6 },
  btnContinuar: { backgroundColor: "#FF8C00", marginHorizontal: 16, marginTop: 22, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  btnContinuarText: { color: "#FFF", fontWeight: "800", fontSize: 14 },
  overlayMenu: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", flexDirection: "row" },
  menuLateral: { backgroundColor: "#fff", width: 300, height: "100%", paddingHorizontal: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  menuHeader: { flexDirection: "row", alignItems: "center", gap: 12, paddingBottom: 20 },
  avatarMenu: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  avatarTextMenu: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  menuNome: { fontWeight: "700", fontSize: 14 },
  menuEmail: { color: "#777", fontSize: 11 },
  menuClose: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F2F2F2", alignItems: "center", justifyContent: "center" },
  divisor: { height: 1, backgroundColor: "#EEE", marginVertical: 10 },
  linha: { height: 0.8, backgroundColor: "#EEE", marginHorizontal: 4 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 14 },
  menuItemText: { fontSize: 14, fontWeight: "500", color: "#000" },
});