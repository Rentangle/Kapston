import React from "react";
import { View, StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

export default function Button({ onPress, buttonText, textStyle, disabled }) {
  return (
    <View style={styles.button}>
      <PaperButton
        mode="contained"
        onPress={onPress}
        style={styles.inBut}
        labelStyle={[styles.textSign, textStyle]} // Merge the styles with props
        disabled={disabled}
      >
        {buttonText}
      </PaperButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginTop: 20,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
  },
  inBut: {
    paddingHorizontal: 50,
    paddingVertical: 1,
    borderRadius: 50,
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
