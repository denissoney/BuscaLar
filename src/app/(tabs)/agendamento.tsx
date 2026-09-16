import React, { useMemo, useRef, useState } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,
  TextInput, Modal, Pressable, Animated, PanResponder, Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Polygon } from "react-native-svg";

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const HORARIOS = ["9:00", "10:30", "14:00", "16:30"];
type TipoDia = "anterior" | "atual" | "proximo";
type DiaCalendario = { dia: number; tipo: TipoDia; };
export default function AgendarVisita() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [data, setData] = useState(new Date(2026, 7, 1));
  const [diaSelecionado, setDiaSelecionado] = useState(13);
  const [horaSelecionada, setHoraSelecionada] = useState("10:30");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const LARGURA_MENU = 280;
  const menuAnim = useRef(new Animated.Value(-LARGURA_MENU)).current;
  const abrirMenu = () => {
    if (menuVisible) return;
    setMenuVisible(true);
    menuAnim.stopAnimation();
    menuAnim.setValue(-LARGURA_MENU);
    Animated.timing(menuAnim, { toValue: 0, duration: 280, useNativeDriver: true }).start();
  };
  const fecharMenu = () => {
    menuAnim.stopAnimation();
    Animated.timing(menuAnim, { toValue: -LARGURA_MENU, duration: 220, useNativeDriver: true }).start(() => {
      setMenuVisible(false);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) => {
        return!menuVisible && g.x0 <= 60 && Math.abs(g.dx) > Math.abs(g.dy) * 1.2 && g.dx > 8;
      },
      onPanResponderMove: (_, g) => {
        const novoX = Math.max(-LARGURA_MENU, Math.min(0, -LARGURA_MENU + g.dx));
        menuAnim.setValue(novoX);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx >= 90) {
          setMenuVisible(true);
          Animated.timing(menuAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start();
        } else {
          Animated.timing(menuAnim, { toValue: -LARGURA_MENU, duration: 150, useNativeDriver: true }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.timing(menuAnim, { toValue: -LARGURA_MENU, duration: 150, useNativeDriver: true }).start();
      },
    })
  ).current;

  const irPara = (rota: string) => {
    fecharMenu();
    setTimeout(() => { router.push(rota as any); }, 230);
  };

  const mudarMes = (direcao: number) => {
    setData((dataAtual) => {
      const novaData = new Date(dataAtual);
      novaData.setDate(1);
      novaData.setMonth(novaData.getMonth() + direcao);
      return novaData;
    });
    setDiaSelecionado(1);
  };

  const calendario = useMemo(() => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
    const quantidadeDiasMes = new Date(ano, mes + 1, 0).getDate();
    const quantidadeDiasMesAnterior = new Date(ano, mes, 0).getDate();
    const dias: DiaCalendario[] = [];
    for (let i = primeiroDiaDoMes - 1; i >= 0; i--) {
      dias.push({ dia: quantidadeDiasMesAnterior - i, tipo: "anterior" });
    }
    for (let dia = 1; dia <= quantidadeDiasMes; dia++) {
      dias.push({ dia, tipo: "atual" });
    }
    let diaProximoMes = 1;
    while (dias.length % 7!== 0) {
      dias.push({ dia: diaProximoMes, tipo: "proximo" });
      diaProximoMes++;
    }
    const semanas: DiaCalendario[][] = [];
    for (let i = 0; i < dias.length; i += 7) {
      semanas.push(dias.slice(i, i + 7));
    }
    return semanas;
  }, [data]);

  const confirmarAgendamento = () => {
    if (!nome.trim()) { Alert.alert("Atenção","Digite seu nome."); return; }
    if (!whatsapp.trim()) { Alert.alert("Atenção","Digite seu WhatsApp."); return; }
    Alert.alert("Agendamento confirmado!", `Sua visita foi agendada para ${diaSelecionado} de ${MESES[data.getMonth()]} às ${horaSelecionada}.`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} {...panResponder.panHandlers}>
      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>
          <TouchableOpacity style={styles.btnHamburguer} onPress={abrirMenu} activeOpacity={0.7}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 13 }]} />
            <View style={[styles.traco, { width: 8 }]} />
          </TouchableOpacity>
          <Image source={require("../../../assets/images/BuscaLar-preto.png")} style={styles.logoImg} resizeMode="contain" />
          <View style={{ width: 32 }} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* TÍTULO COM SETA SEM BOLA E NO CENTRO */}
        <View style={styles.voltarRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.btnVoltarNovo}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <View style={styles.tituloCentro}>
            <Text style={styles.titulo}>Agendar Visita</Text>
            <Svg height={4} width={95} style={{ marginTop: 3 }}>
              <Polygon points="0,0 95,1 95,2 0,4" fill="#FF8C00" />
            </Svg>
          </View>

          <View style={{ width: 32 }} />
        </View>

        <View style={[styles.cardImovel, styles.sombra]}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" }} style={styles.cardImg} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitulo}>Apartamento ponta verde</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <Ionicons name="location" size={12} color="#FF8C00" />
              <Text style={styles.cardSub}>Ponta verde, Maceió-AL - 68m² - 2 quartos</Text>
            </View>
          </View>
        </View>

        <Text style={styles.secaoTitulo}>Escolha a data</Text>
        <View style={styles.linhaAzul} />

        {/* NOME E SETAS DO MÊS FORA DA CAIXA */}
        <View style={styles.calendarioHeaderFora}>
          <TouchableOpacity onPress={() => mudarMes(-1)} activeOpacity={0.7} style={styles.btnMes}>
            <Ionicons name="chevron-back" size={22} color="#1A5CFF" />
          </TouchableOpacity>
          <Text style={styles.calendarioMes}>{MESES[data.getMonth()]} {data.getFullYear()}</Text>
          <TouchableOpacity onPress={() => mudarMes(1)} activeOpacity={0.7} style={styles.btnMes}>
            <Ionicons name="chevron-forward" size={22} color="#1A5CFF" />
          </TouchableOpacity>
        </View>

        {/* CAIXA DE DATAS COM BORDA PRETA FINA */}
        <View style={[styles.calendarioBox, styles.sombra]}>
          <View style={styles.semanaRow}>
            {DIAS_SEMANA.map((dia, index) => (
              <Text key={index} style={styles.diaSemana}>{dia}</Text>
            ))}
          </View>

          {calendario.map((semana, indexSemana) => (
            <View key={indexSemana} style={styles.semanaRow}>
              {semana.map((item, indexDia) => {
                const isOutroMes = item.tipo!== "atual";
                const isSelecionado = item.tipo === "atual" && item.dia === diaSelecionado;
                return (
                  <TouchableOpacity
                    key={`${indexSemana}-${indexDia}`}
                    style={[styles.diaBolha, isOutroMes && styles.diaOutroMes, isSelecionado && styles.diaSelecionado]}
                    disabled={isOutroMes}
                    onPress={() => { if (item.tipo === "atual") setDiaSelecionado(item.dia); }}
                    activeOpacity={0.7}>
                    <Text style={[styles.diaTexto, isOutroMes && { color: "#999" }, isSelecionado && { color: "#FFF" }]}>{item.dia}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>Horários disponíveis</Text>
        <View style={styles.linhaAzul} />
        <View style={styles.horariosRow}>
          {HORARIOS.map((hora) => {
            const selecionado = hora === horaSelecionada;
            return (
              <TouchableOpacity key={hora} style={[styles.horaBtn, styles.sombraSuave, selecionado && styles.horaSelecionada]} onPress={() => setHoraSelecionada(hora)} activeOpacity={0.7}>
                <Text style={[styles.horaTexto, selecionado && { color: "#FFF" }]}>{hora}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.secaoTitulo}>Dados do agendamento</Text>
        <View style={styles.linhaAzul} />
        <View style={styles.dadosRow}>
          <View style={[styles.dadoCard, styles.sombra]}>
            <View style={styles.dadoTopo}>
              <Image source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.miniAvatar} />
              <Text style={styles.dadoLabel}>Nome</Text>
            </View>
            <TextInput style={styles.input} placeholder="Digite seu nome completo" placeholderTextColor="#999" value={nome} onChangeText={setNome} />
            <View style={styles.dadoTopo}>
              <Ionicons name="logo-whatsapp" size={14} color="#00D95F" />
              <Text style={styles.dadoLabel}>WhatsApp</Text>
            </View>
            <TextInput style={styles.input} placeholder="(82) 9 9999-9999" placeholderTextColor="#999" value={whatsapp} onChangeText={setWhatsapp} keyboardType="phone-pad" />
          </View>

          <View style={[styles.dadoCard, styles.sombra]}>
            <View style={styles.dadoTopo}>
              <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.miniAvatar} />
              <Text style={styles.dadoLabel}>Proprietário</Text>
            </View>
            <Text style={styles.propNome}>Davi Miguel</Text>
            <Text style={styles.propSub}>responde em 15min</Text>
            <Text style={styles.propEstrelas}>★★★★★ <Text style={styles.propNota}>4.9</Text></Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.btnConfirmar, styles.sombra]} activeOpacity={0.8} onPress={confirmarAgendamento}>
          <Text style={styles.btnConfirmarText}>Confirmar agendamento</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={menuVisible} transparent animationType="none" statusBarTranslucent onRequestClose={fecharMenu}>
        <View style={styles.menuWrapper}>
          <Pressable style={styles.menuBackground} onPress={fecharMenu} />
          <Animated.View style={[styles.sideMenu, { paddingTop: insets.top + 70, transform: [{ translateX: menuAnim }] }]}>
            <View style={styles.menuTopo}>
              <View style={styles.avatarLaranja}><Text style={styles.avatarLaranjaText}>D</Text></View>
              <View style={{ flex: 1 }}><Text style={styles.menuNome}>Davi Miguel</Text><Text style={styles.menuEmail}>davi.miguel@gmail.com</Text></View>
              <TouchableOpacity style={styles.btnFechar} onPress={fecharMenu} activeOpacity={0.7}><Ionicons name="close" size={28} color="#000" /></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
              <View style={styles.lista}>
                <TouchableOpacity style={styles.item} onPress={() => irPara("/")}><Ionicons name="home" size={22} color="#000" /><Text style={styles.itemText}>Inicio</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/filtro")}><Ionicons name="location" size={22} color="#000" /><Text style={styles.itemText}>Filtro</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/favoritos")}><Ionicons name="heart-outline" size={22} color="#000" /><Text style={styles.itemText}>Favorito</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/agendamento")}><Ionicons name="calendar" size={22} color="#000" /><Text style={styles.itemText}>Agendamentos</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/pagamentos")}><Ionicons name="card" size={22} color="#000" /><Text style={styles.itemText}>Pagamentos</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/contrato")}><Ionicons name="document-text" size={22} color="#000" /><Text style={styles.itemText}>Contrato</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/perfil-proprietario")}><Ionicons name="person" size={22} color="#000" /><Text style={styles.itemText}>Perfil</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/imoveis")}><Ionicons name="home-outline" size={22} color="#000" /><Text style={styles.itemText}>Casas</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/configuracoes")}><Ionicons name="settings" size={22} color="#000" /><Text style={styles.itemText}>Configurações</Text></TouchableOpacity><View style={styles.linha} />
                <TouchableOpacity style={styles.item} onPress={() => irPara("/login")}><Ionicons name="exit-outline" size={22} color="#E53935" /><Text style={[styles.itemText, { color: "#E53935" }]}>Sair</Text></TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1A5CFF" 
  },
  topoAzul: { 
    backgroundColor: "#1A5CFF", 
    paddingBottom: -20 
  },
  headerAzul: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 8 
  },
  btnHamburguer: { 
    width: 32, 
    height: 32, 
    justifyContent: "center", 
    alignItems: "flex-start", 
    gap: 5,
    marginBottom: 90, 
  },
  traco: { 
    height: 3, 
    backgroundColor: "#FFF", 
    borderRadius: 10 
  },
  logoImg: { 
    width: 200, 
    height: 100
  },
  content: { flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 18, borderTopRightRadius: 18, paddingTop: 8 },
  voltarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, marginTop: 8, marginBottom: 6 },
  btnVoltarNovo: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  tituloCentro: { flex: 1, alignItems: "center", justifyContent: "center" },
  titulo: { fontSize: 17, fontWeight: "800", color: "#000", textAlign: "center" },
  linhaAzul: { height: 2, backgroundColor: "#1A5CFF", width: 50, marginLeft: 12, marginBottom: 8, borderRadius: 2 },
  sombra: { elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
  sombraSuave: { elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  cardImovel: { 
    flexDirection: "row", 
    marginHorizontal: 12, 
    marginTop: 10, 
    borderWidth: 1, 
    borderColor: "#000", 
    borderRadius: 10, 
    overflow: "hidden", 
    backgroundColor: "#FFF" 
  },
  cardImg: { width: 80, height: 60 },
  cardInfo: { flex: 1, paddingHorizontal: 10, paddingVertical: 6, justifyContent: "center" },
  cardTitulo: { fontSize: 13, fontWeight: "700", color: "#000" },
  cardSub: { fontSize: 9, color: "#555", flex: 1 },
  secaoTitulo: { fontSize: 15, fontWeight: "800", color: "#000", marginHorizontal: 12, marginTop: 14 },
  calendarioHeaderFora: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 12, marginBottom: 6, marginTop: 2 },
  btnMes: { width: 35, height: 30, alignItems: "center", justifyContent: "center" },
  calendarioMes: { fontSize: 14, fontWeight: "700", color: "#000" },
  calendarioBox: {
    marginHorizontal: 12,
    borderWidth: 1.2,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFF",
  },
  semanaRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 3 },
  diaSemana: { width: 28, textAlign: "center", fontSize: 12, fontWeight: "700", color: "#000" },
  diaBolha: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  diaOutroMes: { backgroundColor: "#EFEFEF" },
  diaSelecionado: { backgroundColor: "#1A5CFF" },
  diaTexto: { fontSize: 11, fontWeight: "700", color: "#FFF" },
  horariosRow: { flexDirection: "row", gap: 10, paddingHorizontal: 12 },
  horaBtn: { backgroundColor: "#8BB5FE", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  horaSelecionada: { backgroundColor: "#FF8C00" },
  horaTexto: { fontSize: 13, fontWeight: "700", color: "#000" },
  dadosRow: { flexDirection: "row", gap: 10, paddingHorizontal: 12, marginTop: 4 },
  dadoCard: { flex: 1, borderWidth: 1, borderColor: "#E5E5E5", borderRadius: 10, padding: 10, backgroundColor: "#FFF" },
  dadoTopo: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 4 },
  miniAvatar: { width: 18, height: 18, borderRadius: 9 },
  dadoLabel: { fontSize: 9, color: "#000", fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#DDD", borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6, fontSize: 10, marginBottom: 8, color: "#000" },
  propNome: { fontSize: 11, fontWeight: "700", color: "#000", marginTop: 4 },
  propSub: { fontSize: 8, color: "#777" },
  propEstrelas: { fontSize: 11, color: "#FF8C00", marginTop: 4 },
  propNota: { color: "#000", fontSize: 10 },
  btnConfirmar: { backgroundColor: "#FF8C00", marginHorizontal: 12, marginTop: 14, height: 42, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  btnConfirmarText: { color: "#FFF", fontWeight: "800", fontSize: 13 },
  menuWrapper: { flex: 1, position: "relative" },
  menuBackground: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.45)" },
  sideMenu: { width: 280, height: "100%", backgroundColor: "#FFF", zIndex: 9999, elevation: 30, shadowColor: "#000", shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.25, shadowRadius: 10 },
  menuTopo: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 10, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  avatarLaranja: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#FF8C00", alignItems: "center", justifyContent: "center" },
  avatarLaranjaText: { color: "#FFF", fontWeight: "800", fontSize: 16 },
  menuNome: { fontSize: 15, fontWeight: "700", color: "#000" },
  menuEmail: { fontSize: 11, color: "#777", marginTop: 1 },
  btnFechar: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  lista: { marginTop: 4 },
  item: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingVertical: 14, gap: 14 },
  itemText: { fontSize: 14, color: "#000", fontWeight: "500" },
  linha: { height: 0.8, backgroundColor: "#EEE", marginHorizontal: 16 },
});