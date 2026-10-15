import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Pressable, FlatList, Modal, Alert} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const CIDADES = ["Maceió", "Recife", "Salvador", "São Paulo", "Rio de Janeiro", "Brasília", "Fortaleza", "Aracaju", "João Pessoa", "Natal", "Curitiba", "Belo Horizonte", "Porto Alegre"];
const BAIRROS_MACEIO = ["Pajuçara", "Ponta Verde", "Jatiúca", "Mangabeiras", "Jardim Petrópolis", "Farol", "Centro", "Cruz das Almas", "Jacarecica", "Barro Duro", "Serraria", "Antares", "Ponta Grossa", "Benedito Bentes"];
const QUARTOS = ["1", "2", "3", "4", "5+"];
const BANHEIROS = ["1", "2", "3", "4+"];
type Props = { label: string; placeholder: string; value: string; options: string[]; onSelect: (val: string) => void;};
function SearchableInput({ label, placeholder, value, options, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value); React.useEffect(() => { setSearch(value); }, [value]);
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.inputBox} activeOpacity={0.7} onPress={() => { setSearch(value); setOpen(true); }}>
        <Text style={[styles.input, { color: value? "black" : "#888" }]} numberOfLines={1}>{value || placeholder}</Text>
        <Ionicons name="chevron-down" size={16} color="#888" />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalOverlayFull} onPress={() => setOpen(false)}>
          <Pressable style={styles.modalBoxBig} onPress={() => {}}>
            <Text style={styles.modalTitle}>{label}</Text>
            <View style={[styles.inputBox, { borderColor: "#2196F3", marginBottom: 12 }]}>
              <TextInput style={styles.input} placeholder={`Digite ${label}`} placeholderTextColor="#888" value={search} onChangeText={setSearch} autoFocus />
              <Ionicons name="search" size={16} color="#888" />
            </View>
            <FlatList data={filtered} keyExtractor={(item) => item} keyboardShouldPersistTaps="handled" renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => { onSelect(item); setOpen(false); }}>
                  <Text style={styles.modalItemText}>{item}</Text>
                  {value === item && <Ionicons name="checkmark" size={18} color="#2196F3" />}
                </TouchableOpacity>
              )} ListEmptyComponent={
                <View style={{ padding: 20, alignItems: "center" }}>
                  <TouchableOpacity style={styles.useCustomBtn} onPress={() => { onSelect(search); setOpen(false); }}>
                    <Text style={styles.useCustomText}>Usar "{search}"</Text>
                  </TouchableOpacity>
                </View>
              }/>
            <TouchableOpacity style={styles.modalClose} onPress={() => setOpen(false)}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
function SimpleDropdown({ label, placeholder, value, options, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.inputBox} onPress={() => setOpen(!open)}>
        <Text style={[styles.input, { color: value? "black" : "#888" }]}>{value || placeholder}</Text>
        <Ionicons name={open? "chevron-up" : "chevron-down"} size={16} color="#888" />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownListInline}>
          {options.map((item) => (
            <TouchableOpacity key={item} style={styles.dropdownItem} onPress={() => { onSelect(item); setOpen(false); }}>
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
export default function AdicionarImovelScreen() {
  const insets = useSafeAreaInsets();
  const [tipo, setTipo] = useState<string>("Casa");
  const [destaques, setDestaques] = useState<string[]>([]);
  const [cidade, setCidade] = useState<string>("Maceió");
  const [bairro, setBairro] = useState<string>("");
  const [quartos, setQuartos] = useState<string>("");
  const [banheiros, setBanheiros] = useState<string>("");
  const [fotos, setFotos] = useState<string[]>([]);
  // FUNÇÕES DE FOTO - CÂMERA E GALERIA
  const abrirOpcoesFoto = () => { Alert.alert("Adicionar Foto", "Escolha uma opção", [ { text: "Tirar Foto", onPress: () => tirarFoto() }, { text: "Escolher da Galeria", onPress: () => escolherDaGaleria() }, { text: "Cancelar", style: "cancel" }]);};
  const escolherDaGaleria = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status!== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria");
      return;
    }
  const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.8, allowsMultipleSelection: true, selectionLimit: 5,});
    if (!result.canceled) {
      const novas = result.assets.map((a) => a.uri);
      setFotos((prev) => [...prev,...novas]);
    }};
  const tirarFoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status!== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à câmera");
      return;
    }
  const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8,});
    if (!result.canceled) {
      setFotos((prev) => [...prev, result.assets[0].uri]);
    }};
  const removerFoto = (index: number) => { setFotos((prev) => prev.filter((_, i) => i!== index));};
  const toggleDestaque = (item: string) => { setDestaques((prev) => (prev.includes(item)? prev.filter((i) => i!== item) : [...prev, item]));};
  const tipos = [ { label: "Apartamento", icon: "home" }, { label: "Casa", icon: "house" }, { label: "Kitnet", icon: "bed" }, { label: "Cobertura", icon: "apartment" }, ] as const;
  const destaquesLista: string[] = ["Mobiliado", "Varanda", "Elevador", "Garagem", "Piscina", "Portaria 24h", "Academia", "Ar condic."];
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </Pressable>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.whiteCard} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
        <View style={styles.titleRow}>
          <Ionicons name="home" size={55} color="black" />
          <View>
            <Text style={styles.title}>Adicionar Imóvel</Text>
            <Text style={styles.subtitle}>Preencha as informações abaixo para anunciar seu imóvel</Text>
          </View>
        </View>

        <Text style={styles.label}>Tipo de Imóvel</Text>
        <View style={styles.chipRow}>
          {tipos.map((t) => (
            <TouchableOpacity key={t.label} onPress={() => setTipo(t.label)} style={[styles.chip, tipo === t.label && styles.chipActive]}>
              <MaterialIcons name={t.icon as any} size={14} color={tipo === t.label? "black" : "#555"} />
              <Text style={[styles.chipText, tipo === t.label && styles.chipTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Finalidade</Text>
        <TouchableOpacity style={[styles.chip, styles.chipActive, { width: 100 }]}>
          <Ionicons name="search" size={14} />
          <Text style={styles.chipTextActive}>Aluguel</Text>
        </TouchableOpacity>

        <View style={styles.row2}>
          <SearchableInput label="Cidade" placeholder="Digite a cidade" value={cidade} options={CIDADES} onSelect={setCidade} />
          <SearchableInput label="Bairro" placeholder="Digite o bairro" value={bairro} options={BAIRROS_MACEIO} onSelect={setBairro} />
        </View>

        <View style={styles.row2}>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Endereço</Text>
            <View style={styles.inputBox}><TextInput placeholder="Ex: Rua dos palmares" style={styles.input} placeholderTextColor="#888" /></View>
          </View>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Tamanho</Text>
            <View style={styles.inputBox}><TextInput placeholder="Ex: 62" style={styles.input} placeholderTextColor="#888" keyboardType="numeric" /></View>
          </View>
        </View>

        <View style={styles.row3}>
          <View style={styles.col}>
            <Text style={styles.inputLabel}>Valor do aluguel</Text>
            <View style={styles.inputBox}><TextInput placeholder="Ex: 2000" style={styles.input} placeholderTextColor="#888" keyboardType="numeric" /></View>
          </View>
          <View style={styles.col}><SimpleDropdown label="Quartos" placeholder="Selecione" value={quartos} options={QUARTOS} onSelect={setQuartos} /></View>
          <View style={styles.col}><SimpleDropdown label="Banheiro" placeholder="Selecione" value={banheiros} options={BANHEIROS} onSelect={setBanheiros} /></View>
        </View>

        <Text style={styles.label}>Destaque do imóvel</Text>
        <View style={styles.destaqueGrid}>
          {destaquesLista.map((item) => {
            const ativo = destaques.includes(item);
            return (
              <TouchableOpacity key={item} onPress={() => toggleDestaque(item)} style={[styles.destaqueChip, ativo && styles.destaqueChipActive]}>
                <View style={[styles.checkBox, ativo && styles.checkBoxActive]}>{ativo && <Ionicons name="checkmark" size={12} color="black" />}</View>
                <Text style={styles.destaqueText}>{item}</Text>
              </TouchableOpacity>
            );})}
        </View>

        <Text style={styles.label}>Descrição</Text>
        <View style={[styles.inputBox, { height: 90, alignItems: "flex-start", paddingTop: 10 }]}>
          <TextInput placeholder="Conte um pouco sobre o imóvel..." multiline style={[styles.input, { height: "100%" }]} placeholderTextColor="#888" />
        </View>

        <Text style={styles.label}>Fotos do imóvel</Text>
        <View style={styles.fotosRow}>
          <TouchableOpacity style={styles.fotoAddBox} onPress={abrirOpcoesFoto}>
            <Ionicons name="camera" size={28} color="#333" />
            <Text style={styles.fotoAddText}>Adicionar fotos</Text>
            <Text style={styles.fotoAddSub}>Câmera ou Galeria</Text>
          </TouchableOpacity>

          {fotos.map((uri, index) => (
            <View key={index} style={styles.fotoPreview}>
              <Image source={{ uri }} style={styles.fotoImg} />
              <TouchableOpacity style={styles.fotoClose} onPress={() => removerFoto(index)}>
                <Ionicons name="close" size={14} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.dicaBox}>
          <Text style={styles.dicaText}>Dica: Use boas fotos e uma descrição completa para atrair mais interessados!</Text>
        </View>

        <TouchableOpacity style={styles.btnSalvar} activeOpacity={0.8} onPress={() => router.push("/imovel-salvo")}>
          <Text style={styles.btnSalvarText}>Salvar Imóvel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white" 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    backgroundColor: "white", 
    height: 65, 
    borderBottomWidth: 1, 
    borderBottomColor: "#f0f0f0" 
  },
  backBtn: { 
    width: 40, 
    height: 40, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  logoContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  logo: { 
    width: 185, 
    height: 48 
  },
  whiteCard: { 
    flex: 1, 
    backgroundColor: "white", 
    paddingHorizontal: 16 
  },
  titleRow: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    gap: 10, 
    marginTop: 10, 
    marginBottom: 16 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "800", 
    color: "black" 
  },
  subtitle: { 
    fontSize: 11, 
    color: "#666", 
    marginTop: 2, 
    width: 260 
  },
  label: { 
    fontSize: 13, 
    fontWeight: "700", 
    color: "black", 
    marginTop: 14, 
    marginBottom: 8 
  },
  chipRow: { 
    flexDirection: "row", 
    gap: 8, 
    flexWrap: "wrap" 
  },
  chip: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 4, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20, 
    backgroundColor: "#E6F0FF", 
    borderWidth: 1, 
    borderColor: "#E6F0FF" 
  },
  chipActive: { 
    borderColor: "#2196F3" 
  },
  chipText: { 
    fontSize: 12, 
    color: "#555", 
    fontWeight: "500" 
  },
  chipTextActive: { 
    fontSize: 12, 
    color: "black", 
    fontWeight: "700" 
  },
  row2: { 
    flexDirection: "row", 
    gap: 10, 
    marginTop: 10 
  },
  row3: { 
    flexDirection: "row", 
    gap: 8, 
    marginTop: 10 
  },
  col: { 
    flex: 1 
  },
  inputLabel: { 
    fontSize: 11, 
    fontWeight: "600", 
    color: "black", 
    marginBottom: 4 
  },
  inputBox: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    borderWidth: 1, 
    borderColor: "#D9D9D9", 
    borderRadius: 6, 
    paddingHorizontal: 8, 
    height: 40, 
    backgroundColor: "white" 
  },
  input: { 
    flex: 1, 
    fontSize: 12, 
    color: "black" 
  },
  destaqueGrid: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 8 
  },
  destaqueChip: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6, 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 6, 
    borderWidth: 1, 
    borderColor: "#D9D9D9", 
    backgroundColor: "white", 
    width: "48%" 
  },
  destaqueChipActive: { 
    borderColor: "#2196F3", 
    backgroundColor: "#E6F0FF" 
  },
  checkBox: { 
    width: 14, 
    height: 14, 
    borderWidth: 1, 
    borderColor: "#999", 
    borderRadius: 2, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "white" 
  },
  checkBoxActive: { 
    borderColor: "black" 
  },
  destaqueText: { 
    fontSize: 11, 
    color: "black", 
    fontWeight: "500" 
  },
  fotosRow: { 
    flexDirection: "row", 
    gap: 10, 
    marginTop: 4, 
    flexWrap: "wrap" 
  },
  fotoAddBox: { 
    width: 140, 
    height: 110, 
    borderWidth: 1, 
    borderColor: "#2196F3", 
    borderStyle: "dashed", 
    borderRadius: 8, 
    backgroundColor: "#E6F0FF", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 8 
  },
  fotoAddText: { 
    fontSize: 11, 
    fontWeight: "700", 
    color: "black", 
    marginTop: 4 
  },
  fotoAddSub: { 
    fontSize: 8, 
    color: "#666", 
    textAlign: "center", 
    marginTop: 2 
  },
  fotoPreview: { 
    width: 140, 
    height: 110, 
    borderRadius: 8, 
    overflow: "hidden", 
    position: "relative" 
  },
  fotoImg: { 
    width: "100%", 
    height: "100%" 
  },
  fotoClose: { 
    position: "absolute", 
    top: 4, 
    right: 4, 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    backgroundColor: "black", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  dicaBox: { 
    backgroundColor: "#E6F0FF", 
    borderRadius: 6, 
    padding: 10, 
    marginTop: 16 
  },
  dicaText: { 
    fontSize: 11, 
    color: "#2A5DB0", 
    textAlign: "center" 
  },
  btnSalvar: { 
    backgroundColor: "#FF8C00", 
    borderRadius: 20, 
    height: 46, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 20, 
    marginBottom: 20 
  },
  btnSalvarText: { 
    color: "white", 
    fontWeight: "800", 
    fontSize: 14 
  },
  modalOverlayFull: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.4)", 
    justifyContent: "flex-end" 
  },
  modalBoxBig: { 
    backgroundColor: "white", 
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16, 
    maxHeight: "85%", 
    padding: 16 
  },
  modalTitle: { 
    fontSize: 16, 
    fontWeight: "800",
    marginBottom: 12, 
    textAlign: "center" 
  },
  modalItem: { 
    paddingVertical: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: "#f0f0f0", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  modalItemText: { 
    fontSize: 14, 
    color: "black" 
  },
  modalClose: { 
    marginTop: 12, 
    backgroundColor: "#f2f2f2", 
    borderRadius: 10, 
    paddingVertical: 12, 
    alignItems: "center" 
  },
  modalCloseText: { 
    fontWeight: "700" 
  },
  useCustomBtn: { 
    marginTop: 10, 
    backgroundColor: "#E6F0FF", 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20 
  },
  useCustomText: { 
    color: "#2196F3", 
    fontWeight: "700", 
    fontSize: 13 
  },
  dropdownListInline: { 
    marginTop: 4, 
    backgroundColor: "white", 
    borderWidth: 1, 
    borderColor: "#D9D9D9", 
    borderRadius: 6, 
    maxHeight: 150 
  },
  dropdownItem: { 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: "#f0f0f0" 
  },
  dropdownItemText: { 
    fontSize: 13, 
    color: "black" 
  },
});