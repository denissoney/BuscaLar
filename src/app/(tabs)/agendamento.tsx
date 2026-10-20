
import React, { useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, Pressable, Animated, PanResponder, Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Polygon } from "react-native-svg";
import { useTheme } from "../../contexts/ThemeContext";

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const MESES = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];
const HORARIOS = ["9:00", "10:30", "14:00", "16:30"];
const LARGURA_MENU = 280;
type TipoDia = "anterior" | "atual" | "proximo";
type DiaCalendario = { dia: number; tipo: TipoDia;};
export default function AgendarVisita() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();
  const hoje = new Date();
  const [menuVisible, setMenuVisible] = useState(false);
  const [data, setData] = useState( new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());
  const [horaSelecionada, setHoraSelecionada] = useState("10:30");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const menuVisibleRef = useRef(false);
  const menuAnim = useRef(new Animated.Value(-LARGURA_MENU)).current;
  const cores = useMemo(
    () => ({
      fundo: dark ? "#121212" : "#FFFFFF",
      card: dark ? "#242426" : "#FFFFFF",
      texto: dark ? "#FFFFFF" : "#111111",
      textoSecundario: dark ? "#BBBBBB" : "#666666",
      borda: dark ? "#414145" : "#E5E5E5",
      diaOutroMes: dark ? "#333337" : "#EFEFEF",
      input: dark ? "#1B1B1D" : "#FFFFFF",
      placeholder: dark ? "#999999" : "#888888",
      menu: dark ? "#242426" : "#FFFFFF",
      menuTexto: dark ? "#FFFFFF" : "#111111",
      menuBorda: dark ? "#414145" : "#EEEEEE",
      azul: "#448AFF",
      azulCalendario: "#1A5CFF",
      laranja: "#FF8C00",
    }), [dark]
  );
  const abrirMenu = () => {
    if (menuVisibleRef.current) return;
    menuVisibleRef.current = true;
    setMenuVisible(true);
    menuAnim.stopAnimation();
    Animated.timing(menuAnim, { toValue: 0, duration: 250, useNativeDriver: true, }).start(); };
  const fecharMenu = (aoFechar?: () => void) => {
    menuVisibleRef.current = false;
    menuAnim.stopAnimation();
    Animated.timing(menuAnim, { toValue: -LARGURA_MENU, duration: 220, useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMenuVisible(false);
        aoFechar?.();
      }
    });
  };

  const irPara = (rota: string) => {
    fecharMenu(() => {
      router.push(rota as any);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (_, gesto) =>
        !menuVisibleRef.current &&
        gesto.x0 <= 60 &&
        Math.abs(gesto.dx) > Math.abs(gesto.dy) * 1.2 &&
        gesto.dx > 8,

      onPanResponderMove: (_, gesto) => {
        const novoX = Math.max(
          -LARGURA_MENU,
          Math.min(0, -LARGURA_MENU + gesto.dx)
        );

        menuAnim.setValue(novoX);
      },

      onPanResponderRelease: (_, gesto) => {
        if (gesto.dx >= 90) {
          menuVisibleRef.current = true;
          setMenuVisible(true);

          Animated.spring(menuAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 70,
            friction: 12,
          }).start();
        } else {
          menuVisibleRef.current = false;

          Animated.timing(menuAnim, {
            toValue: -LARGURA_MENU,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },

      onPanResponderTerminate: () => {
        if (!menuVisibleRef.current) {
          Animated.timing(menuAnim, {
            toValue: -LARGURA_MENU,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const mudarMes = (direcao: number) => {
    setData((dataAtual) => {
      return new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth() + direcao,
        1
      );
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
      dias.push({
        dia: quantidadeDiasMesAnterior - i,
        tipo: "anterior",
      });
    }

    for (let dia = 1; dia <= quantidadeDiasMes; dia++) {
      dias.push({
        dia,
        tipo: "atual",
      });
    }

    let diaProximoMes = 1;

    while (dias.length % 7 !== 0) {
      dias.push({
        dia: diaProximoMes,
        tipo: "proximo",
      });

      diaProximoMes++;
    }

    const semanas: DiaCalendario[][] = [];

    for (let i = 0; i < dias.length; i += 7) {
      semanas.push(dias.slice(i, i + 7));
    }

    return semanas;
  }, [data]);

  const confirmarAgendamento = () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Digite seu nome completo.");
      return;
    }

    const numeroWhatsApp = whatsapp.replace(/\D/g, "");

    if (numeroWhatsApp.length < 10 || numeroWhatsApp.length > 13) {
      Alert.alert(
        "Atenção",
        "Digite um número de WhatsApp válido, incluindo o DDD."
      );
      return;
    }

    const dataSelecionada = new Date(
      data.getFullYear(),
      data.getMonth(),
      diaSelecionado
    );

    const dataFormatada = [
      String(dataSelecionada.getDate()).padStart(2, "0"),
      String(dataSelecionada.getMonth() + 1).padStart(2, "0"),
      dataSelecionada.getFullYear(),
    ].join("/");

    router.push({
      pathname: "/agendamentosucesso",
      params: {
        nome: nome.trim(),
        whatsapp: numeroWhatsApp,
        data: dataFormatada,
        horario: horaSelecionada,
        imovel: "Apartamento ponta verde",
      },
    } as any);
  };

  const renderizarItemMenu = (
    icone: React.ComponentProps<typeof Ionicons>["name"],
    titulo: string,
    rota: string,
    sair = false
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => irPara(rota)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icone}
        size={22}
        color={sair ? "#E53935" : cores.menuTexto}
      />

      <Text
        style={[
          styles.itemText,
          { color: sair ? "#E53935" : cores.menuTexto },
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cores.azul, paddingTop: insets.top },
      ]}
      {...panResponder.panHandlers}
    >
      {/* CABEÇALHO */}

      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>
          <TouchableOpacity
            style={styles.btnHamburguer}
            onPress={abrirMenu}
            activeOpacity={0.7}
            accessibilityLabel="Abrir menu"
          >
            <View style={[styles.traco, { width: 22 }]} />
            <View style={[styles.traco, { width: 16 }]} />
            <View style={[styles.traco, { width: 10 }]} />
          </TouchableOpacity>

          <Image source={ dark
                     ? require("../../../assets/images/logo.png")
                     : require("../../../assets/images/BuscaLar-preto.png") }
                  style={styles.logoImg}
                  resizeMode="contain"/>
          <View style={styles.espacoHeader} />
        </View>
      </View>

      {/* CONTEÚDO */}

      <ScrollView
        style={[
          styles.content,
          { backgroundColor: cores.fundo },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 20) + 25,
        }}
      >
        {/* TÍTULO */}

        <View style={styles.voltarRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.btnVoltarNovo}
            accessibilityLabel="Voltar"
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color={cores.texto}
            />
          </TouchableOpacity>

          <View style={styles.tituloCentro}>
            <Text style={[styles.titulo, { color: cores.texto }]}>
              Agendar Visita
            </Text>

            <Svg height={4} width={95} style={{ marginTop: 3 }}>
              <Polygon
                points="0,0 95,1 95,2 0,4"
                fill={cores.laranja}
              />
            </Svg>
          </View>

          <View style={styles.espacoTitulo} />
        </View>

        {/* IMÓVEL */}

        <View
          style={[
            styles.cardImovel,
            styles.sombra,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
            }}
            style={styles.cardImg}
          />

          <View style={styles.cardInfo}>
            <Text
              style={[styles.cardTitulo, { color: cores.texto }]}
              numberOfLines={2}
            >
              Apartamento ponta verde
            </Text>

            <View style={styles.localizacaoRow}>
              <Ionicons
                name="location"
                size={13}
                color={cores.laranja}
              />

              <Text
                style={[
                  styles.cardSub,
                  { color: cores.textoSecundario },
                ]}
              >
                Ponta Verde, Maceió-AL - 68m² - 2 quartos
              </Text>
            </View>
          </View>
        </View>

        {/* CALENDÁRIO */}

        <Text style={[styles.secaoTitulo, { color: cores.texto }]}>
          Escolha a data
        </Text>

        <View
          style={[
            styles.linhaAzul,
            { backgroundColor: cores.azulCalendario },
          ]}
        />

        <View style={styles.calendarioHeaderFora}>
          <TouchableOpacity
            onPress={() => mudarMes(-1)}
            activeOpacity={0.7}
            style={styles.btnMes}
            accessibilityLabel="Mês anterior"
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={cores.azulCalendario}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.calendarioMes,
              { color: cores.texto },
            ]}
          >
            {MESES[data.getMonth()]} {data.getFullYear()}
          </Text>

          <TouchableOpacity
            onPress={() => mudarMes(1)}
            activeOpacity={0.7}
            style={styles.btnMes}
            accessibilityLabel="Próximo mês"
          >
            <Ionicons
              name="chevron-forward"
              size={22}
              color={cores.azulCalendario}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.calendarioBox,
            styles.sombra,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
        >
          <View style={styles.semanaRow}>
            {DIAS_SEMANA.map((dia, index) => (
              <Text
                key={index}
                style={[
                  styles.diaSemana,
                  { color: cores.texto },
                ]}
              >
                {dia}
              </Text>
            ))}
          </View>

          {calendario.map((semana, indexSemana) => (
            <View key={indexSemana} style={styles.semanaRow}>
              {semana.map((item, indexDia) => {
                const isOutroMes = item.tipo !== "atual";
                const isSelecionado =
                  item.tipo === "atual" &&
                  item.dia === diaSelecionado;

                return (
                  <TouchableOpacity
                    key={`${indexSemana}-${indexDia}`}
                    style={[
                      styles.diaBolha,
                      {
                        backgroundColor: isOutroMes
                          ? cores.diaOutroMes
                          : cores.laranja,
                      },
                      isSelecionado && styles.diaSelecionado,
                    ]}
                    disabled={isOutroMes}
                    onPress={() => setDiaSelecionado(item.dia)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.diaTexto,
                        {
                          color: isOutroMes
                            ? cores.textoSecundario
                            : "#FFFFFF",
                        },
                      ]}
                    >
                      {item.dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* HORÁRIOS */}

        <Text style={[styles.secaoTitulo, { color: cores.texto }]}>
          Horários disponíveis
        </Text>

        <View
          style={[
            styles.linhaAzul,
            { backgroundColor: cores.azulCalendario },
          ]}
        />

        <View style={styles.horariosRow}>
          {HORARIOS.map((hora) => {
            const selecionado = hora === horaSelecionada;

            return (
              <TouchableOpacity
                key={hora}
                style={[
                  styles.horaBtn,
                  styles.sombraSuave,
                  {
                    backgroundColor: selecionado
                      ? cores.laranja
                      : dark
                        ? "#343B49"
                        : "#DCE8FF",
                    borderColor: selecionado
                      ? cores.laranja
                      : cores.borda,
                  },
                ]}
                onPress={() => setHoraSelecionada(hora)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.horaTexto,
                    {
                      color: selecionado
                        ? "#FFFFFF"
                        : cores.texto,
                    },
                  ]}
                >
                  {hora}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DADOS DO AGENDAMENTO */}

        <Text style={[styles.secaoTitulo, { color: cores.texto }]}>
          Dados do agendamento
        </Text>

        <View
          style={[
            styles.linhaAzul,
            { backgroundColor: cores.azulCalendario },
          ]}
        />

        <View style={styles.dadosRow}>
          {/* CONTATO DO CLIENTE */}

          <View
            style={[
              styles.dadoCard,
              styles.sombra,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.dadoTopo}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                style={styles.miniAvatar}
              />

              <Text
                style={[styles.dadoLabel, { color: cores.texto }]}
              >
                Nome
              </Text>
            </View>

            <TextInput
              style={[
                styles.input,
                {
                  color: cores.texto,
                  backgroundColor: cores.input,
                  borderColor: cores.borda,
                },
              ]}
              placeholder="Digite seu nome completo"
              placeholderTextColor={cores.placeholder}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              returnKeyType="next"
              maxLength={100}
            />

            <View style={styles.dadoTopo}>
              <Ionicons
                name="logo-whatsapp"
                size={15}
                color="#00D95F"
              />

              <Text
                style={[styles.dadoLabel, { color: cores.texto }]}
              >
                WhatsApp
              </Text>
            </View>

            <TextInput
              style={[
                styles.input,
                {
                  color: cores.texto,
                  backgroundColor: cores.input,
                  borderColor: cores.borda,
                },
              ]}
              placeholder="(82) 9 9999-9999"
              placeholderTextColor={cores.placeholder}
              value={whatsapp}
              onChangeText={setWhatsapp}
              keyboardType="phone-pad"
              returnKeyType="done"
              maxLength={16}
            />
          </View>

          {/* PROPRIETÁRIO */}

          <View
            style={[
              styles.dadoCard,
              styles.sombra,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.dadoTopo}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/32.jpg",
                }}
                style={styles.miniAvatar}
              />

              <Text
                style={[styles.dadoLabel, { color: cores.texto }]}
              >
                Proprietário
              </Text>
            </View>

            <Text style={[styles.propNome, { color: cores.texto }]}>
              Davi Miguel
            </Text>

            <Text
              style={[
                styles.propSub,
                { color: cores.textoSecundario },
              ]}
            >
              Responde em 15 min
            </Text>

            <Text style={styles.propEstrelas}>
              ★★★★★{" "}
              <Text style={[styles.propNota, { color: cores.texto }]}>
                4.9
              </Text>
            </Text>
          </View>
        </View>

        {/* CONFIRMAR */}

        <TouchableOpacity
          style={[styles.btnConfirmar, styles.sombra]}
          activeOpacity={0.8}
          onPress={confirmarAgendamento}
        >
          <Text style={styles.btnConfirmarText}>
            Confirmar agendamento
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MENU LATERAL */}

      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => fecharMenu()}
      >
        <View style={styles.menuWrapper}>
          <Pressable
            style={styles.menuBackground}
            onPress={() => fecharMenu()}
          />

          <Animated.View
            style={[
              styles.sideMenu,
              {
                backgroundColor: cores.menu,
                paddingTop: insets.top + 20,
                paddingBottom: insets.bottom,
                transform: [{ translateX: menuAnim }],
              },
            ]}
          >
            <View
              style={[
                styles.menuTopo,
                { borderBottomColor: cores.menuBorda },
              ]}
            >
              <View style={styles.avatarLaranja}>
                <Text style={styles.avatarLaranjaText}>D</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.menuNome,
                    { color: cores.menuTexto },
                  ]}
                >
                  Davi Miguel
                </Text>

                <Text style={styles.menuEmail}>
                  davi.miguel@gmail.com
                </Text>
              </View>

              <TouchableOpacity
                style={styles.btnFechar}
                onPress={() => fecharMenu()}
                activeOpacity={0.7}
                accessibilityLabel="Fechar menu"
              >
                <Ionicons
                  name="close"
                  size={28}
                  color={cores.menuTexto}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 30 }}
            >
              {renderizarItemMenu("home", "Início", "/")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("location", "Filtro", "/filtro")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("heart-outline", "Favoritos", "/favoritos")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("calendar", "Agendamentos", "/agendamento")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("card", "Pagamentos", "/pagamentos")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("document-text", "Contrato", "/contrato")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("person", "Perfil", "/perfil-proprietario")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("home-outline", "Casas", "/imoveis")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("settings", "Configurações", "/configuracoes")}
              <View style={[styles.linha, { backgroundColor: cores.menuBorda }]} />

              {renderizarItemMenu("exit-outline", "Sair", "/login", true)}
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
  },

  topoAzul: {
    backgroundColor: "#448AFF",
  },

  headerAzul: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  btnHamburguer: {
    width: 32,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
  },

  traco: {
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  logoImg: {
    width: 190,
    height: 64,
  },

  espacoHeader: {
    width: 32,
  },

  content: {
    flex: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
  },

  voltarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 6,
  },

  btnVoltarNovo: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  tituloCentro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  espacoTitulo: {
    width: 36,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },

  sombra: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  sombraSuave: {
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  cardImovel: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  cardImg: {
    width: 90,
    height: 76,
  },

  cardInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
  },

  cardTitulo: {
    fontSize: 13,
    fontWeight: "700",
  },

  localizacaoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  cardSub: {
    fontSize: 10,
    flex: 1,
  },

  secaoTitulo: {
    fontSize: 15,
    fontWeight: "800",
    marginHorizontal: 12,
    marginTop: 16,
  },

  linhaAzul: {
    height: 2,
    width: 50,
    marginLeft: 12,
    marginTop: 4,
    marginBottom: 8,
    borderRadius: 2,
  },

  calendarioHeaderFora: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 6,
    marginTop: 2,
  },

  btnMes: {
    width: 35,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarioMes: {
    fontSize: 14,
    fontWeight: "700",
  },

  calendarioBox: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  semanaRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 3,
  },

  diaSemana: {
    width: "13%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
  },

  diaBolha: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  diaSelecionado: {
    backgroundColor: "#1A5CFF",
  },

  diaTexto: {
    fontSize: 11,
    fontWeight: "700",
  },

  horariosRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 12,
  },

  horaBtn: {
    minWidth: 68,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },

  horaTexto: {
    fontSize: 13,
    fontWeight: "700",
  },

  dadosRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    marginTop: 4,
  },

  dadoCard: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderRadius: 10,
    padding: 9,
  },

  dadoTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 6,
  },

  miniAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },

  dadoLabel: {
    fontSize: 10,
    fontWeight: "600",
    flexShrink: 1,
  },

  input: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
    fontSize: 11,
    marginBottom: 12,
  },

  propNome: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  propSub: {
    fontSize: 9,
    marginTop: 3,
  },

  propEstrelas: {
    fontSize: 12,
    color: "#FF8C00",
    marginTop: 7,
  },

  propNota: {
    fontSize: 10,
    fontWeight: "700",
  },

  btnConfirmar: {
    backgroundColor: "#FF8C00",
    marginHorizontal: 12,
    marginTop: 18,
    minHeight: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  btnConfirmarText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
    textAlign: "center",
  },

  menuWrapper: {
    flex: 1,
    position: "relative",
  },

  menuBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  sideMenu: {
    width: LARGURA_MENU,
    maxWidth: "85%",
    height: "100%",
    elevation: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  menuTopo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    borderBottomWidth: 1,
  },

  avatarLaranja: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarLaranjaText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
  },

  menuNome: {
    fontSize: 14,
    fontWeight: "700",
  },

  menuEmail: {
    fontSize: 10,
    color: "#888888",
    marginTop: 2,
  },

  btnFechar: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 14,
  },

  itemText: {
    fontSize: 14,
    fontWeight: "500",
  },

  linha: {
    height: 0.8,
    marginHorizontal: 16,
  },
});
