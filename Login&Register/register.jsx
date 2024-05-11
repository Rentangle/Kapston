import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import ModalComponent from "./VerificationWindow";
import UserIcon from "../assets/LoginandRegisterAssets/UserIcon.jpeg";
import PasswordIcon from "../assets/LoginandRegisterAssets/PasswordIcon.jpeg";
import EmailIcon from "../assets/LoginandRegisterAssets/EmailIcon.png";
import ClientLogo from "../assets/LoginandRegisterAssets/LandayanLogo.png";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Rectangle from "../Components/Rectangle";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
const Register = () => {
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  const navigation = useNavigation();

  const confirmCode = async (code) => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;
      await firestore().collection("users").doc().set({
        fullname,
        phoneNumber,
        email,
        password,
      });

      console.log(
        "Details are saved: " +
          fullname +
          " " +
          phoneNumber +
          " " +
          email +
          " " +
          password
      );
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error:", error.code, error.message, error.stack);
    }
  };

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
        setShowFloatingWindow(true);
        console.log("Phone number sent for verification:", phoneNumber);
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View style={styless.mainContainers}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={20000}
        style={{ justifyContent: "flex-end" }}
      >
        {/* ClientLogo */}
        <View style={styless.logoContainers}>
          <Image source={ClientLogo} style={styless.logos} />
        </View>

        <View style={styless.container}>
          {/* Name*/}
          <Input
            placeholder={"Fullname"}
            value={fullname}
            FontAwesomeIcon={"user"}
            onChangeText={setFullname}
          />

          {/* Email */}

          <Input
            placeholder={"Email"}
            value={email}
            EntypoIcon={"mail"}
            onChangeText={setEmail}
            errorMessage={
              !validateEmail(email) && email !== "" && "Invalid email format"
            }
          />

          <Input
            placeholder={"Phone Number"}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            EntypoIcon={"phone"}
            errorMessage={
              phoneNumber.length > 11 &&
              "Phone number should not exceed 11 characters"
            }
          />

          {/* Password */}
          <Input
            placeholder={"Password"}
            value={password}
            FontAwesomeIcon={"lock"}
            secureTextEntry={true}
            onChangeText={setPassword}
            errorMessage={
              !validatePassword(password) &&
              password !== "" &&
              "Password should be at least 6 characters long, and contain at least one uppercase letter and one number"
            }
          />

          {/* Create Account Button */}

          <Button onPress={signInWithPhoneNumber} buttonText={"Next"} />
        </View>
      </KeyboardAvoidingView>

      {/* Use the ModalComponent */}
      <ModalComponent
        visible={showFloatingWindow}
        onClose={() => setShowFloatingWindow(false)}
        onSubmit={confirmCode}
      />
      <Rectangle />
    </View>
  );
};

export default Register;

const styless = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  mainContainers: {
    backgroundColor: Color.colorGhostwhite,
    flex: 1,
  },

  logoContainers: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  logos: {
    height: 160,
    width: 160,
    borderRadius: 100,
    marginTop: 0,
  },
});
