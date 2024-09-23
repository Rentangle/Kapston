import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterEmail, RegisterView } from "./Views/Register/RegisterView";
import Index from "./Views/Navigation/Index";
import { ForgotPassword, LoginView } from "./Views/Login/LoginView";
import NotificationView from './Views/Screens/NotificationView';
import SettingsView from './Views/Screens/SettingsView';
import LandingPage from './Views/LandingPage';
import PushNotification from './Controller/PushNotificationController'; // Import the PushNotification component
import VerificationScreen from "./Views/Screens/VerificationScreen";
import ProfilePage from "./Views/Screens/ProfileView";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");
      if (savedEmail && savedPassword) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error loading user data from AsyncStorage:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Index}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterEmail"
          component={RegisterEmail}
          options={{ headerTitle: "Create an Account" }}
        />
        <Stack.Screen
          name="RegisterView"
          component={RegisterView}
          options={{ headerTitle: "Forgot Password" }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationView}
          options={{ headerTitle: "Notifications" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsView}
          options={{ headerTitle: "Settings" }}
        />
      </Stack.Navigator>
      <PushNotification /> 
    </NavigationContainer>
  );
}
