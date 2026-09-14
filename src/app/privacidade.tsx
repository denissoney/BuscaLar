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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
// MENU 
import MenuDrawer from "./componets/MenuDrawer";

function LinhaLaranja({ width = 22 }: { width?: number }) {
  return (
    <Svg width={width} height={2.5} viewBox={`0 0 ${width} 2.5`}>
      <Path d={`M0 0 L${width} 0.4 L${width} 1 L0 2.5 Z`} fill="#FF8C00" />
    </Svg>
  );
}

export default function Privacidade() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  // MESMO GESTO DO INDEX - ARRASTA PRA ABRIR
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          evt.nativeEvent.pageX < 35 &&
          gestureState.dx > 60 &&
          Math.abs(gestureState.dy) < 50
        );
      },
      onPanResponderRelease: () => {
        setMenuAberto(true);
      },
    })
  ).current;

  return (
    <View 
      style={[styles.container, { paddingTop: insets.top }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.headerAzul}>
        <TouchableOpacity style={styles.hamburguer} onPress={() => setMenuAberto(true)}>
          <View style={styles.traco} />
          <View style={[styles.traco, { width: 14 }]} />
          <View style={[styles.traco, { width: 10 }]} />
        </TouchableOpacity>
        
        <View style={styles.logoCentro}>
          <Image source={require("../../assets/images/BuscaLar-preto.png")} 
            style={styles.logo}
            resizeMode="contain"/>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          
          <View style={styles.tituloCentro}>
            <View style={styles.tituloRowInicio}>
              <View style={styles.tituloDuasLinhas}>
                <Text style={styles.titulo}>Política de</Text>
                <Text style={styles.titulo}>Privacidade</Text>
              </View>
              <View style={styles.help}><Text style={styles.helpTxt}>?</Text></View>
            </View>
            <View style={styles.linhaBaixoCentro}>
              <LinhaLaranja width={90} />
            </View>
          </View>

          <Text style={styles.data}>Última atualização: 10 de agosto de 2025</Text>

          <View style={styles.topico}>
            <Text style={styles.h3}><Text style={styles.num}>1.</Text> Coleta de Dados</Text>
            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>Coletamos informações que você fornece ao criar sua conta, usar nossos serviços, como preferências, além de dados de localização para sugerir imóveis próximos.</Text>
            </View>
          </View>

          <View style={styles.topico}>
            <Text style={styles.h3}><Text style={styles.num}>2.</Text> Como Usamos seus Dados</Text>
            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>Utilizamos seus dados para personalizar sua busca por imóveis, melhorar recomendações, enviar notificações relevantes, e manter a segurança de sua conta.</Text>
            </View>
          </View>

          <View style={styles.topico}>
            <Text style={styles.h3}><Text style={styles.num}>3.</Text> Compartilhamento</Text>
            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>Não vendemos seus dados pessoais. Podemos compartilhar informações com parceiros de confiança apenas para viabilizar nossos serviços, como processadores de pagamentos e serviços de análise, sempre de forma segura e conforme esta política.</Text>
            </View>
          </View>

          <View style={styles.topico}>
            <Text style={styles.h3}><Text style={styles.num}>4.</Text> Seus Direitos</Text>
            <View style={styles.textoComLinha}>
              <LinhaLaranja width={22} />
              <Text style={styles.p}>Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento através de:</Text>
            </View>
            <Text style={styles.pAzul}>Configurações {' > '} Conta {' > '} privacidade ou pelo e-mail privacidade@buscalar.com.br.</Text>
          </View>

          <TouchableOpacity style={styles.btn}><Text style={styles.btnTxt}>Baixar política completa em PDF</Text></TouchableOpacity>
        </ScrollView>

        <View style={styles.footerAzul}>
          <Text style={styles.footerTxt}>Conforme a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018</Text>
        </View>
      </View>

      {/* MESMO MENU DO INDEX */}
      <MenuDrawer
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        onOpen={() => setMenuAberto(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A5CFF" },
  headerAzul: { 
    backgroundColor: "#1A5CFF", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 14, 
    height: 110,
    paddingBottom: 10,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22, 
  },
  hamburguer: { 
    gap: 4, 
    width: 40, 
    justifyContent: "center", 
    marginTop: 6,
    marginBottom: 60, 
  }, 
  traco: { width: 18, height: 2.5, backgroundColor: "#FFF", borderRadius: 2 },
  logoCentro: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 6 },
  logo: { 
    width: 195, 
    height: 110, 
    resizeMode: "contain", 
    marginTop: 10 
  },
  card: { flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: "hidden" },
  scroll: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 12 },
  tituloCentro: { alignItems: "center", justifyContent: "center", marginBottom: 4 },
  tituloRowInicio: { flexDirection: "row", alignItems: "center", gap: 8 },
  tituloDuasLinhas: { alignItems: "center" },
  titulo: { fontSize: 19, fontWeight: "900", color: "#000", textAlign: "center", lineHeight: 20 },
  linhaBaixoCentro: { marginTop: 1, marginLeft: -55 },
  help: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.3, borderColor: "#000", alignItems: "center", justifyContent: "center" },
  helpTxt: { fontSize: 10, fontWeight: "800" },
  data: { fontSize: 11, color: "#666", textAlign: "center", marginTop: 10, marginBottom: 18 },
  topico: { marginBottom: 16 },
  h3: { fontSize: 13, fontWeight: "800", color: "#000", marginBottom: 6 },
  num: { color: "#000", fontWeight: "900" },
  textoComLinha: { flexDirection: "row", gap: 6, alignItems: "flex-start", marginTop: -5 },
  p: { flex: 1, fontSize: 11.5, color: "#333", lineHeight: 16 },
  pAzul: { fontSize: 11.5, color: "#1A5CFF", fontWeight: "600", lineHeight: 16, marginTop: 6, marginLeft: 28 },
  btn: { backgroundColor: "#FF8C00", height: 36, borderRadius: 18, alignSelf: "center", paddingHorizontal: 22, alignItems: "center", justifyContent: "center", marginTop: 20 },
  btnTxt: { color: "#FFF", fontWeight: "700", fontSize: 11.5 },
  footerAzul: { backgroundColor: "#1A5CFF", paddingVertical: 10, alignItems: "center" },
  footerTxt: { fontSize: 9, color: "#FFF", fontWeight: "600" },
});