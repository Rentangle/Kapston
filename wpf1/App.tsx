import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterEmail, RegisterView } from "./Views/Register/RegisterView";
import Index from "./Views/Navigation/Index";
import { LoginView } from "./Views/Login/LoginView";

const Stack = createStackNavigator();

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  PasswordReset: undefined;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
          component={LoginView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Index}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
