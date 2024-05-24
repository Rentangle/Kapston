import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserID } from "../Model/Users";
import { reducer, initialState } from "../View/Hooks/LoginHooks";
import { useReducer } from "react";
import { AuthSignOut } from "../Model/SignoutModel";
export const Logout = async (navigation) => {
  try {
    await AsyncStorage.clear();
    AuthSignOut();
    console.log("AsyncStorage cleared successfully.");
    navigation.navigate("Login");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export const handleUserID = async () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  await UserID(state.email);
};
