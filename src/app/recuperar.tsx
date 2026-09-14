import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Recuperar() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Recuperar Senha FUNCIONOU</Text>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, backgroundColor: "#0B5FFF", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "#fff" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}