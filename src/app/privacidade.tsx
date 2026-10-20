
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  PanResponder,
  StatusBar,
  Alert,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import MenuDrawer from "./componets/MenuDrawer";
import { useTheme } from "../contexts/ThemeContext";

type Cores = {
  fundo: string;
  superficie: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  laranja: string;
  link: string;
};

function LinhaLaranja({ width = 22 }: { width?: number }) {
  return (
    <Svg width={width} height={3} viewBox={`0 0 ${width} 3`}>
      <Path
        d={`M0 0 L${width} 0.4 L${width} 1.2 L0 3 Z`}
        fill="#FF8C00"
      />
    </Svg>
  );
}

export default function Privacidade() {
  const insets = useSafeAreaInsets();
  const [menuAberto, setMenuAberto] = useState(false);
  const { dark } = useTheme();
  const cores: Cores = {
    fundo: dark ? "#121212" : "#488AFF",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    texto: dark ? "#F5F5F5" : "#111111",
    textoSecundario: dark ? "#BDBDBD" : "#555555",
    borda: dark ? "#444444" : "#E2E2E2",
    azul: dark ? "#488AFF" : "#1A5CFF",
    laranja: "#FF8C00",
    link: dark ? "#82B1FF" : "#1A5CFF",
  };

  const styles = criarEstilos(cores);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        evt.nativeEvent.pageX < 35 &&
        gestureState.dx > 60 &&
        Math.abs(gestureState.dy) < 50,

      onPanResponderRelease: () => {
        setMenuAberto(true);
      },
    })
  ).current;

  const baixarPolitica = () => {
    Alert.alert(
      "Política de Privacidade",
      "O arquivo PDF ainda não está configurado. Adicione o PDF à pasta do projeto ou disponibilize um endereço válido para o documento."
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
      {...panResponder.panHandlers}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={dark ? "#121212" : "#488AFF"}
      />

      {/* CABEÇALHO */}
      <View style={styles.headerAzul}>
        <TouchableOpacity
          style={styles.hamburguer}
          onPress={() => setMenuAberto(true)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu lateral"
        >
          <View style={styles.traco} />
          <View style={[styles.traco, { width: 14 }]} />
          <View style={[styles.traco, { width: 10 }]} />
        </TouchableOpacity>

        <View style={styles.logoCentro}>
          <Image
            source={require("../../assets/images/BuscaLar-preto.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo do BuscaLar"
          />
        </View>

        <View style={styles.espacoDireito} />
      </View>

      {/* CONTEÚDO DA POLÍTICA */}
      <View style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.tituloCentro}>
            <View style={styles.tituloRowInicio}>
              <View style={styles.tituloDuasLinhas}>
                <Text style={styles.titulo}>Política de</Text>
                <Text style={styles.titulo}>Privacidade</Text>
              </View>

              <TouchableOpacity
                style={styles.help}
                onPress={() =>
                  Alert.alert(
                    "Política de Privacidade",
                    "Aqui você encontra informações sobre a coleta, o uso, o compartilhamento e seus direitos relacionados aos dados pessoais."
                  )
                }
                accessibilityRole="button"
                accessibilityLabel="Ajuda sobre a política"
              >
                <Text style={styles.helpTxt}>?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.linhaBaixoCentro}>
              <LinhaLaranja width={90} />
            </View>
          </View>

          <Text style={styles.data}>
            Última atualização: 20 de outubro de 2026
          </Text>

          <View style={styles.topico}>
            <Text style={styles.h3}>
              <Text style={styles.num}>1. </Text>
              Coleta de Dados
            </Text>

            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>
                Coletamos informações que você fornece ao criar sua conta e
                utilizar nossos serviços, como preferências e dados necessários
                para o funcionamento do aplicativo. Se você autorizar o acesso
                à localização, poderemos utilizá-la para sugerir imóveis próximos.
              </Text>
            </View>
          </View>

          <View style={styles.topico}>
            <Text style={styles.h3}>
              <Text style={styles.num}>2. </Text>
              Como Usamos seus Dados
            </Text>

            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>
                Utilizamos os dados para personalizar sua busca por imóveis,
                melhorar as recomendações, enviar notificações relevantes
                conforme suas preferências e ajudar a proteger sua conta.
              </Text>
            </View>
          </View>

          <View style={styles.topico}>
            <Text style={styles.h3}>
              <Text style={styles.num}>3. </Text>
              Compartilhamento
            </Text>

            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>
                O compartilhamento de dados pessoais deve ocorrer apenas
                quando necessário para as finalidades informadas, como viabilizar
                serviços contratados, cumprir obrigações legais ou proteger
                direitos. Os dados devem ser tratados conforme a legislação
                aplicável e as medidas de segurança pertinentes.
              </Text>
            </View>
          </View>

          <View style={styles.topico}>
            <Text style={styles.h3}>
              <Text style={styles.num}>4. </Text>
              Seus Direitos
            </Text>

            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>
                Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode
                solicitar, conforme aplicável, acesso, correção, informação
                sobre o tratamento e exclusão de dados pessoais.
              </Text>
            </View>

            <Text style={styles.pAzul}>
              Configurações {" > "} Conta {" > "} Privacidade
            </Text>

            <Text style={styles.p}>
              Contato para privacidade: privacidade@buscalar.com.br
            </Text>
          </View>

          <View style={styles.topico}>
            <Text style={styles.h3}>
              <Text style={styles.num}>5. </Text>
              Segurança e Retenção
            </Text>

            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>
                Buscamos adotar medidas técnicas e administrativas para proteger
                os dados pessoais. A retenção deve ocorrer pelo tempo necessário
                às finalidades do tratamento e às obrigações legais aplicáveis.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={baixarPolitica}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Text style={styles.btnTxt}>
              Baixar política completa em PDF
            </Text>
          </TouchableOpacity>

          <Text style={styles.avisoDocumento}>
            O botão será conectado ao arquivo PDF quando o documento estiver
            disponível no projeto.
          </Text>
        </ScrollView>

        <View style={styles.footerAzul}>
          <Text style={styles.footerTxt}>
            Conforme a Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018
          </Text>
        </View>
      </View>

      {/* MENU LATERAL */}
      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        onOpen={() => setMenuAberto(true)}
      />
    </View>
  );
}

function criarEstilos(cores: Cores) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },

    headerAzul: {
      backgroundColor: cores.fundo,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      height: 100,
      paddingBottom: 8,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },

    hamburguer: {
      gap: 4,
      width: 40,
      height: 48,
      justifyContent: "center",
      alignItems: "flex-start",
    },

    traco: {
      width: 18,
      height: 2.5,
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },

    logoCentro: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    logo: {
      width: 195,
      height: 85,
    },

    espacoDireito: {
      width: 40,
    },

    card: {
      flex: 1,
      backgroundColor: cores.superficie,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      overflow: "hidden",
    },

    scroll: {
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 24,
    },

    tituloCentro: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },

    tituloRowInicio: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },

    tituloDuasLinhas: {
      alignItems: "center",
    },

    titulo: {
      fontSize: 19,
      fontWeight: "900",
      color: cores.texto,
      textAlign: "center",
      lineHeight: 24,
    },

    linhaBaixoCentro: {
      marginTop: 4,
    },

    help: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.3,
      borderColor: cores.texto,
      alignItems: "center",
      justifyContent: "center",
    },

    helpTxt: {
      fontSize: 11,
      fontWeight: "800",
      color: cores.texto,
    },

    data: {
      fontSize: 11,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 12,
      marginBottom: 20,
    },

    topico: {
      marginBottom: 18,
    },

    h3: {
      fontSize: 13,
      fontWeight: "800",
      color: cores.texto,
      marginBottom: 8,
    },

    num: {
      color: cores.laranja,
      fontWeight: "900",
    },

    textoComLinha: {
      flexDirection: "row",
      gap: 8,
      alignItems: "flex-start",
      marginTop: 2,
    },

    p: {
      flex: 1,
      fontSize: 12,
      color: cores.textoSecundario,
      lineHeight: 18,
    },

    pAzul: {
      fontSize: 12,
      color: cores.link,
      fontWeight: "600",
      lineHeight: 18,
      marginTop: 9,
      marginLeft: 30,
      marginBottom: 6,
    },

    btn: {
      backgroundColor: cores.laranja,
      minHeight: 42,
      borderRadius: 18,
      alignSelf: "center",
      paddingHorizontal: 22,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
    },

    btnTxt: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 12,
      textAlign: "center",
    },

    avisoDocumento: {
      fontSize: 10,
      color: cores.textoSecundario,
      textAlign: "center",
      marginTop: 10,
      lineHeight: 15,
    },

    footerAzul: {
      backgroundColor: cores.azul,
      paddingHorizontal: 12,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
    },

    footerTxt: {
      fontSize: 10,
      color: "#FFFFFF",
      fontWeight: "600",
      textAlign: "center",
      lineHeight: 15,
    },
  });
}
