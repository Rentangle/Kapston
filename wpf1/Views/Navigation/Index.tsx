// Views/Navigation/Index.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HomeView from '../Screens/HomeView';
import NotificationView from '../Screens/NotificationView';
import MessagesView from '../Screens/MessagesView';
import SettingsView from '../Screens/SettingsView';
import ProfileView from '../Screens/ProfileView';
import SchedulesView from '../Screens/SchedulesView';
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-paper'; // Ensure you have this import
import { RootTabNavigationProp } from './navigation';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: true,
  headerStyle: {
    backgroundColor: "#19a7c5",
    elevation: 5,
  },
  tabBarStyle: {
    backgroundColor: "white",
    height: 80,
  },
};

const Index: React.FC = () => {
  const navigation = useNavigation<RootTabNavigationProp>();
  const notificationsCount = 5; // Example notification count

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          headerStyle: {
            height: 130,
            backgroundColor: "white",
          },
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Hello</Text>
                <Text style={styles.welcomeText}>Jhon Carlo!</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  style={styles.notificationContainer}
                  onPress={() => navigation.navigate('Notification')}
                >
                  <Ionicons name="notifications" size={24} color="#00bbf2" />
                  <View style={styles.badgeContainer}>
                    <Badge>{notificationsCount}</Badge> {/* Notification badge */}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.settingsContainer}
                  onPress={() => navigation.navigate('Settings')}
                >
                  <Ionicons name="cog" size={24} color="#00bbf2" />
                </TouchableOpacity>
              </View>
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Entypo name="home" size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Home</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "black" }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <AntDesign name="user" size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Profile</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Schedules"
        component={SchedulesView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <AntDesign name="calendar" size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Schedule</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <AntDesign name='message1' size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Messages</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  welcomeContainer: {
    flexDirection: "column",
    marginLeft: 100, // Add margin to create space on the left
  },
  welcomeText: {
    fontSize: 20,
    color: "black",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationContainer: {
    marginLeft: 20,
    position: 'relative', // Position relative for the badge
  },
  badgeContainer: {
    position: 'absolute',
    right: 0, // Align badge to the right of the icon
    top: -5,  // Adjust top value to position it above the icon
  },
  settingsContainer: {
    marginLeft: 20,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#16247d",
  },
});

export default Index;
