
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useRef, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

function TabBar({ state, descriptors, navigation }: any) {
  const { width } = useWindowDimensions();
  const { dark } = useTheme();

  // Cores da barra conforme o tema
  const corBarra = dark ? "#181818" : "#1A5CFF";
  const corBola = dark ? "#FF8C00" : "#000000";
  const corBorda = dark ? "#181818" : "#1A5CFF";
  const corIcone = dark ? "#BBBBBB" : "#B0C4FF";
  const corTexto = dark ? "#BBBBBB" : "#B0C4FF";

  // Mantém somente as cinco abas visíveis
  const visibleRoutes = state.routes.filter(
    (r: any) =>
      r.name !== "imoveis" &&
      r.name !== "perfil-proprietario-detalhe" &&
      r.name !== "detalhe"
  );

  const tabWidth = width / visibleRoutes.length;
  const BALL_SIZE = 62;

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const visibleIndex = visibleRoutes.findIndex(
      (r: any) => r.key === state.routes[state.index]?.key
    );

    if (visibleIndex !== -1) {
      Animated.spring(translateX, {
        toValue:
          visibleIndex * tabWidth +
          (tabWidth - BALL_SIZE) / 2,
        useNativeDriver: true,
        damping: 14,
        stiffness: 140,
      }).start();
    }
  }, [state.index, tabWidth, visibleRoutes.length, translateX]);

  return (
    <View style={styles.tabBarContainer}>
      <View
        style={[
          styles.blueBox,
          { backgroundColor: corBarra },
        ]}
      >
        <Animated.View
          style={[
            styles.blackBall,
            {
              width: BALL_SIZE,
              height: BALL_SIZE,
              backgroundColor: corBola,
              borderColor: corBorda,
              transform: [{ translateX }],
            },
          ]}
        />

        {visibleRoutes.map((route: any) => {
          const realIndex = state.routes.findIndex(
            (r: any) => r.key === route.key
          );

          const isFocused = state.index === realIndex;

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

          let iconName: any = "home";
          let label = "INÍCIO";

          if (route.name === "perfil-proprietario") {
            iconName = isFocused
              ? "person"
              : "person-outline";
            label = "PERFIL";
          }

          if (route.name === "explorar") {
            iconName = isFocused
              ? "location"
              : "location-outline";
            label = "EXPLORAR";
          }

          if (route.name === "index") {
            iconName = isFocused
              ? "home"
              : "home-outline";
            label = "INÍCIO";
          }

          if (route.name === "agendamento") {
            iconName = isFocused
              ? "calendar"
              : "calendar-outline";
            label = "AGENDA";
          }

          if (route.name === "favoritos") {
            iconName = isFocused
              ? "heart"
              : "heart-outline";
            label = "FAVORITOS";
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.9}
            >
              <View
                style={[
                  styles.iconBox,
                  isFocused && styles.iconBoxActive,
                ]}
              >
                <Ionicons
                  name={iconName}
                  size={isFocused ? 26 : 22}
                  color={isFocused ? "#FFFFFF" : corIcone}
                />
              </View>

              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused
                      ? "#FFFFFF"
                      : corTexto,
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="perfil-proprietario"
        options={{ title: "Perfil" }}
      />

      <Tabs.Screen
        name="explorar"
        options={{ title: "Explorar" }}
      />

      <Tabs.Screen
        name="index"
        options={{ title: "Início" }}
      />

      <Tabs.Screen
        name="agendamento"
        options={{ title: "Agenda" }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{ title: "Favoritos" }}
      />

      <Tabs.Screen
        name="imoveis"
        options={{
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="detalhe"
        options={{ href: null }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },

  blueBox: {
    flexDirection: "row",
    height: 75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },

  blackBall: {
    position: "absolute",
    top: -22,
    borderRadius: 31,
    borderWidth: 4,
    zIndex: 0,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  iconBox: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  iconBoxActive: {
    marginTop: -38,
  },

  label: {
    fontSize: 8,
    fontWeight: "bold",
    marginTop: 6,
  },
});
