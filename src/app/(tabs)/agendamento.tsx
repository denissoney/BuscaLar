import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Svg, { Polygon } from "react-native-svg";

import MenuDrawer from "../../app/componets/MenuDrawer";

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const HORARIOS = ["9:00", "10:30", "14:00", "16:30"];

export default function AgendarVisita() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);

  const [data, setData] = useState(new Date(2026, 7, 1));
  const [diaSelecionado, setDiaSelecionado] = useState(13);
  const [horaSelecionada, setHoraSelecionada] = useState("10:30");

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function abrirMenu() {
    setMenuVisible(true);
  }

  function fecharMenu() {
    setMenuVisible(false);
  }

  const mudarMes = (dir: number) => {
    const nova = new Date(data);

    nova.setMonth(nova.getMonth() + dir);

    setData(nova);
  };

  const calendario = useMemo(() => {
    const ano = data.getFullYear();
    const mes = data.getMonth();

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const diasMesAnterior = new Date(ano, mes, 0).getDate();

    const dias: number[][] = [];
    let semana: number[] = [];
    let contador = 0;

    // Dias do mês anterior
    for (let i = primeiroDia - 1; i >= 0; i--) {
      semana.push(diasMesAnterior - i);
      contador++;
    }

    // Dias do mês atual
    for (let d = 1; d <= diasNoMes; d++) {
      semana.push(d);
      contador++;

      if (contador % 7 === 0) {
        dias.push(semana);
        semana = [];
      }
    }

    // Dias do próximo mês
    let proximo = 1;

    while (semana.length > 0 && semana.length < 7) {
      semana.push(proximo++);
    }

    if (semana.length) {
      dias.push(semana);
    }

    // Completa até 6 semanas
    while (dias.length < 6) {
      const novaSemana: number[] = [];

      for (let i = 0; i < 7; i++) {
        novaSemana.push(proximo++);
      }

      dias.push(novaSemana);
    }

    return dias;
  }, [data]);

  function confirmarAgendamento() {
    alert(
      `Agendado para dia ${diaSelecionado} às ${horaSelecionada}`
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      {/* TOPO AZUL */}
      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>

          {/* HAMBURGUER */}
          <TouchableOpacity
            style={styles.btnHamburguer}
            onPress={abrirMenu}
            activeOpacity={0.7}
          >
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </TouchableOpacity>

          {/* LOGO */}
          <Image
            source={require("../../../assets/images/BuscaLar-preto.png")}
            style={styles.logoImg}
            resizeMode="contain"
          />

          {/* ESPAÇO DIREITO */}
          <View style={{ width: 32 }} />
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 90,
        }}
      >
        {/* TÍTULO */}
        <View style={styles.voltarRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.btnVoltar}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color="#000"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.titulo}>
              Agendar Visita
            </Text>

            <Svg
              height={4}
              width={95}
              style={{ marginTop: 3 }}
            >
              <Polygon
                points="0,0 95,1 95,2 0,4"
                fill="#FF8C00"
              />
            </Svg>
          </View>
        </View>

        {/* IMÓVEL */}
        <View style={[styles.cardImovel, styles.sombra]}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
            }}
            style={styles.cardImg}
          />

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitulo}>
              Apartamento Ponta Verde
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginTop: 2,
              }}
            >
              <Ionicons
                name="location"
                size={12}
                color="#FF8C00"
              />

              <Text style={styles.cardSub}>
                Ponta Verde, Maceió-AL - 68m² - 2 quartos
              </Text>
            </View>
          </View>
        </View>

        {/* ESCOLHA A DATA */}
        <Text style={styles.secaoTitulo}>
          Escolha a data
        </Text>

        <View style={styles.linhaAzul} />

        {/* CALENDÁRIO */}
        <View style={[styles.calendarioBox, styles.sombra]}>
          <View style={styles.calendarioHeader}>
            <TouchableOpacity
              onPress={() => mudarMes(-1)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color="#1A5CFF"
              />
            </TouchableOpacity>

            <Text style={styles.calendarioMes}>
              {MESES[data.getMonth()]}{" "}
              {data.getFullYear()}
            </Text>

            <TouchableOpacity
              onPress={() => mudarMes(1)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#1A5CFF"
              />
            </TouchableOpacity>
          </View>

          {/* DIAS DA SEMANA */}
          <View style={styles.semanaRow}>
            {DIAS_SEMANA.map((d, i) => (
              <Text
                key={i}
                style={styles.diaSemana}
              >
                {d}
              </Text>
            ))}
          </View>

          {/* DIAS */}
          {calendario.map((semana, idx) => (
            <View
              key={idx}
              style={styles.semanaRow}
            >
              {semana.map((dia, j) => {
                const isOutroMes =
                  (idx === 0 && dia > 15) ||
                  (idx > 3 && dia < 15);

                const isSelecionado =
                  dia === diaSelecionado &&
                  !isOutroMes;

                return (
                  <TouchableOpacity
                    key={`${idx}-${j}`}
                    style={[
                      styles.diaBolha,
                      isOutroMes &&
                        styles.diaOutroMes,
                      isSelecionado &&
                        styles.diaSelecionado,
                    ]}
                    onPress={() =>
                      !isOutroMes &&
                      setDiaSelecionado(dia)
                    }
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.diaTexto,
                        isOutroMes && {
                          color: "#999",
                        },
                        isSelecionado && {
                          color: "#FFF",
                        },
                      ]}
                    >
                      {dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* HORÁRIOS */}
        <Text style={styles.secaoTitulo}>
          Horários disponíveis
        </Text>

        <View style={styles.linhaAzul} />

        <View style={styles.horariosRow}>
          {HORARIOS.map((h) => (
            <TouchableOpacity
              key={h}
              style={[
                styles.horaBtn,
                styles.sombraSuave,
                horaSelecionada === h &&
                  styles.horaSelecionada,
              ]}
              onPress={() =>
                setHoraSelecionada(h)
              }
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.horaTexto,
                  horaSelecionada === h && {
                    color: "#FFF",
                  },
                ]}
              >
                {h}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DADOS DO AGENDAMENTO */}
        <Text style={styles.secaoTitulo}>
          Dados do agendamento
        </Text>

        <View style={styles.linhaAzul} />

        <View style={styles.dadosRow}>

          {/* DADOS DO USUÁRIO */}
          <View
            style={[
              styles.dadoCard,
              styles.sombra,
            ]}
          >
            <View style={styles.dadoTopo}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                style={styles.miniAvatar}
              />

              <Text style={styles.dadoLabel}>
                Nome
              </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />

            <View style={styles.dadoTopo}>
              <Ionicons
                name="logo-whatsapp"
                size={12}
                color="#00D95F"
              />

              <Text style={styles.dadoLabel}>
                Whatsapp
              </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="(82) 9 9999-9999"
              placeholderTextColor="#999"
              value={whatsapp}
              onChangeText={setWhatsapp}
              keyboardType="phone-pad"
            />
          </View>

          {/* PROPRIETÁRIO */}
          <View
            style={[
              styles.dadoCard,
              styles.sombra,
            ]}
          >
            <View style={styles.dadoTopo}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/32.jpg",
                }}
                style={styles.miniAvatar}
              />

              <Text style={styles.dadoLabel}>
                Proprietário
              </Text>
            </View>

            <Text style={styles.propNome}>
              Davi Miguel
            </Text>

            <Text style={styles.propSub}>
              responde em 15min
            </Text>

            <Text style={styles.propEstrelas}>
              ★★★★★{" "}
              <Text style={styles.propNota}>
                4.9
              </Text>
            </Text>
          </View>
        </View>

        {/* CONFIRMAR */}
        <TouchableOpacity
          style={[
            styles.btnConfirmar,
            styles.sombra,
          ]}
          activeOpacity={0.8}
          onPress={confirmarAgendamento}
        >
          <Text style={styles.btnConfirmarText}>
            Confirmar agendamento
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MENU LATERAL COMPARTILHADO */}
      <MenuDrawer
        visible={menuVisible}
        onClose={fecharMenu}
        onOpen={abrirMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A5CFF",
  },

  topoAzul: {
    backgroundColor: "#1A5CFF",
    paddingBottom: 10,
  },

  headerAzul: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  btnHamburguer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    gap: 5,
    alignItems: "flex-start",
  },

  traco: {
    height: 2.8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  logoImg: {
    width: 170,
    height: 38,
  },

  content: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
  },

  voltarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 6,
    marginTop: 6,
  },

  btnVoltar: {
    width: 28,
    height: 28,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
  },

  linhaAzul: {
    height: 2,
    backgroundColor: "#1A5CFF",
    width: 50,
    marginLeft: 12,
    marginBottom: 8,
    borderRadius: 2,
  },

  sombra: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  sombraSuave: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  cardImovel: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
  },

  cardImg: {
    width: 80,
    height: 60,
  },

  cardInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
  },

  cardTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },

  cardSub: {
    fontSize: 9,
    color: "#555",
    flex: 1,
  },

  secaoTitulo: {
    fontSize: 15,
    fontWeight: "800",
    color: "#000",
    marginHorizontal: 12,
    marginTop: 14,
  },

  calendarioBox: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#FFF",
  },

  calendarioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  calendarioMes: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },

  semanaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },

  diaSemana: {
    width: 28,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
  },

  diaBolha: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF8C00",
    alignItems: "center",
    justifyContent: "center",
  },

  diaOutroMes: {
    backgroundColor: "#EEE",
  },

  diaSelecionado: {
    backgroundColor: "#1A5CFF",
  },

  diaTexto: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFF",
  },

  horariosRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
  },

  horaBtn: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  horaSelecionada: {
    backgroundColor: "#FF8C00",
  },

  horaTexto: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },

  dadosRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    marginTop: 4,
  },

  dadoCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFF",
  },

  dadoTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },

  miniAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },

  dadoLabel: {
    fontSize: 9,
    color: "#000",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 10,
    marginBottom: 8,
    color: "#000",
  },

  propNome: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000",
    marginTop: 4,
  },

  propSub: {
    fontSize: 8,
    color: "#777",
  },

  propEstrelas: {
    fontSize: 11,
    color: "#FF8C00",
    marginTop: 4,
  },

  propNota: {
    color: "#000",
    fontSize: 10,
  },

  btnConfirmar: {
    backgroundColor: "#FF8C00",
    marginHorizontal: 12,
    marginTop: 14,
    height: 42,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  btnConfirmarText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 13,
  },
});
