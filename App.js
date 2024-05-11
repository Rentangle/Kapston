import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "./Login&Register/register";
import Home from "./Screen/Home";
import Schedules from "./Screen/Schedules";
import Profiles from "./Screen/Profile";
import Settings from "./Screen/Settings";
import Index from "./Screen";
import Carousel from "./Components/Carousel";
import { SafeAreaView } from "react-native";
import Slider from "./Components/Slides";
import LoginPage from "./Login&Register/login";
import firestore from "@react-native-firebase/firestore";

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
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={Index}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
