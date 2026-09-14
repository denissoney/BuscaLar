import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Clipboard,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MenuDrawer from "../app/componets/MenuDrawer";
const PIX_CODE = "00020126580014BR.GOV.BCB.PIX0136a7c9e123-4b5a-9c8d-1e2f3a4b5c6d520400053039865405120.00S802BR5913BUSCALARLTDA6009MACEI062070503***6304A1F2";
export default function Pagamento() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [aba, setAba] = useState<"pix" | "cartao">("pix");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [nome, setNome] = useState("");
  const [salvar, setSalvar] = useState(true);
  const copiarPix = async () => {
    Clipboard.setString(PIX_CODE);
    Alert.alert("Copiado!", "Chave PIX copiada");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* TOPO AZUL MAIOR IGUAL AO PRINT */}
      <View style={styles.topoAzul}>
        <View style={styles.headerAzul}>
          <TouchableOpacity style={styles.btnHamburguer} onPress={() => setMenuVisible(true)}>
            <View style={[styles.traco, { width: 18 }]} />
            <View style={[styles.traco, { width: 12 }]} />
            <View style={[styles.traco, { width: 7 }]} />
          </TouchableOpacity>
          <View style={styles.tituloHeaderRow}>
            <View style={styles.iconeBox}><Ionicons name="card" size={18} color="#fff" /></View>
            <Text style={styles.tituloHeader}>Pagamento</Text>
          </View>
          <View style={{ width: 32 }} />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        
        {/* ABAS - AGORA FICA AZUL CORRETO */}
        <View style={styles.abasContainer}>
          <View style={styles.abasBg}>
            <TouchableOpacity 
              style={[styles.abaBtn, aba === "pix" && styles.abaAtiva]}
              onPress={() => setAba("pix")}
            >
              <Text style={[styles.abaText, aba === "pix" && styles.abaTextAtiva]}>Pix</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.abaBtn, aba === "cartao" && styles.abaAtiva]}
              onPress={() => setAba("cartao")}
            >
              <Text style={[styles.abaText, aba === "cartao" && styles.abaTextAtiva]}>Cartão</Text>
            </TouchableOpacity>
          </View>
        </View>

        {aba === "pix" ? (
          <View style={{ paddingHorizontal: 16 }}>
            <TouchableOpacity style={styles.btnQrCode}>
              <Text style={styles.btnQrCodeText}>Pagar com QR CODE</Text>
            </TouchableOpacity>

            <View style={styles.qrWrapper}>
              <View style={styles.qrBox}>
                <Image source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${PIX_CODE}` }} style={styles.qrImg} />
                <View style={[styles.canto, styles.cantoTL]} />
                <View style={[styles.canto, styles.cantoTR]} />
                <View style={[styles.canto, styles.cantoBL]} />
                <View style={[styles.canto, styles.cantoBR]} />
              </View>

              <View style={styles.codigoContainer}>
                <Text style={styles.labelPix}>Ou copie o codigo pix:</Text>
                <View style={styles.codigoRow}>
                  <Text style={styles.codigoText}>{PIX_CODE}</Text>
                  <TouchableOpacity onPress={copiarPix} style={styles.btnCopySmall}>
                    <Ionicons name="copy-outline" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.infoApontar}>Aponte a câmera do seu banco para o QR Code</Text>
                <Text style={styles.infoValidade}>O código é válido por 15:00 minutos</Text>
              </View>

              <TouchableOpacity style={styles.btnCopiar} onPress={copiarPix} activeOpacity={0.8}>
                <Ionicons name="copy-outline" size={18} color="#fff" />
                <Text style={styles.btnCopiarText}>Copiar chave pix</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.cartaoContainer}>
            <View style={styles.cardVisual}>
              <View style={styles.cardAzul}>
                <Text style={styles.cardChip}>■</Text>
                <Text style={styles.cardNum}>4242 4242 4242 4242</Text>
                <Text style={styles.cardVisa}>VISA</Text>
              </View>
            </View>

            <Text style={styles.labelTitulo}>Dados do cartão</Text>

            <Text style={styles.labelInput}>Número do cartão</Text>
            <View style={styles.inputWithIcon}>
              <TextInput 
                style={styles.inputInterno} 
                value={numero} 
                onChangeText={setNumero} 
                keyboardType="number-pad" 
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#999"
              />
              <View style={styles.bandeiras}>
                <Text style={styles.visa}>VISA</Text>
                <View style={styles.master}>
                  <View style={[styles.bola, { backgroundColor: "#E53935" }]} />
                  <View style={[styles.bola, { backgroundColor: "#FFB300", marginLeft: -6 }]} />
                </View>
              </View>
            </View>

            <View style={styles.row2}>
              <View style={{ flex: 1 }}>
                <Text style={styles.labelInput}>Validade MM/AA</Text>
                <TextInput style={styles.input} value={validade} onChangeText={setValidade} placeholder="08/28" placeholderTextColor="#999" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.labelRow}>
                  <Text style={styles.labelInput}>CVV</Text>
                  <Ionicons name="help-circle-outline" size={14} color="#000" />
                </View>
                <TextInput style={styles.input} value={cvv} onChangeText={setCvv} placeholder="***" placeholderTextColor="#999" secureTextEntry />
              </View>
            </View>

            <Text style={styles.labelInput}>Nome impresso no cartão</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Davi Miguel" placeholderTextColor="#999" />

            <View style={styles.salvarRow}>
              <Text style={styles.salvarText}>Salvar cartão</Text>
              <Switch value={salvar} onValueChange={setSalvar} trackColor={{ false: "#ccc", true: "#FF8C00" }} thumbColor="#fff" />
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValor}>R$ 350,00</Text>
            </View>

            <TouchableOpacity style={styles.btnPagar} onPress={() => Alert.alert("Pagamento", "Pagamento realizado!")}>
              <Text style={styles.btnPagarText}>Pagar agora</Text>
            </TouchableOpacity>

            <View style={styles.seguroRow}>
              <Ionicons name="lock-closed-outline" size={12} color="#FF8C00" />
              <Text style={styles.seguroText}>Pagamento 100% seguro - Dados protegidos por criptografia</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <MenuDrawer visible={menuVisible} onClose={() => setMenuVisible(false)} onOpen={() => setMenuVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1A5CFF" 
},
  // AZUL MAIOR IGUAL AO PRINT
  topoAzul: { 
    backgroundColor: "#1A5CFF", 
    height: 120, 
    justifyContent: "center", 
    marginTop: 50,
},
  headerAzul: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 10 },
  btnHamburguer: { 
    width: 32, 
    height: 32, 
    justifyContent: "center", 
    gap: 5, 
    alignItems: "flex-start", 
    marginTop: -180,
},
  traco: { height: 2.8, backgroundColor: "#fff", borderRadius: 10 },
  tituloHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconeBox: { 
    backgroundColor: "#000", 
    width: 34, 
    height: 28, 
    borderRadius: 0, 
    alignItems: "center", 
    justifyContent: "center" 
},
  tituloHeader: { 
    fontSize: 22, 
    fontWeight: "800", 
    color: "#000" 
},
  content: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingTop: 10, marginTop: 2 },

  abasContainer: { paddingHorizontal: 16, paddingTop: 8 },
  abasBg: { flexDirection: "row", backgroundColor: "#E9E9E9", borderRadius: 20, padding: 3 },
  abaBtn: { flex: 1, height: 34, alignItems: "center", justifyContent: "center", borderRadius: 20 },
  abaAtiva: { backgroundColor: "#3B82FF" },
  abaText: { fontSize: 14, fontWeight: "700", color: "#000" },
  abaTextAtiva: { color: "#fff" },

  btnQrCode: { marginTop: 12, height: 34, backgroundColor: "#E8EFFF", borderRadius: 20, borderWidth: 1, borderColor: "#6B9EFF", alignItems: "center", justifyContent: "center" },
  btnQrCodeText: { fontSize: 12, fontWeight: "700", color: "#000" },
  qrWrapper: { alignItems: "center", marginTop: 14 },
  qrBox: { width: 230, height: 230, backgroundColor: "#fff", borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#EEE" },
  qrImg: { width: 200, height: 200 },
  canto: { position: "absolute", width: 30, height: 30, borderColor: "#FF8C00", borderWidth: 3 },
  cantoTL: { top: -2, left: -2, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12 },
  cantoTR: { top: -2, right: -2, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12 },
  cantoBL: { bottom: -2, left: -2, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12 },
  cantoBR: { bottom: -2, right: -2, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12 },
  codigoContainer: { width: "100%", marginTop: 14 },
  labelPix: { fontSize: 11, fontWeight: "700", color: "#000", marginBottom: 6 },
  codigoRow: { flexDirection: "row", backgroundColor: "#F5F5F5", borderRadius: 8, padding: 10, gap: 8 },
  codigoText: { flex: 1, fontSize: 9, color: "#000", lineHeight: 13 },
  btnCopySmall: { width: 24, height: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderRadius: 4, borderWidth: 1, borderColor: "#DDD" },
  infoApontar: { fontSize: 11, fontWeight: "700", color: "#000", textAlign: "center", marginTop: 12 },
  infoValidade: { fontSize: 10, color: "#777", textAlign: "center", marginTop: 2 },
  btnCopiar: { marginTop: 18, width: "100%", height: 44, backgroundColor: "#FF8C00", borderRadius: 22, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  btnCopiarText: { color: "#fff", fontWeight: "800", fontSize: 13 },

  cartaoContainer: { paddingHorizontal: 16, paddingTop: 12 },
  cardVisual: { alignItems: "center", marginBottom: 10 },
  cardAzul: { width: 180, height: 110, backgroundColor: "#1A5CFF", borderRadius: 12, padding: 12, justifyContent: "space-between" },
  cardChip: { color: "#FFD700", fontSize: 18 },
  cardNum: { color: "#fff", fontSize: 12, letterSpacing: 1, textAlign: "center" },
  cardVisa: { color: "#fff", fontWeight: "900", alignSelf: "flex-end" },
  labelTitulo: { fontSize: 14, fontWeight: "800", color: "#000", marginBottom: 4 },
  labelInput: { fontSize: 11, color: "#000", marginBottom: 4, marginTop: 10 },
  labelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 10 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#D9D9D9", borderRadius: 18, height: 38, paddingHorizontal: 12, fontSize: 12, color: "#000" },
  inputWithIcon: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#D9D9D9", borderRadius: 18, height: 38, paddingHorizontal: 12 },
  inputInterno: { flex: 1, fontSize: 12, color: "#000", height: "100%" },
  bandeiras: { flexDirection: "row", alignItems: "center", gap: 8 },
  visa: { fontSize: 10, fontWeight: "900", color: "#1A5CFF" },
  master: { flexDirection: "row", alignItems: "center" },
  bola: { width: 12, height: 12, borderRadius: 6 },
  row2: { flexDirection: "row", gap: 10 },
  salvarRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F5F5F5", borderRadius: 18, height: 38, paddingHorizontal: 12, marginTop: 14, borderWidth: 1, borderColor: "#EAEAEA" },
  salvarText: { fontSize: 12, color: "#000" },
  totalRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F5F5F5", borderRadius: 18, height: 42, paddingHorizontal: 12, marginTop: 10, borderWidth: 1, borderColor: "#EAEAEA" },
  totalLabel: { fontSize: 12, color: "#000" },
  totalValor: { fontSize: 16, fontWeight: "800", color: "#000" },
  btnPagar: { marginTop: 14, height: 42, backgroundColor: "#FF8C00", borderRadius: 20, alignItems: "center", justifyContent: "center" },
  btnPagarText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  seguroRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 10 },
  seguroText: { fontSize: 9, color: "#777" },
});