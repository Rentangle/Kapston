import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Home from "./Home";
import Profile from "./Profile";
import Schedules from "./Schedules";
import Settings from "./Settings";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: true,
  tabBarStyle: {
    backgroundColor: "white",
    height: 80,
  },
};

export default function Index() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            height: 130,

            backgroundColor: "white",
          },
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Hello</Text>
                <Text style={styles.welcomeText}>Jhon Carlo!</Text>
              </View>
              <View style={{ marginTop: 25, paddingHorizontal: 60 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                >
                  <View style={styles.profileContainer}>
                    <Image
                      source={require("../../assets/LoginandRegisterAssets/LandayanLogo.png")}
                      style={styles.avatar}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "black" : "burlywood"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>Home</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
              Hello Jhon Carlo
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AntDesign
                  name="user"
                  size={24}
                  color={focused ? "black" : "burlywood"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>Profile</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Schedules"
        component={Schedules}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AntDesign
                  name="calendar"
                  size={24}
                  color={focused ? "black" : "burlywood"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>Schedule</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="settings"
                  size={24}
                  color={focused ? "black" : "burlywood"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>Settings</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  welcomeContainer: {
    marginTop: 20,
    marginLeft: 25,
    paddingRight: 90,
  },
  welcomeText: {
    fontSize: 20,
    color: "black", // text color
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  profileContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
  },
});
