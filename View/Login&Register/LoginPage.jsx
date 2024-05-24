import React, { useState, useReducer, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ClientLogo from "../../assets/LoginandRegisterAssets/LandayanLogo.png";
import Texts from "../Components/Text";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { handleLogin, handleUserID } from "../../Controller/LoginController";
import { reducer, initialState } from "../Hooks/LoginHooks";
import ForgotPassword from "./ForgotPassword";
import { ChangeScreen } from "../../Controller/FPController";

const LoginPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.email);

  function handleChangeScreen() {
    ChangeScreen(navigation);
  }

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView style={{ justifyContent: "space-around" }}>
        <View style={styles.logoContainer}>
          <Image source={ClientLogo} style={styles.logo} />
          <Texts HeaderTextInput={"Login"} />

          <Input
            placeholder={"Email"}
            value={state.email}
            EntypoIcon={"mail"}
            onChangeText={(email) =>
              dispatch({ type: "setEmail", payload: email })
            }
          />

          <Input
            placeholder={"Password"}
            value={state.password}
            FontAwesomeIcon={"lock"}
            onChangeText={(password) =>
              dispatch({ type: "setPassword", payload: password })
            }
            secureTextEntry={true}
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ color: "blue" }}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <Button
            buttonText={"Login"}
            onPress={() => handleLogin(state.email, state.password, navigation)}
          />
          <View style={styles.DontHaveAccount}>
            <Text>Don't have an Account?</Text>
            <TouchableOpacity
              style={styles.signin}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ color: "blue" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 70,
  },
  logo: {
    width: 160,
    borderRadius: 100,
    height: 160,
  },
  DontHaveAccount: {
    flexDirection: "row",
    paddingRight: 5,
  },
  signin: {
    paddingLeft: 10,
  },
  forgotPassword: {
    marginLeft: 150,
    marginTop: 5,
  },
});
