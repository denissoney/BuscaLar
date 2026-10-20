
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Animated,
  Image,
  Alert,
  Share,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

type AbaPagamento = "pix" | "cartao";

type Cores = {
  fundo: string;
  superficie: string;
  superficieSecundaria: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  azul: string;
  azulClaro: string;
  verde: string;
  vermelho: string;
  campo: string;
};

const VALOR_PAGAMENTO = 1000;

// Este código é somente ilustrativo.
// Substitua pelo payload Pix real gerado pelo seu provedor.
const CHAVE_PIX_DEMO = "PIX_DEMONSTRACAO_SEM_VALIDADE_NAO_UTILIZAR_PARA_PAGAMENTO";
const TEMPO_INICIAL = 15 * 60;
export default function Pagamentos() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<AbaPagamento>("pix");
  const [tempo, setTempo] = useState(TEMPO_INICIAL);
  const [expirado, setExpirado] = useState(false);
  // Só deve ficar true depois de uma confirmação real do provedor.
  const [pago, setPago] = useState(false);
  const [transacaoId, setTransacaoId] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [campoFocado, setCampoFocado] = useState("");
  const slideAnim = useRef(new Animated.Value(320)).current;
  const cores: Cores = {
    fundo: dark ? "#121212" : "#F5F7FB",
    superficie: dark ? "#1E1E1E" : "#FFFFFF",
    superficieSecundaria: dark ? "#292929" : "#F0F4FA",
    texto: dark ? "#F5F5F5" : "#172033",
    textoSecundario: dark ? "#B5B5B5" : "#687386",
    borda: dark ? "#414141" : "#E0E6EF",
    azul: "#208AEF",
    azulClaro: dark ? "#153553" : "#E8F3FF",
    verde: "#1BA879",
    vermelho: "#E34D59",
    campo: dark ? "#252525" : "#FFFFFF",
  };

  const styles = criarEstilos(cores);

  // Cronômetro do Pix: para quando o pagamento for confirmado
  // ou quando o tempo acabar.
  useEffect(() => {
    if (pago || expirado || tempo <= 0) return;

    const intervalo = setInterval(() => {
      setTempo((atual) => Math.max(0, atual - 1));
    }, 1000);

    return () => clearInterval(intervalo);
  }, [pago, expirado, tempo]);

  useEffect(() => {
    if (tempo === 0 && !pago) {
      setExpirado(true);
    }
  }, [tempo, pago]);

  // Anima a abertura do menu lateral.
  useEffect(() => {
    if (menuAberto) {
      slideAnim.setValue(320);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [menuAberto, slideAnim]);

  const fecharMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 320,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setMenuAberto(false));
  };

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;

    return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(
      2,
      "0"
    )}`;
  };

  const formatarValor = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const copiarChave = async () => {
    try {
      await Clipboard.setStringAsync(CHAVE_PIX_DEMO);

      Alert.alert(
        "Código copiado",
        "O código de demonstração foi copiado. Ele não é um Pix válido e não deve ser usado para transferir dinheiro."
      );
    } catch {
      Alert.alert("Erro", "Não foi possível copiar o código.");
    }
  };

  const compartilharComprovante = async () => {
    if (!pago || !transacaoId) {
      Alert.alert(
        "Comprovante indisponível",
        "O comprovante só poderá ser compartilhado depois que o provedor confirmar o pagamento."
      );
      return;
    }

    const mensagem = [
      "COMPROVANTE DE PAGAMENTO - BUSCALAR",
      "",
      `Valor: ${formatarValor(VALOR_PAGAMENTO)}`,
      `Data: ${dataPagamento}`,
      `Transação: ${transacaoId}`,
      "Status: Pagamento confirmado pelo provedor",
    ].join("\n");

    try {
      await Share.share({ message: mensagem });
    } catch {
      Alert.alert("Erro", "Não foi possível compartilhar o comprovante.");
    }
  };

  /*
   * PONTO DE INTEGRAÇÃO COM O PROVEDOR:
   *
   * Depois que seu backend validar a confirmação real do provedor
   * (por exemplo, por webhook assinado), ele poderá informar o status
   * aprovado e o identificador da transação.
   *
   * Nunca chame esta função apenas porque o usuário copiou o Pix,
   * clicou em "Pagar" ou voltou para o aplicativo.
   */
  const registrarConfirmacaoReal = (
    status: string,
    identificador: string
  ) => {
    if (status !== "approved" || !identificador.trim()) {
      return;
    }

    setTransacaoId(identificador);
    setDataPagamento(new Date().toLocaleString("pt-BR"));
    setPago(true);
    setExpirado(false);
  };

  // Enquanto não houver provedor conectado, nenhum pagamento
  // pode ser confirmado por esta tela.
  const iniciarPagamento = () => {
    Alert.alert(
      "Pagamento não configurado",
      "O BuscaLar ainda não está conectado a um provedor de pagamentos. Nenhuma cobrança foi realizada. Configure o provedor e a confirmação pelo backend antes de receber pagamentos reais."
    );
  };

  const formatarNumeroCartao = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 19);
    return numeros.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatarValidade = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 4);

    if (numeros.length > 2) {
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    }

    return numeros;
  };

  const validarCartao = () => {
    const numeros = numeroCartao.replace(/\D/g, "");
    const [mesTexto, anoTexto] = validade.split("/");
    const mes = Number(mesTexto);
    const ano = Number(anoTexto);

    if (numeros.length < 13 || numeros.length > 19) {
      Alert.alert("Cartão inválido", "Confira o número do cartão.");
      return false;
    }

    if (nomeCartao.trim().length < 3) {
      Alert.alert("Nome inválido", "Informe o nome impresso no cartão.");
      return false;
    }

    if (
      validade.length !== 5 ||
      mes < 1 ||
      mes > 12 ||
      anoTexto?.length !== 2
    ) {
      Alert.alert(
        "Validade inválida",
        "Informe a validade no formato MM/AA."
      );
      return false;
    }

    const anoCompleto = 2000 + ano;
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    const mesAtual = agora.getMonth() + 1;

    if (
      anoCompleto < anoAtual ||
      (anoCompleto === anoAtual && mes < mesAtual)
    ) {
      Alert.alert("Cartão vencido", "Confira a validade do cartão.");
      return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      Alert.alert("CVV inválido", "Confira o código de segurança.");
      return false;
    }

    return true;
  };

  const pagarComCartao = () => {
    if (!validarCartao()) return;

    // Não enviamos os dados do cartão para lugar algum.
    // O pagamento real deve usar o SDK/tokenização do provedor.
    Alert.alert(
      "Integração necessária",
      "Os dados foram validados, mas nenhum pagamento foi realizado. Conecte um provedor de pagamentos com tokenização segura antes de processar cartões."
    );
  };

  const irPara = async (rota: string) => {
    fecharMenu();

    if (rota === "sair") {
      try {
        await AsyncStorage.multiRemove(["logado", "emailUsuario"]);
      } catch {
        // A navegação para login continua mesmo se a limpeza falhar.
      }

      router.replace("/login" as any);
      return;
    }

    router.push(rota as any);
  };

  const voltar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/" as any);
    }
  };

  const renderMenu = () => (
    <Modal
      visible={menuAberto}
      transparent
      animationType="none"
      onRequestClose={fecharMenu}
      statusBarTranslucent
    >
      <View style={styles.modalFundo}>
        <Pressable
          style={styles.areaFecharMenu}
          onPress={fecharMenu}
        />

        <Animated.View
          style={[
            styles.menuLateral,
            {
              paddingTop: insets.top + 12,
              paddingBottom: insets.bottom + 12,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.menuTopo}>
            <Image
              source={require("../../assets/images/BuscaLar-preto.png")}
              style={[
                styles.logoMenu,
                dark && styles.logoEscura,
              ]}
              resizeMode="contain"
            />

            <TouchableOpacity
              onPress={fecharMenu}
              style={styles.botaoFecharMenu}
              accessibilityLabel="Fechar menu"
            >
              <Ionicons
                name="close"
                size={26}
                color={cores.texto}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.menuPerfil}>
            <View style={styles.avatar}>
              <Ionicons
                name="person"
                size={27}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.menuPerfilTexto}>
              <Text style={styles.menuNome}>Bem-vindo ao BuscaLar</Text>
              <Text style={styles.menuSubtitulo}>
                Encontre seu próximo imóvel
              </Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuLista}
          >
            <ItemMenu
              icone="home-outline"
              texto="Início"
              cores={cores}
              onPress={() => irPara("/")}
            />
            <ItemMenu
              icone="options-outline"
              texto="Filtros"
              cores={cores}
              onPress={() => irPara("/filtro")}
            />
            <ItemMenu
              icone="heart-outline"
              texto="Favoritos"
              cores={cores}
              onPress={() => irPara("/(tabs)/favoritos")}
            />
            <ItemMenu
              icone="calendar-outline"
              texto="Agendamentos"
              cores={cores}
              onPress={() => irPara("/(tabs)/agendamento")}
            />
            <ItemMenu
              icone="card-outline"
              texto="Pagamentos"
              ativo
              cores={cores}
              onPress={fecharMenu}
            />
            <ItemMenu
              icone="document-text-outline"
              texto="Contratos"
              cores={cores}
              onPress={() => irPara("/contrato")}
            />
            <ItemMenu
              icone="person-circle-outline"
              texto="Perfil do proprietário"
              cores={cores}
              onPress={() => irPara("/perfil-proprietario")}
            />
            <ItemMenu
              icone="business-outline"
              texto="Meus imóveis"
              cores={cores}
              onPress={() => irPara("/imoveis")}
            />
            <ItemMenu
              icone="settings-outline"
              texto="Configurações"
              cores={cores}
              onPress={() => irPara("/configuracoes")}
            />

            <View style={styles.divisorMenu} />

            <ItemMenu
              icone="log-out-outline"
              texto="Sair"
              cores={cores}
              perigo
              onPress={() => irPara("sair")}
            />
          </ScrollView>

          <Text style={styles.versao}>BuscaLar • Versão 1.0</Text>
        </Animated.View>
      </View>
    </Modal>
  );

  // O comprovante só é exibido quando existir confirmação real.
  if (pago && transacaoId) {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.cabecalho}>
          <TouchableOpacity
            onPress={voltar}
            style={styles.botaoCabecalho}
            accessibilityLabel="Voltar"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.tituloCabecalho}>Comprovante</Text>

          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.botaoCabecalho}
            accessibilityLabel="Abrir menu"
          >
            <Ionicons name="menu" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.conteudoComprovante}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cartaoComprovante}>
            <View style={styles.sucessoIcone}>
              <Ionicons
                name="checkmark"
                size={40}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.comprovanteTitulo}>
              Pagamento confirmado!
            </Text>

            <Text style={styles.comprovanteDescricao}>
              O provedor confirmou esta transação.
            </Text>

            <Text style={styles.rotuloValor}>Valor pago</Text>
            <Text style={styles.valorComprovante}>
              {formatarValor(VALOR_PAGAMENTO)}
            </Text>

            <View style={styles.linhaDivisoria} />

            <LinhaComprovante
              titulo="Status"
              valor="Confirmado"
              valorCor={cores.verde}
              cores={cores}
            />
            <LinhaComprovante
              titulo="Data"
              valor={dataPagamento || "Não informada"}
              cores={cores}
            />
            <LinhaComprovante
              titulo="Identificador"
              valor={transacaoId}
              cores={cores}
            />
            <LinhaComprovante
              titulo="Método"
              valor={abaAtiva === "pix" ? "Pix" : "Cartão"}
              cores={cores}
            />

            <TouchableOpacity
              style={styles.botaoPrimario}
              onPress={compartilharComprovante}
            >
              <Ionicons
                name="share-social-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.textoBotaoPrimario}>
                Compartilhar comprovante
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => router.replace("/" as any)}
            >
              <Text style={styles.textoBotaoSecundario}>
                Voltar ao início
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {renderMenu()}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.areaPrincipal,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.cabecalho}>
          <TouchableOpacity
            onPress={voltar}
            style={styles.botaoCabecalho}
            accessibilityLabel="Voltar"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.tituloCabecalho}>Pagamentos</Text>

          <TouchableOpacity
            onPress={() => setMenuAberto(true)}
            style={styles.botaoCabecalho}
            accessibilityLabel="Abrir menu"
          >
            <Ionicons name="menu" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.resumoCartao}>
            <View style={styles.resumoLinha}>
              <View style={styles.resumoIcone}>
                <Ionicons
                  name="wallet-outline"
                  size={25}
                  color={cores.azul}
                />
              </View>

              <View style={styles.resumoTexto}>
                <Text style={styles.resumoRotulo}>
                  Valor do pagamento
                </Text>
                <Text style={styles.resumoValor}>
                  {formatarValor(VALOR_PAGAMENTO)}
                </Text>
              </View>
            </View>

            <View style={styles.resumoAviso}>
              <Ionicons
                name="information-circle-outline"
                size={19}
                color={cores.azul}
              />
              <Text style={styles.resumoAvisoTexto}>
                Ambiente de demonstração. Nenhuma cobrança será realizada.
              </Text>
            </View>
          </View>

          <Text style={styles.tituloSecao}>Escolha a forma de pagamento</Text>

          <View style={styles.abas}>
            <TouchableOpacity
              style={[
                styles.aba,
                abaAtiva === "pix" && styles.abaAtiva,
              ]}
              onPress={() => setAbaAtiva("pix")}
            >
              <Ionicons
                name="qr-code-outline"
                size={21}
                color={abaAtiva === "pix" ? cores.azul : cores.textoSecundario}
              />
              <Text
                style={[
                  styles.textoAba,
                  abaAtiva === "pix" && styles.textoAbaAtiva,
                ]}
              >
                Pix
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.aba,
                abaAtiva === "cartao" && styles.abaAtiva,
              ]}
              onPress={() => setAbaAtiva("cartao")}
            >
              <Ionicons
                name="card-outline"
                size={21}
                color={
                  abaAtiva === "cartao"
                    ? cores.azul
                    : cores.textoSecundario
                }
              />
              <Text
                style={[
                  styles.textoAba,
                  abaAtiva === "cartao" && styles.textoAbaAtiva,
                ]}
              >
                Cartão
              </Text>
            </TouchableOpacity>
          </View>

          {abaAtiva === "pix" ? (
            <View style={styles.cartaoMetodo}>
              <View style={styles.metodoCabecalho}>
                <View style={styles.metodoIcone}>
                  <Ionicons
                    name="qr-code"
                    size={24}
                    color={cores.azul}
                  />
                </View>
                <View style={styles.metodoTexto}>
                  <Text style={styles.metodoTitulo}>Pagamento via Pix</Text>
                  <Text style={styles.metodoDescricao}>
                    Utilize o QR Code ou copie o código abaixo.
                  </Text>
                </View>
              </View>

              {expirado ? (
                <View style={styles.avisoExpirado}>
                  <Ionicons
                    name="time-outline"
                    size={34}
                    color={cores.vermelho}
                  />
                  <Text style={styles.expiradoTitulo}>
                    Tempo expirado
                  </Text>
                  <Text style={styles.expiradoDescricao}>
                    Este temporizador é demonstrativo. Para gerar uma nova
                    cobrança, será necessário solicitar um novo Pix ao provedor.
                  </Text>
                  <TouchableOpacity
                    style={styles.botaoSecundario}
                    onPress={() =>
                      Alert.alert(
                        "Pix não configurado",
                        "Conecte o BuscaLar a um provedor para gerar uma nova cobrança Pix válida."
                      )
                    }
                  >
                    <Text style={styles.textoBotaoSecundario}>
                      Solicitar novo Pix
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={styles.cronometro}>
                    <Ionicons
                      name="time-outline"
                      size={19}
                      color={cores.azul}
                    />
                    <Text style={styles.cronometroTexto}>
                      Tempo restante:{" "}
                      <Text style={styles.cronometroValor}>
                        {formatarTempo(tempo)}
                      </Text>
                    </Text>
                  </View>

                  <View style={styles.qrContainer}>
                    <View style={styles.qrDemo}>
                      <Ionicons
                        name="qr-code-outline"
                        size={108}
                        color={cores.textoSecundario}
                      />
                      <Text style={styles.qrDemoTexto}>
                        QR Code de demonstração
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.avisoDemo}>
                    Este QR Code não representa uma cobrança Pix válida.
                    Não transfira dinheiro usando este código.
                  </Text>

                  <Text style={styles.rotuloCodigo}>
                    Código Pix de demonstração
                  </Text>

                  <View style={styles.codigoPix}>
                    <Text
                      style={styles.codigoPixTexto}
                      numberOfLines={3}
                    >
                      {CHAVE_PIX_DEMO}
                    </Text>
                    <TouchableOpacity
                      style={styles.botaoCopiar}
                      onPress={copiarChave}
                    >
                      <Ionicons
                        name="copy-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.botaoPrimario}
                    onPress={iniciarPagamento}
                  >
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color="#FFFFFF"
                    />
                    <Text style={styles.textoBotaoPrimario}>
                      Verificar pagamento
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.textoInformativo}>
                    A confirmação real deve vir do provedor de pagamentos,
                    validada pelo backend. Copiar o código não confirma uma
                    transação.
                  </Text>
                </>
              )}
            </View>
          ) : (
            <View style={styles.cartaoMetodo}>
              <View style={styles.metodoCabecalho}>
                <View style={styles.metodoIcone}>
                  <Ionicons
                    name="card-outline"
                    size={24}
                    color={cores.azul}
                  />
                </View>
                <View style={styles.metodoTexto}>
                  <Text style={styles.metodoTitulo}>
                    Cartão de crédito
                  </Text>
                  <Text style={styles.metodoDescricao}>
                    Preencha os dados para validar o formulário.
                  </Text>
                </View>
              </View>

              <View style={styles.cartaoVisual}>
                <View style={styles.cartaoVisualTopo}>
                  <Ionicons
                    name="card"
                    size={28}
                    color="#FFFFFF"
                  />
                  <Text style={styles.cartaoVisualMarca}>BUSCALAR</Text>
                </View>

                <Text style={styles.cartaoVisualNumero}>
                  {numeroCartao || "•••• •••• •••• ••••"}
                </Text>

                <View style={styles.cartaoVisualRodape}>
                  <View>
                    <Text style={styles.cartaoVisualRotulo}>
                      TITULAR
                    </Text>
                    <Text style={styles.cartaoVisualDado}>
                      {nomeCartao.toUpperCase() || "NOME NO CARTÃO"}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.cartaoVisualRotulo}>
                      VALIDADE
                    </Text>
                    <Text style={styles.cartaoVisualDado}>
                      {validade || "MM/AA"}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.rotuloCampo}>Número do cartão</Text>
              <TextInput
                style={[
                  styles.input,
                  campoFocado === "numero" && styles.inputFocado,
                ]}
                value={numeroCartao}
                onChangeText={(valor) =>
                  setNumeroCartao(formatarNumeroCartao(valor))
                }
                onFocus={() => setCampoFocado("numero")}
                onBlur={() => setCampoFocado("")}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor={cores.textoSecundario}
                keyboardType="number-pad"
                maxLength={23}
                autoComplete="cc-number"
              />

              <Text style={styles.rotuloCampo}>Nome no cartão</Text>
              <TextInput
                style={[
                  styles.input,
                  campoFocado === "nome" && styles.inputFocado,
                ]}
                value={nomeCartao}
                onChangeText={setNomeCartao}
                onFocus={() => setCampoFocado("nome")}
                onBlur={() => setCampoFocado("")}
                placeholder="Nome impresso no cartão"
                placeholderTextColor={cores.textoSecundario}
                autoCapitalize="characters"
                autoComplete="cc-name"
              />

              <View style={styles.linhaCampos}>
                <View style={styles.campoMetade}>
                  <Text style={styles.rotuloCampo}>Validade</Text>
                  <TextInput
                    style={[
                      styles.input,
                      campoFocado === "validade" && styles.inputFocado,
                    ]}
                    value={validade}
                    onChangeText={(valor) =>
                      setValidade(formatarValidade(valor))
                    }
                    onFocus={() => setCampoFocado("validade")}
                    onBlur={() => setCampoFocado("")}
                    placeholder="MM/AA"
                    placeholderTextColor={cores.textoSecundario}
                    keyboardType="number-pad"
                    maxLength={5}
                    autoComplete="cc-exp"
                  />
                </View>

                <View style={styles.campoMetade}>
                  <Text style={styles.rotuloCampo}>CVV</Text>
                  <TextInput
                    style={[
                      styles.input,
                      campoFocado === "cvv" && styles.inputFocado,
                    ]}
                    value={cvv}
                    onChangeText={(valor) =>
                      setCvv(valor.replace(/\D/g, "").slice(0, 4))
                    }
                    onFocus={() => setCampoFocado("cvv")}
                    onBlur={() => setCampoFocado("")}
                    placeholder="•••"
                    placeholderTextColor={cores.textoSecundario}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    autoComplete="cc-csc"
                  />
                </View>
              </View>

              <View style={styles.avisoSeguranca}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={cores.verde}
                />
                <Text style={styles.avisoSegurancaTexto}>
                  Não insira dados reais enquanto o provedor seguro não estiver
                  integrado.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.botaoPrimario}
                onPress={pagarComCartao}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#FFFFFF"
                />
                <Text style={styles.textoBotaoPrimario}>
                  Continuar para pagamento
                </Text>
              </TouchableOpacity>

              <Text style={styles.textoInformativo}>
                Nenhuma cobrança será feita nesta versão. O processamento
                real exige um provedor com tokenização segura dos dados.
              </Text>
            </View>
          )}

          <View style={styles.rodapeSeguranca}>
            <Ionicons
              name="shield-checkmark-outline"
              size={19}
              color={cores.textoSecundario}
            />
            <Text style={styles.rodapeSegurancaTexto}>
              Proteja seus dados. Nunca compartilhe o código de segurança do
              cartão.
            </Text>
          </View>
        </ScrollView>
      </View>

      {renderMenu()}
    </KeyboardAvoidingView>
  );
}

function ItemMenu({
  icone,
  texto,
  cores,
  onPress,
  ativo = false,
  perigo = false,
}: {
  icone: React.ComponentProps<typeof Ionicons>["name"];
  texto: string;
  cores: Cores;
  onPress: () => void;
  ativo?: boolean;
  perigo?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 13,
          paddingHorizontal: 12,
          borderRadius: 12,
          marginBottom: 4,
          backgroundColor: ativo
            ? cores.azulClaro
            : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icone}
        size={21}
        color={
          perigo
            ? cores.vermelho
            : ativo
              ? cores.azul
              : cores.textoSecundario
        }
      />
      <Text
        style={{
          marginLeft: 13,
          flex: 1,
          fontSize: 15,
          fontWeight: ativo ? "700" : "500",
          color: perigo
            ? cores.vermelho
            : ativo
              ? cores.azul
              : cores.texto,
        }}
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

function LinhaComprovante({
  titulo,
  valor,
  cores,
  valorCor,
}: {
  titulo: string;
  valor: string;
  cores: Cores;
  valorCor?: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 17,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: cores.textoSecundario,
          flex: 1,
        }}
      >
        {titulo}
      </Text>
      <Text
        selectable
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: valorCor || cores.texto,
          flex: 1.5,
          textAlign: "right",
        }}
      >
        {valor}
      </Text>
    </View>
  );
}

function criarEstilos(cores: Cores) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    areaPrincipal: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    cabecalho: {
      backgroundColor: cores.azul,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    botaoCabecalho: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    tituloCabecalho: {
      color: "#FFFFFF",
      fontSize: 19,
      fontWeight: "700",
    },
    scroll: {
      flex: 1,
    },
    conteudo: {
      padding: 18,
      paddingBottom: 32,
    },
    resumoCartao: {
      backgroundColor: cores.superficie,
      borderRadius: 18,
      padding: 18,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    resumoLinha: {
      flexDirection: "row",
      alignItems: "center",
    },
    resumoIcone: {
      width: 50,
      height: 50,
      borderRadius: 15,
      backgroundColor: cores.azulClaro,
      alignItems: "center",
      justifyContent: "center",
    },
    resumoTexto: {
      marginLeft: 13,
      flex: 1,
    },
    resumoRotulo: {
      color: cores.textoSecundario,
      fontSize: 13,
      marginBottom: 5,
    },
    resumoValor: {
      color: cores.texto,
      fontSize: 25,
      fontWeight: "800",
    },
    resumoAviso: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      backgroundColor: cores.azulClaro,
      borderRadius: 10,
      padding: 10,
      marginTop: 16,
    },
    resumoAvisoTexto: {
      flex: 1,
      color: cores.texto,
      fontSize: 12,
      lineHeight: 18,
    },
    tituloSecao: {
      fontSize: 18,
      fontWeight: "700",
      color: cores.texto,
      marginBottom: 14,
    },
    abas: {
      flexDirection: "row",
      backgroundColor: cores.superficie,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 5,
      marginBottom: 18,
    },
    aba: {
      flex: 1,
      minHeight: 48,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    abaAtiva: {
      backgroundColor: cores.azulClaro,
    },
    textoAba: {
      color: cores.textoSecundario,
      fontSize: 15,
      fontWeight: "600",
    },
    textoAbaAtiva: {
      color: cores.azul,
      fontWeight: "800",
    },
    cartaoMetodo: {
      backgroundColor: cores.superficie,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    metodoCabecalho: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18,
    },
    metodoIcone: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: cores.azulClaro,
    },
    metodoTexto: {
      flex: 1,
      marginLeft: 12,
    },
    metodoTitulo: {
      color: cores.texto,
      fontSize: 17,
      fontWeight: "700",
    },
    metodoDescricao: {
      color: cores.textoSecundario,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
    },
    cronometro: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: cores.azulClaro,
      borderRadius: 10,
      padding: 12,
      marginBottom: 18,
    },
    cronometroTexto: {
      color: cores.texto,
      fontSize: 13,
    },
    cronometroValor: {
      color: cores.azul,
      fontWeight: "800",
      fontVariant: ["tabular-nums"],
    },
    qrContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    qrDemo: {
      width: 190,
      height: 190,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 12,
      backgroundColor: cores.superficieSecundaria,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    qrDemoTexto: {
      color: cores.textoSecundario,
      fontSize: 12,
      textAlign: "center",
    },
    avisoDemo: {
      color: cores.vermelho,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
      marginBottom: 20,
    },
    rotuloCodigo: {
      color: cores.texto,
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 9,
    },
    codigoPix: {
      backgroundColor: cores.superficieSecundaria,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 12,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18,
      gap: 10,
    },
    codigoPixTexto: {
      color: cores.textoSecundario,
      fontSize: 11,
      flex: 1,
      lineHeight: 17,
    },
    botaoCopiar: {
      width: 43,
      height: 43,
      borderRadius: 11,
      backgroundColor: cores.azul,
      alignItems: "center",
      justifyContent: "center",
    },
    botaoPrimario: {
      backgroundColor: cores.azul,
      borderRadius: 12,
      minHeight: 52,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      marginTop: 5,
    },
    textoBotaoPrimario: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
    },
    botaoSecundario: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: cores.borda,
      minHeight: 48,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
    },
    textoBotaoSecundario: {
      color: cores.texto,
      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
    },
    textoInformativo: {
      color: cores.textoSecundario,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
      marginTop: 14,
    },
    avisoExpirado: {
      alignItems: "center",
      paddingVertical: 20,
    },
    expiradoTitulo: {
      color: cores.vermelho,
      fontSize: 18,
      fontWeight: "800",
      marginTop: 10,
      marginBottom: 8,
    },
    expiradoDescricao: {
      color: cores.textoSecundario,
      fontSize: 13,
      lineHeight: 20,
      textAlign: "center",
      marginBottom: 12,
    },
    cartaoVisual: {
      backgroundColor: "#1768B0",
      borderRadius: 17,
      padding: 19,
      minHeight: 190,
      justifyContent: "space-between",
      marginBottom: 22,
    },
    cartaoVisualTopo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cartaoVisualMarca: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1,
    },
    cartaoVisualNumero: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 1,
      marginVertical: 22,
    },
    cartaoVisualRodape: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    cartaoVisualRotulo: {
      color: "#D7E9FA",
      fontSize: 9,
      marginBottom: 5,
    },
    cartaoVisualDado: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
    rotuloCampo: {
      color: cores.texto,
      fontSize: 13,
      fontWeight: "600",
      marginBottom: 8,
      marginTop: 7,
    },
    input: {
      minHeight: 49,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 11,
      paddingHorizontal: 13,
      backgroundColor: cores.campo,
      color: cores.texto,
      fontSize: 14,
    },
    inputFocado: {
      borderColor: cores.azul,
      borderWidth: 1.5,
    },
    linhaCampos: {
      flexDirection: "row",
      gap: 12,
    },
    campoMetade: {
      flex: 1,
    },
    avisoSeguranca: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginTop: 18,
      marginBottom: 14,
    },
    avisoSegurancaTexto: {
      flex: 1,
      color: cores.textoSecundario,
      fontSize: 12,
      lineHeight: 18,
    },
    rodapeSeguranca: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: 8,
      marginTop: 20,
      paddingHorizontal: 8,
    },
    rodapeSegurancaTexto: {
      color: cores.textoSecundario,
      fontSize: 11,
      lineHeight: 17,
      flex: 1,
      textAlign: "center",
    },
    conteudoComprovante: {
      padding: 18,
      paddingBottom: 32,
      flexGrow: 1,
      justifyContent: "center",
    },
    cartaoComprovante: {
      backgroundColor: cores.superficie,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 22,
      alignItems: "center",
    },
    sucessoIcone: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: cores.verde,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 17,
    },
    comprovanteTitulo: {
      color: cores.texto,
      fontSize: 21,
      fontWeight: "800",
      textAlign: "center",
    },
    comprovanteDescricao: {
      color: cores.textoSecundario,
      fontSize: 13,
      textAlign: "center",
      marginTop: 8,
      marginBottom: 24,
    },
    rotuloValor: {
      color: cores.textoSecundario,
      fontSize: 13,
    },
    valorComprovante: {
      color: cores.texto,
      fontSize: 30,
      fontWeight: "800",
      marginTop: 7,
    },
    linhaDivisoria: {
      width: "100%",
      height: 1,
      backgroundColor: cores.borda,
      marginVertical: 24,
    },
    modalFundo: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    areaFecharMenu: {
      flex: 1,
    },
    menuLateral: {
      width: 320,
      maxWidth: "88%",
      backgroundColor: cores.superficie,
      paddingHorizontal: 18,
      borderLeftWidth: 1,
      borderLeftColor: cores.borda,
    },
    menuTopo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 22,
    },
    logoMenu: {
      width: 145,
      height: 42,
    },
    logoEscura: {
      tintColor: "#FFFFFF",
    },
    botaoFecharMenu: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: cores.superficieSecundaria,
      alignItems: "center",
      justifyContent: "center",
    },
    menuPerfil: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 20,
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: cores.azul,
      alignItems: "center",
      justifyContent: "center",
    },
    menuPerfilTexto: {
      flex: 1,
      marginLeft: 12,
    },
    menuNome: {
      color: cores.texto,
      fontSize: 13,
      fontWeight: "700",
    },
    menuSubtitulo: {
      color: cores.textoSecundario,
      fontSize: 11,
      marginTop: 5,
    },
    menuLista: {
      paddingBottom: 15,
    },
    divisorMenu: {
      height: 1,
      backgroundColor: cores.borda,
      marginVertical: 12,
    },
    versao: {
      color: cores.textoSecundario,
      fontSize: 11,
      textAlign: "center",
      paddingVertical: 10,
    },
  });
}
