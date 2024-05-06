import React from "react";
import { View, StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

export default function Button({ onPress, buttonText, textStyle }) {
  return (
    <View style={styles.button}>
      <PaperButton
        mode="contained"
        onPress={onPress}
        style={styles.inBut}
        labelStyle={[styles.textSign, textStyle]} // Merge the styles with props
      >
        {buttonText}
      </PaperButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginTop: 30,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
  },
  inBut: {
    width: "70%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
