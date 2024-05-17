import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Color, FontSize } from "../../GlobalStyles";
export default function Texts({ HeaderTextInput }) {
  return (
    <View style={styles.TextContainer}>
      <Text style={styles.HeaderText}>{HeaderTextInput}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  TextContainer: {
    marginRight: 170,
    marginBottom: 10,
    marginTop: 20,
  },
  HeaderText: {
    color: Color.HeaderColor,
    fontWeight: "bold",
    fontSize: 20,
  },
});
