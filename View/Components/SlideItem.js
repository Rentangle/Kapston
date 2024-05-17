import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

export default function SlideItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.img} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    widht: 300,
  },
  container: {
    width,
    marginTop: 10,
    height: height * 0.3,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 70,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: "#333",
  },
  secondContainer: {
    backgroundColor: "#e8def7",
    padding: 50,
    elevation: 5,
    borderRadius: 20,
  },
});
