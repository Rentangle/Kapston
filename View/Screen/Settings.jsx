import { View, Text } from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import Button from "../Components/Button";
import { Logout, handleUserID } from "../../Controller/SettingsController";
import { reducer, initialState } from "../Hooks/LoginHooks";
import {
  NavigationContainerRefContext,
  useNavigation,
} from "@react-navigation/native";
import { userData } from "../../Model/Users";

const Settings = () => {
  return <></>;
};

export default Settings;
