
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
  Modal,
  Alert,} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../contexts/ThemeContext";

const CIDADES = [
  "Maceió", "Recife", "Salvador", "São Paulo", "Rio de Janeiro",
  "Brasília", "Fortaleza", "Aracaju", "João Pessoa", "Natal",
  "Curitiba", "Belo Horizonte", "Porto Alegre",
];

const BAIRROS_MACEIO = [
  "Pajuçara", "Ponta Verde", "Jatiúca", "Mangabeiras",
  "Jardim Petrópolis", "Farol", "Centro", "Cruz das Almas",
  "Jacarecica", "Barro Duro", "Serraria", "Antares",
  "Ponta Grossa", "Benedito Bentes",
];

const QUARTOS = ["1", "2", "3", "4", "5+"];
const BANHEIROS = ["1", "2", "3", "4+"];

type Props = {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  colors: typeof lightColors;
};

const lightColors = {
  fundo: "#F5F5F5",
  card: "#FFFFFF",
  campo: "#FFFFFF",
  texto: "#171717",
  secundario: "#666666",
  borda: "#D9D9D9",
  separador: "#EEEEEE",
  destaque: "#E6F0FF",
  modalOverlay: "rgba(0,0,0,0.45)",
  azul: "#2196F3",
  laranja: "#FF8C00",
  dica: "#E6F0FF",
  dicaTexto: "#2A5DB0",
  itemSelecionado: "#E6F0FF",
};

const darkColors = {
  fundo: "#121212",
  card: "#1E1E1E",
  campo: "#292929",
  texto: "#F5F5F5",
  secundario: "#BBBBBB",
  borda: "#454545",
  separador: "#383838",
  destaque: "#26384A",
  modalOverlay: "rgba(0,0,0,0.72)",
  azul: "#64B5F6",
  laranja: "#FF9800",
  dica: "#26384A",
  dicaTexto: "#B9D9FF",
  itemSelecionado: "#26384A",
};

function SearchableInput({
  label,
  placeholder,
  value,
  options,
  onSelect,
  colors,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.flex}>
      <Text style={[styles.inputLabel, { color: colors.texto }]}>
        {label}
      </Text>

      <TouchableOpacity
        style={[
          styles.inputBox,
          { backgroundColor: colors.campo, borderColor: colors.borda },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          setSearch(value);
          setOpen(true);
        }}
      >
        <Text
          style={[
            styles.input,
            { color: value ? colors.texto : colors.secundario },
          ]}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.secundario} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={[styles.modalOverlayFull, { backgroundColor: colors.modalOverlay }]}
          onPress={() => setOpen(false)}
        >
          <Pressable
            style={[styles.modalBoxBig, { backgroundColor: colors.card }]}
            onPress={() => {}}
          >
            <Text style={[styles.modalTitle, { color: colors.texto }]}>
              {label}
            </Text>

            <View
              style={[
                styles.inputBox,
                {
                  backgroundColor: colors.campo,
                  borderColor: colors.azul,
                  marginBottom: 12,
                },
              ]}
            >
              <TextInput
                style={[styles.input, { color: colors.texto }]}
                placeholder={`Digite ${label.toLowerCase()}`}
                placeholderTextColor={colors.secundario}
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
              <Ionicons name="search" size={16} color={colors.secundario} />
            </View>

            <FlatList
              data={filtered}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    { borderBottomColor: colors.separador },
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.modalItemText, { color: colors.texto }]}>
                    {item}
                  </Text>
                  {value === item && (
                    <Ionicons name="checkmark" size={18} color={colors.azul} />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  {search.trim() !== "" && (
                    <TouchableOpacity
                      style={[styles.useCustomBtn, { backgroundColor: colors.destaque }]}
                      onPress={() => {
                        onSelect(search.trim());
                        setOpen(false);
                      }}
                    >
                      <Text style={[styles.useCustomText, { color: colors.azul }]}>
                        Usar "{search}"
                      </Text>
                    </TouchableOpacity>
                  )}
                  {search.trim() === "" && (
                    <Text style={{ color: colors.secundario }}>
                      Nenhuma opção encontrada.
                    </Text>
                  )}
                </View>
              }
            />

            <TouchableOpacity
              style={[styles.modalClose, { backgroundColor: colors.destaque }]}
              onPress={() => setOpen(false)}
            >
              <Text style={[styles.modalCloseText, { color: colors.texto }]}>
                Fechar
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function SimpleDropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  colors,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.flex}>
      <Text style={[styles.inputLabel, { color: colors.texto }]}>
        {label}
      </Text>

      <TouchableOpacity
        style={[
          styles.inputBox,
          { backgroundColor: colors.campo, borderColor: colors.borda },
        ]}
        onPress={() => setOpen(!open)}
      >
        <Text
          style={[
            styles.input,
            { color: value ? colors.texto : colors.secundario },
          ]}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.secundario}
        />
      </TouchableOpacity>

      {open && (
        <View
          style={[
            styles.dropdownListInline,
            { backgroundColor: colors.card, borderColor: colors.borda },
          ]}
        >
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.dropdownItem,
                { borderBottomColor: colors.separador },
              ]}
              onPress={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              <Text style={[styles.dropdownItemText, { color: colors.texto }]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function AdicionarImovelScreen() {
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();
  const cores = dark ? darkColors : lightColors;

  const [tipo, setTipo] = useState("Casa");
  const [destaques, setDestaques] = useState<string[]>([]);
  const [cidade, setCidade] = useState("Maceió");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [valor, setValor] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotos, setFotos] = useState<string[]>([]);

  const bairrosDisponiveis =
    cidade.trim().toLowerCase() === "maceió" ? BAIRROS_MACEIO : [];

  function selecionarCidade(novaCidade: string) {
    setCidade(novaCidade);
    setBairro("");
  }

  const tipos = [
    { label: "Apartamento", icon: "apartment" },
    { label: "Casa", icon: "house" },
    { label: "Kitnet", icon: "bed" },
    { label: "Cobertura", icon: "apartment" },
  ];

  const destaquesLista = [
    "Mobiliado", "Varanda", "Elevador", "Garagem",
    "Piscina", "Portaria 24h", "Academia", "Ar condic.",
  ];

  function toggleDestaque(item: string) {
    setDestaques((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  }

  async function escolherDaGaleria() {
    if (fotos.length >= 5) {
      Alert.alert("Limite de fotos", "Você pode adicionar no máximo 5 fotos.");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
      return;
    }

    const vagas = 5 - fotos.length;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: vagas === 1,
      quality: 0.8,
      allowsMultipleSelection: vagas > 1,
      selectionLimit: vagas,
    });

    if (!result.canceled) {
      const novas = result.assets.map((asset) => asset.uri);
      setFotos((prev) => [...prev, ...novas].slice(0, 5));
    }
  }

  async function tirarFoto() {
    if (fotos.length >= 5) {
      Alert.alert("Limite de fotos", "Você pode adicionar no máximo 5 fotos.");
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFotos((prev) => [...prev, result.assets[0].uri].slice(0, 5));
    }
  }

  function abrirOpcoesFoto() {
    if (fotos.length >= 5) {
      Alert.alert("Limite de fotos", "Você já adicionou as 5 fotos permitidas.");
      return;
    }

    Alert.alert("Adicionar foto", "Escolha uma opção", [
      { text: "Tirar foto", onPress: () => void tirarFoto() },
      { text: "Escolher da galeria", onPress: () => void escolherDaGaleria() },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  function removerFoto(index: number) {
    setFotos((prev) => prev.filter((_, i) => i !== index));
  }

  function salvarImovel() {
    if (!cidade.trim() || !bairro.trim() || !endereco.trim() ||
        !tamanho.trim() || !valor.trim() || !quartos || !banheiros) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha cidade, bairro, endereço, tamanho, valor, quartos e banheiro."
      );
      return;
    }

    if (Number(tamanho) <= 0 || Number(valor) <= 0) {
      Alert.alert("Valores inválidos", "Tamanho e valor devem ser maiores que zero.");
      return;
    }

    if (fotos.length === 0) {
      Alert.alert("Adicione uma foto", "Escolha pelo menos uma foto para o imóvel.");
      return;
    }

    // Esta tela de confirmação ainda não recebe os dados do formulário.
    // A navegação abaixo mantém o fluxo que você já tinha configurado.
    router.push("/imovel-salvo");
  }

  const campoStyle = [
    styles.inputBox,
    { backgroundColor: cores.campo, borderColor: cores.borda },
  ];

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: cores.fundo },
      ]}
    >
      {/* CABEÇALHO */}
      <View
        style={[
          styles.header,
          { backgroundColor: cores.card, borderBottomColor: cores.separador },
        ]}
      >
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={22} color={cores.texto} />
        </Pressable>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={[styles.whiteCard, { backgroundColor: cores.fundo }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* TÍTULO */}
        <View style={styles.titleRow}>
          <Ionicons name="home" size={45} color={cores.texto} />
          <View style={styles.titleContent}>
            <Text style={[styles.title, { color: cores.texto }]}>
              Adicionar Imóvel
            </Text>
            <Text style={[styles.subtitle, { color: cores.secundario }]}>
              Preencha as informações abaixo para anunciar seu imóvel.
            </Text>
          </View>
        </View>

        {/* TIPO */}
        <Text style={[styles.label, { color: cores.texto }]}>
          Tipo de Imóvel
        </Text>

        <View style={styles.chipRow}>
          {tipos.map((item) => {
            const ativo = tipo === item.label;

            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => setTipo(item.label)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: ativo ? cores.destaque : cores.card,
                    borderColor: ativo ? cores.azul : cores.borda,
                  },
                ]}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={15}
                  color={ativo ? cores.azul : cores.secundario}
                />
                <Text
                  style={[
                    styles.chipText,
                    { color: ativo ? cores.azul : cores.texto },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FINALIDADE */}
        <Text style={[styles.label, { color: cores.texto }]}>Finalidade</Text>

        <View
          style={[
            styles.chip,
            styles.chipActive,
            { backgroundColor: cores.destaque, borderColor: cores.azul },
          ]}
        >
          <Ionicons name="key-outline" size={14} color={cores.azul} />
          <Text style={[styles.chipText, { color: cores.azul }]}>Aluguel</Text>
        </View>

        {/* CIDADE E BAIRRO */}
        <View style={styles.row2}>
          <SearchableInput
            label="Cidade"
            placeholder="Digite a cidade"
            value={cidade}
            options={CIDADES}
            onSelect={selecionarCidade}
            colors={cores}
          />

          <SearchableInput
            label="Bairro"
            placeholder={
              cidade.toLowerCase() === "maceió"
                ? "Selecione o bairro"
                : "Digite o bairro"
            }
            value={bairro}
            options={bairrosDisponiveis}
            onSelect={setBairro}
            colors={cores}
          />
        </View>

        {cidade.toLowerCase() !== "maceió" && (
          <Text style={[styles.helperText, { color: cores.secundario }]}>
            Digite o bairro da cidade selecionada.
          </Text>
        )}

        {/* ENDEREÇO E TAMANHO */}
        <View style={styles.row2}>
          <View style={styles.col}>
            <Text style={[styles.inputLabel, { color: cores.texto }]}>
              Endereço
            </Text>
            <View style={campoStyle}>
              <TextInput
                placeholder="Ex.: Rua dos Palmares"
                style={[styles.input, { color: cores.texto }]}
                placeholderTextColor={cores.secundario}
                value={endereco}
                onChangeText={setEndereco}
              />
            </View>
          </View>

          <View style={styles.col}>
            <Text style={[styles.inputLabel, { color: cores.texto }]}>
              Tamanho (m²)
            </Text>
            <View style={campoStyle}>
              <TextInput
                placeholder="Ex.: 62"
                style={[styles.input, { color: cores.texto }]}
                placeholderTextColor={cores.secundario}
                keyboardType="numeric"
                value={tamanho}
                onChangeText={setTamanho}
              />
            </View>
          </View>
        </View>

        {/* VALOR, QUARTOS E BANHEIROS */}
        <View style={styles.row3}>
          <View style={styles.col}>
            <Text style={[styles.inputLabel, { color: cores.texto }]}>
              Aluguel (R$)
            </Text>
            <View style={campoStyle}>
              <TextInput
                placeholder="Ex.: 2000"
                style={[styles.input, { color: cores.texto }]}
                placeholderTextColor={cores.secundario}
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
              />
            </View>
          </View>

          <View style={styles.col}>
            <SimpleDropdown
              label="Quartos"
              placeholder="Selecione"
              value={quartos}
              options={QUARTOS}
              onSelect={setQuartos}
              colors={cores}
            />
          </View>

          <View style={styles.col}>
            <SimpleDropdown
              label="Banheiros"
              placeholder="Selecione"
              value={banheiros}
              options={BANHEIROS}
              onSelect={setBanheiros}
              colors={cores}
            />
          </View>
        </View>

        {/* DESTAQUES */}
        <Text style={[styles.label, { color: cores.texto }]}>
          Destaques do imóvel
        </Text>

        <View style={styles.destaqueGrid}>
          {destaquesLista.map((item) => {
            const ativo = destaques.includes(item);

            return (
              <TouchableOpacity
                key={item}
                onPress={() => toggleDestaque(item)}
                style={[
                  styles.destaqueChip,
                  {
                    backgroundColor: ativo ? cores.destaque : cores.card,
                    borderColor: ativo ? cores.azul : cores.borda,
                  },
                ]}
              >
                <View
                  style={[
                    styles.checkBox,
                    {
                      borderColor: ativo ? cores.azul : cores.secundario,
                      backgroundColor: ativo ? cores.azul : cores.card,
                    },
                  ]}
                >
                  {ativo && (
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  )}
                </View>

                <Text style={[styles.destaqueText, { color: cores.texto }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DESCRIÇÃO */}
        <Text style={[styles.label, { color: cores.texto }]}>Descrição</Text>

        <View
          style={[
            campoStyle,
            styles.descricaoBox,
          ]}
        >
          <TextInput
            placeholder="Conte um pouco sobre o imóvel..."
            multiline
            textAlignVertical="top"
            style={[styles.input, styles.descricaoInput, { color: cores.texto }]}
            placeholderTextColor={cores.secundario}
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        {/* FOTOS */}
        <Text style={[styles.label, { color: cores.texto }]}>
          Fotos do imóvel ({fotos.length}/5)
        </Text>

        <View style={styles.fotosRow}>
          {fotos.length < 5 && (
            <TouchableOpacity
              style={[
                styles.fotoAddBox,
                {
                  backgroundColor: cores.destaque,
                  borderColor: cores.azul,
                },
              ]}
              onPress={abrirOpcoesFoto}
            >
              <Ionicons name="camera" size={28} color={cores.azul} />
              <Text style={[styles.fotoAddText, { color: cores.texto }]}>
                Adicionar fotos
              </Text>
              <Text style={[styles.fotoAddSub, { color: cores.secundario }]}>
                Câmera ou Galeria
              </Text>
            </TouchableOpacity>
          )}

          {fotos.map((uri, index) => (
            <View key={`${uri}-${index}`} style={styles.fotoPreview}>
              <Image source={{ uri }} style={styles.fotoImg} />
              <TouchableOpacity
                style={styles.fotoClose}
                onPress={() => removerFoto(index)}
                accessibilityLabel="Remover foto"
              >
                <Ionicons name="close" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* DICA */}
        <View style={[styles.dicaBox, { backgroundColor: cores.dica }]}>
          <Ionicons name="information-circle-outline" size={18} color={cores.azul} />
          <Text style={[styles.dicaText, { color: cores.dicaTexto }]}>
            Dica: use boas fotos e uma descrição completa para atrair mais interessados!
          </Text>
        </View>

        {/* SALVAR */}
        <TouchableOpacity
          style={styles.btnSalvar}
          activeOpacity={0.8}
          onPress={salvarImovel}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.btnSalvarText}>Salvar Imóvel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 65,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 185,
    height: 48,
  },
  whiteCard: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    marginBottom: 16,
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 11,
    marginTop: 3,
    lineHeight: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipActive: {
    alignSelf: "flex-start",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  row2: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  row3: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  col: {
    flex: 1,
    minWidth: 0,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 5,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 8,
    minHeight: 42,
  },
  input: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 8,
  },
  helperText: {
    fontSize: 10,
    marginTop: 5,
  },
  destaqueGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  destaqueChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: 1,
    width: "48%",
    flexGrow: 1,
  },
  checkBox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  destaqueText: {
    fontSize: 11,
    fontWeight: "500",
    flexShrink: 1,
  },
  descricaoBox: {
    height: 100,
    alignItems: "stretch",
    paddingTop: 6,
  },
  descricaoInput: {
    height: "100%",
    textAlignVertical: "top",
  },
  fotosRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
    flexWrap: "wrap",
  },
  fotoAddBox: {
    width: 140,
    height: 110,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  fotoAddText: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },
  fotoAddSub: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 3,
  },
  fotoPreview: {
    width: 140,
    height: 110,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  fotoImg: {
    width: "100%",
    height: "100%",
  },
  fotoClose: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
  },
  dicaBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 7,
    padding: 10,
    marginTop: 16,
  },
  dicaText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },
  btnSalvar: {
    backgroundColor: "#FF8C00",
    borderRadius: 22,
    minHeight: 48,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btnSalvarText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
  },
  modalOverlayFull: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBoxBig: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: "85%",
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalItemText: {
    fontSize: 14,
  },
  emptyList: {
    padding: 20,
    alignItems: "center",
  },
  modalClose: {
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalCloseText: {
    fontWeight: "700",
  },
  useCustomBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  useCustomText: {
    fontWeight: "700",
    fontSize: 13,
  },
  dropdownListInline: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 6,
    maxHeight: 150,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 13,
  },
});
