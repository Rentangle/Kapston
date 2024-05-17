import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");
const Rectangle = () => {
  return (
    <Image
      style={styles.allSetChild}
      contentFit="cover"
      source={require("../assets/rectangle.png")}
    />
  );
};

export default Rectangle;

const styles = StyleSheet.create({
  allSetChild: {
    width,
    height: height * 0.3,
    top: height * 0.85,
    position: "absolute",
  },
});
