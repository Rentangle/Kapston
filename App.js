import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "./View/Login&Register/Registration";
import Index from "./View/Screen/index";
import LoginPage from "./View/Login&Register/LoginPage";
import ForgotPassword from "./View/Login&Register/ForgotPassword";
import PasswordReset from "./View/Login&Register/PasswordReset";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadUserData();
    console.log(isLoggedIn);
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
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Index}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerTitle: "Create an Account" }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerTitle: "Forgot Password" }}
        />

        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{ headerTitle: "Password Reset" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
