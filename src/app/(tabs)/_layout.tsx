import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet, Animated, useWindowDimensions } from "react-native";
import { useRef, useEffect } from "react";

function TabBar({ state, descriptors, navigation }: any) {
  const { width } = useWindowDimensions();
  const tabWidth = width / state.routes.length;
  const BALL_SIZE = 62;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth + (tabWidth - BALL_SIZE) / 2,
      useNativeDriver: true,
      damping: 14,
      stiffness: 140,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.blueBox}>
        <Animated.View 
          style={[
            styles.blackBall, 
            { width: BALL_SIZE, height: BALL_SIZE, transform: [{ translateX }] }
          ]} 
        />
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ 
              type: "tabPress", 
              target: route.key, 
              canPreventDefault: true 
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: any = "home";
          let label = "INICIO";

          if (route.name === "perfil-proprietario") {
            iconName = isFocused ? "person" : "person-outline";
            label = "PERFIL";
          }
          if (route.name === "explorar") {
            iconName = isFocused ? "location" : "location-outline";
            label = "EXPLORAR";
          }
          if (route.name === "index") {
            iconName = isFocused ? "home" : "home-outline";
            label = "INICIO";
          }
          if (route.name === "agendamento") {
            iconName = isFocused ? "calendar" : "calendar-outline";
            label = "AGENDA";
          }
          if (route.name === "favoritos") {
            iconName = isFocused ? "heart" : "heart-outline";
            label = "FAVORITOS";
          }

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem} activeOpacity={0.9}>
              <View style={[styles.iconBox, isFocused && styles.iconBoxActive]}>
                <Ionicons 
                  name={iconName} 
                  size={isFocused ? 26 : 22} 
                  color={isFocused ? "#fff" : "#B0C4FF"} 
                />
              </View>
              <Text style={[styles.label, { color: isFocused ? "#fff" : "#B0C4FF" }]}>
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
      screenOptions={{ headerShown: false }}
      initialRouteName="index"
    >
      <Tabs.Screen name="perfil-proprietario" options={{ title: "Perfil" }} />
      <Tabs.Screen name="explorar" options={{ title: "Explorar" }} />
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen name="agendamento" options={{ title: "Agenda" }} />
      <Tabs.Screen name="favoritos" options={{ title: "Favoritos" }} />
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
    backgroundColor: "#1A5CFF",
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
    backgroundColor: "#000",
    borderRadius: 31,
    borderWidth: 4,
    borderColor: "#1A5CFF",
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