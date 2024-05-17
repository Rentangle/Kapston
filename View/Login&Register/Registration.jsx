import React, { useState, useReducer } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalComponent from "./VerificationWindow";
import ClientLogo from "../../assets/LoginandRegisterAssets/LandayanLogo.png";
import Input from "../Components/Input";
import Button from "../Components/Button";
import {
  confirmCode,
  signInWithPhoneNumber,
} from "../../Model/PhoneAuthentication";
import {
  AuthenticateUser,
  CodeConfirmation,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../Controller/RegisterController";

import { initialState, reducer } from "../Hooks/RegisterHooks";

const Register = () => {
  const navigation = useNavigation();

  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAuthenticateUser = () => {
    AuthenticateUser(setConfirm, setShowFloatingWindow, state.phoneNumber);
  };

  const handleCodeConfirmation = (code) => {
    CodeConfirmation(
      code,
      confirm,
      state.fullname,
      state.phoneNumber,
      state.email,
      state.password,
      navigation
    );
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.logoContainer}>
          <Image source={ClientLogo} style={styles.logo} />
        </View>

        <View style={styles.container}>
          <Input
            placeholder={"Fullname"}
            value={state.fullname}
            FontAwesomeIcon={"user"}
            onChangeText={(fullname) =>
              dispatch({ type: "setFullname", payload: fullname })
            }
          />

          <Input
            placeholder={"Email"}
            value={state.email}
            EntypoIcon={"mail"}
            onChangeText={(email) =>
              dispatch({ type: "setEmail", payload: email })
            }
            errorMessage={
              !validateEmail(state.email) &&
              state.email !== "" &&
              "Invalid email format"
            }
          />

          <Input
            placeholder={"Phone Number"}
            value={state.phoneNumber}
            onChangeText={(phoneNumber) =>
              dispatch({ type: "setPhoneNumber", payload: phoneNumber })
            }
            EntypoIcon={"phone"}
            errorMessage={
              !validatePhoneNumber(state.phoneNumber) &&
              state.phoneNumber !== "" &&
              "Invalid Phone Number"
            }
          />

          <Input
            placeholder={"Password"}
            value={state.password}
            FontAwesomeIcon={"lock"}
            secureTextEntry={true}
            onChangeText={(password) =>
              dispatch({ type: "setPassword", payload: password })
            }
            errorMessage={
              !validatePassword(state.password) &&
              state.password !== "" &&
              "Password should be at least 6 characters long, and contain at least one uppercase letter and one number"
            }
          />

          <Button onPress={handleAuthenticateUser} buttonText={"Next"} />
        </View>
      </KeyboardAvoidingView>

      <ModalComponent
        visible={showFloatingWindow}
        onClose={() => setShowFloatingWindow(false)}
        onSubmit={handleCodeConfirmation}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  logo: {
    height: 160,
    width: 160,
    borderRadius: 100,
    marginTop: 0,
  },
});
