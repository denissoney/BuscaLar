import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, createContext, useContext } from "react";
import MenuDrawer from "../menu";

const MenuContext = createContext({ openMenu: () => {}, closeMenu: () => {} });
export const useMenu = () => useContext(MenuContext);

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { openMenu } = useMenu();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {/* BOTÃO HAMBURGUER DENTRO DA BARRA PRA TESTAR - pode tirar depois */}
        <TouchableOpacity onPress={openMenu} style={styles.menuBtn}>
          <Ionicons name="menu" size={22} color="#fff" />
        </TouchableOpacity>

        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused &&!event.defaultPrevented) navigation.navigate(route.name);
          };
          const icons: any = {
            perfil: { active: "person", inactive: "person-outline" },
            explorar: { active: "location", inactive: "location-outline" },
            index: { active: "home", inactive: "home-outline" },
            agendamento: { active: "calendar", inactive: "calendar-outline" },
            favoritos: { active: "heart", inactive: "heart-outline" },
          };
          const labels: any = {
            perfil: "PERFIL", explorar: "EXPLORAR", index: "INICIO", agendamento: "AGENDA", favoritos: "FAVORITOS",
          };
          return (
            <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.8} style={styles.tab}>
              <View style={styles.iconWrap}>
                {isFocused && <View style={styles.blackBall} />}
                <View style={isFocused? styles.iconActive : styles.iconInactive}>
                  <Ionicons name={isFocused? icons[route.name]?.active : icons[route.name]?.inactive} size={isFocused? 28 : 22} color="#fff" />
                </View>
              </View>
              <Text style={[styles.label, isFocused && styles.labelActive]} numberOfLines={1}>{labels[route.name]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <MenuContext.Provider value={{ openMenu: () => setMenuVisible(true), closeMenu: () => setMenuVisible(false) }}>
      <View style={{ flex: 1 }}>
        <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="perfil" />
          <Tabs.Screen name="explorar" />
          <Tabs.Screen name="index" />
          <Tabs.Screen name="agendamento" />
          <Tabs.Screen name="favoritos" />
        </Tabs>
        <MenuDrawer visible={menuVisible} onClose={() => setMenuVisible(false)} onOpen={() => setMenuVisible(true)} />
      </View>
    </MenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "transparent" },
  bar: { flexDirection: "row", backgroundColor: "#2F5BFF", height: 78, borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingTop: 10, alignItems: "flex-start" },
  tab: { flex: 1, alignItems: "center", overflow: "visible" },
  iconWrap: { width: 64, height: 40, alignItems: "center", justifyContent: "flex-start", overflow: "visible" },
  blackBall: { position: "absolute", top: -34, width: 62, height: 62, borderRadius: 31, backgroundColor: "#000", borderWidth: 5, borderColor: "#2F5BFF" },
  iconInactive: { width: 32, height: 32, alignItems: "center", justifyContent: "center", marginTop: 2 },
  iconActive: { position: "absolute", top: -34, width: 62, height: 62, borderRadius: 31, alignItems: "center", justifyContent: "center" },
  label: { color: "#fff", fontSize: 9, fontWeight: "600", marginTop: 6, width: 64, textAlign: "center" },
  labelActive: { fontWeight: "800" },
  menuBtn: { position: "absolute", left: 10, top: -40, backgroundColor: "#000", padding: 8, borderRadius: 20, zIndex: 10 }
});