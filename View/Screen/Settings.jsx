import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import React from "react";
import Button from "../Components/Button";
import { Logout } from "../../Controller/SettingsController";
import {
  NavigationContainerRefContext,
  useNavigation,
} from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <>
      <Text> Hi this is Settings File</Text>
      <Button buttonText={"LogOut"} onPress={() => Logout(navigation)} />
    </>
  );
};

export default Settings;
