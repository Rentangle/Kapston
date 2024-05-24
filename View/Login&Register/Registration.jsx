import React, { useState, useReducer } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
  ScrollView,
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
import Texts from "../Components/Text";
import { Checkbox } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const Register = () => {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
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
      state.age,
      state.gender,
      state.phoneNumber,
      state.email,
      state.password,
      navigation
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={{ paddingLeft: 20 }}>
          <Texts HeaderTextInput={"Patient Details"} />
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
            placeholder={"Age"}
            value={state.age}
            onChangeText={(age) => dispatch({ type: "setAge", payload: age })}
            FontAwesomeIcon={"user"}
          />

          <Input
            placeholder={"Gender"}
            value={state.gender}
            FontAwesomeIcon={"user"}
            onChangeText={(gender) =>
              dispatch({ type: "setGender", payload: gender })
            }
          />
        </View>

        <View style={{ paddingLeft: 20 }}>
          <Texts HeaderTextInput={"Login Credentials"} />
        </View>
        <View style={styles.container}>
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
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              status={isSelected ? "checked" : "unchecked"}
              onPress={() => {
                setSelection(!isSelected);
              }}
            />
            <View style={{ paddingTop: 7, flexDirection: "row" }}>
              <Text>I Agree to all </Text>
              <TouchableOpacity>
                <Text style={{ color: "blue" }}>Terms and Conditions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            onPress={handleAuthenticateUser}
            buttonText={"Next"}
            disabled={!isSelected}
          />
        </View>
      </ScrollView>

      <ModalComponent
        visible={showFloatingWindow}
        onClose={() => setShowFloatingWindow(false)}
        onSubmit={handleCodeConfirmation} // Corrected line
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
    alignItems: "center",
    justifyContent: "center",
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
