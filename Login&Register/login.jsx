import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';
import ClientLogo from '../assets/LoginandRegisterAssets/LandayanLogo.png';
import checkUserData from './userUtils';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Eye from '../Components/Eye';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  

  const handleUserData = async () => {
    setLoading(true);
    await checkUserData(email, password, navigation);
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={20000}
        style={{ justifyContent: 'flex-end' }}
      >
        
        <View style={styles.logoContainer}>
          <Image source={ClientLogo} style={styles.logo} />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login</Text>

          <Input
            FontAwesomeIcon={"user"}
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Input
              FontAwesomeIcon={"lock"}
              placeholder={"Password"}
              value={password}
              onChangeText={setPassword}
            />
            <Eye 
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />
          </View>

          <View style={styles.forgotPassword}>
            <TouchableOpacity>
              <Text style={{ color: '#420475', fontWeight: '700' }}> Forgot Password </Text>
            </TouchableOpacity>
          </View>

          <Button
            onPress={handleUserData}
            buttonText={loading ? <ActivityIndicator color="white" /> : "Log in"}
          />

          <View style={{ paddingTop: 30, left: 55, bottom: 25, paddingBottom: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
              Doesn't have an Account?
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ color: 'white', fontStyle: 'italic' }}>
                <Text style={{ color: 'blue', top: 4, left: 5 }}>Click here</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;
