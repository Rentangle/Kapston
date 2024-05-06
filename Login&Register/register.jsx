import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import ModalComponent from './VerificationWindow';
import UserIcon from '../assets/LoginandRegisterAssets/UserIcon.jpeg';
import PasswordIcon from '../assets/LoginandRegisterAssets/PasswordIcon.jpeg';
import EmailIcon from '../assets/LoginandRegisterAssets/EmailIcon.png';
import ClientLogo from '../assets/LoginandRegisterAssets/LandayanLogo.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Input from '../Components/Input';
import Button from '../Components/Button';
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
      
      console.log("Details are saved: " + fullname + " " + phoneNumber + " " + email + " " + password);
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

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={20000}
        style={{ justifyContent: 'flex-end' }}
      >
        {/* ClientLogo */}
        <View style={styles.logoContainer}>
          <Image source={ClientLogo} style={styles.logo} />
        </View>

        <View style={styles.loginContainer}>
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
          />

          <Input 
            placeholder={"Phone Number"}
            value={phoneNumber}
            EntypoIcon={"phone"}
            onChangeText={setPhoneNumber}
          />

          {/* Password */}
          <Input 
            placeholder={"Password"}
            value={password}
            FontAwesomeIcon={"lock"}
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          {/* Create Account Button */}
          
          <Button 
            onPress={signInWithPhoneNumber}
            buttonText={"Next"}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Use the ModalComponent */}
      <ModalComponent
        visible={showFloatingWindow}
        onClose={() => setShowFloatingWindow(false)}
        onSubmit={confirmCode}
      />
    </View>
  );
};

export default Register;
