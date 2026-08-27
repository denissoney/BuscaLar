import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icons: any = {
            perfil: { active: "person", inactive: "person-outline" },
            explorar: { active: "location", inactive: "location-outline" },
            index: { active: "home", inactive: "home-outline" },
            agendamento: { active: "calendar", inactive: "calendar-outline" },
            favoritos: { active: "heart", inactive: "heart-outline" },
          };

          const labels: any = {
            perfil: "PERFIL",
            explorar: "EXPLORAR",
            index: "INICIO",
            agendamento: "AGENDAMENTO",
            favoritos: "FAVORITOS",
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={1}
              style={styles.tab}
            >
              <View style={styles.iconContainer}>
                {/* BOLA PRETA - IGUAL DA SUA FOTO */}
                {isFocused && <View style={styles.blackBall} />}
                
                <View style={isFocused ? styles.iconActive : styles.iconInactive}>
                  <Ionicons
                    name={isFocused ? icons[route.name]?.active : icons[route.name]?.inactive}
                    size={isFocused ? 26 : 22}
                    color={isFocused ? "#fff" : "#fff"}
                  />
                </View>
              </View>

              <Text style={[styles.label, isFocused && styles.labelActive]}>
                {labels[route.name]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="perfil" />
      <Tabs.Screen name="explorar" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="agendamento" />
      <Tabs.Screen name="favoritos" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
  bar: {
    flexDirection: "row",
    backgroundColor: "#2F5BFF",
    height: 78,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 14,
    alignItems: "flex-start",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  // AQUI ESTÁ O SEGREDO - BOLA PRETA SAINDO PRA CIMA
  blackBall: {
    position: "absolute",
    top: -20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000",
    borderWidth: 5,
    borderColor: "#2F5BFF",
  },
  iconInactive: {
    marginTop: 6,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  iconActive: {
    marginTop: -18,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "500",
    marginTop: 2,
  },
  labelActive: {
    fontWeight: "700",
    marginTop: 6,
  },
});