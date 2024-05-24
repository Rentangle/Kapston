import { StyleSheet, Text, View } from "react-native";
import Input from "../Components/Input";
import Button from "../Components/Button";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const PasswordReset = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={{ alignItems: "center", paddingBottom: 30 }}>
        <Text style={{ fontSize: 17 }}>
          Your password has been reset successfully!
        </Text>
        <Text style={{ fontSize: 17 }}>keep it safe and easy memorable</Text>
      </View>
      <Input placeholder={"Enter Password"} />
      <Input placeholder={"Re-Enter Password"} />
      <Button
        buttonText={"Reset"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
