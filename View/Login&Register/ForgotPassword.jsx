import Texts from "../Components/Text";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={{ alignItems: "center", paddingBottom: 30 }}>
        <Text style={{ fontSize: 17, textAlignVertical: "center" }}>
          Don't worry, enter your registered email
        </Text>
        <Text style={{ fontSize: 17, textAlignVertical: "center" }}>
          to receive password reset link.
        </Text>
      </View>
      <View style={{ alignSelf: "center", paddingBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Enter Email Address
        </Text>
      </View>
      <Input placeholder={"Email Address"} EntypoIcon={"mail"} />
      <Button
        buttonText={"Send"}
        onPress={() => navigation.navigate("PasswordReset")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
